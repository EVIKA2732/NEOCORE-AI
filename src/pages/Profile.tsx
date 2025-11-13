import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CyberCard } from "@/components/CyberCard";
import { CyberButton } from "@/components/CyberButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { User, Mail, MapPin, Save, Edit } from "lucide-react";
import { toast } from "sonner";

interface ProfileData {
  name: string;
  email: string;
  location: string;
  bio: string;
}

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    name: "CyberUser",
    email: "cyber@neocore.2110",
    location: "Neo Tokyo, Secteur 7",
    bio: "Explorateur du cyberespace"
  });

  useEffect(() => {
    const savedProfile = localStorage.getItem("neocore-profile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("neocore-profile", JSON.stringify(profile));
    setIsEditing(false);
    toast.success("Profil neural mis à jour", {
      description: "Vos données ont été synchronisées"
    });
  };

  return (
    <div className="min-h-screen pb-20 pt-8 px-4 grid-bg">
      <div className="max-w-lg mx-auto space-y-6">
        <h1 className="text-4xl font-orbitron font-black text-center text-primary text-glow">
          PROFIL NEURAL
        </h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CyberCard className="p-6 space-y-6" glow>
            <div className="flex flex-col items-center space-y-4">
              <div className="relative glitch">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary neon-glow flex items-center justify-center">
                  <User className="h-12 w-12 text-primary-foreground" />
                </div>
              </div>
              
              {!isEditing ? (
                <div className="text-center space-y-2 w-full">
                  <h2 className="text-2xl font-orbitron font-bold">{profile.name}</h2>
                  <p className="text-muted-foreground text-sm">{profile.bio}</p>
                </div>
              ) : (
                <div className="w-full space-y-3">
                  <Input
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className="bg-cyber-darker/50 border-primary/30 text-center font-orbitron"
                    placeholder="Nom"
                  />
                  <Textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                    className="bg-cyber-darker/50 border-primary/30 text-center resize-none"
                    placeholder="Bio"
                    rows={2}
                  />
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                {!isEditing ? (
                  <span className="text-muted-foreground">{profile.email}</span>
                ) : (
                  <Input
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    className="bg-cyber-darker/50 border-primary/30 flex-1"
                    placeholder="Email"
                  />
                )}
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                {!isEditing ? (
                  <span className="text-muted-foreground">{profile.location}</span>
                ) : (
                  <Input
                    value={profile.location}
                    onChange={(e) => setProfile({...profile, location: e.target.value})}
                    className="bg-cyber-darker/50 border-primary/30 flex-1"
                    placeholder="Localisation"
                  />
                )}
              </div>
            </div>

            {!isEditing ? (
              <CyberButton 
                variant="primary" 
                icon={Edit} 
                fullWidth
                onClick={() => setIsEditing(true)}
              >
                Modifier le profil
              </CyberButton>
            ) : (
              <div className="flex gap-3">
                <CyberButton 
                  variant="primary" 
                  icon={Save} 
                  fullWidth
                  onClick={handleSave}
                >
                  Sauvegarder
                </CyberButton>
                <CyberButton 
                  variant="ghost" 
                  fullWidth
                  onClick={() => setIsEditing(false)}
                >
                  Annuler
                </CyberButton>
              </div>
            )}
          </CyberCard>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;

