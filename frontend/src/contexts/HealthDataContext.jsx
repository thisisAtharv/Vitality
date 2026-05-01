import { createContext, useContext, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import i18n from "../i18n";

const API_URL = "http://localhost:5000";

// Transform user-friendly form data → 16 API-expected features
const transformToAPIPayload = (data) => {
    const bmi = data.weight / Math.pow(data.height / 100, 2);

    // Cholesterol mg/dL → categorical 1/2/3
    let cholesterolCat = 1;
    if (data.cholesterol >= 240) cholesterolCat = 3;
    else if (data.cholesterol >= 200) cholesterolCat = 2;

    // Glucose mg/dL → categorical 1/2/3
    let glucCat = 1;
    if (data.glucose >= 200) glucCat = 3;
    else if (data.glucose >= 140) glucCat = 2;

    return {
        age: data.age,
        gender: data.gender === "male" ? 1 : 2,
        bmi: parseFloat(bmi.toFixed(1)),
        ap_hi: data.systolicBP,
        ap_lo: data.diastolicBP,
        cholesterol: cholesterolCat,
        gluc: glucCat,
        active: data.activityLevel === "sedentary" ? 0 : 1,
        hemoglobin: data.hemoglobin,
        iron: data.iron,
        vitamin_d: data.vitaminD,
        is_pregnant: data.isPregnant ? 1 : 0,
        trimester: data.trimester,
        hba1c: data.hba1c,
        tsh: data.tsh,
        history_asthma: data.historyAsthma ? 1 : 0,
        diet_preference: data.dietPreference || "vegetarian",
    };
};

// Health score calculation (frontend-only)
const calculateHealthScore = (data) => {
    let score = 100;
    if (data.hemoglobin < 12 || data.hemoglobin > 17) score -= 15;
    else if (data.hemoglobin < 13 || data.hemoglobin > 16) score -= 5;
    if (data.glucose < 70 || data.glucose > 125) score -= 20;
    else if (data.glucose > 100) score -= 10;
    if (data.cholesterol > 240) score -= 25;
    else if (data.cholesterol > 200) score -= 10;
    if (data.systolicBP > 140 || data.diastolicBP > 90) score -= 15;
    else if (data.systolicBP > 130 || data.diastolicBP > 85) score -= 5;
    if (data.hba1c > 6.5) score -= 15;
    else if (data.hba1c > 5.7) score -= 5;
    return Math.max(0, Math.min(100, score));
};

const getKeyRisk = (data) => {
    if (data.cholesterol > 240) return "High Cholesterol";
    if (data.glucose > 125) return "High Glucose";
    if (data.hemoglobin < 12) return "Low Hemoglobin";
    if (data.hba1c > 6.5) return "High HbA1c";
    if (data.systolicBP > 140) return "High Blood Pressure";
    if (data.cholesterol > 200) return "Elevated Cholesterol";
    if (data.glucose > 100) return "Elevated Glucose";
    return "None";
};

const HealthDataContext = createContext(null);

// Mock initial history
const mockHistory = [
    {
        id: "1",
        date: "2026-01-15",
        data: { age: 30, weight: 72, height: 175, gender: "male", hemoglobin: 13.5, glucose: 110, cholesterol: 210, systolicBP: 130, diastolicBP: 85, iron: 90, vitaminD: 25, hba1c: 5.8, tsh: 2.5, activityLevel: "moderate", isPregnant: false, trimester: 0, historyAsthma: false },
        healthScore: 80,
        keyRisk: "Elevated Glucose",
        dietTags: ["Balanced"],
        exerciseTags: ["Gym/HIIT", "Running"],
    },
    {
        id: "2",
        date: "2025-11-20",
        data: { age: 30, weight: 74, height: 175, gender: "male", hemoglobin: 14, glucose: 95, cholesterol: 190, systolicBP: 118, diastolicBP: 78, iron: 110, vitaminD: 35, hba1c: 5.2, tsh: 2.0, activityLevel: "light", isPregnant: false, trimester: 0, historyAsthma: false },
        healthScore: 95,
        keyRisk: "None",
        dietTags: ["Balanced"],
        exerciseTags: ["Walking", "Yoga"],
    },
];

export const HealthDataProvider = ({ children }) => {
    const { user } = useAuth();
    const [currentAnalysis, setCurrentAnalysis] = useState(null);
    const [history, setHistory] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    const submitAnalysis = async (formData) => {
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const payload = {
                ...transformToAPIPayload(formData),
                user_id: user?.uid || "",
                user_email: user?.email || "",
                language: i18n.language || "en",
            };
            console.log("Sending to API:", payload);

            const response = await fetch(`${API_URL}/predict`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "API request failed");
            }

            console.log("API Response:", result);

            const record = {
                id: Date.now().toString(),
                date: new Date().toISOString().split("T")[0],
                data: formData,
                healthScore: result.health_score ?? calculateHealthScore(formData),
                keyRisk: result.key_risk_factor || getKeyRisk(formData),
                dietTags: result.diet_tags,
                exerciseTags: result.exercise_tags,
                aiReasoning: result.ai_reasoning || "",
            };

            setCurrentAnalysis(record);
            setHistory((prev) => [record, ...prev]);
            return record;
        } catch (err) {
            console.error("API Error:", err);
            setSubmitError(err.message);
            throw err;
        } finally {
            setIsSubmitting(false);
        }
    };

    const getAnalysisById = (id) => history.find((r) => r.id === id);

    const clearCurrentAnalysis = () => setCurrentAnalysis(null);
    const clearHistory = () => setHistory([]);

    return (
        <HealthDataContext.Provider
            value={{
                currentAnalysis,
                history,
                isSubmitting,
                submitError,
                submitAnalysis,
                getAnalysisById,
                clearCurrentAnalysis,
                clearHistory,
            }}
        >
            {children}
        </HealthDataContext.Provider>
    );
};

export const useHealthData = () => {
    const context = useContext(HealthDataContext);
    if (!context) throw new Error("useHealthData must be used within HealthDataProvider");
    return context;
};
