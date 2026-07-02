import { categoryMeta, type ScriptCategory } from "@/data/mockSites";
import { categoryIcons } from "./categoryIcons";

const toneClasses: Record<string, string> = {
  neutral: "bg-secondary text-secondary-foreground border-border",
  info: "bg-accent text-accent-foreground border-accent",
  warn: "bg-warning/15 text-foreground border-warning/40",
  danger: "bg-danger/12 text-foreground border-danger/40",
  unknown: "bg-unknown/12 text-foreground border-unknown/40",
};

export function ScriptCategoryBadge({
  category,
  size = "md",
}: {
  category: ScriptCategory;
  size?: "sm" | "md";
}) {
  const meta = categoryMeta[category];
  const Icon = categoryIcons[category];
  const sz = size === "sm" ? "text-[11px] px-2 py-0.5 gap-1" : "text-xs px-2.5 py-1 gap-1.5";
  return (
    <span
      className={`inline-flex items-center rounded-full border font-medium ${toneClasses[meta.tone]} ${sz}`}
    >
      <Icon className={size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5"} />
      {meta.label}
    </span>
  );
}
