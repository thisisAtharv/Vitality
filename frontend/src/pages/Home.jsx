import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    ArrowRight,
    Brain,
    Salad,
    ShieldAlert,
    FileUp,
    Cpu,
    ClipboardCheck,
    HeartPulse,
} from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslation } from "react-i18next";

const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Home = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const features = [
        { icon: Brain, title: t("Landing.F1Title"), description: t("Landing.F1Desc") },
        { icon: Salad, title: t("Landing.F2Title"), description: t("Landing.F2Desc") },
        { icon: ShieldAlert, title: t("Landing.F3Title"), description: t("Landing.F3Desc") },
    ];

    const steps = [
        { icon: FileUp, label: t("Landing.S1Title"), description: t("Landing.S1Desc") },
        { icon: Cpu, label: t("Landing.S2Title"), description: t("Landing.S2Desc") },
        { icon: ClipboardCheck, label: t("Landing.S3Title"), description: t("Landing.S3Desc") },
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Navbar */}
            <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
                <div className="container mx-auto flex h-16 items-center justify-between px-6">
                    <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                            <HeartPulse className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <span className="text-lg font-bold">Vitality</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <LanguageSwitcher variant="minimal" />
                        <Button
                            variant="ghost"
                            onClick={() => navigate("/login")}
                            className="rounded-xl"
                        >
                            {t("Landing.SignIn")}
                        </Button>
                        <Button
                            onClick={() => navigate("/signup")}
                            className="rounded-xl bg-primary text-primary-foreground gap-1"
                        >
                            {t("Landing.GetStarted")} <ArrowRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </header>

            {/* Hero */}
            <section className="relative overflow-hidden bg-gradient-hero">
                {/* Decorative blurs */}
                <div className="pointer-events-none absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
                <div className="pointer-events-none absolute bottom-10 right-10 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />

                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="visible"
                    className="container mx-auto flex flex-col items-center text-center px-6 py-28 md:py-36 gap-6"
                >
                    <motion.div
                        variants={fadeUp}
                        className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
                    >
                        <HeartPulse className="w-4 h-4" />
                        {t("Landing.Tagline")}
                    </motion.div>

                    <motion.h1
                        variants={fadeUp}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl"
                    >
                        {t("Landing.HeroTitle1")}{" "}
                        <span className="gradient-text">{t("Landing.HeroTitle2")}</span>
                    </motion.h1>

                    <motion.p
                        variants={fadeUp}
                        className="text-lg md:text-xl text-muted-foreground max-w-2xl"
                    >
                        {t("Landing.HeroSubtitle")}
                    </motion.p>

                    <motion.div variants={fadeUp} className="flex gap-4 pt-4">
                        <Button
                            size="lg"
                            onClick={() => navigate("/signup")}
                            className="rounded-xl bg-primary text-primary-foreground px-8 py-6 text-lg gap-2 shadow-glow hover:opacity-90 transition-opacity"
                        >
                            {t("Landing.GetStarted")}
                            <ArrowRight className="w-5 h-5" />
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            onClick={() => {
                                document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="rounded-xl px-8 py-6 text-lg"
                        >
                            {t("Landing.LearnMore")}
                        </Button>
                    </motion.div>
                </motion.div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-24 bg-background">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold">
                            {t("Landing.FeaturesTitle")}
                        </h2>
                        <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
                            {t("Landing.FeaturesSubtitle")}
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((f, i) => (
                            <motion.div
                                key={f.title}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="rounded-xl border border-border bg-card p-8 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                                    <f.icon className="w-7 h-7 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {f.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it Works */}
            <section className="py-24 bg-secondary/50">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold">{t("Landing.HowTitle")}</h2>
                        <p className="text-muted-foreground mt-3">
                            {t("Landing.HowSubtitle")}
                        </p>
                    </motion.div>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
                        {steps.map((s, i) => (
                            <motion.div
                                key={s.label}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                                className="flex flex-col items-center text-center"
                            >
                                <div className="w-20 h-20 rounded-2xl bg-card border border-border shadow-md flex items-center justify-center mb-4">
                                    <s.icon className="w-9 h-9 text-primary" />
                                </div>
                                <h3 className="font-semibold text-lg">{s.label}</h3>
                                <p className="text-sm text-muted-foreground max-w-[180px] mt-1">
                                    {s.description}
                                </p>
                                {i < steps.length - 1 && (
                                    <ArrowRight className="w-5 h-5 text-muted-foreground/40 rotate-90 md:rotate-0 mt-4 md:hidden" />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-10 border-t border-border">
                <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
                    © 2026 Vitality. {t("Landing.Footer")}
                </div>
            </footer>
        </div>
    );
};

export default Home;
