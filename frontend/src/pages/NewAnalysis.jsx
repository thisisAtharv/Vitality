import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useHealthData } from "@/contexts/HealthDataContext";
import InputWizard from "@/components/InputWizard";
import LoadingAnalysis from "@/components/LoadingAnalysis";
import { toast } from "@/hooks/use-toast";

const NewAnalysis = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { submitAnalysis } = useHealthData();
    const navigate = useNavigate();

    const handleSubmit = async (data) => {
        setIsLoading(true);
        try {
            await submitAnalysis(data);
            // Show loading animation for at least 2 seconds for UX
            setTimeout(() => {
                navigate("/dashboard");
            }, 2000);
        } catch (err) {
            setIsLoading(false);
            toast({
                title: "Analysis Failed",
                description: err.message || "Could not connect to the server. Make sure the backend is running.",
                variant: "destructive",
            });
        }
    };

    if (isLoading) {
        return <LoadingAnalysis />;
    }

    return <InputWizard onSubmit={handleSubmit} />;
};

export default NewAnalysis;
