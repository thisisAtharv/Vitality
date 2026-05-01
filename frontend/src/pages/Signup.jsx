import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HeartPulse, ArrowRight, Loader2 } from "lucide-react";
import authIllustration from "@/assets/auth-illustration.png";

const GoogleIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
);



const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { signup, loginWithGoogle } = useAuth();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const getFirebaseErrorMessage = (code) => {
        const messages = {
            "auth/email-already-in-use": t("Auth.Errors.EmailInUse"),
            "auth/invalid-email": t("Auth.Errors.InvalidEmail"),
            "auth/weak-password": t("Auth.Errors.WeakPassword"),
            "auth/popup-closed-by-user": t("Auth.Errors.Cancelled"),
            "auth/network-request-failed": t("Auth.Errors.Network"),
        };
        return messages[code] || t("Auth.Errors.Default");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (!name.trim()) { setError(t("Auth.Errors.NameRequired")); return; }
        setIsSubmitting(true);
        try {
            await signup(name, email, password);
            navigate("/dashboard");
        } catch (err) {
            setError(getFirebaseErrorMessage(err.code));
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setError("");
        setIsSubmitting(true);
        try {
            await loginWithGoogle();
            navigate("/dashboard");
        } catch (err) {
            setError(getFirebaseErrorMessage(err.code));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background"
            >
                <div className="w-full max-w-md space-y-8">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => navigate("/home")}>
                            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                                <HeartPulse className="w-5 h-5 text-primary-foreground" />
                            </div>
                            <span className="text-xl font-bold hover:text-primary transition-colors">Vitality</span>
                        </div>
                        <h1 className="text-3xl font-bold">{t("Auth.CreateAccount")}</h1>
                        <p className="text-muted-foreground">{t("Auth.SignUpDesc")}</p>
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleGoogleSignIn}
                        disabled={isSubmitting}
                        className="w-full h-12 rounded-xl gap-3 text-sm font-medium border-border hover:bg-secondary transition-colors"
                    >
                        <GoogleIcon />
                        {t("Auth.ContinueGoogle")}
                    </Button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-border" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-3 text-muted-foreground">{t("Auth.OrEmail")}</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="name">{t("Auth.FullName")}</Label>
                            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className="h-12 rounded-xl" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">{t("Auth.Email")}</Label>
                            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="h-12 rounded-xl" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">{t("Auth.Password")}</Label>
                            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min. 6 characters" className="h-12 rounded-xl" required minLength={6} />
                        </div>

                        {error && (
                            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                                <p className="text-sm text-destructive">{error}</p>
                            </div>
                        )}

                        <Button type="submit" disabled={isSubmitting} className="w-full h-12 rounded-xl bg-primary text-primary-foreground gap-2">
                            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <><span>{t("Auth.CreateBtn")}</span><ArrowRight className="w-4 h-4" /></>}
                        </Button>
                    </form>

                    <div className="text-center">
                        <span className="text-sm text-muted-foreground">{t("Auth.HaveAccount")} </span>
                        <Link to="/login" className="text-sm text-primary hover:underline font-medium">{t("Auth.SignInBtn")}</Link>
                    </div>
                </div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="hidden lg:flex w-1/2 relative overflow-hidden">
                <img src={authIllustration} alt={t("Auth.IllustrationAlt")} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-foreground/40" />
                <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="space-y-6">
                        <div className="w-16 h-16 rounded-2xl bg-primary/20 backdrop-blur-sm flex items-center justify-center mx-auto border border-primary/30">
                            <HeartPulse className="w-8 h-8 text-primary-foreground" />
                        </div>
                        <blockquote className="text-2xl md:text-3xl font-bold text-primary-foreground leading-snug max-w-md">"{t("Auth.Quote")}"</blockquote>
                        <p className="text-primary-foreground/70 max-w-sm">{t("Auth.QuoteDesc")}</p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Signup;
