import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cyber-darker grid-bg">
      <div className="scan-line absolute inset-0" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-8"
      >
        <h1 className="text-6xl md:text-8xl font-orbitron font-black text-primary text-glow">
          NEOCORE
        </h1>
        
        <div className="flex items-center gap-2 text-cyber-blue">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-8 bg-primary"
              animate={{
                opacity: [0.3, 1, 0.3],
                scaleY: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>

        <div className="w-64 h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <p className="text-muted-foreground font-orbitron text-sm tracking-widest">
          INITIALIZING SYSTEM... {progress}%
        </p>
      </motion.div>
    </div>
  );
};
