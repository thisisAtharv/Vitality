import { motion } from "framer-motion";
import { Brain, Dna, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

const LoadingAnalysis = () => {
    const { t } = useTranslation();
    return (
        <section className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-8"
            >
                {/* Molecular animation */}
                <div className="relative w-32 h-32 mx-auto">
                    {/* Spinning rings */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-2 border-primary/30 rounded-full"
                    />
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-2 border-2 border-accent/30 rounded-full"
                    />
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-4 border-2 border-primary/40 rounded-full"
                    />

                    {/* Center icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow"
                        >
                            <Dna className="w-8 h-8 text-primary-foreground" />
                        </motion.div>
                    </div>

                    {/* Orbiting dots */}
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            animate={{ rotate: 360 }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "linear",
                                delay: i * 0.3,
                            }}
                            className="absolute inset-0"
                            style={{ transformOrigin: "center" }}
                        >
                            <div
                                className="absolute w-3 h-3 rounded-full bg-primary shadow-glow"
                                style={{ top: 0, left: "50%", transform: "translateX(-50%)" }}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Loading text */}
                <div className="space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center justify-center gap-2"
                    >
                        <Brain className="w-5 h-5 text-primary" />
                        <span className="text-xl font-semibold">{t("Loader.Analyzing")}</span>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-muted-foreground"
                    >
                        {t("Loader.Processing")}
                    </motion.p>

                    {/* Molecular dots loader */}
                    <div className="flex justify-center gap-2 pt-4">
                        <div className="molecular-dot" />
                        <div className="molecular-dot" />
                        <div className="molecular-dot" />
                    </div>
                </div>

                {/* Progress indicators */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-3 max-w-xs mx-auto"
                >
                    {[
                        { label: t("Loader.Step1"), done: true },
                        { label: t("Loader.Step2"), done: true },
                        { label: t("Loader.Step3"), done: false },
                    ].map((item, index) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 + index * 0.2 }}
                            className="flex items-center gap-3 text-sm"
                        >
                            <div
                                className={`w-5 h-5 rounded-full flex items-center justify-center ${item.done
                                    ? "bg-accent text-accent-foreground"
                                    : "bg-primary/20"
                                    }`}
                            >
                                {item.done ? (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 1 + index * 0.2 }}
                                    >
                                        ✓
                                    </motion.span>
                                ) : (
                                    <Sparkles className="w-3 h-3 text-primary animate-pulse" />
                                )}
                            </div>
                            <span className={item.done ? "text-foreground" : "text-muted-foreground"}>
                                {item.label}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
};

export default LoadingAnalysis;
