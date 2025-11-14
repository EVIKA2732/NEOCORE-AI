import { motion } from "framer-motion";
import { SnakeGame } from "@/components/SnakeGame";
import { GhostEvasion } from "@/components/GhostEvasion";
import { Gamepad2 } from "lucide-react";

const Games = () => {
  return (
    <div className="min-h-screen pb-20 pt-8 px-4 grid-bg">
      <div className="max-w-4xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2"
        >
          <div className="flex items-center justify-center gap-3">
            <Gamepad2 className="h-10 w-10 text-primary animate-glow-pulse" />
            <h1 className="text-4xl font-orbitron font-black text-primary text-glow">
              MINI-JEUX NÉON
            </h1>
          </div>
          <p className="text-muted-foreground">Détendez-vous avec des classiques futuristes</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <SnakeGame />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GhostEvasion />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Games;
