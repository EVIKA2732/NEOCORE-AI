import { useState } from "react";
import { motion } from "framer-motion";
import { CyberCard } from "@/components/CyberCard";
import { Input } from "@/components/ui/input";
import { Search, Zap, Shield, Cpu, Rocket, Swords } from "lucide-react";

interface Entry {
  id: string;
  title: string;
  category: string;
  icon: any;
  description: string;
  specs: string[];
}

const entries: Entry[] = [
  {
    id: "1",
    title: "Vaisseau Phantom X-7",
    category: "Vaisseaux",
    icon: Rocket,
    description: "Chasseur furtif de dernière génération équipé d'un moteur à distorsion quantique.",
    specs: ["Vitesse maximale: Mach 15", "Armement: Canon plasma", "Équipage: 2 pilotes"],
  },
  {
    id: "2",
    title: "Implant Neural Link",
    category: "Cyber-Implants",
    icon: Cpu,
    description: "Interface cerveau-machine permettant la connexion directe aux réseaux neuronaux.",
    specs: ["Bande passante: 10 Tb/s", "Latence: < 1ms", "Compatibilité: Universelle"],
  },
  {
    id: "3",
    title: "Bouclier Énergétique",
    category: "Technologies",
    icon: Shield,
    description: "Générateur de champ de force personnel portatif à énergie plasma.",
    specs: ["Résistance: 500 kJ", "Autonomie: 48h", "Recharge: Rapide"],
  },
  {
    id: "4",
    title: "Lame Photonique",
    category: "Armes",
    icon: Swords,
    description: "Épée à lame de photons compressés, capable de couper la plupart des matériaux.",
    specs: ["Longueur: Ajustable", "Température: 5000°C", "Durée de vie: Illimitée"],
  },
  {
    id: "5",
    title: "Nano-Réparateur",
    category: "Gadgets",
    icon: Zap,
    description: "Kit de nano-robots médicaux pour réparation cellulaire instantanée.",
    specs: ["Vitesse: 1000 cellules/s", "Usage: 100 fois", "Stockage: Compact"],
  },
];

const Neopedia = () => {
  const [search, setSearch] = useState("");
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);

  const filteredEntries = entries.filter(
    (entry) =>
      entry.title.toLowerCase().includes(search.toLowerCase()) ||
      entry.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen pb-20 pt-8 px-4 grid-bg">
      <div className="max-w-6xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2"
        >
          <h1 className="text-4xl font-orbitron font-black text-primary text-glow">
            NEOPEDIA
          </h1>
          <p className="text-muted-foreground">
            Encyclopédie intergalactique du futur
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <CyberCard className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher dans la base de données..."
                className="pl-10 bg-cyber-darker border-primary/30 text-foreground focus:border-primary"
              />
            </div>
          </CyberCard>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {filteredEntries.map((entry, i) => {
              const Icon = entry.icon;
              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelectedEntry(entry)}
                  className="cursor-pointer"
                >
                  <CyberCard
                    className={`p-4 transition-all ${
                      selectedEntry?.id === entry.id
                        ? "border-primary neon-glow"
                        : "hover:border-primary/50"
                    }`}
                    glow={selectedEntry?.id === entry.id}
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded border-2 border-primary/30">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-orbitron font-bold text-primary">
                          {entry.title}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {entry.category}
                        </p>
                      </div>
                    </div>
                  </CyberCard>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {selectedEntry ? (
              <CyberCard className="p-6 space-y-4 scan-line sticky top-8" glow>
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-primary/10 rounded-lg border-2 border-primary/30">
                    {<selectedEntry.icon className="h-8 w-8 text-primary" />}
                  </div>
                  <div>
                    <h2 className="font-orbitron text-2xl font-black text-primary">
                      {selectedEntry.title}
                    </h2>
                    <p className="text-sm text-secondary">{selectedEntry.category}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-orbitron text-primary mb-2">
                      DESCRIPTION
                    </h3>
                    <p className="text-foreground">{selectedEntry.description}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-orbitron text-primary mb-2">
                      SPÉCIFICATIONS
                    </h3>
                    <div className="space-y-2">
                      {selectedEntry.specs.map((spec, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 p-2 bg-cyber-darker rounded border-2 border-primary/20"
                        >
                          <div className="w-1 h-1 rounded-full bg-primary animate-pulse-glow" />
                          <span className="text-sm text-foreground">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CyberCard>
            ) : (
              <CyberCard className="p-12 text-center">
                <p className="text-muted-foreground font-orbitron">
                  Sélectionnez une entrée pour afficher les détails
                </p>
              </CyberCard>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Neopedia;
