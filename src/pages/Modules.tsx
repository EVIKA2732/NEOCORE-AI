import { motion } from "framer-motion";
import { CyberCard } from "@/components/CyberCard";
import { Music, FileText, MessageSquare, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Modules = () => {
  const navigate = useNavigate();

  const handleMusicClick = () => {
    window.open("https://music.youtube.com", "_blank");
  };

  const modules = [
    { icon: MessageSquare, title: "Chat IA", color: "text-primary", path: "/chat", action: null },
    { icon: Music, title: "Musique", color: "text-secondary", path: null, action: handleMusicClick },
    { icon: FileText, title: "Notes", color: "text-accent", path: "/notes", action: null },
    { icon: Settings, title: "Outils", color: "text-primary", path: "/settings", action: null },
  ];

  return (
    <div className="min-h-screen pb-20 pt-8 px-4 grid-bg">
      <div className="max-w-lg mx-auto space-y-6">
        <h1 className="text-4xl font-orbitron font-black text-center text-primary text-glow">
          MODULES
        </h1>

        <div className="grid grid-cols-2 gap-4">
          {modules.map(({ icon: Icon, title, color, path, action }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (action) {
                  action();
                } else if (path) {
                  navigate(path);
                }
              }}
            >
              <CyberCard className="p-6 text-center space-y-4 cursor-pointer hover:border-primary transition-all duration-300">
                <Icon className={`h-12 w-12 mx-auto ${color}`} />
                <h3 className="font-orbitron font-bold">{title}</h3>
              </CyberCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modules;
