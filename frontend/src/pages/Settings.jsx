import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useHealthData } from "@/contexts/HealthDataContext";
import { useAuth } from "@/contexts/AuthContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Bell, Moon, Trash2, Info } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Settings = () => {
    const { clearHistory } = useHealthData();
    const { user, logout } = useAuth();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [emailNotifs, setEmailNotifs] = useState(true);
    const [darkMode, setDarkMode] = useState(() =>
        document.documentElement.classList.contains("dark")
    );

    // Fetch saved settings on mount
    useEffect(() => {
        if (!user?.uid) return;
        fetch(`${API}/api/user/profile?uid=${user.uid}`)
            .then((r) => r.json())
            .then((data) => {
                if (!data.error) {
                    setEmailNotifs(!!data.email_notifications);
                    const savedDark = !!data.dark_mode;
                    setDarkMode(savedDark);
                    if (savedDark) {
                        document.documentElement.classList.add("dark");
                    } else {
                        document.documentElement.classList.remove("dark");
                    }
                }
            })
            .catch(console.error);
    }, [user?.uid]);

    // Silent auto-save helper
    const saveSettings = (updates) => {
        if (!user?.uid) return;
        fetch(`${API}/api/user/update_settings`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ uid: user.uid, ...updates }),
        }).catch(console.error);
    };

    const handleDarkToggle = (val) => {
        setDarkMode(val);
        if (val) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        saveSettings({ email_notifications: emailNotifs, dark_mode: val });
    };

    const handleEmailToggle = (val) => {
        setEmailNotifs(val);
        saveSettings({ email_notifications: val, dark_mode: darkMode });
    };

    const handleDeleteAccount = async () => {
        if (!user?.uid) return;
        try {
            await fetch(`${API}/api/user/delete_account?uid=${user.uid}`, {
                method: "DELETE",
            });
            clearHistory();
            await logout();
            navigate("/login");
        } catch (e) {
            console.error("Delete account error:", e);
        }
    };

    return (
        <div className="p-6 md:p-10 max-w-3xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
            >
                <div>
                    <h1 className="text-3xl font-bold">{t("Settings.Title")}</h1>
                    <p className="text-muted-foreground mt-1">
                        {t("Settings.Subtitle")}
                    </p>
                </div>

                {/* Preferences */}
                <div className="rounded-xl border border-border bg-card shadow-sm p-8 space-y-6">
                    <h2 className="text-lg font-semibold">{t("Settings.Preferences")}</h2>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Bell className="w-5 h-5 text-muted-foreground" />
                            <div>
                                <p className="font-medium">{t("Settings.EmailNotifs")}</p>
                                <p className="text-sm text-muted-foreground">
                                    {t("Settings.EmailDesc")}
                                </p>
                            </div>
                        </div>
                        <Switch checked={emailNotifs} onCheckedChange={handleEmailToggle} />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Moon className="w-5 h-5 text-muted-foreground" />
                            <div>
                                <p className="font-medium">{t("Settings.DarkMode")}</p>
                                <p className="text-sm text-muted-foreground">
                                    {t("Settings.DarkDesc")}
                                </p>
                            </div>
                        </div>
                        <Switch checked={darkMode} onCheckedChange={handleDarkToggle} />
                    </div>

                    <Separator />

                    <LanguageSwitcher />
                </div>

                {/* Privacy & Data */}
                <div className="rounded-xl border border-destructive/30 bg-card shadow-sm p-8 space-y-4">
                    <h2 className="text-lg font-semibold">{t("Settings.Privacy")}</h2>
                    <p className="text-sm text-muted-foreground">
                        {t("Settings.PrivacyDesc")}
                    </p>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="destructive"
                                className="rounded-xl gap-2"
                            >
                                <Trash2 className="w-4 h-4" />
                                {t("Settings.DeleteBtn")}
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="rounded-xl">
                            <AlertDialogHeader>
                                <AlertDialogTitle>{t("Settings.DeleteTitle")}</AlertDialogTitle>
                                <AlertDialogDescription>
                                    {t("Settings.DeleteConfirm")}
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel className="rounded-xl">{t("Settings.Cancel")}</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={handleDeleteAccount}
                                    className="rounded-xl bg-destructive text-destructive-foreground"
                                >
                                    {t("Settings.DeleteAll")}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>

                {/* About */}
                <div className="rounded-xl border border-border bg-card shadow-sm p-8 space-y-3">
                    <div className="flex items-center gap-2">
                        <Info className="w-5 h-5 text-primary" />
                        <h2 className="text-lg font-semibold">{t("Settings.About")}</h2>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                        <p>
                            <span className="font-medium text-foreground">{t("Settings.Version")}:</span>{" "}
                            v1.0.0
                        </p>
                        <p>
                            <span className="font-medium text-foreground">{t("Settings.BuiltBy")}:</span>{" "}
                            Team Vitality
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Settings;
