import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CyberCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export const CyberCard = ({ children, className, glow }: CyberCardProps) => {
  return (
    <Card
      className={cn(
        "bg-card border-2 border-border backdrop-blur-sm",
        glow && "neon-glow",
        className
      )}
    >
      {children}
    </Card>
  );
};
