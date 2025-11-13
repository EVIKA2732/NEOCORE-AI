import { motion } from "framer-motion";
import { CyberCard } from "@/components/CyberCard";
import { CyberButton } from "@/components/CyberButton";
import { Bell, Lock, Palette, Terminal as TerminalIcon, Shield } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(false);
  const [security, setSecurity] = useState(false);
  const [darkTheme, setDarkTheme] = useState(true);

  const handleNotifications = (checked: boolean) => {
    setNotifications(checked);
    if (checked) {
      toast.success("Alertes neuronales activées", {
        description: "Vous recevrez des notifications système",
        className: "neon-glow"
      });
    } else {
      toast("Alertes neuronales désactivées");
    }
  };

  const handleSecurity = (checked: boolean) => {
    setSecurity(checked);
    if (checked) {
      toast.success("Pare-feu quantique activé ✅", {
        description: "Protection maximale engagée",
        className: "neon-glow"
      });
    } else {
      toast.warning("Protection désactivée", {
        description: "Système vulnérable"
      });
    }
  };

  const handleTheme = (checked: boolean) => {
    setDarkTheme(checked);
    toast(checked ? "Thème Bleu Néon activé" : "Thème Rose Néon activé", {
      className: "neon-glow"
    });
  };

  const settings = [
    { 
      icon: Bell, 
      title: "Notifications", 
      description: "Activer les alertes neuronales",
      checked: notifications,
      onChange: handleNotifications
    },
    { 
      icon: Shield, 
      title: "Sécurité", 
      description: "Pare-feu quantique",
      checked: security,
      onChange: handleSecurity
    },
    { 
      icon: Palette, 
      title: "Thème", 
      description: "Bleu / Rose Néon",
      checked: darkTheme,
      onChange: handleTheme
    },
  ];

  return (
    <div className="min-h-screen pb-20 pt-8 px-4 grid-bg">
      <div className="max-w-lg mx-auto space-y-6">
        <h1 className="text-4xl font-orbitron font-black text-center text-primary text-glow">
          PARAMÈTRES
        </h1>

        <div className="space-y-4">
          {settings.map(({ icon: Icon, title, description, checked, onChange }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <CyberCard className="p-4" glow={checked}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Icon className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-orbitron font-bold">{title}</h3>
                      <p className="text-sm text-muted-foreground">{description}</p>
                    </div>
                  </div>
                  <Switch 
                    checked={checked}
                    onCheckedChange={onChange}
                  />
                </div>
              </CyberCard>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <CyberCard className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <TerminalIcon className="h-6 w-6 text-primary" />
                  <div>
                    <h3 className="font-orbitron font-bold">Mode Terminal</h3>
                    <p className="text-sm text-muted-foreground">Interface de commande</p>
                  </div>
                </div>
                <CyberButton
                  variant="primary"
                  onClick={() => navigate("/terminal")}
                >
                  Accéder
                </CyberButton>
              </div>
            </CyberCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
