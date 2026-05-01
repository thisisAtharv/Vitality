import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useHealthData } from "@/contexts/HealthDataContext";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
    Heart,
    Utensils,
    Dumbbell,
    Brain,
    Sparkles,
    Clock,
    Flame,
    Download,
    Loader2,
    Apple,
    Carrot,
    Beef,
    Fish,
    Egg,
    Milk,
    Droplets,
    Activity,
    Salad,
    CheckCircle,
    Bike,
    Waves,
    Footprints,
    Baby,
    ShieldAlert,
    Pill,
    Sun,
    Wheat,
    Cherry,
    CircleDot,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from "recharts";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { toast } from "@/hooks/use-toast";

// ─── Diet Config: icon + description for every model tag ───
const dietConfig = {
    "Balanced": { i18nKey: "Balanced", icon: Apple, color: "text-emerald", bg: "bg-emerald-light", description: "A well-rounded mix of proteins, carbs, and fats to maintain overall health." },
    "Calcium & Vitamin D Focus": { i18nKey: "CalciumVitD", icon: Milk, color: "text-teal", bg: "bg-teal-light", description: "Prioritises dairy, leafy greens, and fortified foods for strong bones." },
    "Calorie-Deficit": { i18nKey: "CalorieDeficit", icon: Flame, color: "text-rose", bg: "bg-rose-light", description: "A controlled calorie intake to support healthy, sustainable weight loss." },
    "DASH-Diet": { i18nKey: "DASH", icon: Heart, color: "text-rose", bg: "bg-rose-light", description: "Dietary Approaches to Stop Hypertension — rich in fruits, veggies, and low-sodium foods." },
    "Folate & Prenatal Vitamins": { i18nKey: "Folate", icon: Baby, color: "text-primary", bg: "bg-primary/10", description: "Critical for neural tube development; includes leafy greens and fortified grains." },
    "Gestational Low-GI Diet": { i18nKey: "GestationalLowGI", icon: Activity, color: "text-amber", bg: "bg-amber-light", description: "Complex carbs with a low glycaemic index to prevent blood sugar spikes during pregnancy." },
    "High-Iron w/ Vitamin-C": { i18nKey: "HighIronVitC", icon: Cherry, color: "text-rose", bg: "bg-rose-light", description: "Pairs iron-rich foods with vitamin C to maximise iron absorption." },
    "Hydration + High-Protein": { i18nKey: "HydrationProtein", icon: Droplets, color: "text-primary", bg: "bg-primary/10", description: "Emphasises water intake and lean protein to support fetal growth and fluid balance." },
    "Iron-Rich": { i18nKey: "IronRich", icon: Beef, color: "text-rose", bg: "bg-rose-light", description: "Includes spinach, lentils, and lean meats to boost hemoglobin levels." },
    "Low-Fat": { i18nKey: "LowFat", icon: Fish, color: "text-teal", bg: "bg-teal-light", description: "Limits saturated fats to improve cholesterol and heart health." },
    "Low-Sugar": { i18nKey: "LowSugar", icon: Wheat, color: "text-amber", bg: "bg-amber-light", description: "Reduces refined sugars to help manage glucose and energy levels." },
    "Prenatal Iron-Rich": { i18nKey: "PrenatalIron", icon: Carrot, color: "text-emerald", bg: "bg-emerald-light", description: "Iron-rich nutrition tailored for pregnancy to prevent maternal anaemia." },
    "Strict Diabetic (Low-GI)": { i18nKey: "Diabetic", icon: Activity, color: "text-rose", bg: "bg-rose-light", description: "Very low glycaemic index foods for strict blood sugar control." },
    "Thyroid-Support Calorie Deficit": { i18nKey: "Thyroid", icon: Pill, color: "text-primary", bg: "bg-primary/10", description: "Calorie-controlled diet with selenium and iodine to support thyroid function." },
    "Vitamin-D-Rich": { i18nKey: "VitDRich", icon: Sun, color: "text-amber", bg: "bg-amber-light", description: "Includes fatty fish, egg yolks, and fortified foods to raise vitamin D levels." },
};

// ─── Workout Config: icon (emoji) + intensity + duration + description ───
const workoutConfig = {
    "Cycling": { i18nKey: "Cycling", icon: "🚴", intensity: "medium", duration: "35 min", description: "Outdoor cardio that builds leg strength and cardiovascular endurance." },
    "Gentle Walking": { i18nKey: "GentleWalk", icon: "🚶", intensity: "low", duration: "30 min", description: "Easy-paced walking for recovery days or mobility improvement." },
    "Gym/HIIT": { i18nKey: "HIIT", icon: "🏋️", intensity: "high", duration: "30 min", description: "High-intensity interval training to boost metabolism and burn fat." },
    "Light Walking": { i18nKey: "LightWalk", icon: "🚶", intensity: "low", duration: "25 min", description: "Short, gentle walks ideal for beginners or as active recovery." },
    "Light Yoga": { i18nKey: "LightYoga", icon: "🧘", intensity: "low", duration: "30 min", description: "Gentle poses and breathing exercises for relaxation and flexibility." },
    "Medical Clearance Required (High BP)": { i18nKey: "MedClearance", icon: "⚠️", intensity: "caution", duration: "—", description: "High blood pressure detected. Consult your doctor before starting exercise." },
    "Pelvic Floor/Mobility": { i18nKey: "Pelvic", icon: "🤸", intensity: "low", duration: "20 min", description: "Targeted exercises to strengthen the pelvic floor and improve mobility." },
    "Prenatal Yoga": { i18nKey: "PrenatalYoga", icon: "🧘", intensity: "low", duration: "35 min", description: "Pregnancy-safe yoga to relieve back pain and prepare for delivery." },
    "Resistance Band Training": { i18nKey: "Resistance", icon: "💪", intensity: "medium", duration: "30 min", description: "Low-impact strength work using bands to build lean muscle safely." },
    "Running": { i18nKey: "Running", icon: "🏃", intensity: "high", duration: "30 min", description: "Sustained cardio to improve heart health and stamina." },
    "Stationary Cycling": { i18nKey: "Stationary", icon: "🚴", intensity: "medium", duration: "30 min", description: "Low-impact indoor cycling to maintain fitness without joint stress." },
    "Swimming": { i18nKey: "Swimming", icon: "🏊", intensity: "medium", duration: "30 min", description: "Full-body workout that's easy on joints with excellent cardio benefits." },
    "Water Aerobics": { i18nKey: "WaterAerobics", icon: "🏊", intensity: "low", duration: "30 min", description: "Water-based exercises providing resistance and buoyancy to relieve pelvic pressure." },
    "Yoga & Stretching": { i18nKey: "YogaStretch", icon: "🧘", intensity: "low", duration: "40 min", description: "Combines yoga poses with deep stretching for flexibility and stress relief." },
};

// Fallback defaults
const DEFAULT_DIET = { duration: "Follow daily", intensity: "Moderate", calories: "Maintained" };
const DEFAULT_WORKOUT = { duration: "30-45 mins", intensity: "Moderate", calories: "300-500 kcal" };

const pdfTranslations = {
    en: {
        title1: "Your Personalized 7-Day Plan", generatedOn: "Generated on", healthScore: "Health Score",
        diet: "DIET RECOMMENDATIONS", exercise: "EXERCISE RECOMMENDATIONS", ai: "AI INSIGHTS",
        footer: "Generated by Vitality AI", tableTitle: "7-Day Meal & Workout Plan",
        cols: ["Day", "Focus", "Breakfast", "Lunch", "Dinner", "Workout"]
    },
    hi: {
        title1: "आपकी वैयक्तिकृत 7-दिवसीय योजना", generatedOn: "को उत्पन्न", healthScore: "स्वास्थ्य स्कोर",
        diet: "आहार संबंधी सिफारिशें", exercise: "व्यायाम संबंधी सिफारिशें", ai: "एआई अंतर्दृष्टि",
        footer: "वाइटैलिटी एआई द्वारा उत्पन्न", tableTitle: "7-दिवसीय भोजन और कसरत योजना",
        cols: ["दिन", "फोकस", "नाश्ता", "दोपहर का भोजन", "रात का खाना", "व्यायाम"]
    },
    mr: {
        title1: "तुमची वैयक्तिकृत 7-दिवसांची योजना", generatedOn: "रोजी तयार केले", healthScore: "आरोग्य स्कोअर",
        diet: "आहार शिफारसी", exercise: "व्यायाम शिफारसी", ai: "एआय अंतर्दृष्टी",
        footer: "व्हायटॅलिटी एआय द्वारे तयार", tableTitle: "7-दिवस जेवण आणि व्यायाम योजना",
        cols: ["दिवस", "फोकस", "न्याहारी", "दुपारचे जेवण", "रात्रीचे जेवण", "व्यायाम"]
    },
    ta: {
        title1: "உங்கள் தனிப்பயனாக்கப்பட்ட 7 நாள் திட்டம்", generatedOn: "உருவாக்கப்பட்டது", healthScore: "சுகாதார மதிப்பெண்",
        diet: "உணவு பரிந்துரைகள்", exercise: "உடற்பயிற்சி பரிந்துரைகள்", ai: "ஏஐ நுண்ணறிவு",
        footer: "வைட்டலிட்டி ஏஐ மூலம் உருவாக்கப்பட்டது", tableTitle: "7-நாள் உணவு & உடற்பயிற்சி திட்டம்",
        cols: ["நாள்", "கவனம்", "காலை உணவு", "மதிய உணவு", "இரவு உணவு", "உடற்பயிற்சி"]
    }
};

// ─── Dynamic Calculations ───

// Health Score (0-100): start at 100, deduct for each out-of-range biomarker
const calculateHealthScore = (data) => {
    let score = 100;
    const bmi = data.weight / Math.pow(data.height / 100, 2);

    // BMI (18.5-24.9 normal)
    if (bmi > 30 || bmi < 16) score -= 15;
    else if (bmi > 25 || bmi < 18.5) score -= 8;

    // Blood Pressure
    if (data.systolicBP > 140 || data.diastolicBP > 90) score -= 15;
    else if (data.systolicBP > 130 || data.diastolicBP > 85) score -= 7;
    else if (data.systolicBP > 120) score -= 3;

    // Glucose (70-100 normal, fasting)
    if (data.glucose > 126 || data.glucose < 60) score -= 15;
    else if (data.glucose > 100) score -= 8;

    // Cholesterol (< 200 desirable)
    if (data.cholesterol > 240) score -= 15;
    else if (data.cholesterol > 200) score -= 8;

    // Hemoglobin (12-17 normal)
    if (data.hemoglobin < 10 || data.hemoglobin > 18) score -= 12;
    else if (data.hemoglobin < 12 || data.hemoglobin > 17) score -= 6;

    // HbA1c (< 5.7 normal)
    if (data.hba1c > 6.5) score -= 12;
    else if (data.hba1c > 5.7) score -= 5;

    // TSH (0.4-4.0 normal)
    if (data.tsh > 10 || data.tsh < 0.1) score -= 10;
    else if (data.tsh > 4.0 || data.tsh < 0.4) score -= 5;

    // Iron (60-170 mcg/dL normal)
    if (data.iron < 40 || data.iron > 200) score -= 8;
    else if (data.iron < 60 || data.iron > 170) score -= 4;

    // Vitamin D (20-50 ng/mL normal)
    if (data.vitaminD < 12 || data.vitaminD > 80) score -= 8;
    else if (data.vitaminD < 20) score -= 4;

    return Math.max(0, Math.min(100, Math.round(score)));
};

// Harris-Benedict BMR → daily calorie target
const calculateDailyCalories = (data) => {
    let bmr;
    if (data.gender === "male") {
        bmr = 88.362 + (13.397 * data.weight) + (4.799 * data.height) - (5.677 * data.age);
    } else {
        bmr = 447.593 + (9.247 * data.weight) + (3.098 * data.height) - (4.330 * data.age);
    }
    // Activity multiplier
    const multipliers = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725 };
    const multiplier = multipliers[data.activityLevel] || 1.55;
    let calories = Math.round(bmr * multiplier);
    // Add 300 kcal for pregnancy (2nd/3rd trimester)
    if (data.isPregnant && data.trimester >= 2) calories += 300;
    return calories;
};

// Water intake: weight_kg × 0.033L → glasses (250ml each)
const calculateWaterIntake = (data) => {
    let liters = data.weight * 0.033;
    if (data.isPregnant) liters += 0.3;
    return Math.round(liters / 0.25); // 250ml per glass
};

// Exercise minutes from workout tags
const calculateExerciseMinutes = (exerciseTags, data) => {
    if (exerciseTags.some(t => t.includes("Medical Clearance"))) return 0;
    if (exerciseTags.length === 0) return data.isPregnant ? 30 : 45;
    const durations = exerciseTags.map(tag => {
        const cfg = workoutConfig[tag];
        return cfg ? parseInt(cfg.duration) || 30 : 30;
    });
    return Math.round(durations.reduce((a, b) => a + b, 0) / durations.length);
};

// Calculate risk score: 5 (healthy/center) to 100 (maximum risk/edge)
const computeRiskScore = (value, low, high, idealLow, idealHigh) => {
    if (value >= idealLow && value <= idealHigh) return 5;
    const clamped = Math.max(low, Math.min(high, value));
    if (clamped < idealLow) return Math.min(100, Math.max(5, Math.round(((idealLow - clamped) / (idealLow - low)) * 100)));
    return Math.min(100, Math.max(5, Math.round(((clamped - idealHigh) / (high - idealHigh)) * 100)));
};

// Fallback reasoning for historical records without AI reasoning
const FALLBACK_REASONING = "Your blood parameters have been analyzed and personalised diet and exercise recommendations have been generated. Please refer to the tags below for details.";

const API_URL = "http://localhost:5000";

const SmartDashboard = ({ analysis: propAnalysis }) => {
    const { currentAnalysis, getAnalysisById } = useHealthData();
    const { id } = useParams();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language || "en";

    // Figure out which analysis to display
    let analysis = propAnalysis;
    if (!analysis && id) {
        analysis = id === "latest" ? currentAnalysis : getAnalysisById(id);
    }

    // If still no analysis, bounce back to dashboard
    if (!analysis) {
        navigate("/dashboard");
        return null;
    }

    const { data, healthScore, dietTags, exerciseTags, aiReasoning = FALLBACK_REASONING, keyRisk } = analysis;

    const [pdfLoading, setPdfLoading] = useState(false);

    const handleExportPDF = async () => {
        setPdfLoading(true);
        toast({ title: "Generating your custom plan...", description: "This may take a few seconds." });

        try {
            // 1. Fetch the 7-day plan from Groq
            const res = await fetch(`${API_URL}/generate-plan`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    diet_tags: dietTags,
                    exercise_tags: exerciseTags,
                    user_data: {
                        ...data,
                        diet_preference: data.dietPreference || "vegetarian",
                        language: currentLang,
                    },
                }),
            });

            const result = await res.json();
            if (!res.ok || result.error) throw new Error(result.error || "API error");

            const weeklyPlan = result.weekly_plan || [];

            // 2. Render invisible HTML to canvas
            const pdfContainer = document.createElement("div");
            pdfContainer.style.position = "absolute";
            pdfContainer.style.top = "-9999px";
            pdfContainer.style.left = "-9999px";
            pdfContainer.style.width = "297mm";
            pdfContainer.className = "bg-slate-900 text-slate-200";

            const pdfT = pdfTranslations[currentLang] || pdfTranslations["en"];

            // Build the HTML content
            pdfContainer.innerHTML = `
                <!-- Page 1 Info -->
                <div style="width: 297mm; height: 210mm; padding: 40px; box-sizing: border-box; background: #0f172a; color: white;">
                    <div style="width: 60px; height: 3px; background: #14b8a6; margin-bottom: 20px;"></div>
                    <h1 style="font-size: 36px; font-weight: bold; margin: 0;">Vitality</h1>
                    <h2 style="font-size: 20px; color: #94a3b8; font-weight: normal; margin-top: 10px;">${pdfT.title1}</h2>
                    <p style="font-size: 14px; color: #94a3b8; margin-top: 10px;">
                        ${pdfT.generatedOn} ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                    </p>

                    <div style="position: absolute; right: 40px; top: 40px; background: #1e293b; border-radius: 8px; width: 120px; height: 120px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                        <span style="font-size: 48px; font-weight: bold; color: #14b8a6;">${healthScore}</span>
                        <span style="font-size: 14px; color: #94a3b8;">${pdfT.healthScore}</span>
                    </div>

                    <div style="background: #1e293b; border-radius: 8px; padding: 20px; margin-top: 40px;">
                        <h3 style="color: #14b8a6; font-size: 16px; margin: 0 0 10px 0;">${pdfT.diet}</h3>
                        <p style="font-size: 14px; margin: 0 0 20px 0;">${dietTags.length > 0 ? dietTags.join(" &middot; ") : "None"}</p>
                        
                        <h3 style="color: #14b8a6; font-size: 16px; margin: 0 0 10px 0;">${pdfT.exercise}</h3>
                        <p style="font-size: 14px; margin: 0;">${exerciseTags.length > 0 ? exerciseTags.join(" &middot; ") : "None"}</p>
                    </div>

                    <div style="background: #1e293b; border-radius: 8px; padding: 20px; margin-top: 20px;">
                        <h3 style="color: #14b8a6; font-size: 16px; margin: 0 0 10px 0;">${pdfT.ai}</h3>
                        <p style="font-size: 13px; color: #cbd5e1; line-height: 1.5; margin: 0;">${aiReasoning}</p>
                    </div>
                </div>

                <!-- Page 2 Table -->
                <div style="width: 297mm; min-height: 210mm; padding: 40px; box-sizing: border-box; background: #0f172a; color: white;">
                    <div style="width: 40px; height: 3px; background: #14b8a6; margin-bottom: 15px;"></div>
                    <h2 style="font-size: 24px; font-weight: bold; margin: 0 0 30px 0;">${pdfT.tableTitle}</h2>
                    
                    <table style="width: 100%; border-collapse: collapse; font-size: 12px; color: #e2e8f0;">
                        <thead>
                            <tr style="background: #1e293b; color: #14b8a6; text-align: left;">
                                ${pdfT.cols.map(c => `<th style="padding: 12px; border: 1px solid #334155;">${c}</th>`).join('')}
                            </tr>
                        </thead>
                        <tbody>
                            ${weeklyPlan.map((d, i) => `
                                <tr style="background: ${i % 2 === 0 ? '#162134' : '#0f172a'};">
                                    <td style="padding: 12px; border: 1px solid #334155; font-weight: bold;">${d.day || ""}</td>
                                    <td style="padding: 12px; border: 1px solid #334155;">${d.focus || ""}</td>
                                    <td style="padding: 12px; border: 1px solid #334155;">${d.breakfast || ""}</td>
                                    <td style="padding: 12px; border: 1px solid #334155;">${d.lunch || ""}</td>
                                    <td style="padding: 12px; border: 1px solid #334155;">${d.dinner || ""}</td>
                                    <td style="padding: 12px; border: 1px solid #334155;">${d.workout || ""}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    <div style="text-align: center; color: #64748b; font-size: 10px; margin-top: 40px;">
                        ${pdfT.footerDisclaimer || "Generated by Vitality AI | For informational purposes only | Consult a doctor"}
                    </div>
                </div>
            `;

            document.body.appendChild(pdfContainer);

            // Give browser a tick to render
            await new Promise(resolve => setTimeout(resolve, 100));

            // Use html2canvas
            const { default: html2canvas } = await import("html2canvas");
            const w = pdfContainer.offsetWidth;
            const doc = new jsPDF({ orientation: "landscape", unit: "px", format: [pdfContainer.offsetWidth, pdfContainer.offsetHeight / 2] });

            const canvas1 = await html2canvas(pdfContainer.children[0], { scale: 2, useCORS: true });
            const canvas2 = await html2canvas(pdfContainer.children[1], { scale: 2, backgroundColor: '#0f172a', useCORS: true });

            // Add First Page
            const imgData1 = canvas1.toDataURL('image/png');
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            doc.addImage(imgData1, 'PNG', 0, 0, pageWidth, pageHeight);

            // Add Second Page
            doc.addPage();
            const imgData2 = canvas2.toDataURL('image/png');
            doc.addImage(imgData2, 'PNG', 0, 0, pageWidth, pageHeight);

            document.body.removeChild(pdfContainer);
            // 3. Download

            // 3. Download
            doc.save("Vitality_Plan.pdf");
            toast({ title: "PDF Downloaded!", description: "Your 7-day plan has been saved." });

        } catch (err) {
            console.error("PDF export error:", err);
            toast({ title: "Export Failed", description: err.message || "Could not generate plan.", variant: "destructive" });
        } finally {
            setPdfLoading(false);
        }
    };

    const scoreColor = healthScore >= 80 ? "hsl(160 84% 39%)" : healthScore >= 60 ? "hsl(38 92% 50%)" : "hsl(350 89% 60%)";

    const pieData = [
        { value: healthScore },
        { value: 100 - healthScore },
    ];

    const radarData = [
        { subject: t("HealthData.Radar.Hb"), value: computeRiskScore(data.hemoglobin, 4, 40, 12, 17), fullMark: 100 },
        { subject: t("HealthData.Radar.Gluc"), value: computeRiskScore(data.glucose, 30, 400, 70, 100), fullMark: 100 },
        { subject: t("HealthData.Radar.Chol"), value: computeRiskScore(data.cholesterol, 80, 400, 150, 200), fullMark: 100 },
        { subject: t("HealthData.Radar.BP"), value: computeRiskScore(data.systolicBP, 60, 200, 90, 120), fullMark: 100 },
        { subject: t("HealthData.Radar.BMI"), value: computeRiskScore(data.weight / Math.pow(data.height / 100, 2), 10, 50, 18.5, 24.9), fullMark: 100 },
    ];

    // Dynamic daily goals
    const dailyCalories = calculateDailyCalories(data);
    const waterGlasses = calculateWaterIntake(data);
    const exerciseMinutes = calculateExerciseMinutes(exerciseTags, data);

    // Progress bar widths (percentage of a reasonable max)
    const calorieProgress = Math.min(100, Math.round((dailyCalories / 3000) * 100));
    const waterProgress = Math.min(100, Math.round((waterGlasses / 12) * 100));
    const exerciseProgress = Math.min(100, Math.round((exerciseMinutes / 60) * 100));

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    // Build diet display items from config
    const dietDisplayItems = dietTags.map((tag) => {
        const config = dietConfig[tag] || DEFAULT_DIET;
        return { name: tag, ...config };
    });

    // Build exercise display items from config
    const exerciseDisplayItems = exerciseTags.map((tag) => {
        const config = workoutConfig[tag] || DEFAULT_WORKOUT;
        return { name: tag, ...config };
    });

    return (
        <section className="min-h-screen bg-gradient-hero py-8 px-4">
            <div className="container mx-auto max-w-7xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between mb-8"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                            <Heart className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">{t("Dashboard.Title")}</h1>
                            <p className="text-sm text-muted-foreground">{t("Dashboard.Subtitle")}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            onClick={handleExportPDF}
                            disabled={pdfLoading}
                            className="rounded-xl gap-2"
                        >
                            {pdfLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Download className="w-4 h-4" />
                            )}
                            {pdfLoading ? t("Dashboard.Generating") : t("Dashboard.ExportPDF")}
                        </Button>
                    </div>
                </motion.div>

                {/* Bento Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-12 gap-4"
                >
                    {/* Health Score Card */}
                    <motion.div variants={itemVariants} className="col-span-12 md:col-span-4 lg:col-span-3">
                        <Card className="glass-card p-6 h-full rounded-3xl">
                            <div className="flex items-center gap-2 mb-4">
                                <Sparkles className="w-5 h-5 text-primary" />
                                <h3 className="font-semibold">{t("Dashboard.HealthScore")}</h3>
                            </div>
                            <div className="relative w-40 h-40 mx-auto">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={55}
                                            outerRadius={70}
                                            startAngle={90}
                                            endAngle={-270}
                                            paddingAngle={0}
                                            dataKey="value"
                                        >
                                            <Cell fill={scoreColor} />
                                            <Cell fill="hsl(210 20% 96%)" />
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                        <motion.span
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.5, type: "spring" }}
                                            className="text-4xl font-bold"
                                            style={{ color: scoreColor }}
                                        >
                                            {healthScore}
                                        </motion.span>
                                        <span className="text-lg text-muted-foreground">/100</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-center text-sm text-muted-foreground mt-4">
                                {healthScore >= 80 ? t("Dashboard.HealthExc") : healthScore >= 60 ? t("Dashboard.HealthRoom") : t("Dashboard.HealthWork")}
                            </p>
                        </Card>
                    </motion.div>

                    {/* Radar Chart */}
                    <motion.div variants={itemVariants} className="col-span-12 md:col-span-8 lg:col-span-5">
                        <Card className="glass-card p-6 h-full rounded-3xl">
                            <div className="flex items-center gap-2 mb-4">
                                <Brain className="w-5 h-5 text-primary" />
                                <h3 className="font-semibold">{t("Dashboard.Metrics")}</h3>
                            </div>
                            <div className="h-48">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadarChart data={radarData}>
                                        <PolarGrid stroke="hsl(214 32% 91%)" />
                                        <PolarAngleAxis
                                            dataKey="subject"
                                            tick={{ fontSize: 11, fill: "hsl(215 16% 47%)" }}
                                        />
                                        <Radar
                                            name="Health"
                                            dataKey="value"
                                            stroke="hsl(199 89% 48%)"
                                            fill="hsl(199 89% 48%)"
                                            fillOpacity={0.3}
                                        />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>
                        </Card>
                    </motion.div>

                    {/* AI Reasoning Card */}
                    <motion.div variants={itemVariants} className="col-span-12 lg:col-span-4">
                        <Card className="gradient-border p-6 h-full rounded-3xl bg-card">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                                    <Brain className="w-4 h-4 text-primary-foreground" />
                                </div>
                                <h3 className="font-semibold">{t("Dashboard.AIReason")}</h3>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {aiReasoning}
                            </p>
                        </Card>
                    </motion.div>

                    {/* ─── Diet Section ─── */}
                    <motion.div variants={itemVariants} className="col-span-12">
                        <Card className="glass-card p-6 rounded-3xl">
                            <div className="flex items-center gap-2 mb-6">
                                <Utensils className="w-5 h-5 text-accent" />
                                <h3 className="font-semibold text-lg">{t("Dashboard.RecDiet")}</h3>
                            </div>
                            {dietDisplayItems.length > 0 ? (
                                <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2 scrollbar-thin">
                                    {dietDisplayItems.map((diet, index) => {
                                        const IconComp = diet.icon;
                                        return (
                                            <motion.div
                                                key={diet.name}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.2 + index * 0.1 }}
                                                whileHover={{ y: -4, scale: 1.02 }}
                                                className="flex-shrink-0 w-60 p-6 rounded-2xl bg-secondary/50 border border-border/50"
                                            >
                                                <div className={`w-12 h-12 rounded-xl ${diet.bg} flex items-center justify-center mb-3`}>
                                                    <IconComp className={`w-6 h-6 ${diet.color}`} />
                                                </div>
                                                <h4 className="font-semibold mb-1.5">{t(`HealthData.Diet.${diet.i18nKey || diet.name}.title`)}</h4>
                                                <p className="text-sm text-muted-foreground leading-relaxed">
                                                    {t(`HealthData.Diet.${diet.i18nKey || diet.name}.desc`)}
                                                </p>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <p className="text-muted-foreground text-sm">{t("Dashboard.NoDiet")}</p>
                            )}
                        </Card>
                    </motion.div>

                    {/* ─── Workout Section ─── */}
                    <motion.div variants={itemVariants} className="col-span-12 lg:col-span-7">
                        <Card className="glass-card p-6 rounded-3xl">
                            <div className="flex items-center gap-2 mb-6">
                                <Dumbbell className="w-5 h-5 text-primary" />
                                <h3 className="font-semibold text-lg">{t("Dashboard.RecWork")}</h3>
                            </div>
                            {exerciseDisplayItems.length > 0 ? (
                                <div className="space-y-3">
                                    {exerciseDisplayItems.map((workout, index) => (
                                        <motion.div
                                            key={workout.name}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 + index * 0.1 }}
                                            className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary/80 transition-colors"
                                        >
                                            <span className="text-2xl">{workout.icon}</span>
                                            <div className="flex-1">
                                                <h4 className="font-semibold">{t(`HealthData.Workout.${workout.i18nKey || workout.name}.title`)}</h4>
                                                <p className="text-sm text-muted-foreground leading-relaxed">{t(`HealthData.Workout.${workout.i18nKey || workout.name}.desc`)}</p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-medium ${workout.intensity === "low"
                                                        ? "bg-emerald-light text-emerald"
                                                        : workout.intensity === "medium"
                                                            ? "bg-amber-light text-amber"
                                                            : workout.intensity === "caution"
                                                                ? "bg-rose-light text-rose"
                                                                : "bg-rose-light text-rose"
                                                        }`}
                                                >
                                                    {workout.intensity}
                                                </span>
                                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                    <Clock className="w-4 h-4" />
                                                    {workout.duration}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground text-sm">{t("Dashboard.NoWork")}</p>
                            )}
                        </Card>
                    </motion.div>

                    {/* Daily Goals */}
                    <motion.div variants={itemVariants} className="col-span-12 lg:col-span-5">
                        <Card className="glass-card p-6 rounded-3xl h-full">
                            <div className="flex items-center gap-2 mb-6">
                                <Flame className="w-5 h-5 text-primary" />
                                <h3 className="font-semibold text-lg">{t("Dashboard.DailyGoals")}</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="p-4 rounded-xl bg-teal-light/50">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium">{t("Dashboard.CalTarget")}</span>
                                        <span className="font-bold text-teal">{dailyCalories.toLocaleString()} {t("HealthData.Units.kcal")}</span>
                                    </div>
                                    <div className="h-2 bg-background rounded-full overflow-hidden">
                                        <div className="h-full bg-teal rounded-full transition-all duration-700" style={{ width: `${calorieProgress}%` }} />
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl bg-emerald-light/50">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium">{t("Dashboard.WaterIn")}</span>
                                        <span className="font-bold text-emerald">{waterGlasses} {t("HealthData.Units.glasses")}</span>
                                    </div>
                                    <div className="h-2 bg-background rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald rounded-full transition-all duration-700" style={{ width: `${waterProgress}%` }} />
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl bg-amber-light/50">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium">{t("Dashboard.ExMins")}</span>
                                        <span className="font-bold text-amber">{exerciseMinutes} {t("HealthData.Units.min")}</span>
                                    </div>
                                    <div className="h-2 bg-background rounded-full overflow-hidden">
                                        <div className="h-full bg-amber rounded-full transition-all duration-700" style={{ width: `${exerciseProgress}%` }} />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default SmartDashboard;
