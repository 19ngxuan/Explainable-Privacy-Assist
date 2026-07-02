import { motion } from "framer-motion";

function scoreColor(score: number) {
  if (score >= 70) return "var(--color-success)";
  if (score >= 45) return "var(--color-warning)";
  return "var(--color-danger)";
}

function scoreLabel(score: number) {
  if (score >= 70) return "Gut";
  if (score >= 45) return "Mittel";
  return "Riskant";
}

export function PrivacyScoreRing({
  score,
  size = 140,
  stroke = 12,
  showLabel = true,
}: {
  score: number;
  size?: number;
  stroke?: number;
  showLabel?: boolean;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = (score / 100) * c;
  const color = scoreColor(score);

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="var(--color-muted)"
          strokeWidth={stroke}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - dash }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-3xl font-semibold tabular-nums" style={{ color }}>
          {score}
        </div>
        {showLabel && (
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground mt-0.5">
            {scoreLabel(score)}
          </div>
        )}
      </div>
    </div>
  );
}
