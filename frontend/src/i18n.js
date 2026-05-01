import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            "Sidebar": {
                "Home": "Home", "Dashboard": "Dashboard", "NewAnalysis": "New Analysis",
                "History": "History", "Profile": "Profile", "Settings": "Settings", "Logout": "Logout"
            },
            "Dashboard": {
                "Title": "Welcome back",
                "Subtitle": "Monitor your health, track progress, and get AI insights.",
                "NewAnalysisCardTitle": "Start Analysis",
                "NewAnalysisCardDesc": "Get personalized AI health insights from blood parameters.",
                "HistoryCardTitle": "View History",
                "HistoryCardDesc": "Check your previous logs and generated plans.",
                "StartBtn": "Start New Analysis",
                "SDTitle": "Your Health Dashboard",
                "SDSubtitle": "Personalized insights based on your blood test",
                "Generating": "Generating...",
                "ExportPDF": "Export as PDF",
                "HealthScore": "Health Score",
                "HealthExc": "Excellent health!",
                "HealthRoom": "Room for improvement",
                "HealthWork": "Let's work on this",
                "Metrics": "Health Metrics Overview",
                "AIReason": "AI Reasoning",
                "RecDiet": "Recommended Diet Plan",
                "AIPred": "AI Predicted",
                "NoDiet": "No diet recommendations available.",
                "RecWork": "Workout Plan",
                "NoWork": "No workout recommendations available.",
                "DailyGoals": "Daily Goals",
                "CalTarget": "Calories Target",
                "WaterIn": "Water Intake",
                "ExMins": "Exercise Minutes"
            },
            "HistoryPage": {
                "Title": "History",
                "Subtitle": "Your past blood test analyses",
                "NewBtn": "New Analysis",
                "Loading": "Loading your history...",
                "NoAnalyses": "No analyses yet",
                "NoAnalysesDesc": "Start your first blood test analysis to see results here.",
                "StartBtn": "Start Analysis",
                "ColDate": "Date",
                "ColScore": "Health Score",
                "ColRisk": "Key Risk Factor",
                "ColAction": "Action",
                "ViewBtn": "View"
            },
            "Settings": {
                "Title": "Settings", "Subtitle": "Manage your preferences and privacy",
                "Preferences": "Preferences", "EmailNotifs": "Email Notifications", "EmailDesc": "Receive updates about your health reports",
                "DarkMode": "Dark Mode", "DarkDesc": "Switch between light and dark themes",
                "WeeklyReports": "Weekly Reports", "WeeklyDesc": "Get a weekly summary of your health trends",
                "Language": "Language", "LangDesc": "Select your preferred language",
                "Privacy": "Privacy & Data", "PrivacyDesc": "Permanently delete all your analysis history. This action cannot be undone.",
                "DeleteBtn": "Delete History", "About": "About", "Version": "Version", "BuiltBy": "Built by",
                "DeleteTitle": "Delete all history?",
                "DeleteConfirm": "This will permanently remove all your past analysis records. This action cannot be undone.",
                "Cancel": "Cancel", "DeleteAll": "Delete All"
            },
            "Profile": {
                "Title": "Profile", "Subtitle": "Your personal and medical information",
                "Age": "Age", "EditPhoto": "Edit Photo", "MedConstants": "Medical Constants",
                "Height": "Height", "Weight": "Weight", "BloodType": "Blood Type", "Allergies": "Allergies",
                "Phone": "Phone", "Location": "Location", "MedConditions": "Medical Conditions",
                "SaveChanges": "Save Changes", "Saving": "Saving...", "Saved": "Saved!"
            },
            "Auth": {
                "Welcome": "Welcome back", "SignInDesc": "Sign in to access your health dashboard",
                "ContinueGoogle": "Continue with Google", "OrEmail": "OR CONTINUE WITH EMAIL",
                "Email": "Email", "Password": "Password", "ForgotPassword": "Forgot password?",
                "SignInBtn": "Sign In", "NoAccount": "Don't have an account?", "SignUpLink": "Sign up",
                "CreateAccount": "Create an account", "SignUpDesc": "Start your health journey",
                "FullName": "Full Name", "CreateBtn": "Create account", "HaveAccount": "Already have an account?",
                "ResetPwd": "Reset Password", "ResetDesc": "Enter your email and we'll send you a reset link.",
                "CheckInbox": "Check your inbox", "SentLinkTo": "We've sent a reset link to",
                "ClickLink": "Please click the link in the email to create a new password.",
                "BackToSignIn": "Back to Sign In", "SendReset": "Send Reset Link",
                "Quote": "Your Health, Decoded by AI.",
                "QuoteDesc": "Transform complex blood test results into actionable, personalized health plans.",
                "IllustrationAlt": "DNA helix medical illustration",
                "Errors": {
                    "UserNotFound": "No account found with this email.",
                    "WrongPassword": "Incorrect password. Please try again.",
                    "InvalidCred": "Invalid email or password.",
                    "TooMany": "Too many attempts. Please try again later.",
                    "Cancelled": "Sign-in was cancelled.",
                    "Network": "Network error. Check your connection.",
                    "InvalidEmail": "Please enter a valid email address.",
                    "EmailInUse": "An account with this email already exists.",
                    "WeakPassword": "Password must be at least 6 characters.",
                    "NameRequired": "Please enter your name",
                    "Default": "Authentication failed. Please try again."
                }
            },
            "Input": {
                "Personal": "Personal Info", "Age": "Age", "Weight": "Body Weight", "Height": "Height",
                "KG": "kg", "CM": "cm",
                "BloodData": "Blood Data", "Lifestyle": "Lifestyle",
                "Gender": "Gender",
                "Male": "Male", "Female": "Female", "Diet": "Dietary Preference", "Veg": "Vegetarian", "NonVeg": "Non-Vegetarian",
                "Pregnant": "Are you pregnant?", "Trimester": "Trimester", "Asthma": "History of Asthma",
                "BloodTitle": "Blood Test Parameters", "BloodDesc": "Enter your recent blood test values",
                "BP": "Blood Pressure", "Sys": "Systolic (ap_hi)", "Dia": "Diastolic (ap_lo)",
                "Glucose": "Glucose (mg/dL)", "Chol": "Total Cholesterol (mg/dL)",
                "Nutri": "Nutritional Profile", "Hb": "Hemoglobin (g/dL)", "Iron": "Iron (mcg/dL)", "VitD": "Vitamin D (ng/mL)",
                "AddMarkers": "Additional Markers", "HbA1c": "HbA1c (%)", "TSH": "TSH (mIU/L)",
                "LifeTitle": "Lifestyle & Habits", "LifeDesc": "Tell us about your daily activity",
                "Activity": "Activity Level",
                "Sedentary": "Sedentary", "SedentaryDesc": "Little to no exercise",
                "Light": "Lightly Active", "LightDesc": "Light exercise 1-3 days/week",
                "Moderate": "Moderately Active", "ModerateDesc": "Moderate exercise 3-5 days/week",
                "Active": "Active", "ActiveDesc": "Hard exercise 6-7 days/week",
                "VeryActive": "Very Active", "VeryActiveDesc": "Intense exercise & physical job",
                "MedHistory": "Medical History",
                "SelectTrimester": "Select trimester",
                "Tri1": "1st Trimester (Weeks 1-12)",
                "Tri2": "2nd Trimester (Weeks 13-26)",
                "Tri3": "3rd Trimester (Weeks 27-40)",
                "Back": "Back", "Next": "Next Step", "Analyze": "Analyze Data",
                "DisclaimerTitle": "Medical Disclaimer", "DisclaimerText": "Vitality is an AI-powered health platform designed to provide insights and recommendations based on the data you provide. It is NOT a substitute for professional medical advice, diagnosis, or treatment.",
                "Understand": "I understand and wish to proceed"
            },
            "Loader": {
                "Analyzing": "Analyzing your data...", "Processing": "Our AI is processing your blood parameters",
                "Step1": "Reading blood parameters", "Step2": "Cross-referencing health database", "Step3": "Generating personalized plan"
            },
            "Landing": {
                "SignIn": "Sign In", "GetStarted": "Get Started", "LearnMore": "Learn More",
                "Tagline": "AI-Powered Health Platform", "HeroTitle1": "Your Health, ", "HeroTitle2": "Decoded by AI.",
                "HeroSubtitle": "Personalized Diet & Exercise Plans based on your Blood Biomarkers.",
                "FeaturesTitle": "Everything You Need", "FeaturesSubtitle": "Comprehensive health intelligence powered by cutting-edge AI.",
                "HowTitle": "How It Works", "HowSubtitle": "Three simple steps to actionable health insights.",
                "F1Title": "Smart Diagnostics", "F1Desc": "AI-powered analysis of your blood biomarkers to identify health patterns and potential risks.",
                "F2Title": "DASH Diet Plans", "F2Desc": "Personalized dietary recommendations aligned with the DASH framework for optimal health.",
                "F3Title": "Risk Stratification", "F3Desc": "Early identification and categorization of health risks based on your unique biomarker profile.",
                "S1Title": "Input", "S1Desc": "Enter your blood test parameters",
                "S2Title": "AI Analysis", "S2Desc": "Our model processes your data",
                "S3Title": "Results", "S3Desc": "Get your personalized health plan",
                "Footer": "All rights reserved."
            },
            "HealthData": {
                "Radar": { "Hb": "Hemoglobin", "Gluc": "Glucose", "Chol": "Cholesterol", "BP": "Blood Pressure", "BMI": "BMI" },
                "Risks": { "None": "None", "HighBP": "High Blood Pressure", "Anemia": "Anemia", "Diabetes": "Diabetes", "Hypertension": "Hypertension", "Obesity": "Obesity", "VitD": "Vitamin D Deficiency", "Chol": "High Cholesterol" },
                "Units": { "kcal": "kcal", "glasses": "glasses", "min": "min", "kg": "kg", "cm": "cm" },
                "Diet": {
                    "Balanced": { "title": "Balanced", "desc": "A well-rounded mix of proteins, carbs, and fats to maintain overall health." },
                    "CalciumVitD": { "title": "Calcium & Vitamin D Focus", "desc": "Prioritises dairy, leafy greens, and fortified foods for strong bones." },
                    "CalorieDeficit": { "title": "Calorie-Deficit", "desc": "A controlled calorie intake to support healthy, sustainable weight loss." },
                    "DASH": { "title": "DASH-Diet", "desc": "Dietary Approaches to Stop Hypertension — rich in fruits, veggies, and low-sodium foods." },
                    "Folate": { "title": "Folate & Prenatal Vitamins", "desc": "Critical for neural tube development; includes leafy greens and fortified grains." },
                    "GestationalLowGI": { "title": "Gestational Low-GI Diet", "desc": "Complex carbs with a low glycaemic index to prevent blood sugar spikes during pregnancy." },
                    "HighIronVitC": { "title": "High-Iron w/ Vitamin-C", "desc": "Pairs iron-rich foods with vitamin C to maximise iron absorption." },
                    "HydrationProtein": { "title": "Hydration + High-Protein", "desc": "Emphasises water intake and lean protein to support fetal growth and fluid balance." },
                    "IronRich": { "title": "Iron-Rich", "desc": "Includes spinach, lentils, and lean meats to boost hemoglobin levels." },
                    "LowFat": { "title": "Low-Fat", "desc": "Limits saturated fats to improve cholesterol and heart health." },
                    "LowSugar": { "title": "Low-Sugar", "desc": "Reduces refined sugars to help manage glucose and energy levels." },
                    "PrenatalIron": { "title": "Prenatal Iron-Rich", "desc": "Iron-rich nutrition tailored for pregnancy to prevent maternal anaemia." },
                    "Diabetic": { "title": "Strict Diabetic (Low-GI)", "desc": "Very low glycaemic index foods for strict blood sugar control." },
                    "Thyroid": { "title": "Thyroid-Support Calorie Deficit", "desc": "Calorie-controlled diet with selenium and iodine to support thyroid function." },
                    "VitDRich": { "title": "Vitamin-D-Rich", "desc": "Includes fatty fish, egg yolks, and fortified foods to raise vitamin D levels." }
                },
                "Workout": {
                    "Cycling": { "title": "Cycling", "desc": "Outdoor cardio that builds leg strength and cardiovascular endurance." },
                    "GentleWalk": { "title": "Gentle Walking", "desc": "Easy-paced walking for recovery days or mobility improvement." },
                    "HIIT": { "title": "Gym/HIIT", "desc": "High-intensity interval training to boost metabolism and burn fat." },
                    "LightWalk": { "title": "Light Walking", "desc": "Short, gentle walks ideal for beginners or as active recovery." },
                    "LightYoga": { "title": "Light Yoga", "desc": "Gentle poses and breathing exercises for relaxation and flexibility." },
                    "MedClearance": { "title": "Medical Clearance Required", "desc": "High blood pressure detected. Consult your doctor before starting exercise." },
                    "Pelvic": { "title": "Pelvic Floor/Mobility", "desc": "Targeted exercises to strengthen the pelvic floor and improve mobility." },
                    "PrenatalYoga": { "title": "Prenatal Yoga", "desc": "Pregnancy-safe yoga to relieve back pain and prepare for delivery." },
                    "Resistance": { "title": "Resistance Band Training", "desc": "Low-impact strength work using bands to build lean muscle safely." },
                    "Running": { "title": "Running", "desc": "Sustained cardio to improve heart health and stamina." },
                    "Stationary": { "title": "Stationary Cycling", "desc": "Low-impact indoor cycling to maintain fitness without joint stress." },
                    "Swimming": { "title": "Swimming", "desc": "Full-body workout that's easy on joints with excellent cardio benefits." },
                    "WaterAerobics": { "title": "Water Aerobics", "desc": "Water-based exercises providing resistance and buoyancy to relieve pelvic pressure." },
                    "YogaStretch": { "title": "Yoga & Stretching", "desc": "Combines yoga poses with deep stretching for flexibility and stress relief." }
                }
            }
        }
    },
    hi: {
        translation: {
            "Sidebar": {
                "Home": "होम", "Dashboard": "डैशबोर्ड", "NewAnalysis": "नया विश्लेषण",
                "History": "इतिहास", "Profile": "प्रोफ़ाइल", "Settings": "सेटिंग्स", "Logout": "लॉग आउट"
            },
            "Dashboard": {
                "Title": "डैशबोर्ड",
                "Subtitle": "वापसी पर स्वागत है! नया विश्लेषण शुरू करें या इतिहास देखें.",
                "NewAnalysisCardTitle": "नया विश्लेषण",
                "NewAnalysisCardDesc": "एआई-संचालित अंतर्दृष्टि के लिए अपने रक्त परीक्षण पैरामीटर दर्ज करें",
                "HistoryCardTitle": "इतिहास देखें",
                "HistoryCardDesc": "पिछली रिपोर्ट ब्राउज़ करें और प्रगति ट्रैक करें",
                "StartBtn": "नया विश्लेषण शुरू करें",
                "SDTitle": "आपका स्वास्थ्य डैशबोर्ड",
                "SDSubtitle": "आपके रक्त परीक्षण के आधार पर व्यक्तिगत अंतर्दृष्टि",
                "Generating": "तैयार किया जा रहा है...",
                "ExportPDF": "पीडीएफ के रूप में निर्यात करें",
                "HealthScore": "स्वास्थ्य स्कोर",
                "HealthExc": "उत्कृष्ट स्वास्थ्य!",
                "HealthRoom": "सुधार की गुंजाइश",
                "HealthWork": "आइए इस पर काम करें",
                "Metrics": "स्वास्थ्य मेट्रिक्स सिंहावलोकन",
                "AIReason": "एआई तर्क",
                "RecDiet": "अनुशंसित आहार योजना",
                "AIPred": "एआई पूर्वानुमान",
                "NoDiet": "कोई आहार अनुशंसा उपलब्ध नहीं है।",
                "RecWork": "कसरत योजना",
                "NoWork": "कोई कसरत अनुशंसा उपलब्ध नहीं है।",
                "DailyGoals": "दैनिक लक्ष्य",
                "CalTarget": "कैलोरी लक्ष्य",
                "WaterIn": "पानी का सेवन",
                "ExMins": "व्यायाम मिनट"
            },
            "HistoryPage": {
                "Title": "इतिहास",
                "Subtitle": "आपके पुराने रक्त परीक्षण विश्लेषण",
                "NewBtn": "नया विश्लेषण",
                "Loading": "आपका इतिहास लोड हो रहा है...",
                "NoAnalyses": "अभी तक कोई विश्लेषण नहीं",
                "NoAnalysesDesc": "परिणाम देखने के लिए अपना पहला रक्त परीक्षण विश्लेषण शुरू करें।",
                "StartBtn": "विश्लेषण शुरू करें",
                "ColDate": "तारीख",
                "ColScore": "स्वास्थ्य स्कोर",
                "ColRisk": "मुख्य जोखिम कारक",
                "ColAction": "कार्रवाई",
                "ViewBtn": "देखें"
            },
            "Settings": {
                "Title": "सेटिंग्स", "Subtitle": "अपनी प्राथमिकताएं और गोपनीयता प्रबंधित करें",
                "Preferences": "प्राथमिकताएं", "EmailNotifs": "ईमेल सूचनाएं", "EmailDesc": "अपनी स्वास्थ्य रिपोर्ट के बारे में अपडेट प्राप्त करें",
                "DarkMode": "डार्क मोड", "DarkDesc": "लाइट और डार्क थीम के बीच स्विच करें",
                "WeeklyReports": "साप्ताहिक रिपोर्ट", "WeeklyDesc": "अपने स्वास्थ्य रुझानों का साप्ताहिक सारांश प्राप्त करें",
                "Language": "भाषा", "LangDesc": "अपनी पसंदीदा भाषा चुनें",
                "Privacy": "गोपनीयता और डेटा", "PrivacyDesc": "अपने सभी विश्लेषण इतिहास को स्थायी रूप से हटा दें। इस क्रिया को पूर्ववत नहीं किया जा सकता है।",
                "DeleteBtn": "इतिहास हटाएं", "About": "परिचय", "Version": "संस्करण", "BuiltBy": "द्वारा निर्मित",
                "DeleteTitle": "सारा इतिहास हटाएं?",
                "DeleteConfirm": "यह आपके पिछले सभी विश्लेषण रिकॉर्ड को स्थायी रूप से हटा देगा। इस क्रिया को पूर्ववत नहीं किया जा सकता है।",
                "Cancel": "रद्द करें", "DeleteAll": "सब हटाएं"
            },
            "Profile": {
                "Title": "प्रोफ़ाइल", "Subtitle": "आपकी व्यक्तिगत और चिकित्सा जानकारी",
                "Age": "आयु", "EditPhoto": "फ़ोटो संपादित करें", "MedConstants": "चिकित्सा स्थिरांक",
                "Height": "ऊंचाई", "Weight": "वजन", "BloodType": "रक्त समूह", "Allergies": "एलर्जी",
                "Phone": "फ़ोन", "Location": "स्थान", "MedConditions": "चिकित्सा स्थितियां",
                "SaveChanges": "परिवर्तन सहेजें", "Saving": "सहेज रहे हैं...", "Saved": "सहेजा गया!"
            },
            "Auth": {
                "Welcome": "वापसी पर स्वागत है", "SignInDesc": "अपने स्वास्थ्य डैशबोर्ड तक पहुंचने के लिए साइन इन करें",
                "ContinueGoogle": "Google के साथ जारी रखें", "OrEmail": "या ईमेल के साथ जारी रखें",
                "Email": "ईमेल", "Password": "पासवर्ड", "ForgotPassword": "पासवर्ड भूल गए?",
                "SignInBtn": "साइन इन करें", "NoAccount": "खाता नहीं है?", "SignUpLink": "साइन अप करें",
                "CreateAccount": "खाता बनाएं", "SignUpDesc": "अपनी स्वास्थ्य यात्रा शुरू करें",
                "FullName": "पूरा नाम", "CreateBtn": "खाता बनाएं", "HaveAccount": "क्या आपके पास पहले से खाता है?",
                "ResetPwd": "पासवर्ड रीसेट करें", "ResetDesc": "अपना ईमेल दर्ज करें और हम आपको एक रीसेट लिंक भेजेंगे।",
                "CheckInbox": "अपना इनबॉक्स चेक करें", "SentLinkTo": "हमने रीसेट लिंक भेज दिया है",
                "ClickLink": "नया पासवर्ड बनाने के लिए कृपया ईमेल में दिए गए लिंक पर क्लिक करें।",
                "BackToSignIn": "साइन इन पर वापस जाएं", "SendReset": "रीसेट लिंक भेजें",
                "Quote": "आपका स्वास्थ्य, एआई द्वारा डिकोड किया गया।",
                "QuoteDesc": "जटिल रक्त परीक्षण परिणामों को कार्रवाई योग्य, व्यक्तिगत स्वास्थ्य योजनाओं में बदलें।",
                "IllustrationAlt": "डीएनए हेलिक्स मेडिकल चित्रण",
                "Errors": {
                    "UserNotFound": "इस ईमेल के साथ कोई खाता नहीं मिला।",
                    "WrongPassword": "गलत पासवर्ड। कृपया पुनः प्रयास करें।",
                    "InvalidCred": "अमान्य ईमेल या पासवर्ड।",
                    "TooMany": "बहुत सारे प्रयास। कृपया बाद में पुनः प्रयास करें।",
                    "Cancelled": "साइन-इन रद्द कर दिया गया था।",
                    "Network": "नेटवर्क त्रुटि। अपना कनेक्शन जांचें।",
                    "InvalidEmail": "कृपया एक मान्य ईमेल पता दर्ज करें।",
                    "EmailInUse": "इस ईमेल वाला खाता पहले से मौजूद है।",
                    "WeakPassword": "पासवर्ड कम सेकम 6 अक्षर का होना चाहिए।",
                    "NameRequired": "कृपया अपना नाम दर्ज करें",
                    "Default": "प्रमाणीकरण विफल रहा। कृपया पुनः प्रयास करें।"
                }
            },
            "Input": {
                "Personal": "व्यक्तिगत जानकारी", "Age": "आयु", "Weight": "शरीर का वजन", "Height": "ऊंचाई",
                "KG": "किलोग्राम", "CM": "सेंटीमीटर",
                "BloodData": "रक्त डेटा", "Lifestyle": "जीवन शैली",
                "Gender": "लिंग", "Male": "पुरुष", "Female": "महिला", "Diet": "आहार वरीयता", "Veg": "शाकाहारी", "NonVeg": "मांसाहारी",
                "Pregnant": "क्या आप गर्भवती हैं?", "Trimester": "तिमाही", "Asthma": "अस्थमा का इतिहास",
                "BloodTitle": "रक्त परीक्षण पैरामीटर", "BloodDesc": "अपना हालिया रक्त परीक्षण मान दर्ज करें",
                "BP": "रक्तचाप", "Sys": "सिस्टोलिक (ap_hi)", "Dia": "डायस्टोलिक (ap_lo)",
                "Glucose": "ग्लूकोज (mg/dL)", "Chol": "कुल कोलेस्ट्रॉल (mg/dL)",
                "Nutri": "पोषण प्रोफ़ाइल", "Hb": "हीमोग्लोबिन (g/dL)", "Iron": "आयरन (mcg/dL)", "VitD": "विटामिन डी (ng/mL)",
                "AddMarkers": "अतिरिक्त मार्कर", "HbA1c": "HbA1c (%)", "TSH": "TSH (mIU/L)",
                "LifeTitle": "जीवनशैली और सवयी", "LifeDesc": "हमें अपनी दैनिक गतिविधि के बारे में बताएं",
                "Activity": "क्रियाकलाप स्तर",
                "Sedentary": "बैठा हुआ", "SedentaryDesc": "नगण्य व्यायाम",
                "Light": "हल्का सक्रिय", "LightDesc": "हल्का व्यायाम सप्ताह में 1-3 दिन",
                "Moderate": "मध्यम सक्रिय", "ModerateDesc": "मध्यम व्यायाम सप्ताह में 3-5 दिन",
                "Active": "सक्रिय", "ActiveDesc": "कठिन व्यायाम सप्ताह में 6-7 दिन",
                "VeryActive": "अत्यधिक सक्रिय", "VeryActiveDesc": "तीव्र व्यायाम और शारीरिक काम",
                "MedHistory": "चिकित्सा इतिहास",
                "SelectTrimester": "त्रैमासिक चुनें",
                "Tri1": "पहली तिमाही (सप्ताह 1-12)",
                "Tri2": "दूसरी तिमाही (सप्ताह 13-26)",
                "Tri3": "तीसरी तिमाही (सप्ताह 27-40)",
                "Back": "पीछे", "Next": "अगला चरण", "Analyze": "डेटा का विश्लेषण करें",
                "DisclaimerTitle": "चिकित्सा अस्वीकरण", "DisclaimerText": "वाइटैलिटी आपके द्वारा प्रदान किए गए डेटा के आधार पर अंतर्दृष्टि प्रदान करने के लिए डिज़ाइन किया गया एक एआई-संचालित स्वास्थ्य मंच है। यह पेशेवर चिकित्सा सलाह, निदान या उपचार का विकल्प नहीं है।",
                "Understand": "मैं समझता हूं और आगे बढ़ना चाहता हूं"
            },
            "Loader": {
                "Analyzing": "आपके डेटा का विश्लेषण किया जा रहा है...", "Processing": "हमारा एआई आपके रक्त मापदंडों को प्रोसेस कर रहा है",
                "Step1": "रक्त मापदंडों को पढ़ना", "Step2": "स्वास्थ्य डेटाबेस से मिलान", "Step3": "व्यक्तिगत योजना बनाना"
            },
            "Landing": {
                "SignIn": "साइन इन करें", "GetStarted": "शुरू करें", "LearnMore": "और जानें",
                "Tagline": "AI-संचालित स्वास्थ्य मंच", "HeroTitle1": "आपका स्वास्थ्य, ", "HeroTitle2": "AI द्वारा डिकोड किया गया।",
                "HeroSubtitle": "आपके ब्लड बायोमार्कर पर आधारित व्यक्तिगत आहार और व्यायाम योजनाएं।",
                "FeaturesTitle": "आपको जो भी चाहिए", "FeaturesSubtitle": "अत्याधुनिक एआई द्वारा संचालित व्यापक स्वास्थ्य बुद्धिमत्ता।",
                "HowTitle": "यह कैसे काम करता है", "HowSubtitle": "कार्रवाई योग्य स्वास्थ्य अंतर्दृष्टि के लिए तीन आसान चरण।",
                "F1Title": "स्मार्ट डायग्नोस्टिक्स", "F1Desc": "स्वास्थ्य पैटर्न और संभावित जोखिमों की पहचान करने के लिए आपके रक्त बायोमार्कर का एआई-संचालित विश्लेषण।",
                "F2Title": "डैश डाइट प्लान", "F2Desc": "इष्टतम स्वास्थ्य के लिए डैश ढांचे के साथ संरेखित व्यक्तिगत आहार सिफारिशें।",
                "F3Title": "जोखिम स्तरीकरण", "F3Desc": "आपकी अद्वितीय बायोमार्कर प्रोफ़ाइल के आधार पर स्वास्थ्य जोखिमों की शीघ्र पहचान और वर्गीकरण।",
                "S1Title": "इनपुट", "S1Desc": "अपने रक्त परीक्षण पैरामीटर दर्ज करें",
                "S2Title": "एआई विश्लेषण", "S2Desc": "हमारा मॉडल आपके डेटा को प्रोसेस करता है",
                "S3Title": "परिणाम", "S3Desc": "अपनी व्यक्तिगत स्वास्थ्य योजना प्राप्त करें",
                "Footer": "सर्वाधिकार सुरक्षित।"
            },
            "HealthData": {
                "Radar": { "Hb": "हीमोग्लोबिन", "Gluc": "ग्लूकोज", "Chol": "कोलेस्ट्रॉल", "BP": "रक्तचाप", "BMI": "बीएमआई" },
                "Risks": { "None": "कोई नहीं", "HighBP": "उच्च रक्तचाप", "Anemia": "अनीमिया", "Diabetes": "मधुमेह", "Hypertension": "हाइपरटेंशन", "Obesity": "मोटापा", "VitD": "विटामिन डी की कमी", "Chol": "उच्च कोलेस्ट्रॉल" },
                "Units": { "kcal": "कैलोरी", "glasses": "गिलास", "min": "मिनट", "kg": "किलोग्राम", "cm": "सेंटीमीटर" },
                "Diet": {
                    "Balanced": { "title": "संतुलित", "desc": "समग्र स्वास्थ्य बनाए रखने के लिए प्रोटीन, कार्ब्स और वसा का एक संतुलित मिश्रण।" },
                    "CalciumVitD": { "title": "कैल्शियम और विटामिन डी", "desc": "मजबूत हड्डियों के लिए डेयरी, पत्तेदार साग और फोर्टिफाइड खाद्य पदार्थों को प्राथमिकता देता है।" },
                    "CalorieDeficit": { "title": "कैलोरी-डेफिसिट", "desc": "स्वस्थ और टिकाऊ वजन घटाने के लिए नियंत्रित कैलोरी सेवन।" },
                    "DASH": { "title": "DASH-डाइट", "desc": "हाइपरटेंशन रोकने के लिए आहार दृष्टिकोण - फलों, सब्जियों और कम सोडियम वाले खाद्य पदार्थों से भरपूर।" },
                    "Folate": { "title": "फोलेट और प्रसवपूर्व विटामिन", "desc": "भ्रूण के विकास के लिए महत्वपूर्ण; इसमें पत्तेदार साग और फोर्टिफाइड अनाज शामिल हैं।" },
                    "GestationalLowGI": { "title": "गर्भावधि कम-जीआई आहार", "desc": "गर्भावस्था के दौरान रक्त शर्करा को नियंत्रित रखने के लिए कम ग्लाइसेमिक इंडेक्स वाले जटिल कार्ब्स।" },
                    "HighIronVitC": { "title": "उच्च-आयरन और विटामिन-सी", "desc": "आयरन के अवशोषण को अधिकतम करने के लिए आयरन युक्त खाद्य पदार्थों को विटामिन सी के साथ जोड़ता है।" },
                    "HydrationProtein": { "title": "हाइड्रेशन + उच्च-प्रोटीन", "desc": "भ्रूण के विकास और तरल संतुलन के लिए पानी के सेवन और लीन प्रोटीन पर जोर देता है।" },
                    "IronRich": { "title": "आयरन-रिच", "desc": "हीमोग्लोबिन के स्तर को बढ़ाने के लिए पालक, दालें और लीन मीट शामिल हैं।" },
                    "LowFat": { "title": "कम वसा वाला", "desc": "कोलेस्ट्रॉल और हृदय स्वास्थ्य में सुधार के लिए संतृप्त वसा को सीमित करता है।" },
                    "LowSugar": { "title": "कम चीनी वाला", "desc": "ग्लूकोज और ऊर्जा के स्तर को प्रबंधित करने में मदद करने के लिए परिष्कृत चीनी को कम करता है।" },
                    "PrenatalIron": { "title": "प्रसवपूर्व आयरन-रिच", "desc": "एनीमिया को रोकने के लिए गर्भावस्था के लिए तैयार आयरन युक्त पोषण।" },
                    "Diabetic": { "title": "सख्त मधुमेह (कम-जीआई)", "desc": "रक्त शर्करा के कड़े नियंत्रण के लिए बहुत कम ग्लाइसेमिक इंडेक्स वाले खाद्य पदार्थ।" },
                    "Thyroid": { "title": "थायराइड-सपोर्ट कैलोरी डेफिसिट", "desc": "थायराइड कार्य में सहायता के लिए सेलेनियम और आयोडीन के साथ कैलोरी-नियंत्रित आहार।" },
                    "VitDRich": { "title": "विटामिन-डी-रिच", "desc": "विटामिन डी के स्तर को बढ़ाने के लिए वसायुक्त मछली, अंडे की जर्दी और फोर्टिफाइड खाद्य पदार्थ शामिल हैं।" }
                },
                "Workout": {
                    "Cycling": { "title": "साइकिलिंग", "desc": "आउटडोर कार्डियो जो पैरों की मजबूती और सहनशक्ति बढ़ाता है।" },
                    "GentleWalk": { "title": "हल्की सैर", "desc": "रिकवरी के दिनों या गतिशीलता में सुधार के लिए आसान गति से चलना।" },
                    "HIIT": { "title": "जिम/HIIT", "desc": "चयापचय को बढ़ावा देने और वसा जलाने के लिए उच्च-तीव्रता अंतराल प्रशिक्षण।" },
                    "LightWalk": { "title": "तेज चलना", "desc": "शुरुआती लोगों के लिए या सक्रिय रिकवरी के रूप में छोटी, हल्की सैर।" },
                    "LightYoga": { "title": "हल्का योग", "desc": "विश्राम और लचीलेपन के लिए सूक्ष्म आसन और श्वास व्यायाम।" },
                    "MedClearance": { "title": "चिकित्सा मंजूरी आवश्यक", "desc": "उच्च रक्तचाप पाया गया। व्यायाम शुरू करने से पहले अपने डॉक्टर से सलाह लें।" },
                    "Pelvic": { "title": "पेल्विक फ्लोर/गतिशीलता", "desc": "पेल्विक फ्लोर को मजबूत करने और गतिशीलता में सुधार के लिए लक्षित व्यायाम।" },
                    "PrenatalYoga": { "title": "प्रसवपूर्व योग", "desc": "पीठ दर्द से राहत और प्रसव की तैयारी के लिए गर्भावस्था-सुरक्षित योग।" },
                    "Resistance": { "title": "रेसिस्टेंस बैंड ट्रेनिंग", "desc": "मांसपेशियों को सुरक्षित रूप से बनाने के लिए बैंड का उपयोग करके कम प्रभाव वाला शक्ति प्रशिक्षण।" },
                    "Running": { "title": "दौड़ना", "desc": "हृदय स्वास्थ्य और सहनशक्ति में सुधार के लिए निरंतर कार्डियो।" },
                    "Stationary": { "title": "स्टेशनरी साइकिलिंग", "desc": "जोड़ों के तनाव के बिना फिटनेस बनाए रखने के लिए कम प्रभाव वाली इनडोर साइकिलिंग।" },
                    "Swimming": { "title": "तैरना", "desc": "पूरे शरीर की कसरत जो जोड़ों के लिए आसान और हृदय के लिए उत्कृष्ट है।" },
                    "WaterAerobics": { "title": "वाटर एरोबिक्स", "desc": "पेल्विक दबाव को कम करने के लिए प्रतिरोध और उछाल प्रदान करने वाले जल-आधारित व्यायाम।" },
                    "YogaStretch": { "title": "योग और स्ट्रेचिंग", "desc": "लचीलेपन और तनाव से राहत के लिए गहरी स्ट्रेचिंग के साथ योग आसन।" }
                }
            }
        }
    },
    mr: {
        translation: {
            "Sidebar": {
                "Home": "मुख्य पृष्ठ", "Dashboard": "डॅशबोर्ड", "NewAnalysis": "नवीन विश्लेषण",
                "History": "इतिहास", "Profile": "प्रोफाइल", "Settings": "सेटिंग्ज", "Logout": "लॉग आउट"
            },
            "Dashboard": {
                "HealthScore": "आरोग्य स्कोअर", "Metrics": "आरोग्य मेट्रिक्स",
                "RecDiet": "शिफारस केलेला आहार", "RecWork": "व्यायाम योजना", "AIReason": "AI कारण",
                "Title": "डॅशबोर्ड", "Subtitle": "पुन्हा स्वागत आहे! नवीन विश्लेषण सुरू करा किंवा इतिहास पहा.",
                "NewAnalysisCardTitle": "नवीन विश्लेषण", "NewAnalysisCardDesc": "AI-समर्थित अंतर्दृष्टीसाठी तुमचे रक्त तपासणी पॅरामीटर्स प्रविष्ट करा",
                "HistoryCardTitle": "इतिहास पहा", "HistoryCardDesc": "मागील अहवाल ब्राउझ करा आणि प्रगती ट्रॅक करा",
                "StartBtn": "नवीन विश्लेषण सुरू करा",
                "Generating": "व्युत्पन्न करत आहे...", "ExportPDF": "PDF निर्यात करा",
                "AIPred": "AI अंदाज", "NoDiet": "आहार शिफारसी नाहीत.", "NoWork": "व्यायाम योजना नाहीत.",
                "DailyGoals": "दैनिक उद्दिष्टे", "CalTarget": "कॅलरी लक्ष्य", "WaterIn": "पाण्याचे सेवन", "ExMins": "व्यायाम मिनिटे"
            },
            "Settings": {
                "Title": "सेटिंग्ज", "Subtitle": "तुमची प्राधान्ये आणि गोपनीयता व्यवस्थापित करा",
                "Preferences": "प्राधान्ये", "EmailNotifs": "ईमेल सूचना", "EmailDesc": "तुमच्या आरोग्य अहवालांबद्दल अद्यतने मिळवा",
                "DarkMode": "डार्क मोड", "DarkDesc": "लाइट आणि डार्क थीम्स दरम्यान स्विच करा",
                "WeeklyReports": "साप्ताहिक अहवाल", "WeeklyDesc": "तुमच्या आरोग्य ट्रेंडचा साप्ताहिक सारांश मिळवा",
                "Language": "भाषा", "LangDesc": "तुमची पसंतीची भाषा निवडा",
                "Privacy": "गोपनीयता आणि डेटा", "PrivacyDesc": "तुमचा सर्व विश्लेषण इतिहास कायमचा हटवा. ही कृती पूर्ववत केली जाऊ शकत नाही.",
                "DeleteBtn": "इतिहास हटवा", "About": "बद्दल", "Version": "आवृत्ती", "BuiltBy": "द्वारे निर्मित",
                "DeleteTitle": "सर्व इतिहास हटवायचा?",
                "DeleteConfirm": "हे तुमचे सर्व मागील विश्लेषण रेकॉर्ड कायमचे काढून टाकेल. ही कृती पूर्ववत केली जाऊ शकत नाही.",
                "Cancel": "रद्द करा", "DeleteAll": "सर्व हटवा"
            },
            "Profile": {
                "Title": "प्रोफाइल", "Subtitle": "तुमची वैयक्तिक आणि वैद्यकीय माहिती",
                "Age": "वय", "EditPhoto": "फोटो संपादित करा", "MedConstants": "वैद्यकीय स्थिरांक",
                "Height": "उंची", "Weight": "वजन", "BloodType": "रक्तगट", "Allergies": "ऍलर्जी",
                "Phone": "फोन", "Location": "स्थान", "MedConditions": "वैद्यकीय स्थिती",
                "SaveChanges": "बदल जतन करा", "Saving": "जतन करत आहे...", "Saved": "जतन झाले!"
            },
            "Auth": {
                "Welcome": "पुन्हा स्वागत आहे", "SignInDesc": "तुमच्या आरोग्य डॅशबोर्डवर प्रवेश करण्यासाठी साइन इन करा",
                "ContinueGoogle": "Google सह सुरू ठेवा", "OrEmail": "किंवा ईमेलसह सुरू ठेवा",
                "Email": "ईमेल", "Password": "पासवर्ड", "ForgotPassword": "पासवर्ड विसरलात?",
                "SignInBtn": "साइन इन करा", "NoAccount": "खाते नाही?", "SignUpLink": "साइन अप करा",
                "CreateAccount": "खाते तयार करा", "SignUpDesc": "तुमचा आरोग्य प्रवास सुरू करा",
                "FullName": "पूर्ण नाव", "CreateBtn": "खाते तयार करा", "HaveAccount": "आधीपासून खाते आहे का?",
                "ResetPwd": "पासवर्ड रीसेट करा", "ResetDesc": "तुमचा ईमेल प्रविष्ट करा आणि आम्ही तुम्हाला रीसेट लिंक पाठवू.",
                "CheckInbox": "तुमचा इनबॉक्स तपासा", "SentLinkTo": "आम्ही रीसेट लिंक पाठवली आहे",
                "ClickLink": "नवीन पासवर्ड तयार करण्यासाठी कृपया ईमेलमधील लिंकवर क्लिक करा.",
                "BackToSignIn": "साइन इन वर परत जा", "SendReset": "रीसेट लिंक पाठवा",
                "Quote": "तुमचे आरोग्य, AI द्वारे डिकोड केलेले.",
                "QuoteDesc": "गुंतागुंतीच्या रक्त चाचणी निकालांना कृती करण्यायोग्य, वैयक्तिकृत आरोग्य योजनांमध्ये बदला.",
                "IllustrationAlt": "DNA हेलिक्स वैद्यकीय चित्रण",
                "Errors": {
                    "UserNotFound": "या ईमेलसह कोणतेही खाते सापडले नाही.",
                    "WrongPassword": "चुकीचा पासवर्ड. कृपया पुन्हा प्रयत्न करा.",
                    "InvalidCred": "अवैध ईमेल किंवा पासवर्ड.",
                    "TooMany": "खूप जास्त प्रयत्न. कृपया नंतर पुन्हा प्रयत्न करा.",
                    "Cancelled": "साइन-इन रद्द केले गेले.",
                    "Network": "नेटवर्क त्रुटी. तुमचे कनेक्शन तपासा.",
                    "InvalidEmail": "कृपया वैध ईमेल पत्ता प्रविष्ट करा.",
                    "EmailInUse": "या ईमेलसह खाते आधीपासूनच अस्तित्वात आहे.",
                    "WeakPassword": "पासवर्ड किमान 6 अक्षरांचा असावा.",
                    "NameRequired": "कृपया तुमचे नाव प्रविष्ट करा",
                    "Default": "प्रमाणीकरण अयशस्वी. कृपया पुन्हा प्रयत्न करा."
                }
            },
            "HistoryPage": {
                "Title": "इतिहास", "Subtitle": "तुमची मागील रक्त तपासणी विश्लेषणे",
                "NewBtn": "नवीन विश्लेषण", "Loading": "तुमचा इतिहास लोड होत आहे...",
                "NoAnalyses": "अद्याप कोणतेही विश्लेषण नाही", "NoAnalysesDesc": "निकाल पाहण्यासाठी तुमचे पहिले रक्त तपासणी विश्लेषण सुरू करा.",
                "StartBtn": "विश्लेषण सुरू करा", "ColDate": "तारीख", "ColScore": "आरोग्य स्कोअर", "ColRisk": "जोखिम घटक", "ColAction": "कृती", "ViewBtn": "पहा"
            },
            "Loader": {
                "Analyzing": "तुमच्या डेटाचे विश्लेषण करत आहे...", "Processing": "आमचे एआय तुमचे रक्त मापदंड प्रक्रिया करत आहे",
                "Step1": "रक्त मापदंड वाचणे", "Step2": "आरोग्य डेटाबेससह तपासणे", "Step3": "वैयक्तिक योजना तयार करणे"
            },
            "Landing": {
                "SignIn": "साइन इन", "GetStarted": "सुरू करा", "LearnMore": "अधिक जाणून घ्या",
                "Tagline": "एआय-चालित आरोग्य प्लॅटफॉर्म", "HeroTitle1": "तुमचे आरोग्य, ", "HeroTitle2": "एआय द्वारे उलगडलेले.",
                "HeroSubtitle": "तुमच्या रक्तातील बायोमार्कर्सवर आधारित वैयक्तिक आहार आणि व्यायाम योजना.",
                "FeaturesTitle": "तुम्हाला हवे असलेले सर्व काही", "FeaturesSubtitle": "अत्याधुनिक एआय द्वारे समर्थित सर्वसमावेशक आरोग्य बुद्धिमत्ता.",
                "HowTitle": "हे कसे कार्य करते", "HowSubtitle": "कृती करण्यायोग्य आरोग्य अंतर्दष्टीसाठी तीन सोप्या पायऱ्या.",
                "F1Title": "स्मार्ट डायग्नोस्टिक्स", "F1Desc": "आरोग्य नमुने आणि संभाव्य जोखीम ओळखण्यासाठी तुमच्या रक्त बायोमार्कर्सचे एआय-चालित विश्लेषण.",
                "F2Title": "DASH आहार योजना", "F2Desc": "इष्टतम आरोग्यासाठी DASH फ्रेमवर्कशी संरेखित वैयक्तिक आहार शिफारसी.",
                "F3Title": "जोखीम स्तरीकरण", "F3Desc": "तुमच्या अद्वितीय बायोमार्कर प्रोफाइलवर आधारित आरोग्य जोखमींची लवकर ओळख आणि वर्गीकरण.",
                "S1Title": "इनपुट", "S1Desc": "तुमचे रक्त तपासणी मापदंड प्रविष्ट करा",
                "S2Title": "एआय विश्लेषण", "S2Desc": "आमचे मॉडेल तुमच्या डेटावर प्रक्रिया करते",
                "S3Title": "निकाल", "S3Desc": "तुमची वैयक्तिक आरोग्य योजना मिळवा",
                "Footer": "सर्व हक्क राखीव."
            },
            "HealthData": {
                "Radar": { "Hb": "हिमोग्लोबिन", "Gluc": "ग्लूकोज", "Chol": "कोलेस्ट्रॉल", "BP": "रक्तदाब", "BMI": "बीएमआय" },
                "Risks": { "None": "काही नाही", "HighBP": "उच्च रक्तदाब", "Anemia": "अशक्तपणा", "Diabetes": "मधुमेह", "Hypertension": "हायपरटेंशन", "Obesity": "लठ्ठपणा", "VitD": "व्हिटॅमिन डी ची कमतरता", "Chol": "उच्च कोलेस्ट्रॉल" },
                "Units": { "kcal": "किलो कॅलरी", "glasses": "ग्लास", "min": "मिनिट", "kg": "किलो", "cm": "सॅमी" },
                "Diet": {
                    "Balanced": { "title": "संतुलित आहार", "desc": "समग्र आरोग्य राखण्यासाठी प्रथिने, कर्बोदके आणि चरबी यांचे संतुलित मिश्रण." },
                    "CalciumVitD": { "title": "कॅल्शियम आणि व्हिटॅमिन डी", "desc": "हाडांच्या मजबुतीसाठी दुग्धजन्य पदार्थ, पालेभाज्या आणि फोर्टिफाइड पदार्थांना प्राधान्य." },
                    "CalorieDeficit": { "title": "कॅलरी तूट", "desc": "निरोगी आणि शाश्वत वजन कमी करण्यासाठी नियंत्रित कॅलरी सेवन." },
                    "DASH": { "title": "DASH-आहार", "desc": "उच्च रक्तदाब रोखण्यासाठी आहार दृष्टिकोन - फळे, भाज्या और कमी सोडियमयुक्त पदार्थांनी समृद्ध." },
                    "Folate": { "title": "फोलेट आणि प्रसवपूर्व जीवनसत्त्वे", "desc": "गर्भाच्या विकासासाठी महत्त्वाचे; यात पालेभाज्या आणि फोर्टिफाइड धान्यांचा समावेश आहे." },
                    "GestationalLowGI": { "title": "गर्भावस्थेतील कमी जीआय आहार", "desc": "गर्भावस्थेत रक्तातील साखर नियंत्रित करण्यासाठी कमी ग्लायसेमिक इंडेक्स असलेले जटिल कर्बोदके." },
                    "HighIronVitC": { "title": "उच्च लोह आणि व्हिटॅमिन सी", "desc": "लोहाचे शोषण वाढवण्यासाठी व्हिटॅमिन सी सह लोहयुक्त पदार्थ." },
                    "HydrationProtein": { "title": "हायड्रेशन + उच्च प्रथिने", "desc": "गर्भाच्या विकासासाठी आणि द्रव संतुलनासाठी पाणी आणि लीन प्रथिनांवर भर." },
                    "IronRich": { "title": "लोहयुक्त", "desc": "हिमोग्लोबिनची पातळी वाढवण्यासाठी पालक, कडधान्ये आणि लीन मीटचा समावेश." },
                    "LowFat": { "title": "कमी चरबीयुक्त", "desc": "कोलेस्ट्रॉल आणि हृदयाच्या आरोग्यासाठी संपृक्त चरबी मर्यादित करते." },
                    "LowSugar": { "title": "कमी साखर", "desc": "ग्लूकोज आणि ऊर्जेची पातळी व्यवस्थापित करण्यासाठी प्रक्रिया केलेली साखर कमी करते." },
                    "PrenatalIron": { "title": "प्रसवपूर्व लोहयुक्त", "desc": "मातृ अशक्तपणा टाळण्यासाठी गर्भधारणेसाठी विशेष लोहयुक्त पोषण." },
                    "Diabetic": { "title": "मधुमेह आहार (कमी जीआय)", "desc": "रक्तातील साखरेच्या कडक नियंत्रणासाठी अत्यंत कमी ग्लायसेमिक इंडेक्स असलेले पदार्थ." },
                    "Thyroid": { "title": "थायरॉईड सपोर्ट कॅलरी तूट", "desc": "थायरॉईड कार्याला मदत करण्यासाठी सेलेनियम आणि आयोडीनसह कॅलरी नियंत्रित आहार." },
                    "VitDRich": { "title": "व्हिटॅमिन डी युक्त", "desc": "व्हिटॅमिन डीची पातळी वाढवण्यासाठी फॅटी मासे, अंड्यातील पिवळा बलक आणि फोर्टिफाइड पदार्थांचा समावेश." }
                },
                "Workout": {
                    "Cycling": { "title": "सायकलिंग", "desc": "पायांची ताकद आणि हृदय सहनशक्ती वाढवणारे आउटडोअर कार्डिओ." },
                    "GentleWalk": { "title": "हळू चालणे", "desc": "रिकव्हरीचे दिवस किंवा हालचाल सुधारण्यासाठी संथ गतीने चालणे." },
                    "HIIT": { "title": "जिम/HIIT", "desc": "चयापचय वाढवण्यासाठी आणि चरबी जाळण्यासाठी उच्च तीव्रतेचे प्रशिक्षण." },
                    "LightWalk": { "title": "हल्के चालणे", "desc": "सुरुवातीच्या लोकांसाठी किंवा सक्रिय रिकव्हरी म्हणून छोटी, सौम्य चाल." },
                    "LightYoga": { "title": "हल्का योग", "desc": "विश्रांती आणि लवचिकतेसाठी सौम्य मुद्रा आणि श्वासोच्छवासाचे व्यायाम." },
                    "MedClearance": { "title": "वैद्यकीय मंजुरी आवश्यक", "desc": "उच्च रक्तदाब आढळला. व्यायाम सुरू करण्यापूर्वी डॉक्टरांचा सल्ला घ्या." },
                    "Pelvic": { "title": "पेल्विक फ्लोर/हालचाल", "desc": "पेल्विक फ्लोर मजबूत करण्यासाठी आणि हालचाल सुधारण्यासाठी लक्ष्यित व्यायाम." },
                    "PrenatalYoga": { "title": "प्रसवपूर्व योग", "desc": "पाठदुखीपासून आराम आणि प्रसूतीची तयारी करण्यासाठी गर्भधारणा-सुरक्षित योग." },
                    "Resistance": { "title": "रेझिस्टन्स बँड प्रशिक्षण", "desc": "स्नायू तयार करण्यासाठी बँडचा वापर करून कमी प्रभावाचे शक्ती प्रशिक्षण." },
                    "Running": { "title": "धावणे", "desc": "हृदयाचे आरोग्य आणि सहनशक्ती सुधारण्यासाठी सतत कार्डिओ." },
                    "Stationary": { "title": "स्थिर सायकलिंग", "desc": "सांध्यांवर ताण न देता फिटनेस राखण्यासाठी कमी प्रभावाची इनडोअर सायकलिंग." },
                    "Swimming": { "title": "पोहायला जाणे", "desc": "सांध्यांसाठी सोपे आणि हृदयासाठी उत्कृष्ट असा संपूर्ण शरीराचा व्यायाम." },
                    "WaterAerobics": { "title": "वॉटर एरोबिक्स", "desc": "पेल्विक दाब कमी करण्यासाठी प्रतिरोध आणि उछाल देणारे पाण्यातील व्यायाम." },
                    "YogaStretch": { "title": "योग आणि स्ट्रेचिंग", "desc": "लवचिकता आणि तणावमुक्तीसाठी स्ट्रेचिंगसह योग मुद्रा." }
                }
            },
            "Input": {
                "Personal": "वैयक्तिक माहिती", "Age": "वय", "Weight": "वजन", "Height": "उंची",
                "KG": "किलो", "CM": "सें.मी.",
                "BloodData": "रक्त प्रवाह", "Lifestyle": "जीवनशैली",
                "Gender": "लिंग", "Male": "पुरुष", "Female": "स्त्री", "Diet": "आहार प्राधान्य", "Veg": "शाकाहारी", "NonVeg": "मांसाहारी",
                "Pregnant": "तुम्ही गरोदर आहात का?", "Trimester": "त्रैमासिक", "Asthma": "दम्याचा इतिहास",
                "BloodTitle": "रक्त तपासणी पॅरामीटर्स", "BloodDesc": "तुमची अलीकडील रक्त तपासणी मूल्ये प्रविष्ट करा",
                "BP": "रक्तदाब", "Sys": "सिस्टोलिक (ap_hi)", "Dia": "डायस्टोलिक (ap_lo)",
                "Glucose": "ग्लुकोज (mg/dL)", "Chol": "एकूण कोलेस्टेरॉल (mg/dL)",
                "Nutri": "पोषण प्रोफाइल", "Hb": "हिमोग्लोबिन (g/dL)", "Iron": "लोह (mcg/dL)", "VitD": "व्हिटॅमिन डी (ng/mL)",
                "AddMarkers": "अतिरिक्त मार्कर", "HbA1c": "HbA1c (%)", "TSH": "TSH (mIU/L)",
                "LifeTitle": "जीवनशैली आणि सवयी", "LifeDesc": "आम्हाला तुमच्या दैनंदिन क्रियाकलापाबद्दल सांगा",
                "Activity": "क्रियाकलाप पातळी",
                "Sedentary": "बैठे", "SedentaryDesc": "व्यायाम नाही",
                "Light": "किंचित सक्रिय", "LightDesc": "हलका व्यायाम आठवड्यातून १-३ दिवस",
                "Moderate": "मध्यम सक्रिय", "ModerateDesc": "मध्यम व्यायाम आठवड्यातून ३-५ दिवस",
                "Active": "सक्रिय", "ActiveDesc": "कठण व्यायाम आठवड्यातून ६-७ दिवस",
                "VeryActive": "अत्यंत सक्रिय", "VeryActiveDesc": "तीव्र व्यायाम आणि शारीरिक काम",
                "MedHistory": "वैद्यकीय इतिहास",
                "SelectTrimester": "त्रैमासिक निवडा",
                "Tri1": "पहिली तिमाही (आठवडे १-१२)",
                "Tri2": "दुसरी तिमाही (आठवडे १३-२६)",
                "Tri3": "तिसरी तिमाही (आठवडे २७-४०)",
                "Back": "मागे", "Next": "पुढील पायरी", "Analyze": "डेटाचे विश्लेषण करा",
                "DisclaimerTitle": "वैद्यकीय अस्वीकरण", "DisclaimerText": "व्हायटॅलिटी हा एआय-सक्षम आरोग्य प्लॅटफॉर्म आहे जो तुम्ही दिलेल्या डेटावर आधारित अंतर्दृष्टी देण्यासाठी डिझाइन केला आहे. हा व्यावसायिक वैद्यकीय सल्ल्याचा पर्याय नाही.",
                "Understand": "मला समजले आहे आणि पुढे जायचे आहे"
            }
        }
    },
    ta: {
        translation: {
            "Sidebar": {
                "Home": "முகப்பு", "Dashboard": "டாஷ்போர்டு", "NewAnalysis": "புதிய பகுப்பாய்வு",
                "History": "வரலாறு", "Profile": "சுயவிவரம்", "Settings": "அமைப்புகள்", "Logout": "வெளியேறு"
            },
            "Dashboard": {
                "HealthScore": "சுகாதார மதிப்பெண்", "Metrics": "சுகாதார அளவீடுகள்",
                "RecDiet": "பரிந்துரைக்கப்பட்ட உணவு", "RecWork": "உடற்பயிற்சி திட்டம்", "AIReason": "AI காரணம்",
                "Title": "டாஷ்போர்டு", "Subtitle": "மீண்டும் வருக! புதிய பகுப்பாய்வை தொடங்குங்கள் அல்லது உங்கள் வரலாற்றைப் பாருங்கள்.",
                "NewAnalysisCardTitle": "புதிய பகுப்பாய்வு", "NewAnalysisCardDesc": "AI நுண்ணறிவுக்காக உங்கள் இரத்த சோதனை அளவுருக்களை உள்ளிடவும்",
                "HistoryCardTitle": "வரலாற்றைக் காண்", "HistoryCardDesc": "உங்கள் கடந்த அறிக்கைகளை ஆராய்ந்து முன்னேற்றத்தைக் கண்காணிக்கவும்",
                "StartBtn": "புதிய பகுப்பாய்வை தொடங்கு",
                "Generating": "உருவாக்குகிறது...", "ExportPDF": "PDF ஆக ஏற்றுமதி செய்",
                "AIPred": "AI கணிப்பு", "NoDiet": "உணவுப் பரிந்துரைகள் இல்லை.", "NoWork": "உடற்பயிற்சி திட்டங்கள் இல்லை.",
                "DailyGoals": "தினவரி இலக்குகள்", "CalTarget": "கலோரி இலக்கு", "WaterIn": "நீர் உட்கொள்ளல்", "ExMins": "உடற்பயிற்சி நிமிடங்கள்"
            },
            "Settings": {
                "Title": "அமைப்புகள்", "Subtitle": "உங்கள் விருப்பங்களையும் தனியுரிமையையும் நிர்வகிக்கவும்",
                "Preferences": "விருப்பங்கள்", "EmailNotifs": "மின்னஞ்சல் அறிவிப்புகள்", "EmailDesc": "உங்கள் சுகாதார அறிக்கைகளைப் பற்றிய புதுப்பிப்புகளைப் பெறுக",
                "DarkMode": "இருண்ட முறை", "DarkDesc": "ஒளி மற்றும் இருண்ட தீம்களுக்கு இடையே மாறவும்",
                "WeeklyReports": "வாராந்திர அறிக்கைகள்", "WeeklyDesc": "உங்கள் சுகாதாரப் போக்குகளின் வாராந்திர சுருக்கத்தைப் பெறுக",
                "Language": "மொழி", "LangDesc": "உங்களுக்கு விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும்",
                "Privacy": "தனியுரிமை", "PrivacyDesc": "உங்கள் அனைத்து பகுப்பாய்வு வரலாற்றையும் நிரந்தரமாக நீக்கவும். இந்த செயலை செயல்தவிர் செய்ய முடியாது.",
                "DeleteBtn": "வரலாற்றை நீக்கு", "About": "பற்றி", "Version": "பதிப்பு", "BuiltBy": "உருவாக்கியவர்",
                "DeleteTitle": "அனைத்து வரலாற்றையும் நீக்கவா?",
                "DeleteConfirm": "இது உங்கள் கடந்தகால பகுப்பாய்வு பதிவுகள் அனைத்தையும் நிரந்தரமாக அகற்றும். இந்தச் செயலைத் தவிர்க்க முடியாது.",
                "Cancel": "ரத்துசெய்", "DeleteAll": "அனைத்தையும் நீக்கு"
            },
            "Profile": {
                "Title": "சுயவிவரம்", "Subtitle": "உங்கள் தனிப்பட்ட மற்றும் மருத்துவ தகவல்கள்",
                "Age": "வயது", "EditPhoto": "புகைப்படத்தை திருத்து", "MedConstants": "மருத்துவ மாறிலிகள்",
                "Height": "உயரம்", "Weight": "எடை", "BloodType": "இரத்த வகை", "Allergies": "ஒவ்வாமைகள்",
                "Phone": "தொலைபேசி", "Location": "இடம்", "MedConditions": "மருத்துவ நிலைகள்",
                "SaveChanges": "மாற்றங்களைச் சேமி", "Saving": "சேமிக்கிறது...", "Saved": "சேமிக்கப்பட்டது!"
            },
            "Auth": {
                "Welcome": "மீண்டும் வருக", "SignInDesc": "உங்கள் சுகாதார டாஷ்போர்டை அணுக உள்நுழைக",
                "ContinueGoogle": "Google உடன் தொடரவும்", "OrEmail": "அல்லது மின்னஞ்சலுடன் தொடரவும்",
                "Email": "மின்னஞ்சல்", "Password": "கடவுச்சொல்", "ForgotPassword": "கடவுச்சொல்லை மறந்துவிட்டீர்களா?",
                "SignInBtn": "உள்நுழைக", "NoAccount": "கணக்கு இல்லையா?", "SignUpLink": "பதிவு செய்க",
                "CreateAccount": "கணக்கை உருவாக்கு", "SignUpDesc": "உங்கள் சுகாதார பயணத்தை தொடங்குங்கள்",
                "FullName": "முழு பெயர்", "CreateBtn": "கணக்கை உருவாக்கு", "HaveAccount": "ஏற்கனவே கணக்கு உள்ளதா?",
                "ResetPwd": "கடவுச்சொல்லை மீட்டமை", "ResetDesc": "உங்கள் மின்னஞ்சலை உள்ளிடவும்; நாங்கள் கடவுச்சொல் மீட்டமைப்பு இணைப்பை அனுப்புவோம்.",
                "CheckInbox": "உங்கள் இன்பாக்ஸைச் சரிபார்க்கவும்", "SentLinkTo": "கடவுச்சொல் மீட்டமைப்பு இணைப்பை அனுப்பியுள்ளோம்",
                "ClickLink": "புதிய கடவுச்சொல்லை உருவாக்கு மின்னஞ்சலில் உள்ள இணைப்பை கிளிக் செய்யவும்.",
                "BackToSignIn": "உள்நுழைவிற்குத் திரும்பு", "SendReset": "மீட்டமைப்பு இணைப்பை அனுப்பு",
                "Quote": "உங்கள் ஆரோக்கியம், AI ஆல் டிகோட் செய்யப்பட்டது.",
                "QuoteDesc": "சிக்கலான இரத்தப் பரிசோதனை முடிவுகளைச் செயலாக்கக்கூடிய, தனிப்பயனாக்கப்பட்ட சுகாதாரத் திட்டங்களாக மாற்றவும்.",
                "IllustrationAlt": "டிஎன்ஏ ஹெலிக்ஸ் மருத்துவ விளக்கம்",
                "Errors": {
                    "UserNotFound": "இந்த மின்னஞ்சலில் கணக்கு எதுவும் இல்லை.",
                    "WrongPassword": "தவறான கடவுச்சொல். மீண்டும் முயற்சிக்கவும்.",
                    "InvalidCred": "தவறான மின்னஞ்சல் அல்லது கடவுச்சொல்.",
                    "TooMany": "அதிகப்படியான முயற்சிகள். சிறிது நேரத்திற்குப் பிறகு மீண்டும் முயற்சிக்கவும்.",
                    "Cancelled": "உள்நுழைவு ரத்து செய்யப்பட்டது.",
                    "Network": "பிணைய பிழை. உங்கள் இணைப்பைச் சரிபார்க்கவும்.",
                    "InvalidEmail": "சரியான மின்னஞ்சல் முகவரியை உள்ளிடவும்.",
                    "EmailInUse": "இந்த மின்னஞ்சலில் கணக்கு ஏற்கனவே உள்ளது.",
                    "WeakPassword": "கடவுச்சொல் குறைந்தது 6 எழுத்துகளாக இருக்க வேண்டும்.",
                    "NameRequired": "உங்கள் பெயரை உள்ளிடவும்",
                    "Default": "அங்கீகாரம் தோல்வியடைந்தது. மீண்டும் முயற்சிக்கவும்."
                }
            },
            "HistoryPage": {
                "Title": "வரலாறு", "Subtitle": "உங்கள் கடந்தகால இரத்த பரிசோதனை பகுப்பாய்வுகள்",
                "NewBtn": "புதிய பகுப்பாய்வு", "Loading": "உங்கள் வரலாறு ஏற்றப்படுகிறது...",
                "NoAnalyses": "இன்னும் பகுப்பாய்வுகள் இல்லை", "NoAnalysesDesc": "முடிவுகளைக் காண உங்கள் முதல் இரத்தப் பரிசோதனை பகுப்பாய்வைத் தொடங்குங்கள்.",
                "StartBtn": "பகுப்பாய்வைத் தொடங்கு", "ColDate": "தேதி", "ColScore": "சுகாதார மதிப்பெண்", "ColRisk": "ஆபத்து காரணி", "ColAction": "நடவடிக்கை", "ViewBtn": "பார்"
            },
            "Loader": {
                "Analyzing": "உங்கள் தரவை பகுப்பாய்வு செய்கிறது...", "Processing": "எங்கள் AI உங்கள் இரத்த அளவுருக்களை செயலாக்குகிறது",
                "Step1": "இரத்த அளவுருக்களைப் படித்தல்", "Step2": "சுகாதார தரவுத்தளத்துடன் சரிபார்த்தல்", "Step3": "தனிப்பயனாக்கப்பட்ட திட்டத்தை உருவாக்குதல்"
            },
            "Landing": {
                "SignIn": "உள்நுழைக", "GetStarted": "தொடங்குங்கள்", "LearnMore": "மேலும் அறிய",
                "Tagline": "AI-ஆல் இயங்கும் சுகாதார தளம்", "HeroTitle1": "உங்கள் ஆரோக்கியம், ", "HeroTitle2": "AI-ஆல் விளக்கப்பட்டது.",
                "HeroSubtitle": "உங்கள் இரத்த பயோமார்க்கர்களை அடிப்படையாகக் கொண்ட தனிப்பயனாக்கப்பட்ட உணவு மற்றும் உடற்பயிற்சி திட்டங்கள்.",
                "FeaturesTitle": "உங்களுக்கு தேவையான அனைத்தும்", "FeaturesSubtitle": "அதிநவீன AI மூலம் இயங்கும் விரிவான சுகாதார நுண்ணறிவு.",
                "HowTitle": "இது எப்படி வேலை செய்கிறது", "HowSubtitle": "செயல்படக்கூடிய சுகாதார நுண்ணறிவுக்கான மூன்று எளிய படிகள்.",
                "F1Title": "ஸ்மார்ட் நோய் கண்டறிதல்", "F1Desc": "சுகாதார வடிவங்கள் மற்றும் சாத்தியமான அபாயங்களைக் கண்டறிய உங்கள் இரத்த பயோமார்க்கர்களின் AI-ஆல் இயங்கும் பகுப்பாய்வு.",
                "F2Title": "DASH உணவுத் திட்டங்கள்", "F2Desc": "உகந்த ஆரோக்கியத்திற்காக DASH கட்டமைப்போடு இணைந்த தனிப்பயனாக்கப்பட்ட உணவுப் பரிந்துரைகள்.",
                "F3Title": "ஆபத்து வகைப்பாடு", "F3Desc": "உங்கள் தனித்துவமான பயோமார்க்கர் சுயவிவரத்தின் அடிப்படையில் சுகாதார அபாயங்களை முன்கூட்டியே கண்டறிந்து வகைப்படுத்துதல்.",
                "S1Title": "உள்ளீடு", "S1Desc": "உங்கள் இரத்த பரிசோதனை அளவுருக்களை உள்ளிடவும்",
                "S2Title": "AI பகுப்பாய்வு", "S2Desc": "எங்கள் மாதிரி உங்கள் தரவைச் செயலாக்குகிறது",
                "S3Title": "முடிவுகள்", "S3Desc": "உங்கள் தனிப்பயனாக்கப்பட்ட சுகாதாரத் திட்டத்தைப் பெறுங்கள்",
                "Footer": "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை."
            },
            "HealthData": {
                "Radar": { "Hb": "ஹீமோகுளோபின்", "Gluc": "குளுக்கோஸ்", "Chol": "கொலஸ்ட்ரால்", "BP": "இரத்த அழுத்தம்", "BMI": "பிஎம்ஐ" },
                "Risks": { "None": "எதுவுமில்லை", "HighBP": "உயர் இரத்த அழுத்தம்", "Anemia": "இரத்த சோகை", "Diabetes": "நீரிழிவு நோய்", "Hypertension": "உயர் இரத்த அழுத்தம்", "Obesity": "உடல் பருமன்", "VitD": "வைட்டமின் டி குறைபாடு", "Chol": "அதிக கொலஸ்ட்ரால்" },
                "Units": { "kcal": "கிலோ கலோரி", "glasses": "கிளாஸ்", "min": "நிமிடம்", "kg": "கிலோ", "cm": "செ.மீ" },
                "Diet": {
                    "Balanced": { "title": "சீரான உணவு", "desc": "ஒட்டுமொத்த ஆரோக்கியத்தைப் பராமரிக்க புரதங்கள், கார்போஹைட்ரேட்டுகள் மற்றும் கொழுப்புகளின் நன்கு சமமான கலவை." },
                    "CalciumVitD": { "title": "கால்சியம் மற்றும் வைண்டமின் டி", "desc": "வலுவான எலும்புகளுக்கு பால் பொருட்கள், இலை காய்கறிகள் மற்றும் பலப்படுத்தப்பட்ட உணவுகளுக்கு முன்னுரிமை அளிக்கிறது." },
                    "CalorieDeficit": { "title": "கலோரி பற்றாக்குறை", "desc": "ஆரோக்கியமான மற்றும் நிலையான எடை இழப்பை ஆதரிக்க கட்டுப்படுத்தப்பட்ட கலோரி உட்கொள்ளல்." },
                    "DASH": { "title": "DASH-உணவு", "desc": "உயர் இரத்த அழுத்தத்தைத் தடுப்பதற்கான உணவு முறைகள் - பழங்கள், காய்கறிகள் மற்றும் குறைந்த சோடியம் உணவுகள் நிறைந்தது." },
                    "Folate": { "title": "ஃபோலேட் மற்றும் மகப்பேறுக்கு முந்திய வைட்டமின்கள்", "desc": "கரு வளர்ச்சிக்கு முக்கியமானது; இதில் இலை காயறிகள் மற்றும் பலப்படுத்தப்பட்ட தானியங்கள் அடங்கும்." },
                    "GestationalLowGI": { "title": "கர்ப்பகால குறைந்த ஜிஐ உணவு", "desc": "கர்ப்ப காலத்தில் இரத்த சர்க்கரை அளவை கட்டுப்படுத்த குறைந்த கிளைசெமிக் குறியீடு கொண்ட சிக்கலான கார்ப்ஸ்." },
                    "HighIronVitC": { "title": "அதிக இரும்பு மற்றும் வைட்டமின் சி", "desc": "இரும்பு உறிஞ்சுதலை அதிகரிக்க வைட்டமின் சி உடன் இரும்புச்சத்து நிறைந்த உணவுகள்." },
                    "HydrationProtein": { "title": "நீரேற்றம் + அதிக புரதம்", "desc": "கரு வளர்ச்சி மற்றும் திரவ சமநிலையை ஆதரிக்க நீர் உட்கொள்ளல் மற்றும் மெலிந்த புரதத்தை வலியுறுத்துகிறது." },
                    "IronRich": { "title": "இரும்புச்சத்து நிறைந்தது", "desc": "ஹீமோகுளோபின் அளவை அதிகரிக்க கீரை, பருப்பு வகைகள் மற்றும் மெலிந்த இறைச்சிகள் அடங்கும்." },
                    "LowFat": { "title": "குறைந்த கொழுப்பு", "desc": "கொலஸ்ட்ரால் மற்றும் இதய ஆரோக்கியத்தை மேம்படுத்த நிறைவுற்ற கொழுப்புகளை வரம்பிடுகிறது." },
                    "LowSugar": { "title": "குறைந்த சர்க்கரை", "desc": "குளுக்கோஸ் மற்றும் ஆற்றல் அளவை நிர்வகிக்க உதவ சுத்திகரிக்கப்பட்ட சர்க்கரைகளைக் குறைக்கிறது." },
                    "PrenatalIron": { "title": "மகப்பேறுக்கு முந்தைய இரும்புச்சத்து", "desc": "தாய்வழி இரத்த சோகையைத் தடுக்க கர்ப்பத்திற்காக வடிவமைக்கப்பட்ட இரும்புச்சத்து நிறைந்த ஊட்டச்சத்து." },
                    "Diabetic": { "title": "நீரிழிவு உணவு (குறைந்த ஜிஐ)", "desc": "கடுமையான இரத்த சர்க்கரை கட்டுப்பாட்டிற்கு மிகக் குறைந்த கிளைசெமிக் குறியீடு உணவுகள்." },
                    "Thyroid": { "title": "தைராய்டு ஆதரவு கலோரி பற்றாக்குறை", "desc": "தைராய்டு செயல்பாட்டை ஆதரிக்க செலினியம் மற்றும் அயோடின் கொண்ட கலோரி கட்டுப்பாட்டு உணவு." },
                    "VitDRich": { "title": "வைட்டமின் டி நிறைந்தது", "desc": "வைட்டமின் டி அளவை உயர்த்த கொழுப்பு மீன், முட்டை மஞ்சள் கரு மற்றும் பலப்படுத்தப்பட்ட உணவுகள் அடங்கும்." }
                },
                "Workout": {
                    "Cycling": { "title": "சைக்கிள் ஓட்டுதல்", "desc": "கால் வலிமை மற்றும் இதயத் துடிப்பை உருவாக்கும் வெளிப்புற கார்டியோ." },
                    "GentleWalk": { "title": "மெதுவான நடை", "desc": "மீட்பு நாட்கள் அல்லது இயக்கம் மேம்பாட்டிற்கான எளிய வேக நடைபயிற்சி." },
                    "HIIT": { "title": "ஜிம்/HIIT", "desc": "வளர்சிதை மாற்றத்தை அதிகரிக்கவும் கொழுப்பை எரிக்கவும் உயர் தீவிர இடைவெளி பயிற்சி." },
                    "LightWalk": { "title": "லேசான நடைபயிற்சி", "desc": "ஆரம்பநிலையாளர்களுக்கு அல்லது செயலில் மீட்டெடுப்பிற்கு ஏற்ற குறுகிய, மென்மையான நடைகள்." },
                    "LightYoga": { "title": "எளிதான யோகா", "desc": "தளர்வு மற்றும் நெகிழ்வுத்தன்மைக்கான மென்மையான தோரணைகள் மற்றும் சுவாசப் பயிற்சிகள்." },
                    "MedClearance": { "title": "மருத்துவ அனுமதி தேவை", "desc": "உயர் இரத்த அழுத்தம் கண்டறியப்பட்டது. உடற்பயிற்சி தொடங்கும் முன் உங்கள் மருத்துவரை அணுகவும்." },
                    "Pelvic": { "title": "இடுப்புத் தரை/இயக்கம்", "desc": "இடுப்புத் தசையை வலுப்படுத்தவும் இயக்கத்தை மேம்படுத்தவும் இலக்கு வைக்கப்பட்ட பயிற்சிகள்." },
                    "PrenatalYoga": { "title": "மகப்பேறுக்கு முந்தைய யோகா", "desc": "முதுகு வலியைப் போக்கவும் பிரசவத்திற்குத் தயாராகவும் கர்ப்ப கால பாதுகாப்பான யோகா." },
                    "Resistance": { "title": "ரெசிஸ்டன்ஸ் பேண்ட் பயிற்சி", "desc": "தசையை பாதுகாப்பாக உருவாக்க பேண்டுகளைப் பயன்படுத்தி குறைந்த தாக்க வலிமைப் பயிற்சி." },
                    "Running": { "title": "ஓடுதல்", "desc": "இதய ஆரோக்கியம் மற்றும் சகிப்புத்தன்மையை மேம்படுத்த நீடித்த கார்டியோ." },
                    "Stationary": { "title": "நிலையான சைக்கிள் ஓட்டுதல்", "desc": "மூட்டு அழுத்தம் இல்லாமல் உடற்தகுதியை பராமரிக்க குறைந்த தாக்க உட்புற சைக்கிள் ஓட்டுதல்." },
                    "Swimming": { "title": "நீச்சல்", "desc": "மூட்டுகளுக்கு எளிதான மற்றும் இதயத்திற்கு சிறந்த முழு உடல் பயிற்சி." },
                    "WaterAerobics": { "title": "நீர் ஏரோபிக்ஸ்", "desc": "இடுப்பு அழுத்தத்தை குறைக்க எதிர்ப்பு மற்றும் மிதப்பு அளிக்கும் நீர் சார்ந்த பயிற்சிகள்." },
                    "YogaStretch": { "title": "யோகா மற்றும் நீட்சி", "desc": "நெகிழ்வுத்தன்மை மற்றும் மன அழுத்த நிவாரணத்திற்காக ஆழமான நீட்சியுடன் யோகா தோரணைகளை இணைக்கிறது." }
                }
            },
            "Input": {
                "Personal": "தனிப்பட்ட தகவல்", "Age": "வயது", "Weight": "உடல் எடை", "Height": "உயரம்",
                "KG": "கிலோ", "CM": "செ.மீ",
                "BloodData": "இரத்தத் தரவு", "Lifestyle": "வாழ்க்கை முறை",
                "Gender": "பாலினம்", "Male": "ஆண்", "Female": "பெண்", "Diet": "உணவு விருப்பம்", "Veg": "சைவம்", "NonVeg": "அசைவம்",
                "Pregnant": "நீங்கள் கர்ப்பமாக இருக்கிறீர்களா?", "Trimester": "கர்ப்பகால பருவம்", "Asthma": "ஆஸ்துமா வரலாறு",
                "BloodTitle": "இரத்தப் பரிசோதனை அளவுருக்கள்", "BloodDesc": "உங்கள் சமீபத்திய இரத்தப் பரிசோதனை மதிப்புகளை உள்ளிடவும்",
                "BP": "இரத்த அழுத்தம்", "Sys": "சிஸ்டாலிக் (ap_hi)", "Dia": "டயஸ்டாலிக் (ap_lo)",
                "Glucose": "குளுக்கோஸ் (mg/dL)", "Chol": "மொத்த கொலஸ்ட்ரால் (mg/dL)",
                "Nutri": "ஊட்டச்சத்து விவரக்குறிப்பு", "Hb": "ஹீமோகுளோபின் (g/dL)", "Iron": "இரும்பு (mcg/dL)", "VitD": "வைட்டமின் டி (ng/mL)",
                "AddMarkers": "கூடுதல் குறிகாட்டிகள்", "HbA1c": "HbA1c (%)", "TSH": "TSH (mIU/L)",
                "LifeTitle": "வாழ்க்கை முறை மற்றும் பழக்கவழக்கங்கள்", "LifeDesc": "உங்கள் தினசரி செயல்பாட்டைப் பற்றி எங்களிடம் கூறுங்கள்",
                "Activity": "செயல்பாட்டு நிலை",
                "Sedentary": "செயலற்ற", "SedentaryDesc": "உடற்பயிற்சி இல்லை",
                "Light": "குறைந்த செயல்பாடு", "LightDesc": "வாரம் 1-3 நாட்கள் லேசான உடற்பயிற்சி",
                "Moderate": "மிதமான செயல்பாடு", "ModerateDesc": "வாரம் 3-5 நாட்கள் மிதமான உடற்பயிற்சி",
                "Active": "சுறுசுறுப்பான", "ActiveDesc": "வாரம் 6-7 நாட்கள் கடினமான உடற்பயிற்சி",
                "VeryActive": "மிகவும் சுறுசுறுப்பான", "VeryActiveDesc": "தீவிர உடற்பயிற்சி மற்றும் உடல் உழைப்பு",
                "MedHistory": "மருத்துவ வரலாறு",
                "SelectTrimester": "பருவத்தைத் தேர்ந்தெடுக்கவும்",
                "Tri1": "1வது பருவம் (வாரங்கள் 1-12)",
                "Tri2": "2வது பருவம் (வாரங்கள் 13-26)",
                "Tri3": "3வது பருவம் (வாரங்கள் 27-40)",
                "Back": "பின் செல்", "Next": "அடுத்த படி", "Analyze": "தரவை பகுப்பாய்வு செய்க",
                "DisclaimerTitle": "மருத்துவ மறுப்பு", "DisclaimerText": "Vitality என்பது நீங்கள் வழங்கும் தரவுகளின் அடிப்படையில் நுண்ணறிவுகளை வழங்க வடிவமைக்கப்பட்ட AI-ஆல் இயங்கும் சுகாதார தளமாகும். இது தொழில்முறை மருத்துவ ஆலோசனைக்கு மாற்றாக அமையாது.",
                "Understand": "நான் புரிந்து கொண்டேன், தொடர விரும்புகிறேன்"
            }
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
