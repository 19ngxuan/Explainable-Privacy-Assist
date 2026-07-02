import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Script } from "@/data/mockSites";
import { ScriptCategoryBadge } from "./ScriptCategoryBadge";
import { RiskIndicator } from "./RiskIndicator";

export function ScriptRow({
  script,
  blocked,
  onToggle,
  detailed = false,
}: {
  script: Script;
  blocked: boolean;
  onToggle: () => void;
  detailed?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const highlight =
    script.risk === "high" || script.risk === "unknown" ? "ring-1 ring-danger/20" : "";

  return (
    <div className={`rounded-lg border bg-surface ${highlight}`}>
      <div className="flex items-start gap-3 p-3">
        <button
          onClick={() => setOpen((v) => !v)}
          className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded text-muted-foreground hover:bg-muted"
          aria-label={open ? "Details schließen" : "Details öffnen"}
        >
          <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <ScriptCategoryBadge category={script.category} size="sm" />
            <RiskIndicator risk={script.risk} withLabel={false} />
            <span className="text-xs text-muted-foreground">
              {script.isExternal ? "extern" : "intern"} · {script.sizeKb} KB
            </span>
          </div>
          <div
            className={`mt-1.5 truncate font-mono text-[12.5px] ${
              detailed ? "text-foreground" : "text-foreground/80"
            }`}
            title={script.url}
          >
            {detailed ? script.url : script.host}
          </div>
        </div>
        <button
          onClick={onToggle}
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            blocked
              ? "bg-danger text-danger-foreground"
              : "bg-success/15 text-success border border-success/30"
          }`}
        >
          {blocked ? "Blockiert" : "Erlaubt"}
        </button>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden border-t bg-surface-elevated"
          >
            <div className="space-y-2 p-3 text-sm">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Wahrscheinlicher Zweck
                </div>
                <p className="mt-0.5 text-foreground/85">{script.purpose}</p>
              </div>
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Wenn blockiert
                </div>
                <p className="mt-0.5 text-foreground/85">{script.blockImpact}</p>
              </div>
              <Link
                to="/script/$id"
                params={{ id: script.id }}
                className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
              >
                Mehr Details <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
