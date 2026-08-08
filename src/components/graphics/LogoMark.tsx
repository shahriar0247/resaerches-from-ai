import { Brain } from "lucide-react";

export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <div
      className="relative flex items-center justify-center rounded-lg bg-gradient-to-br from-accent to-cyan"
      style={{ width: size, height: size }}
    >
      <Brain size={size * 0.55} className="text-white" />
    </div>
  );
}
