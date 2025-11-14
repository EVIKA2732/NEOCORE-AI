import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { CyberCard } from "@/components/CyberCard";
import { CyberButton } from "@/components/CyberButton";
import { Terminal as TerminalIcon, Keyboard, Palette } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Terminal = () => {
  const { theme, setTheme } = useTheme();
  const [output, setOutput] = useState<string[]>([
    "NeoCore Terminal v2110.0",
    "Initialisation du système neuronal...",
    "Connexion établie.",
    "",
    "Tapez 'help' pour la liste des commandes."
  ]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const handlePrediction = async (question: string) => {
    setIsProcessing(true);
    const newOutput = [...output, `> predictions ${question}`, "Consultation de l'IA quantique..."];
    setOutput(newOutput);

    try {
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { 
          messages: [
            { role: "user", content: `En tant qu'IA futuriste de l'an 2110, fais une prédiction sur: ${question}. Réponds de manière courte et mystique.` }
          ] 
        }
      });

      if (error) throw error;

      if (data?.generatedText) {
        setOutput(prev => [...prev, "", data.generatedText, ""]);
      }
    } catch (error) {
      setOutput(prev => [...prev, "ERREUR: Connexion IA impossible", ""]);
      toast.error("Erreur de prédiction");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCommand = async (cmd: string) => {
    const parts = cmd.trim().split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');
    
    const newOutput = [...output, `> ${cmd}`];

    if (command === "clear") {
      setOutput([]);
      return;
    }

    if (command === "note" && args) {
      const notes = JSON.parse(localStorage.getItem("neocore-notes") || "");
      localStorage.setItem("neocore-notes", notes + "\n" + args);
      newOutput.push("Note ajoutée au système");
    } else if (command === "mission" && args) {
      const missions = JSON.parse(localStorage.getItem("neocore-missions") || "[]");
      missions.push({ title: args, date: new Date().toISOString() });
      localStorage.setItem("neocore-missions", JSON.stringify(missions));
      newOutput.push(`Mission "${args}" enregistrée`);
    } else if (command === "predictions" && args) {
      setOutput(newOutput);
      await handlePrediction(args);
      return;
    } else if (command === "theme" && args) {
      const validThemes = ['blue', 'rose', 'green', 'orange', 'purple'];
      if (validThemes.includes(args.toLowerCase())) {
        setTheme(args.toLowerCase() as any);
        newOutput.push(`Thème changé en ${args}`);
        toast.success(`Thème ${args} activé`, { className: "neon-glow" });
      } else {
        newOutput.push(`Thème invalide. Disponibles: ${validThemes.join(', ')}`);
      }
    } else if (command === "help") {
      newOutput.push(
        "Commandes disponibles:",
        "  help                    - Affiche cette aide",
        "  status                  - État du système",
        "  scan                    - Scan neuronal",
        "  note <texte>            - Ajoute une note",
        "  mission <titre>         - Ajoute une mission",
        "  predictions <question>  - Prédiction IA",
        "  theme <couleur>         - Change le thème (blue/rose/green/orange/purple)",
        "  clear                   - Efface l'écran",
        "  matrix                  - Mode Matrix",
        "  exit                    - Ferme le terminal"
      );
    } else if (command === "status") {
      newOutput.push(
        "═══ ÉTAT DU SYSTÈME ═══",
        "CPU: Processeur quantique OK",
        "RAM: 2048 TB disponible",
        "Réseau: Connexion neurale active",
        "Sécurité: Pare-feu quantique activé",
        `Thème actuel: ${theme}`
      );
    } else if (command === "scan") {
      newOutput.push(
        "Scan neuronal en cours...",
        "████████████████████ 100%",
        "Aucune menace détectée.",
        "Système sécurisé."
      );
    } else if (command === "matrix") {
      newOutput.push(
        "01001101 01100001 01110100 01110010 01101001 01111000",
        "Wake up, Neo...",
        "The Matrix has you...",
        "Follow the white rabbit."
      );
    } else if (command === "exit") {
      newOutput.push("Terminal fermé. Au revoir.");
    } else if (command === "") {
      // Do nothing
    } else {
      newOutput.push(`Commande inconnue: ${command}`);
      newOutput.push("Tapez 'help' pour la liste des commandes.");
    }

    setOutput(newOutput);
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput("");
    }
  };

  return (
    <div className="min-h-screen pb-20 pt-8 px-4 grid-bg">
      <div className="max-w-4xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2"
        >
          <h1 className="text-4xl font-orbitron font-black text-primary text-glow">
            TERMINAL SYSTÈME
          </h1>
          <p className="text-muted-foreground">Interface de commande neuronale</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <CyberCard className="p-6 space-y-4 scan-line" glow>
            <div className="flex items-center gap-2 text-primary">
              <TerminalIcon className="h-5 w-5" />
              <span className="font-orbitron text-sm">MODE TERMINAL</span>
            </div>

            {/* Terminal Output */}
            <div
              ref={outputRef}
              className="bg-cyber-darker/80 border-2 border-primary/30 rounded-lg p-4 h-[400px] overflow-y-auto font-mono text-sm text-primary/90 space-y-1"
            >
              {output.map((line, i) => (
                <div key={i} className="animate-fade-in">
                  {line}
                </div>
              ))}
            </div>

            {/* Terminal Input */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <span className="text-primary font-mono">&gt;</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isProcessing}
                className="flex-1 bg-cyber-darker/50 border-2 border-primary/30 rounded px-3 py-2 text-primary font-mono focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
                placeholder={isProcessing ? "Traitement..." : "Entrez une commande..."}
                autoFocus
              />
              <Keyboard className="h-5 w-5 text-primary/50" />
            </form>

            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground font-mono">
                Tapez 'help' pour voir les commandes disponibles
              </span>
              <div className="flex items-center gap-1">
                <Palette className="h-3 w-3 text-primary" />
                <span className="text-primary font-mono">{theme}</span>
              </div>
            </div>

            <div className="flex gap-2">
              {['blue', 'rose', 'green', 'orange', 'purple'].map((t) => (
                <CyberButton
                  key={t}
                  variant={theme === t ? 'primary' : 'ghost'}
                  onClick={() => setTheme(t as any)}
                  className="flex-1 text-xs"
                >
                  {t}
                </CyberButton>
              ))}
            </div>
          </CyberCard>
        </motion.div>
      </div>
    </div>
  );
};

export default Terminal;
