import { useState } from "react";
import { motion } from "framer-motion";
import { CyberCard } from "@/components/CyberCard";
import { Calendar as CalendarIcon, MapPin, Clock } from "lucide-react";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const daysInMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];

  const galacticTime = () => {
    const now = new Date();
    const galacticYear = 2110 + Math.floor(now.getTime() / (1000 * 60 * 60 * 24 * 365));
    const galacticDay = Math.floor((now.getTime() / (1000 * 60 * 60 * 24)) % 360);
    return `${galacticYear}.${galacticDay.toString().padStart(3, '0')}`;
  };

  return (
    <div className="min-h-screen pb-20 pt-8 px-4 grid-bg">
      <div className="max-w-4xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2"
        >
          <div className="flex items-center justify-center gap-3">
            <CalendarIcon className="h-10 w-10 text-primary animate-glow-pulse" />
            <h1 className="text-4xl font-orbitron font-black text-primary text-glow">
              CALENDRIER INTERGALACTIQUE
            </h1>
          </div>
          <p className="text-muted-foreground">Navigation temporelle multi-dimensionnelle</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <CyberCard className="p-6 space-y-4" glow>
              <div className="flex items-center justify-between">
                <h3 className="font-orbitron text-xl text-primary">
                  {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
                </h3>
              </div>

              <div className="grid grid-cols-7 gap-2">
                {["L", "M", "M", "J", "V", "S", "D"].map((day, i) => (
                  <div
                    key={i}
                    className="text-center text-xs font-orbitron text-primary py-2"
                  >
                    {day}
                  </div>
                ))}

                {Array.from({ length: firstDayOfMonth - 1 }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}

                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const isToday = day === new Date().getDate() &&
                    selectedDate.getMonth() === new Date().getMonth();

                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day))}
                      className={`
                        p-2 text-sm rounded border-2 transition-all
                        ${isToday
                          ? "bg-primary text-primary-foreground border-primary neon-glow"
                          : "bg-cyber-darker border-primary/30 text-foreground hover:border-primary hover:bg-primary/10"
                        }
                      `}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </CyberCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <CyberCard className="p-6 space-y-4" glow>
              <div className="flex items-center gap-2 text-primary">
                <Clock className="h-5 w-5" />
                <span className="font-orbitron text-sm">HORLOGES TEMPORELLES</span>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-cyber-darker rounded border-2 border-primary/30">
                  <p className="text-xs text-muted-foreground mb-1">Terrestre</p>
                  <p className="font-orbitron text-2xl text-primary">
                    {new Date().toLocaleTimeString("fr-FR")}
                  </p>
                </div>

                <div className="p-3 bg-cyber-darker rounded border-2 border-secondary/30">
                  <p className="text-xs text-muted-foreground mb-1">Intergalactique</p>
                  <p className="font-orbitron text-2xl text-secondary">
                    {galacticTime()}
                  </p>
                </div>
              </div>
            </CyberCard>

            <CyberCard className="p-6 space-y-4" glow>
              <div className="flex items-center gap-2 text-primary">
                <MapPin className="h-5 w-5" />
                <span className="font-orbitron text-sm">CARTE STELLAIRE</span>
              </div>

              <div className="relative h-48 bg-cyber-darker rounded border-2 border-primary/30 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Planète centrale */}
                    <div className="w-16 h-16 rounded-full bg-primary neon-glow-strong animate-pulse-glow" />
                    
                    {/* Orbites */}
                    {[1, 2, 3].map((orbit) => (
                      <div
                        key={orbit}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary/20"
                        style={{
                          width: `${orbit * 60}px`,
                          height: `${orbit * 60}px`,
                        }}
                      >
                        <div
                          className={`absolute w-2 h-2 rounded-full ${
                            orbit === 1 ? "bg-accent" : orbit === 2 ? "bg-secondary" : "bg-primary"
                          }`}
                          style={{
                            top: "50%",
                            left: "100%",
                            transform: "translate(-50%, -50%)",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="absolute bottom-2 left-2 text-xs text-muted-foreground font-mono">
                  Secteur Alpha-7
                </div>
              </div>
            </CyberCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
