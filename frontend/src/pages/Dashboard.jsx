import { useNavigate, useLocation } from "react-router-dom";
import { useHealthData } from "@/contexts/HealthDataContext";
import SmartDashboard from "@/components/SmartDashboard";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { FlaskConical, TrendingUp, History } from "lucide-react";

// Map API-style field names back to the frontend-friendly format SmartDashboard expects
const mapAPIToFrontend = (apiData) => {
    if (!apiData) return null;

    // If the data already has frontend-style keys (e.g. from fresh analysis), return as-is
    if (apiData.weight && apiData.height) return apiData;

    return {
        age: apiData.age || 30,
        weight: apiData.bmi ? Math.round(apiData.bmi * Math.pow(1.7, 2)) : 70,
        height: 170,
        gender: apiData.gender === 1 ? "male" : "female",
        hemoglobin: apiData.hemoglobin || 14,
        glucose: apiData.gluc === 3 ? 220 : apiData.gluc === 2 ? 160 : 90,
        cholesterol: apiData.cholesterol === 3 ? 260 : apiData.cholesterol === 2 ? 220 : 180,
        systolicBP: apiData.ap_hi || 120,
        diastolicBP: apiData.ap_lo || 80,
        iron: apiData.iron || 100,
        vitaminD: apiData.vitamin_d || 30,
        hba1c: apiData.hba1c || 5.4,
        tsh: apiData.tsh || 2.5,
        activityLevel: apiData.active === 0 ? "sedentary" : "moderate",
        isPregnant: apiData.is_pregnant === 1,
        trimester: apiData.trimester || 0,
        historyAsthma: apiData.history_asthma === 1,
        // Keep raw BMI for accurate display
        bmi: apiData.bmi,
    };
};

const Dashboard = () => {
    const { currentAnalysis, history } = useHealthData();
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();

    // Check if navigated from History "View" button
    const historicalState = location.state;

    if (historicalState?.historicalData) {
        const rawData = historicalState.historicalData;
        const frontendData = mapAPIToFrontend(rawData);

        const analysis = {
            id: "historical",
            date: new Date().toISOString().split("T")[0],
            data: frontendData,
            healthScore: historicalState.historicalScore || 80,
            keyRisk: historicalState.historicalRisk || "None",
            dietTags: rawData.diet_tags || [],
            exerciseTags: rawData.exercise_tags || [],
            aiReasoning: rawData.ai_reasoning || "",
        };

        return <SmartDashboard analysis={analysis} />;
    }

    // If there's a current analysis from a fresh submission, show it
    if (currentAnalysis) {
        return <SmartDashboard analysis={currentAnalysis} />;
    }

    // Empty state - no analysis yet
    const latestRecord = history[0];

    return (
        <div className="p-6 md:p-10 max-w-5xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
            >
                <div>
                    <h1 className="text-3xl font-bold">{t("Dashboard.Title")}</h1>
                    <p className="text-muted-foreground mt-1">
                        {t("Dashboard.Subtitle")}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                    <motion.div
                        whileHover={{ y: -2 }}
                        className="glass-card rounded-2xl p-6 cursor-pointer"
                        onClick={() => navigate("/new-analysis")}
                    >
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                            <FlaskConical className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="font-semibold text-lg mb-1">{t("Dashboard.NewAnalysisCardTitle")}</h3>
                        <p className="text-sm text-muted-foreground">
                            {t("Dashboard.NewAnalysisCardDesc")}
                        </p>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -2 }}
                        className="glass-card rounded-2xl p-6 cursor-pointer"
                        onClick={() => navigate("/history")}
                    >
                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                            <History className="w-6 h-6 text-accent" />
                        </div>
                        <h3 className="font-semibold text-lg mb-1">{t("Dashboard.HistoryCardTitle")}</h3>
                        <p className="text-sm text-muted-foreground">
                            {t("Dashboard.HistoryCardDesc")}
                        </p>
                    </motion.div>

                    {latestRecord && (
                        <motion.div
                            whileHover={{ y: -2 }}
                            className="glass-card rounded-2xl p-6"
                        >
                            <div className="w-12 h-12 rounded-xl bg-teal-light flex items-center justify-center mb-4">
                                <TrendingUp className="w-6 h-6 text-teal" />
                            </div>
                            <h3 className="font-semibold text-lg mb-1">Latest Score</h3>
                            <p className="text-3xl font-bold text-primary">
                                {latestRecord.healthScore}
                                <span className="text-lg text-muted-foreground">/100</span>
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">{latestRecord.date}</p>
                        </motion.div>
                    )}
                </div>

                <div className="text-center pt-4">
                    <Button
                        onClick={() => navigate("/new-analysis")}
                        className="bg-primary text-primary-foreground rounded-xl px-8 py-6 text-lg gap-2"
                    >
                        <FlaskConical className="w-5 h-5" />
                        {t("Dashboard.StartBtn")}
                    </Button>
                </div>
            </motion.div>
        </div>
    );
};

export default Dashboard;
