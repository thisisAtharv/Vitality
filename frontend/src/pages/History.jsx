import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, FlaskConical, Loader2 } from "lucide-react";

const API_URL = "http://127.0.0.1:5000";

const HistoryPage = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const uid = user?.uid || "";
                const res = await fetch(`${API_URL}/history?user_id=${uid}`);
                const data = await res.json();
                setHistory(data);
            } catch (err) {
                console.error("Failed to fetch history:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, [user]);

    const handleView = (record) => {
        navigate("/dashboard", {
            state: {
                historicalData: record.data,
                historicalScore: record.healthScore,
                historicalRisk: record.keyRisk,
            },
        });
    };

    const getRiskBadgeVariant = (risk) => {
        if (risk === "None") return "secondary";
        if (risk.includes("High") || risk.includes("Elevated")) return "destructive";
        return "outline";
    };

    return (
        <div className="p-6 md:p-10 max-w-5xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
            >
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">{t("HistoryPage.Title")}</h1>
                        <p className="text-muted-foreground mt-1">
                            {t("HistoryPage.Subtitle")}
                        </p>
                    </div>
                    <Button
                        onClick={() => navigate("/new-analysis")}
                        className="bg-primary text-primary-foreground rounded-xl gap-2"
                    >
                        <FlaskConical className="w-4 h-4" />
                        {t("HistoryPage.NewBtn")}
                    </Button>
                </div>

                {loading ? (
                    <div className="glass-card rounded-2xl p-12 text-center">
                        <Loader2 className="w-8 h-8 mx-auto text-primary animate-spin mb-4" />
                        <p className="text-muted-foreground">{t("HistoryPage.Loading")}</p>
                    </div>
                ) : history.length === 0 ? (
                    <div className="glass-card rounded-2xl p-12 text-center">
                        <FlaskConical className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">{t("HistoryPage.NoAnalyses")}</h3>
                        <p className="text-muted-foreground mb-6">
                            {t("HistoryPage.NoAnalysesDesc")}
                        </p>
                        <Button
                            onClick={() => navigate("/new-analysis")}
                            className="bg-primary text-primary-foreground rounded-xl"
                        >
                            {t("HistoryPage.StartBtn")}
                        </Button>
                    </div>
                ) : (
                    <div className="glass-card rounded-2xl overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent">
                                    <TableHead className="font-semibold">{t("HistoryPage.ColDate")}</TableHead>
                                    <TableHead className="font-semibold">{t("HistoryPage.ColScore")}</TableHead>
                                    <TableHead className="font-semibold">{t("HistoryPage.ColRisk")}</TableHead>
                                    <TableHead className="font-semibold text-right">{t("HistoryPage.ColAction")}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {history.map((record, index) => (
                                    <motion.tr
                                        key={record.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="border-b transition-colors hover:bg-muted/50"
                                    >
                                        <TableCell className="font-medium">
                                            {new Date(record.date).toLocaleDateString(i18n.language === 'en' ? 'en-US' : (i18n.language === 'hi' ? 'hi-IN' : (i18n.language === 'mr' ? 'mr-IN' : 'ta-IN')), {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className={`w-2.5 h-2.5 rounded-full ${record.healthScore >= 80
                                                        ? "bg-accent"
                                                        : record.healthScore >= 60
                                                            ? "bg-amber"
                                                            : "bg-destructive"
                                                        }`}
                                                />
                                                <span className="font-semibold">{record.healthScore}/100</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={getRiskBadgeVariant(record.keyRisk)}>
                                                {t("HealthData.Risks." + (
                                                    record.keyRisk === "None" ? "None" :
                                                        record.keyRisk === "High Blood Pressure" ? "HighBP" :
                                                            record.keyRisk === "Elevated Blood Sugar" ? "Diabetes" :
                                                                record.keyRisk === "High Cholesterol" ? "Chol" :
                                                                    record.keyRisk === "Low Iron / Anemia" ? "Anemia" :
                                                                        record.keyRisk === "Elevated BMI" ? "Obesity" :
                                                                            record.keyRisk === "Vitamin D Deficiency" ? "VitD" : "None"
                                                ))}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleView(record)}
                                                className="gap-2 text-primary hover:text-primary hover:bg-primary/10 rounded-lg"
                                            >
                                                <Eye className="w-4 h-4" />
                                                {t("HistoryPage.ViewBtn")}
                                            </Button>
                                        </TableCell>
                                    </motion.tr>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default HistoryPage;
