import { Lightbulb } from "lucide-react";

export function ExplainerCallout({
  title,
  children,
  tone = "info",
}: {
  title?: string;
  children: React.ReactNode;
  tone?: "info" | "warn" | "danger";
}) {
  const toneCls =
    tone === "danger"
      ? "border-danger/30 bg-danger/8"
      : tone === "warn"
        ? "border-warning/40 bg-warning/10"
        : "border-accent bg-accent/40";
  return (
    <div className={`flex gap-3 rounded-lg border p-3.5 text-sm ${toneCls}`}>
      <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-foreground/70" />
      <div>
        {title && <div className="font-medium text-foreground">{title}</div>}
        <div className="text-foreground/80">{children}</div>
      </div>
    </div>
  );
}
