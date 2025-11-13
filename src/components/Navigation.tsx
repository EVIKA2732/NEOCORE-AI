import { Home, User, Grid3x3, Settings } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Grid3x3, label: "Modules", path: "/modules" },
  { icon: User, label: "Profile", path: "/profile" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export const Navigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-lg border-t-2 border-primary/30">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-4">
        {navItems.map(({ icon: Icon, label, path }) => (
          <NavLink
            key={path}
            to={path}
            className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all duration-300 text-muted-foreground hover:text-primary"
            activeClassName="text-primary neon-glow"
          >
            <Icon className="h-6 w-6" />
            <span className="text-xs font-orbitron">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
