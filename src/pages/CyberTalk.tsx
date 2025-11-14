import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { CyberCard } from "@/components/CyberCard";
import { CyberButton } from "@/components/CyberButton";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Link2, Copy, UserCircle2 } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
}

const CyberTalk = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState(() => 
    localStorage.getItem("neocore-username") || "User"
  );
  const [roomId] = useState(() => {
    const existing = localStorage.getItem("neocore-room-id");
    if (existing) return existing;
    const newId = Math.random().toString(36).substring(7);
    localStorage.setItem("neocore-room-id", newId);
    return newId;
  });
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(`neocore-chat-${roomId}`);
    if (saved) {
      setMessages(JSON.parse(saved));
    }
  }, [roomId]);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(`neocore-chat-${roomId}`, JSON.stringify(messages));
    }
  }, [messages, roomId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: username,
      content: input,
      timestamp: new Date().toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    
    toast.success("Message envoyé", {
      className: "neon-glow",
    });
  };

  const copyRoomLink = () => {
    const link = `${window.location.origin}/cybertalk?room=${roomId}`;
    navigator.clipboard.writeText(link);
    toast.success("Lien copié dans le presse-papier", {
      className: "neon-glow",
    });
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
            CYBERTALK
          </h1>
          <p className="text-muted-foreground">Communication sécurisée néon</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <CyberCard className="p-4 space-y-4" glow>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserCircle2 className="h-5 w-5 text-primary" />
                <span className="font-orbitron text-sm text-primary">{username}</span>
              </div>
              <CyberButton variant="ghost" icon={Link2} onClick={copyRoomLink}>
                Partager
              </CyberButton>
            </div>

            <div className="text-xs text-muted-foreground flex items-center gap-2">
              <span>ID Salon:</span>
              <code className="bg-cyber-darker px-2 py-1 rounded text-primary">{roomId}</code>
              <button onClick={copyRoomLink} className="text-accent hover:text-accent/80">
                <Copy className="h-3 w-3" />
              </button>
            </div>
          </CyberCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <CyberCard className="p-6 space-y-4 scan-line" glow>
            <ScrollArea className="h-[400px] pr-4">
              <div ref={scrollRef} className="space-y-3">
                {messages.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    <p className="font-orbitron">Aucun message</p>
                    <p className="text-xs mt-2">Commencez la conversation...</p>
                  </div>
                ) : (
                  messages.map((msg, i) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={`p-3 rounded-lg border-2 ${
                        msg.sender === username
                          ? "bg-primary/10 border-primary/30 ml-8"
                          : "bg-secondary/10 border-secondary/30 mr-8"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-orbitron text-primary">
                          {msg.sender}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {msg.timestamp}
                        </span>
                      </div>
                      <p className="text-foreground">{msg.content}</p>
                    </motion.div>
                  ))
                )}
              </div>
            </ScrollArea>

            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Message crypté..."
                className="flex-1 bg-cyber-darker border-primary/30 text-foreground focus:border-primary"
              />
              <CyberButton variant="primary" icon={Send} onClick={handleSend}>
                Envoyer
              </CyberButton>
            </div>
          </CyberCard>
        </motion.div>
      </div>
    </div>
  );
};

export default CyberTalk;
