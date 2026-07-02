import { ShieldAlert, ShieldCheck, ShieldQuestion, AlertTriangle } from "lucide-react";
import type { RiskLevel } from "@/data/mockSites";

const map: Record<RiskLevel, { label: string; cls: string; Icon: typeof ShieldCheck }> = {
  low: { label: "Geringes Risiko", cls: "text-success", Icon: ShieldCheck },
  medium: { label: "Mittleres Risiko", cls: "text-warning", Icon: AlertTriangle },
  high: { label: "Hohes Risiko", cls: "text-danger", Icon: ShieldAlert },
  unknown: { label: "Unklar", cls: "text-unknown", Icon: ShieldQuestion },
};

export function RiskIndicator({
  risk,
  withLabel = true,
}: {
  risk: RiskLevel;
  withLabel?: boolean;
}) {
  const m = map[risk];
  const Icon = m.Icon;
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${m.cls}`}>
      <Icon className="h-3.5 w-3.5" />
      {withLabel && m.label}
    </span>
  );
}
