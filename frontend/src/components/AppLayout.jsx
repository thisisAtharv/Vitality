import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AppSidebar from "@/components/AppSidebar";
import UserAvatarDropdown from "@/components/UserAvatarDropdown";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const AppLayout = () => {
    const { isAuthenticated } = useAuth();
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== "undefined") {
            return document.documentElement.classList.contains("dark");
        }
        return false;
    });

    // Listen for dark mode changes from Settings page (via class mutations)
    useEffect(() => {
        const observer = new MutationObserver(() => {
            const hasDark = document.documentElement.classList.contains("dark");
            setIsDark(hasDark);
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
        return () => observer.disconnect();
    }, []);

    const toggleDark = () => {
        const next = !isDark;
        setIsDark(next);
        if (next) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="flex min-h-screen w-full bg-background">
            <AppSidebar />

            <div className="flex-1 flex flex-col min-h-screen">
                {/* Top header bar */}
                <header className="h-16 border-b border-border bg-background/80 backdrop-blur-sm flex items-center justify-end px-6 gap-4 sticky top-0 z-30">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleDark}
                        className="rounded-lg"
                    >
                        {isDark ? (
                            <Sun className="w-5 h-5 text-muted-foreground" />
                        ) : (
                            <Moon className="w-5 h-5 text-muted-foreground" />
                        )}
                    </Button>
                    <UserAvatarDropdown />
                </header>

                {/* Page content */}
                <main className="flex-1 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AppLayout;
