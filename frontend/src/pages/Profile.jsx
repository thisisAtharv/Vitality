import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera, User, Save, Loader2, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { updateProfile } from "firebase/auth";
import { auth } from "@/firebase";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Profile = () => {
    const { user } = useAuth();
    const { t } = useTranslation();
    const fileInputRef = useRef(null);

    const [avatarUrl, setAvatarUrl] = useState(user?.photoURL || "");
    const [form, setForm] = useState({
        phone: "",
        location: "",
        blood_type: "",
        allergies: "None",
        medical_conditions: "",
        height: "",
        weight: "",
        age: "",
    });
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [uploading, setUploading] = useState(false);

    // Fetch profile from backend on mount
    useEffect(() => {
        if (!user?.uid) return;
        fetch(`${API}/api/user/profile?uid=${user.uid}`)
            .then((r) => r.json())
            .then((data) => {
                if (!data.error) {
                    setForm({
                        phone: data.phone || "",
                        location: data.location || "",
                        blood_type: data.blood_type || "",
                        allergies: data.allergies || "None",
                        medical_conditions: data.medical_conditions || "",
                        height: data.height || "",
                        weight: data.weight || "",
                        age: data.age || "",
                    });
                }
            })
            .catch(console.error);
    }, [user?.uid]);

    // Keep avatar in sync with auth state
    useEffect(() => {
        if (user?.photoURL) setAvatarUrl(user.photoURL);
    }, [user?.photoURL]);

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        setSaved(false);
    };

    const handleSave = async () => {
        if (!user?.uid) return;
        setSaving(true);
        try {
            await fetch(`${API}/api/user/update_profile`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ uid: user.uid, ...form }),
            });
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (e) {
            console.error("Save error:", e);
        } finally {
            setSaving(false);
        }
    };

    const handlePhotoUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file || !user?.uid) return;
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append("uid", user.uid);
            formData.append("photo", file);
            const res = await fetch(`${API}/api/user/upload_photo`, {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (data.photo_url) {
                // Update Firebase Auth photoURL
                await updateProfile(auth.currentUser, { photoURL: data.photo_url });
                setAvatarUrl(data.photo_url);
            }
        } catch (err) {
            console.error("Photo upload error:", err);
        } finally {
            setUploading(false);
        }
    };

    const initials = user?.name
        ? user.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
        : "U";

    const fields = [
        { key: "height", label: t("Profile.Height"), placeholder: "e.g. 175 cm" },
        { key: "weight", label: t("Profile.Weight"), placeholder: "e.g. 72 kg" },
        { key: "blood_type", label: t("Profile.BloodType"), placeholder: "e.g. O+" },
        { key: "allergies", label: t("Profile.Allergies"), placeholder: "e.g. Peanuts, Dust" },
        { key: "age", label: t("Profile.Age"), placeholder: "e.g. 30" },
        { key: "phone", label: t("Profile.Phone"), placeholder: "+91 ..." },
        { key: "location", label: t("Profile.Location"), placeholder: "e.g. Mumbai, IN" },
        { key: "medical_conditions", label: t("Profile.MedConditions"), placeholder: "e.g. Diabetes, Asthma" },
    ];

    return (
        <div className="p-6 md:p-10 max-w-5xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
            >
                <div>
                    <h1 className="text-3xl font-bold">{t("Profile.Title")}</h1>
                    <p className="text-muted-foreground mt-1">
                        {t("Profile.Subtitle")}
                    </p>
                </div>

                <div className="grid md:grid-cols-[280px_1fr] gap-8">
                    {/* Left - Avatar card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="rounded-xl border border-border bg-card shadow-sm p-8 flex flex-col items-center text-center gap-4"
                    >
                        <Avatar className="w-24 h-24">
                            {avatarUrl ? (
                                <AvatarImage src={avatarUrl} alt={user?.name} />
                            ) : null}
                            <AvatarFallback className="text-2xl bg-primary/10 text-primary font-bold">
                                {initials}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 className="text-xl font-semibold">{user?.name || "User"}</h2>
                            <p className="text-sm text-muted-foreground">{user?.email}</p>
                        </div>
                        {form.age && (
                            <p className="text-sm text-muted-foreground">
                                {t("Profile.Age")}: {form.age}
                            </p>
                        )}
                        <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/*"
                            className="hidden"
                            onChange={handlePhotoUpload}
                        />
                        <Button
                            variant="outline"
                            className="rounded-xl gap-2 w-full"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading}
                        >
                            {uploading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Camera className="w-4 h-4" />
                            )}
                            {uploading ? t("Profile.Saving") || "Uploading..." : t("Profile.EditPhoto")}
                        </Button>
                    </motion.div>

                    {/* Right - Editable medical fields */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="rounded-xl border border-border bg-card shadow-sm p-8"
                    >
                        <div className="flex items-center gap-2 mb-6">
                            <User className="w-5 h-5 text-primary" />
                            <h3 className="text-lg font-semibold">{t("Profile.MedConstants")}</h3>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-5">
                            {fields.map((f) => (
                                <div key={f.key} className="space-y-1.5">
                                    <label className="text-xs text-muted-foreground uppercase tracking-wider">
                                        {f.label}
                                    </label>
                                    <input
                                        type="text"
                                        value={form[f.key]}
                                        onChange={(e) => handleChange(f.key, e.target.value)}
                                        placeholder={f.placeholder}
                                        className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 flex justify-end">
                            <Button
                                onClick={handleSave}
                                disabled={saving}
                                className="rounded-xl gap-2 min-w-[140px]"
                            >
                                {saving ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : saved ? (
                                    <CheckCircle className="w-4 h-4" />
                                ) : (
                                    <Save className="w-4 h-4" />
                                )}
                                {saving ? t("Profile.Saving") : saved ? t("Profile.Saved") : t("Profile.SaveChanges")}
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Profile;
