import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, User, Activity, Droplets, Dumbbell, Heart, Pill, Ruler, Baby, Wind, Salad, UploadCloud, FileText, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const steps = [
    { id: 1, title: "Personal", key: "Personal", icon: User },
    { id: 2, title: "Blood Data", key: "BloodData", icon: Droplets },
    { id: 3, title: "Lifestyle", key: "Lifestyle", icon: Dumbbell },
];

const InputWizard = ({ onSubmit }) => {
    const { t } = useTranslation();
    const [currentStep, setCurrentStep] = useState(1);
    const [showDisclaimer, setShowDisclaimer] = useState(false);
    const [pdfFile, setPdfFile] = useState(null);
    const [isExtracting, setIsExtracting] = useState(false);
    const [isExtracted, setIsExtracted] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        age: 30,
        weight: 70,
        height: 170,
        gender: "male",
        hemoglobin: 14,
        glucose: 100,
        cholesterol: 180,
        systolicBP: 120,
        diastolicBP: 80,
        iron: 100,
        vitaminD: 30,
        hba1c: 5.4,
        tsh: 2.5,
        activityLevel: "moderate",
        dietPreference: "vegetarian",
        isPregnant: false,
        trimester: 0,
        historyAsthma: false,
    });

    const updateField = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const nextStep = () => {
        if (currentStep < 3) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
        else navigate("/dashboard");
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === "application/pdf") {
            setPdfFile(file);
            setIsExtracted(false); // Reset extraction state on new file
        }
    };

    const handleExtract = async () => {
        if (!pdfFile) return;
        setIsExtracting(true);
        try {
            const formDataPayload = new FormData();
            formDataPayload.append('data', pdfFile);

            const response = await fetch('https://n8n.atharvgangawane.me/webhook/extract-blood-report', {
                method: 'POST',
                body: formDataPayload,
            });

            if (!response.ok) throw new Error("Failed to extract data");
            const rawResponse = await response.json();
            const groqData = Array.isArray(rawResponse) ? rawResponse[0] : rawResponse;
            const contentString = groqData.choices[0].message.content;

            // Clean markdown code blocks if the LLM returned any
            const cleanedContent = contentString.replace(/```json\n?|\n?```/g, "").trim();
            const data = JSON.parse(cleanedContent);

            // ONLY update blood panel variables mapping exactly to n8n json response
            if (data.ap_hi !== undefined) updateField('systolicBP', parseFloat(data.ap_hi) || formData.systolicBP);
            if (data.ap_lo !== undefined) updateField('diastolicBP', parseFloat(data.ap_lo) || formData.diastolicBP);
            if (data.cholesterol !== undefined) updateField('cholesterol', parseFloat(data.cholesterol) || formData.cholesterol);
            if (data.gluc !== undefined) updateField('glucose', parseFloat(data.gluc) || formData.glucose);
            if (data.hemoglobin !== undefined) updateField('hemoglobin', parseFloat(data.hemoglobin) || formData.hemoglobin);
            if (data.iron !== undefined) updateField('iron', parseFloat(data.iron) || formData.iron);
            if (data.vitamin_d !== undefined) updateField('vitaminD', parseFloat(data.vitamin_d) || formData.vitaminD);
            if (data.hba1c !== undefined) updateField('hba1c', parseFloat(data.hba1c) || formData.hba1c);
            if (data.tsh !== undefined) updateField('tsh', parseFloat(data.tsh) || formData.tsh);

            setIsExtracted(true);
        } catch (error) {
            console.error("Extraction error:", error);
        } finally {
            setIsExtracting(false);
        }
    };

    const handleAnalyzeClick = () => {
        setShowDisclaimer(true);
    };

    const handleConfirmDisclaimer = () => {
        setShowDisclaimer(false);
        onSubmit(formData);
    };

    const progress = (currentStep / 3) * 100;

    return (
        <section className="min-h-full flex items-center justify-center p-4 py-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-2xl"
            >
                {/* Progress bar */}
                <div className="mb-8">
                    <div className="flex justify-between mb-4">
                        {steps.map((step) => (
                            <div key={step.id} className="flex flex-col items-center gap-2">
                                <div
                                    className={`step-indicator ${currentStep === step.id
                                        ? "active"
                                        : currentStep > step.id
                                            ? "completed"
                                            : "inactive"
                                        }`}
                                >
                                    <step.icon className="w-5 h-5" />
                                </div>
                                <span
                                    className={`text-xs font-medium ${currentStep >= step.id
                                        ? "text-foreground"
                                        : "text-muted-foreground"
                                        }`}
                                >
                                    {t("Input." + step.key)}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-primary rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                </div>

                {/* Card */}
                <div className="glass-card rounded-3xl p-8 md:p-12">
                    {/* Step 1: Personal */}
                    {currentStep === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-8"
                        >
                            <div className="text-center space-y-2">
                                <h2 className="text-2xl md:text-3xl font-bold">
                                    {t("Input.Personal")}
                                </h2>
                                <p className="text-muted-foreground">
                                    {t("Input.Age")}
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <Label className="text-base font-medium">
                                        {t("Input.Age")}: <span className="text-primary font-bold">{formData.age}</span>
                                    </Label>
                                    <Slider
                                        value={[formData.age]}
                                        onValueChange={([value]) => updateField("age", value)}
                                        min={18}
                                        max={100}
                                        step={1}
                                        className="py-4"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <Label className="text-base font-medium">
                                        {t("Input.Weight")}: <span className="text-primary font-bold">{formData.weight} {t("Input.KG")}</span>
                                    </Label>
                                    <Slider
                                        value={[formData.weight]}
                                        onValueChange={([value]) => updateField("weight", value)}
                                        min={40}
                                        max={200}
                                        step={1}
                                        className="py-4"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <Label className="text-base font-medium">
                                        {t("Input.Height")}: <span className="text-primary font-bold">{formData.height} {t("Input.CM")}</span>
                                    </Label>
                                    <Slider
                                        value={[formData.height]}
                                        onValueChange={([value]) => updateField("height", value)}
                                        min={120}
                                        max={220}
                                        step={1}
                                        className="py-4"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <Label className="text-base font-medium">{t("Input.Gender")}</Label>
                                    <Select
                                        value={formData.gender}
                                        onValueChange={(value) => {
                                            updateField("gender", value);
                                            if (value === "male") {
                                                updateField("isPregnant", false);
                                                updateField("trimester", 0);
                                            }
                                        }}
                                    >
                                        <SelectTrigger className="h-12 rounded-xl">
                                            <SelectValue placeholder={t("Input.Gender")} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="male">{t("Input.Male")}</SelectItem>
                                            <SelectItem value="female">{t("Input.Female")}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 2: Blood Parameters */}
                    {currentStep === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-8"
                        >
                            <div className="text-center space-y-2">
                                <h2 className="text-2xl md:text-3xl font-bold">
                                    {t("Input.BloodTitle")}
                                </h2>
                                <p className="text-muted-foreground">
                                    {t("Input.BloodDesc")}
                                </p>
                            </div>

                            {/* Dropzone */}
                            <div className="relative p-6 border-2 border-dashed border-border rounded-xl bg-secondary/50 flex flex-col items-center justify-center text-center space-y-4 hover:bg-secondary/80 transition-colors">
                                {!pdfFile ? (
                                    <>
                                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                            <UploadCloud className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-foreground">Have a recent lab report? Upload PDF to auto-fill.</p>
                                            <p className="text-sm text-muted-foreground mt-1">Extracts blood parameters automatically using AI.</p>
                                        </div>
                                        <input
                                            type="file"
                                            accept="application/pdf"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            onChange={handleFileChange}
                                        />
                                    </>
                                ) : isExtracted ? (
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="flex flex-col items-center space-y-3"
                                    >
                                        <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                                            <CheckCircle2 className="w-6 h-6 text-green-500" />
                                        </div>
                                        <p className="font-semibold text-green-600 dark:text-green-400">Data Extracted Successfully!</p>
                                        <p className="text-sm text-muted-foreground">Blood parameters have been auto-filled below.</p>
                                    </motion.div>
                                ) : (
                                    <>
                                        <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                                            <FileText className="w-6 h-6 text-green-500" />
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <p className="font-medium text-foreground">{pdfFile.name}</p>
                                            <p className="text-xs text-muted-foreground mt-1">{(pdfFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                        </div>
                                        <Button
                                            type="button"
                                            onClick={handleExtract}
                                            disabled={isExtracting}
                                            className="gap-2 z-10 relative"
                                        >
                                            {isExtracting ? (
                                                <><Loader2 className="w-4 h-4 animate-spin" /> Extracting... (Please wait)</>
                                            ) : (
                                                <><UploadCloud className="w-4 h-4" /> Extract Data with AI</>
                                            )}
                                        </Button>
                                    </>
                                )}
                            </div>

                            <div className="space-y-8">
                                {/* Blood Pressure */}
                                <div className="space-y-3">
                                    <Label className="text-base font-semibold flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-rose-light flex items-center justify-center">
                                            <Heart className="w-4 h-4 text-rose" />
                                        </div>
                                        {t("Input.BP")}
                                    </Label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="systolicBP" className="text-sm text-muted-foreground">{t("Input.Sys")}</Label>
                                            <Input
                                                id="systolicBP"
                                                type="number"
                                                value={formData.systolicBP}
                                                onChange={(e) => updateField("systolicBP", parseFloat(e.target.value) || 0)}
                                                className="h-12 text-lg rounded-xl"
                                                placeholder="120"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="diastolicBP" className="text-sm text-muted-foreground">{t("Input.Dia")}</Label>
                                            <Input
                                                id="diastolicBP"
                                                type="number"
                                                value={formData.diastolicBP}
                                                onChange={(e) => updateField("diastolicBP", parseFloat(e.target.value) || 0)}
                                                className="h-12 text-lg rounded-xl"
                                                placeholder="80"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Blood Parameters */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <Label htmlFor="glucose" className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-amber-light flex items-center justify-center">
                                                <Activity className="w-4 h-4 text-amber" />
                                            </div>
                                            {t("Input.Glucose")}
                                        </Label>
                                        <Input
                                            id="glucose"
                                            type="number"
                                            value={formData.glucose}
                                            onChange={(e) => updateField("glucose", parseFloat(e.target.value) || 0)}
                                            className="h-12 text-lg rounded-xl"
                                            placeholder="70-100"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <Label htmlFor="cholesterol" className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-teal-light flex items-center justify-center">
                                                <Activity className="w-4 h-4 text-teal" />
                                            </div>
                                            {t("Input.Chol")}
                                        </Label>
                                        <Input
                                            id="cholesterol"
                                            type="number"
                                            value={formData.cholesterol}
                                            onChange={(e) => updateField("cholesterol", parseFloat(e.target.value) || 0)}
                                            className="h-12 text-lg rounded-xl"
                                            placeholder="< 200"
                                        />
                                    </div>
                                </div>

                                {/* Nutritional Profile */}
                                <div className="space-y-3">
                                    <Label className="text-base font-semibold flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-emerald-light flex items-center justify-center">
                                            <Pill className="w-4 h-4 text-emerald" />
                                        </div>
                                        {t("Input.Nutri")}
                                    </Label>
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="hemoglobin" className="text-sm text-muted-foreground">{t("Input.Hb")}</Label>
                                            <Input
                                                id="hemoglobin"
                                                type="number"
                                                value={formData.hemoglobin}
                                                onChange={(e) => updateField("hemoglobin", parseFloat(e.target.value) || 0)}
                                                className="h-12 text-lg rounded-xl"
                                                placeholder="12-17"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="iron" className="text-sm text-muted-foreground">{t("Input.Iron")}</Label>
                                            <Input
                                                id="iron"
                                                type="number"
                                                value={formData.iron}
                                                onChange={(e) => updateField("iron", parseFloat(e.target.value) || 0)}
                                                className="h-12 text-lg rounded-xl"
                                                placeholder="50-170"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="vitaminD" className="text-sm text-muted-foreground">{t("Input.VitD")}</Label>
                                            <Input
                                                id="vitaminD"
                                                type="number"
                                                value={formData.vitaminD}
                                                onChange={(e) => updateField("vitaminD", parseFloat(e.target.value) || 0)}
                                                className="h-12 text-lg rounded-xl"
                                                placeholder="20-50"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Additional Blood Markers */}
                                <div className="space-y-3">
                                    <Label className="text-base font-semibold flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <Droplets className="w-4 h-4 text-primary" />
                                        </div>
                                        {t("Input.AddMarkers")}
                                    </Label>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="hba1c" className="text-sm text-muted-foreground">{t("Input.HbA1c")}</Label>
                                            <Input
                                                id="hba1c"
                                                type="number"
                                                step="0.1"
                                                value={formData.hba1c}
                                                onChange={(e) => updateField("hba1c", parseFloat(e.target.value) || 0)}
                                                className="h-12 text-lg rounded-xl"
                                                placeholder="4.0-5.6"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="tsh" className="text-sm text-muted-foreground">{t("Input.TSH")}</Label>
                                            <Input
                                                id="tsh"
                                                type="number"
                                                step="0.1"
                                                value={formData.tsh}
                                                onChange={(e) => updateField("tsh", parseFloat(e.target.value) || 0)}
                                                className="h-12 text-lg rounded-xl"
                                                placeholder="0.4-4.0"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3: Lifestyle & Medical History */}
                    {currentStep === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-8"
                        >
                            <div className="text-center space-y-2">
                                <h2 className="text-2xl md:text-3xl font-bold">
                                    {t("Input.LifeTitle")}
                                </h2>
                                <p className="text-muted-foreground">
                                    {t("Input.LifeDesc")}
                                </p>
                            </div>

                            <div className="space-y-6">
                                {/* Activity Level */}
                                <div className="space-y-3">
                                    <Label className="text-base font-medium">{t("Input.Activity")}</Label>
                                    <div className="grid gap-3">
                                        {[
                                            { value: "sedentary", label: t("Input.Sedentary"), desc: t("Input.SedentaryDesc") },
                                            { value: "light", label: t("Input.Light"), desc: t("Input.LightDesc") },
                                            { value: "moderate", label: t("Input.Moderate"), desc: t("Input.ModerateDesc") },
                                            { value: "active", label: t("Input.Active"), desc: t("Input.ActiveDesc") },
                                            { value: "very-active", label: t("Input.VeryActive"), desc: t("Input.VeryActiveDesc") },
                                        ].map((level) => (
                                            <button
                                                key={level.value}
                                                onClick={() => updateField("activityLevel", level.value)}
                                                className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${formData.activityLevel === level.value
                                                    ? "border-primary bg-primary/5"
                                                    : "border-border hover:border-primary/30"
                                                    }`}
                                            >
                                                <div
                                                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${formData.activityLevel === level.value
                                                        ? "border-primary"
                                                        : "border-muted-foreground/30"
                                                        }`}
                                                >
                                                    {formData.activityLevel === level.value && (
                                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-medium">{level.label}</p>
                                                    <p className="text-sm text-muted-foreground">{level.desc}</p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Dietary Preference */}
                                <div className="space-y-3">
                                    <Label className="text-base font-semibold flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-emerald-light flex items-center justify-center">
                                            <Salad className="w-4 h-4 text-emerald" />
                                        </div>
                                        {t("Input.Diet")}
                                    </Label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {[
                                            { value: "vegetarian", label: t("Input.Veg"), desc: "" },
                                            { value: "non-vegetarian", label: t("Input.NonVeg"), desc: "" },
                                        ].map((pref) => (
                                            <button
                                                key={pref.value}
                                                onClick={() => updateField("dietPreference", pref.value)}
                                                className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${formData.dietPreference === pref.value
                                                    ? "border-primary bg-primary/5"
                                                    : "border-border hover:border-primary/30"
                                                    }`}
                                            >
                                                <div
                                                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${formData.dietPreference === pref.value
                                                        ? "border-primary"
                                                        : "border-muted-foreground/30"
                                                        }`}
                                                >
                                                    {formData.dietPreference === pref.value && (
                                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-medium">{pref.label}</p>
                                                    <p className="text-sm text-muted-foreground">{pref.desc}</p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Medical History */}
                                <div className="space-y-4">
                                    <Label className="text-base font-semibold flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-rose-light flex items-center justify-center">
                                            <Heart className="w-4 h-4 text-rose" />
                                        </div>
                                        {t("Input.MedHistory")}
                                    </Label>

                                    {/* Pregnancy — only show for female */}
                                    {formData.gender === "female" && (
                                        <div className="flex items-center justify-between p-4 rounded-xl border border-border">
                                            <div className="flex items-center gap-3">
                                                <Baby className="w-5 h-5 text-muted-foreground" />
                                                <div>
                                                    <p className="font-medium">{t("Input.Pregnant")}</p>
                                                </div>
                                            </div>
                                            <Switch
                                                checked={formData.isPregnant}
                                                onCheckedChange={(val) => {
                                                    updateField("isPregnant", val);
                                                    if (!val) updateField("trimester", 0);
                                                }}
                                            />
                                        </div>
                                    )}

                                    {/* Trimester — only show if pregnant */}
                                    {formData.gender === "female" && formData.isPregnant && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            className="pl-4 space-y-2"
                                        >
                                            <Label className="text-sm font-medium">{t("Input.Trimester")}</Label>
                                            <Select
                                                value={String(formData.trimester)}
                                                onValueChange={(value) => updateField("trimester", parseInt(value))}
                                            >
                                                <SelectTrigger className="h-12 rounded-xl">
                                                    <SelectValue placeholder={t("Input.SelectTrimester")} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1">{t("Input.Tri1")}</SelectItem>
                                                    <SelectItem value="2">{t("Input.Tri2")}</SelectItem>
                                                    <SelectItem value="3">{t("Input.Tri3")}</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </motion.div>
                                    )}

                                    {/* Asthma History */}
                                    <div className="flex items-center justify-between p-4 rounded-xl border border-border">
                                        <div className="flex items-center gap-3">
                                            <Wind className="w-5 h-5 text-muted-foreground" />
                                            <div>
                                                <p className="font-medium">{t("Input.Asthma")}</p>
                                            </div>
                                        </div>
                                        <Switch
                                            checked={formData.historyAsthma}
                                            onCheckedChange={(val) => updateField("historyAsthma", val)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Navigation */}
                    <div className="flex justify-between mt-10">
                        <Button
                            variant="ghost"
                            onClick={prevStep}
                            className="gap-2 text-muted-foreground hover:text-foreground"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            {t("Input.Back")}
                        </Button>

                        {currentStep < 3 ? (
                            <Button
                                onClick={nextStep}
                                className="bg-primary text-primary-foreground gap-2 px-8 rounded-xl"
                            >
                                {t("Input.Next")}
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        ) : (
                            <Button
                                onClick={handleAnalyzeClick}
                                className="bg-primary text-primary-foreground gap-2 px-8 rounded-xl"
                            >
                                {t("Input.Analyze")}
                                <Activity className="w-4 h-4" />
                            </Button>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Medical Disclaimer Modal */}
            <Dialog open={showDisclaimer} onOpenChange={setShowDisclaimer}>
                <DialogContent className="sm:max-w-md rounded-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold">{t("Input.DisclaimerTitle")}</DialogTitle>
                        <DialogDescription className="text-base leading-relaxed pt-2">
                            {t("Input.DisclaimerText")}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4">
                        <Button
                            onClick={handleConfirmDisclaimer}
                            className="w-full bg-primary hover:bg-primary/90 rounded-xl"
                        >
                            {t("Input.Understand")}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </section>
    );
};

export default InputWizard;
