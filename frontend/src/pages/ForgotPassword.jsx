import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HeartPulse, ArrowLeft, Loader2, MailCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [sent, setSent] = useState(false);
    const { t } = useTranslation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);
        try {
            await sendPasswordResetEmail(auth, email);
            setSent(true);
        } catch (err) {
            const messages = {
                "auth/user-not-found": t("Auth.Errors.UserNotFound"),
                "auth/invalid-email": t("Auth.Errors.InvalidEmail"),
                "auth/too-many-requests": t("Auth.Errors.TooMany"),
            };
            setError(messages[err.code] || t("Auth.Errors.Default"));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md space-y-8"
            >
                <div className="space-y-2">
                    <Link to="/home" className="flex items-center gap-2 mb-6 cursor-pointer no-underline">
                        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                            <HeartPulse className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <span className="text-xl font-bold text-foreground hover:text-primary transition-colors">Vitality</span>
                    </Link>
                    <h1 className="text-3xl font-bold">{t("Auth.ResetPwd")}</h1>
                    <p className="text-muted-foreground">
                        {t("Auth.ResetDesc")}
                    </p>
                </div>

                {sent ? (
                    <div className="space-y-6">
                        <div className="p-6 rounded-xl bg-accent/10 border border-accent/20 text-center space-y-3">
                            <MailCheck className="w-12 h-12 text-accent mx-auto" />
                            <h3 className="font-semibold text-lg">{t("Auth.CheckInbox")}</h3>
                            <p className="text-sm text-muted-foreground">
                                {t("Auth.SentLinkTo")} <span className="font-medium text-foreground">{email}</span>. {t("Auth.ClickLink")}
                            </p>
                        </div>
                        <Link to="/login" className="flex items-center justify-center gap-2 text-sm text-primary hover:underline font-medium">
                            <ArrowLeft className="w-4 h-4" />
                            {t("Auth.BackToSignIn")}
                        </Link>
                    </div>
                ) : (
                    <>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="email">{t("Auth.Email")}</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="h-12 rounded-xl"
                                    required
                                />
                            </div>

                            {error && (
                                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                                    <p className="text-sm text-destructive">{error}</p>
                                </div>
                            )}

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full h-12 rounded-xl bg-primary text-primary-foreground gap-2"
                            >
                                {isSubmitting ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    t("Auth.SendReset")
                                )}
                            </Button>
                        </form>

                        <div className="text-center">
                            <Link to="/login" className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                                <ArrowLeft className="w-4 h-4" />
                                {t("Auth.BackToSignIn")}
                            </Link>
                        </div>
                    </>
                )}
            </motion.div>
        </div>
    );
};

export default ForgotPassword;
