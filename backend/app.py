import os
import numpy as np
import json
import smtplib
import threading
import requests
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
from pymongo import MongoClient
from bson import ObjectId
from flask import Flask, request, jsonify
from flask_cors import CORS
from pickle import load
from dotenv import load_dotenv
from groq import Groq

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app, origins=[
    "https://vitality.atharvgangawane.me",
    "http://localhost:5173",
    "http://localhost:3000"
])

# Load ML model bundle
print("Starting model load...")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(BASE_DIR, "model.pkl")

MODEL_URL = "https://huggingface.co/Atharvcode/vitality-ml-model/resolve/main/model.pkl?download=true"

def load_ml_model():
    # If the file doesn't exist (like on Render), download it first
    if not os.path.exists(model_path):
        print("Downloading 165MB ML model from Hugging Face. Please wait...")
        response = requests.get(MODEL_URL, stream=True)
        response.raise_for_status() # Check for errors
        
        with open(model_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        print("Model downloaded successfully!")

    # Now load the model into memory
    print("Unpickling model...")
    with open(model_path, "rb") as f:
        return load(f)

# Execute the function to load the model
bundle = load_ml_model()

print("Model loaded successfully")

model_diet = bundle["model_diet"]
model_exercise = bundle["model_exercise"]
encoder_diet = bundle["encoder_diet"]
encoder_exercise = bundle["encoder_exercise"]

print("Model and Encoders loaded successfully")

# Initialize Groq client
groq_client = Groq(api_key=os.getenv("GROQ_API_KEY"))
print("Groq client initialized")

FEATURE_KEYS = [
    "age",
    "gender",
    "bmi",
    "ap_hi",
    "ap_lo",
    "cholesterol",
    "gluc",
    "active",
    "hemoglobin",
    "iron",
    "vitamin_d",
    "is_pregnant",
    "trimester",
    "hba1c",
    "tsh",
    "history_asthma",
]

# Initialize MongoDB
mongo_uri = os.getenv("MONGO_URI")
try:
    mongo_client = MongoClient(mongo_uri)
    db = mongo_client["vitality"]
    print("MongoDB initialized successfully")
except Exception as e:
    print(f"MongoDB connection error: {e}")

def send_health_email(to_email, health_score, key_risk_factor, diet_tags, exercise_tags):
    smtp_email = os.getenv("SMTP_EMAIL")
    smtp_password = os.getenv("SMTP_PASSWORD")
    if not smtp_email or not smtp_password or not to_email:
        return

    msg = MIMEMultipart()
    msg['From'] = smtp_email
    msg['To'] = to_email
    msg['Subject'] = "Your Vitality Health Report"

    d_tags = ', '.join(diet_tags) if isinstance(diet_tags, list) else diet_tags
    e_tags = ', '.join(exercise_tags) if isinstance(exercise_tags, list) else exercise_tags

    html = f"""
    <html>
      <body style="font-family: Arial, sans-serif; color: #333;">
        <h2>Your Vitality Health Analysis is Ready!</h2>
        <p><strong>Health Score:</strong> {health_score}/100</p>
        <p><strong>Key Risk Factor:</strong> {key_risk_factor}</p>
        <h3>Recommendations</h3>
        <p><strong>Diet Tags:</strong> {d_tags}</p>
        <p><strong>Exercise Tags:</strong> {e_tags}</p>
        <br>
        <p>Stay healthy,<br>The Vitality Team</p>
      </body>
    </html>
    """
    msg.attach(MIMEText(html, 'html'))
    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(smtp_email, smtp_password)
        server.send_message(msg)
        server.quit()
        print(f"Sent email to {to_email}")
    except Exception as e:
        print(f"Failed to send email to {to_email}: {e}")

@app.route("/", methods=["GET"])
def index():
    return jsonify({
        "status": "Ok",
        "message": "Vitality API is Running!!"
    })


@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json(force=True)
    missing = [key for key in FEATURE_KEYS if key not in data]
    if missing:
        return jsonify({
            "error": f"Missing features: {missing}"
        }), 400

    try:
        # Build the feature array in the correct sequence
        features = np.array([[data[key] for key in FEATURE_KEYS]])

        # Binary multi-label array format
        diet_pred = model_diet.predict(features)
        exercise_pred = model_exercise.predict(features)

        # Decode binary arrays back to human-readable tags
        diet_tags = encoder_diet.inverse_transform(diet_pred)[0]
        exercise_tags = encoder_exercise.inverse_transform(exercise_pred)[0]

        # Convert numpy types to plain Python for JSON serialization
        diet_tags = list(diet_tags) if hasattr(diet_tags, "__iter__") and not isinstance(diet_tags, str) else [str(diet_tags)]
        exercise_tags = list(exercise_tags) if hasattr(exercise_tags, "__iter__") and not isinstance(exercise_tags, str) else [str(exercise_tags)]

        # Groq AI Reasoning
        ai_reasoning = generate_ai_reasoning(data, diet_tags, exercise_tags)

        # ─── Dynamic Health Score & Risk Factor ───
        health_score = 100
        risks = []

        # Elevated Blood Sugar
        if data.get("gluc", 1) > 1 or data.get("hba1c", 5.0) >= 5.7:
            health_score -= 15
            risks.append("Elevated Blood Sugar")

        # High Blood Pressure
        if data.get("ap_hi", 120) >= 130 or data.get("ap_lo", 80) >= 85:
            health_score -= 15
            risks.append("High Blood Pressure")

        # High Cholesterol
        if data.get("cholesterol", 1) > 1:
            health_score -= 10
            risks.append("High Cholesterol")

        # Low Iron / Anemia
        if data.get("hemoglobin", 14) < 12 or data.get("iron", 100) < 60:
            health_score -= 10
            risks.append("Low Iron / Anemia")

        # Elevated BMI
        if data.get("bmi", 22) > 25:
            health_score -= 10
            risks.append("Elevated BMI")

        # Vitamin D Deficiency
        if data.get("vitamin_d", 30) < 20:
            health_score -= 10
            risks.append("Vitamin D Deficiency")

        health_score = max(0, min(100, health_score))
        key_risk_factor = risks[0] if risks else "None"

        # ─── Save to MongoDB ───
        try:
            full_record = {
                **data,
                "diet_tags": diet_tags,
                "exercise_tags": exercise_tags,
                "ai_reasoning": ai_reasoning,
            }
            user_id = data.get("user_id", "")
            user_email = data.get("user_email", "")
            
            doc = {
                "user_id": user_id,
                "health_score": health_score,
                "key_risk_factor": key_risk_factor,
                "full_data": json.dumps(full_record),
                "created_at": datetime.utcnow()
            }
            db.history.insert_one(doc)
            
            if user_id and user_email:
                user_profile = db.user_profiles.find_one({"uid": user_id})
                if not user_profile or user_profile.get("email_notifications", 1) == 1:
                    threading.Thread(
                        target=send_health_email,
                        args=(user_email, health_score, key_risk_factor, diet_tags, exercise_tags)
                    ).start()
                    
        except Exception as db_err:
            print(f"DB insert error: {db_err}")

        return jsonify({
            "diet_tags": diet_tags,
            "exercise_tags": exercise_tags,
            "ai_reasoning": ai_reasoning,
            "health_score": health_score,
            "key_risk_factor": key_risk_factor,
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500


@app.route("/history", methods=["GET"])
def get_history():
    try:
        user_id = request.args.get("user_id", "")
        query = {"user_id": user_id} if user_id else {}
        
        rows = list(db.history.find(query).sort("created_at", -1))

        records = []
        for row in rows:
            full_data = {}
            try:
                full_data = json.loads(row.get("full_data", "{}")) if row.get("full_data") else {}
            except Exception:
                pass

            created_at = row.get("created_at")
            date_str = created_at.strftime("%Y-%m-%d") if created_at else ""

            records.append({
                "id": str(row["_id"]),
                "date": date_str,
                "healthScore": row.get("health_score"),
                "keyRisk": row.get("key_risk_factor") or "None",
                "data": full_data,
            })

        return jsonify(records)

    except Exception as e:
        print(f"History fetch error: {e}")
        return jsonify([])


def generate_ai_reasoning(user_data, diet_tags, exercise_tags):
    try:
        lang_code = user_data.get("language", "en")
        language_map = {"en": "English", "hi": "Hindi", "mr": "Marathi script", "ta": "Tamil script"}
        lang_name = language_map.get(lang_code, "English")
        
        system_prompt = (
            "You are an empathetic, expert clinical AI health assistant for the Vitality app. "
            "Given a patient's biomarker data and the diet/exercise tags our ML model predicted, "
            "explain in exactly 3-4 short, clear sentences WHY these specific recommendations "
            "were made. Focus on any out-of-range biomarkers and how each recommendation helps. "
            "Write in warm, second-person language (\"your\", \"you\"). "
            "Do NOT use bullet points, markdown, or headers—just plain text sentences."
            f" CRITICAL RULE: You MUST write your entirely response in {lang_name}."
            " Try not to mix English words if a native term exists, and definitely use native scripts (Devanagari for Hindi/Marathi, Tamil script for Tamil)."
        )

        trimester_text = f", Trimester: {user_data['trimester']}" if user_data['is_pregnant'] else ""
        # Convert age to years if in days
        age_input = float(user_data.get("age", 0))
        age_years = round(age_input / 365.25) if age_input > 150 else int(age_input)

        pregnant_text = "Yes" if user_data["is_pregnant"] else "No"
        asthma_text = "Yes" if user_data["history_asthma"] else "No"
        active_text = "Yes" if user_data["active"] else "No"
        gender_text = "Female" if user_data.get("gender") == 1 else "Male"
        diet_pref = user_data.get("diet_preference", "vegetarian").capitalize()

        user_prompt = (
            f"Patient data:\n"
            f"  Age: {age_years}, Gender: {gender_text}, "
            f"BMI: {user_data['bmi']}\n"
            f"  Blood Pressure: {user_data['ap_hi']}/{user_data['ap_lo']} mmHg\n"
            f"  Cholesterol level: {user_data['cholesterol']} (1=normal, 2=above normal, 3=well above)\n"
            f"  Glucose level: {user_data['gluc']} (1=normal, 2=above normal, 3=well above)\n"
            f"  Hemoglobin: {user_data['hemoglobin']} g/dL, Iron: {user_data['iron']} mcg/dL\n"
            f"  Vitamin D: {user_data['vitamin_d']} ng/mL, HbA1c: {user_data['hba1c']}%\n"
            f"  TSH: {user_data['tsh']} mIU/L\n"
            f"  Pregnant: {pregnant_text}{trimester_text}\n"
            f"  History of Asthma: {asthma_text}\n"
            f"  Physically Active: {active_text}\n"
            f"  Dietary Preference: {diet_pref}\n\n"
            f"Predicted Diet Tags: {', '.join(diet_tags)}\n"
            f"Predicted Exercise Tags: {', '.join(exercise_tags)}\n\n"
            f"Now explain why these tags were recommended for this patient."
        )

        chat_completion = groq_client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
            temperature=0.6,
            max_tokens=250,
        )

        return chat_completion.choices[0].message.content.strip()

    except Exception as e:
        print(f"Groq API error: {e}")
        return "Personalized reasoning is currently unavailable. Please consult your dashboard tags."


@app.route("/generate-plan", methods=["POST"])
def generate_plan():
    body = request.get_json(force=True)
    diet_tags = body.get("diet_tags", [])
    exercise_tags = body.get("exercise_tags", [])
    user_data = body.get("user_data", {})

    try:
        diet_pref = user_data.get("diet_preference", "vegetarian").lower()

        if diet_pref == "non-vegetarian":
            diet_rule = (
                "The patient is NON-VEGETARIAN. You MUST include chicken, fish, eggs, mutton, or other "
                "non-vegetarian protein sources in EVERY meal (breakfast, lunch, and dinner). "
                "Do NOT suggest purely vegetarian meals like paneer, dal, or tofu as the main protein. "
                "Use Indian non-veg dishes like chicken curry, fish fry, egg bhurji, keema, tandoori chicken, etc."
            )
        else:
            diet_rule = (
                "The patient is VEGETARIAN. You MUST NOT include any meat, fish, or eggs. "
                "Use only vegetarian protein sources like paneer, dal, legumes, tofu, nuts, and dairy."
            )

        lang_code = user_data.get("language", "en")
        language_map = {"en": "English", "hi": "Hindi", "mr": "Marathi script", "ta": "Tamil script"}
        lang_name = language_map.get(lang_code, "English")
        
        age_input = float(user_data.get("age", 0))
        age_in_years = round(age_input / 365.25) if age_input > 150 else int(age_input)
        
        gender_val = user_data.get("gender", 1)
        gender_text = "Female" if gender_val == 1 else "Male"
        
        bmi = user_data.get("bmi", "N/A")
        diet_tags_str = ", ".join(diet_tags)
        workout_tags_str = ", ".join(exercise_tags)

        # Extract clinical anomalies
        anomalies = []
        if user_data.get("gluc", 1) > 1 or user_data.get("hba1c", 5.0) >= 5.7:
            anomalies.append("Elevated Blood Sugar")
        if user_data.get("ap_hi", 120) >= 130 or user_data.get("ap_lo", 80) >= 85:
            anomalies.append("High Blood Pressure")
        if user_data.get("cholesterol", 1) > 1:
            anomalies.append("High Cholesterol")
        if user_data.get("hemoglobin", 14) < 12 or user_data.get("iron", 100) < 60:
            anomalies.append("Low Iron / Anemia")
        if bmi != "N/A" and float(bmi) > 25:
            anomalies.append("Elevated BMI")
        if user_data.get("vitamin_d", 30) < 20:
            anomalies.append("Vitamin D Deficiency")
            
        clinical_anomalies_str = ", ".join(anomalies) if anomalies else "None"

        system_prompt = f"""You are an elite, medically-aware fitness and nutrition AI. Generate a highly personalized, week-long Diet and Workout plan formatted for a PDF.

PATIENT PROFILE:
- Age: {age_in_years} years old
- Gender: {gender_text}
- BMI: {bmi}
- Clinical Anomalies: {clinical_anomalies_str}
- ML-Assigned Diet Tags: {diet_tags_str}
- ML-Assigned Workout Tags: {workout_tags_str}

STRICT GENERATION RULES:
1. CLINICAL OVERRIDES (CRITICAL): 
   - You MUST explicitly address the 'Clinical Anomalies' in the diet plan. If they have low blood sugar, recommend complex carbs/frequent meals. If low Vitamin D, recommend fortified foods. 
2. AGE-SPECIFIC MODIFICATIONS:
   - If Age < 18: NO strict calorie deficits or heavy max-weight lifting. Focus on bodyweight mastery and nutrient-dense whole foods for development.
   - If Age > 50: STRICTLY prioritize joint health. If the ML-Assigned Workout Tags include 'Gym/HIIT', 'Running', or heavy lifting, you MUST ignore those tags and replace them with low-impact alternatives (Water Aerobics, Restorative Yoga, Light Walking).
3. GENDER-SPECIFIC MODIFICATIONS:
   - Adjust daily baseline calories according to the provided gender. Factor in hormonal/nutrient baselines (e.g., bone-density focus for older females).

{diet_rule}

Output a structured plan including a Daily Caloric Target, Macro Split, and a safe, 7-Day Workout Schedule.

CRITICAL JSON RULES (DO NOT BREAK JSON RESPONSE):
You MUST respond with ONLY a raw, valid JSON object—no markdown, no explanation, no code fences.
The JSON must have a single key 'weekly_plan' containing an array of exactly 7 objects.
Each object MUST have these keys:
'day' (e.g. 'Day 1'), 'focus' (a short theme like 'Core & Hydration'), 'breakfast' (a specific meal), 'lunch' (a specific meal), 'dinner' (a specific meal), 'workout' (a specific exercise routine with duration).
Keep workouts varied across the week with at least one rest/light day.
CRITICAL LANGUAGE RULE: You MUST translate ALL generated string values (except keys) in the JSON into {lang_name}. The string values must be natively translated into the requested language script.
"""

        pregnant_text = "Yes" if user_data.get("is_pregnant") else "No"

        user_prompt = (
            f"Additional Info: Pregnant: {pregnant_text}, Dietary Preference: {diet_pref.capitalize()}\n\n"
            f"Generate the 7-day JSON plan now honoring all the STRICT GENERATION RULES and JSON structured format."
        )

        chat_completion = groq_client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
            temperature=0.7,
            max_tokens=1500,
            response_format={"type": "json_object"},
        )

        raw = chat_completion.choices[0].message.content.strip()
        plan = json.loads(raw)
        return jsonify(plan)

    except Exception as e:
        print(f"Groq /generate-plan error: {e}")
        return jsonify({"error": "Failed to generate plan. Please try again."}), 500


# ─── User Profile & Settings API ───────────────────────────────────────

@app.route("/api/user/profile", methods=["GET"])
def get_user_profile():
    uid = request.args.get("uid", "")
    if not uid:
        return jsonify({"error": "Missing uid"}), 400
    try:
        row = db.user_profiles.find_one({"uid": uid}, {"_id": 0})
        if row:
            return jsonify(row)
        else:
            return jsonify({
                "uid": uid, "phone": "", "location": "", "blood_type": "",
                "allergies": "None", "medical_conditions": "", "height": "",
                "weight": "", "age": "", "email_notifications": 1, "dark_mode": 0
            })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/user/update_profile", methods=["PUT"])
def update_user_profile():
    body = request.get_json(force=True)
    uid = body.get("uid", "")
    if not uid:
        return jsonify({"error": "Missing uid"}), 400
    try:
        update_data = {
            "phone": body.get("phone", ""),
            "location": body.get("location", ""),
            "blood_type": body.get("blood_type", ""),
            "allergies": body.get("allergies", "None"),
            "medical_conditions": body.get("medical_conditions", ""),
            "height": body.get("height", ""),
            "weight": body.get("weight", ""),
            "age": body.get("age", "")
        }
        db.user_profiles.update_one({"uid": uid}, {"$set": update_data}, upsert=True)
        return jsonify({"status": "ok"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/user/update_settings", methods=["PUT"])
def update_user_settings():
    body = request.get_json(force=True)
    uid = body.get("uid", "")
    if not uid:
        return jsonify({"error": "Missing uid"}), 400
    try:
        update_data = {
            "email_notifications": 1 if body.get("email_notifications", True) else 0,
            "dark_mode": 1 if body.get("dark_mode", False) else 0
        }
        db.user_profiles.update_one({"uid": uid}, {"$set": update_data}, upsert=True)
        return jsonify({"status": "ok"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/user/delete_history", methods=["DELETE"])
def delete_user_history():
    uid = request.args.get("uid", "")
    if not uid:
        return jsonify({"error": "Missing uid"}), 400
    try:
        db.history.delete_many({"user_id": uid})
        return jsonify({"status": "ok", "message": "History deleted"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/user/upload_photo", methods=["POST"])
def upload_photo():
    uid = request.form.get("uid", "")
    if not uid:
        return jsonify({"error": "Missing uid"}), 400
    if "photo" not in request.files:
        return jsonify({"error": "No photo file"}), 400
    photo = request.files["photo"]
    if photo.filename == "":
        return jsonify({"error": "Empty filename"}), 400
    try:
        import uuid
        ext = photo.filename.rsplit(".", 1)[-1].lower() if "." in photo.filename else "jpg"
        filename = f"{uid}_{uuid.uuid4().hex[:8]}.{ext}"
        save_path = os.path.join("static", "avatars", filename)
        photo.save(save_path)
        photo_url = f"{request.host_url}static/avatars/{filename}"
        return jsonify({"status": "ok", "photo_url": photo_url})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, use_reloader=True, port=5000, host="0.0.0.0")
