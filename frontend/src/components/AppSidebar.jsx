import { useNavigate } from "react-router-dom";
import { NavLink } from "@/components/NavLink";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";
import {
    LayoutDashboard,
    FlaskConical,
    History,
    HeartPulse,
    Home,
    UserCircle,
    Settings,
    LogOut,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const mainNav = [
    { title: "Home", url: "/home", icon: Home },
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "New Analysis", url: "/new-analysis", icon: FlaskConical },
    { title: "History", url: "/history", icon: History },
];

const bottomNav = [
    { title: "Profile", url: "/profile", icon: UserCircle },
    { title: "Settings", url: "/settings", icon: Settings },
];

const AppSidebar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <aside className="w-64 h-screen sticky top-0 border-r border-border bg-sidebar flex flex-col">
            {/* Logo */}
            <div className="p-6 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                    <HeartPulse className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold text-sidebar-foreground">Vitality</span>
            </div>

            {/* Main navigation */}
            <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
                {mainNav.map((item) => (
                    <NavLink
                        key={item.url}
                        to={item.url}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                        activeClassName="bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary"
                    >
                        <item.icon className="w-5 h-5" />
                        <span>{t(`Sidebar.${item.title.replace(" ", "")}`)}</span>
                    </NavLink>
                ))}
            </nav>

            {/* Bottom section */}
            <div className="px-4 pb-4 space-y-1">
                <Separator className="mb-3" />
                {bottomNav.map((item) => (
                    <NavLink
                        key={item.url}
                        to={item.url}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                        activeClassName="bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary"
                    >
                        <item.icon className="w-5 h-5" />
                        <span>{t(`Sidebar.${item.title.replace(" ", "")}`)}</span>
                    </NavLink>
                ))}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-sidebar-foreground/70 hover:bg-destructive/10 hover:text-destructive w-full"
                >
                    <LogOut className="w-5 h-5" />
                    <span>{t("Sidebar.Logout")}</span>
                </button>
            </div>
        </aside>
    );
};

export default AppSidebar;
