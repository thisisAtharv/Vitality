import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User, Settings } from "lucide-react";

const UserAvatarDropdown = () => {
    const { user, logout } = useAuth();
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const initials = user?.name
        ? user.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)
        : "U";

    const handleLogout = () => {
        setOpen(false);
        logout();
        navigate("/login");
    };

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 rounded-full hover:ring-2 hover:ring-primary/20 transition-all"
            >
                <Avatar className="h-9 w-9 border-2 border-primary/20">
                    {user?.photoURL ? (
                        <AvatarImage src={user.photoURL} alt={user.name} />
                    ) : null}
                    <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                        {initials}
                    </AvatarFallback>
                </Avatar>
            </button>

            {open && (
                <div className="absolute right-0 top-12 w-64 bg-popover border border-border rounded-xl shadow-lg z-50 overflow-hidden animate-scale-in">
                    {/* User info */}
                    <div className="p-4 border-b border-border">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                                {user?.photoURL ? (
                                    <AvatarImage src={user.photoURL} alt={user.name} />
                                ) : null}
                                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                                    {initials}
                                </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                                <p className="text-sm font-semibold truncate">{user?.name}</p>
                                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Menu items */}
                    <div className="p-1">
                        <button
                            onClick={() => { setOpen(false); navigate("/profile"); }}
                            className="flex items-center gap-3 w-full px-3 py-2.5 text-sm rounded-lg hover:bg-secondary transition-colors text-foreground"
                        >
                            <User className="w-4 h-4 text-muted-foreground" />
                            Your Profile
                        </button>
                        <button
                            onClick={() => { setOpen(false); navigate("/settings"); }}
                            className="flex items-center gap-3 w-full px-3 py-2.5 text-sm rounded-lg hover:bg-secondary transition-colors text-foreground"
                        >
                            <Settings className="w-4 h-4 text-muted-foreground" />
                            Settings
                        </button>
                    </div>

                    <div className="border-t border-border p-1">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full px-3 py-2.5 text-sm rounded-lg hover:bg-destructive/10 transition-colors text-destructive"
                        >
                            <LogOut className="w-4 h-4" />
                            Sign out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserAvatarDropdown;
