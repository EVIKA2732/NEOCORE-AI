import { motion } from "framer-motion";
import { CyberButton } from "@/components/CyberButton";
import { CyberCard } from "@/components/CyberCard";
import { Zap, Database, Shield } from "lucide-react";

const Home = () => {
  const features = [
    { icon: Zap, title: "Ultra rapide", description: "Performance optimale" },
    { icon: Database, title: "Données sécurisées", description: "Stockage local chiffré" },
    { icon: Shield, title: "Mode hors ligne", description: "Fonctionne partout" },
  ];

  return (
    <div className="min-h-screen pb-20 pt-8 px-4 grid-bg">
      <div className="max-w-lg mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-5xl font-orbitron font-black text-primary text-glow">
            NEOCORE
          </h1>
          <p className="text-muted-foreground">
            Votre assistant cyberpunk personnel
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <CyberCard glow className="p-8 space-y-6">
            <h2 className="text-2xl font-orbitron font-bold text-center">
              Bienvenue dans le futur
            </h2>
            
            <div className="space-y-4">
              {features.map(({ icon: Icon, title, description }, index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg border border-primary/20"
                >
                  <Icon className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-orbitron font-bold text-foreground">{title}</h3>
                    <p className="text-sm text-muted-foreground">{description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <CyberButton variant="primary" fullWidth>
              Commencer
            </CyberButton>
          </CyberCard>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
