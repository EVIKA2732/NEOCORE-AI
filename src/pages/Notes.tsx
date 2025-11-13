import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CyberCard } from "@/components/CyberCard";
import { CyberButton } from "@/components/CyberButton";
import { Textarea } from "@/components/ui/textarea";
import { Save, Trash2, FileText } from "lucide-react";
import { toast } from "sonner";

const Notes = () => {
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const savedNotes = localStorage.getItem("neocore-notes");
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("neocore-notes", notes);
    toast.success("Notes sauvegardées dans le système");
  };

  const handleClear = () => {
    setNotes("");
    localStorage.removeItem("neocore-notes");
    toast.success("Mémoire effacée");
  };

  return (
    <div className="min-h-screen pb-20 pt-8 px-4 grid-bg">
      <div className="max-w-2xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2"
        >
          <h1 className="text-4xl font-orbitron font-black text-primary text-glow">
            TERMINAL NOTES
          </h1>
          <p className="text-muted-foreground">Stockage neuronal personnel</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <CyberCard className="p-6 space-y-4" glow>
            <div className="flex items-center gap-2 text-primary">
              <FileText className="h-5 w-5" />
              <span className="font-orbitron text-sm">SYSTÈME D'ÉCRITURE</span>
            </div>
            
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Entrez vos données neuronales..."
              className="min-h-[400px] bg-cyber-darker/50 border-primary/30 text-foreground font-mono resize-none focus:border-primary focus:ring-primary"
            />

            <div className="flex gap-3">
              <CyberButton
                variant="primary"
                icon={Save}
                onClick={handleSave}
                fullWidth
              >
                Sauvegarder
              </CyberButton>
              <CyberButton
                variant="accent"
                icon={Trash2}
                onClick={handleClear}
              >
                Effacer
              </CyberButton>
            </div>
          </CyberCard>
        </motion.div>
      </div>
    </div>
  );
};

export default Notes;
