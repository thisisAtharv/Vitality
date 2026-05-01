import { motion } from "framer-motion";
import { ArrowRight, FileUp, Brain, ClipboardList, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.png";

const steps = [
    {
        icon: FileUp,
        title: "Upload Report",
        description: "Enter your blood test parameters",
    },
    {
        icon: Brain,
        title: "AI Analysis",
        description: "Our ML model analyzes your data",
    },
    {
        icon: ClipboardList,
        title: "Get Plan",
        description: "Receive personalized recommendations",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
};

const HeroSection = ({ onGetStarted }) => {
    return (
        <section className="min-h-screen bg-gradient-hero relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 py-12 lg:py-20">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[80vh]">
                    {/* Left content */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-8"
                    >
                        <motion.div variants={itemVariants} className="space-y-2">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                                <Sparkles className="w-4 h-4" />
                                AI-Powered Health Insights
                            </div>
                        </motion.div>

                        <motion.h1
                            variants={itemVariants}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                        >
                            Your Bloodwork,{" "}
                            <span className="gradient-text">Decoded.</span>
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className="text-lg md:text-xl text-muted-foreground max-w-lg"
                        >
                            Transform complex blood test results into actionable diet and workout
                            plans tailored specifically to your body's needs.
                        </motion.p>

                        <motion.div variants={itemVariants}>
                            <div className="relative inline-block">
                                {/* Pulse ring animation */}
                                <span className="pulse-ring bg-primary/30" />
                                <span className="pulse-ring bg-primary/20" style={{ animationDelay: "0.5s" }} />
                                <Button
                                    size="lg"
                                    onClick={onGetStarted}
                                    className="relative bg-gradient-primary hover:opacity-90 text-lg px-8 py-6 rounded-2xl shadow-glow transition-all duration-300 hover:shadow-glow-accent"
                                >
                                    Get Started
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </div>
                        </motion.div>

                        {/* How it works steps */}
                        <motion.div variants={itemVariants} className="pt-8">
                            <p className="text-sm font-medium text-muted-foreground mb-6">
                                How it works
                            </p>
                            <div className="flex flex-wrap gap-4">
                                {steps.map((step, index) => (
                                    <motion.div
                                        key={step.title}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.6 + index * 0.15 }}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary">
                                            <step.icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm">{step.title}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {step.description}
                                            </p>
                                        </div>
                                        {index < steps.length - 1 && (
                                            <ArrowRight className="w-4 h-4 text-muted-foreground/50 hidden md:block ml-2" />
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="relative"
                    >
                        <div className="relative">
                            {/* Floating effect container */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="relative z-10"
                            >
                                <div className="glass-card rounded-3xl overflow-hidden p-2">
                                    <img
                                        src={heroImage}
                                        alt="Healthy lifestyle with fresh vegetables and fitness equipment"
                                        className="w-full h-auto rounded-2xl object-cover aspect-[16/10]"
                                    />
                                </div>
                            </motion.div>

                            {/* Decorative elements */}
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
                            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />

                            {/* Stats cards */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8 }}
                                className="absolute -right-4 top-1/4 glass-card rounded-2xl p-4 shadow-glass"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                                        <span className="text-accent font-bold">✓</span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">Health Score</p>
                                        <p className="font-bold text-lg">92/100</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1 }}
                                className="absolute -left-4 bottom-1/4 glass-card rounded-2xl p-4 shadow-glass"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                        <Brain className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">AI Analysis</p>
                                        <p className="font-bold text-lg">Complete</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
