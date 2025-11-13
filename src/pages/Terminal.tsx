import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { CyberCard } from "@/components/CyberCard";
import { Terminal as TerminalIcon, Keyboard } from "lucide-react";

const Terminal = () => {
  const [output, setOutput] = useState<string[]>([
    "NeoCore Terminal v2110.0",
    "Initialisation du système neuronal...",
    "Connexion établie.",
    "",
    "Tapez 'help' pour la liste des commandes."
  ]);
  const [input, setInput] = useState("");
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const commands: Record<string, string[]> = {
    help: [
      "Commandes disponibles:",
      "  help     - Affiche cette aide",
      "  status   - État du système",
      "  scan     - Scan neuronal",
      "  clear    - Efface l'écran",
      "  matrix   - Mode Matrix",
      "  exit     - Ferme le terminal"
    ],
    status: [
      "═══ ÉTAT DU SYSTÈME ═══",
      "CPU: Processeur quantique OK",
      "RAM: 2048 TB disponible",
      "Réseau: Connexion neurale active",
      "Sécurité: Pare-feu quantique activé"
    ],
    scan: [
      "Scan neuronal en cours...",
      "████████████████████ 100%",
      "Aucune menace détectée.",
      "Système sécurisé."
    ],
    matrix: [
      "01001101 01100001 01110100 01110010 01101001 01111000",
      "Wake up, Neo...",
      "The Matrix has you...",
      "Follow the white rabbit."
    ],
    clear: [],
    exit: ["Terminal fermé. Au revoir."]
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const newOutput = [...output, `> ${cmd}`];

    if (trimmedCmd === "clear") {
      setOutput([]);
      return;
    }

    if (commands[trimmedCmd]) {
      newOutput.push(...commands[trimmedCmd]);
    } else if (trimmedCmd === "") {
      // Do nothing for empty command
    } else {
      newOutput.push(`Commande inconnue: ${trimmedCmd}`);
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
                className="flex-1 bg-cyber-darker/50 border-2 border-primary/30 rounded px-3 py-2 text-primary font-mono focus:outline-none focus:border-primary transition-colors"
                placeholder="Entrez une commande..."
                autoFocus
              />
              <Keyboard className="h-5 w-5 text-primary/50" />
            </form>

            <div className="text-xs text-muted-foreground font-mono">
              Tapez 'help' pour voir les commandes disponibles
            </div>
          </CyberCard>
        </motion.div>
      </div>
    </div>
  );
};

export default Terminal;
