import { useTranslation } from 'react-i18next';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe } from 'lucide-react';

const LanguageSwitcher = ({ variant = "full" }) => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className={`flex items-center gap-3 ${variant === "minimal" ? "" : "w-full"}`}>
            {variant === "full" && (
                <>
                    <Globe className="w-5 h-5 text-muted-foreground" />
                    <div>
                        <p className="font-medium">Language</p>
                        <p className="text-sm text-muted-foreground">Select your preferred language</p>
                    </div>
                </>
            )}
            <Select value={i18n.language} onValueChange={changeLanguage}>
                <SelectTrigger className={`w-[140px] ${variant === "full" ? "ml-auto" : ""}`}>
                    <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="en">English (EN)</SelectItem>
                    <SelectItem value="hi">Hindi (HI)</SelectItem>
                    <SelectItem value="mr">Marathi (MR)</SelectItem>
                    <SelectItem value="ta">Tamil (TA)</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};

export default LanguageSwitcher;
