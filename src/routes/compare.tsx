import { createFileRoute } from "@tanstack/react-router";
import { mockSites, categoryMeta, type ScriptCategory } from "@/data/mockSites";
import { PrivacyScoreRing } from "@/components/PrivacyScoreRing";
import { categoryIcons } from "@/components/categoryIcons";
import { ScriptCategoryBadge } from "@/components/ScriptCategoryBadge";
import { ExplainerCallout } from "@/components/ExplainerCallout";
import { ArrowRightLeft } from "lucide-react";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "Vergleich · Original vs. Explainable PrivacyAssist" },
      {
        name: "description",
        content:
          "Direkter Vergleich: ursprüngliche intern/extern-Anzeige vs. zweckbasierte Erklärung.",
      },
      { property: "og:title", content: "Vorher / Nachher · Explainable PrivacyAssist" },
      {
        property: "og:description",
        content: "Wie zweckbasierte Erklärungen das Verständnis verbessern.",
      },
    ],
  }),
  component: Compare,
});

function Compare() {
  const site = mockSites[0]; // News
  const external = site.scripts.filter((s) => s.isExternal).length;
  const internal = site.scripts.length - external;
  const baselineScore = Math.max(0, 100 - external * 12);

  // group by category
  const grouped = new Map<ScriptCategory, number>();
  for (const s of site.scripts) {
    grouped.set(s.category, (grouped.get(s.category) ?? 0) + 1);
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="max-w-2xl">
        <span className="inline-flex items-center gap-1.5 rounded-full border bg-surface px-3 py-1 text-xs font-medium text-muted-foreground">
          <ArrowRightLeft className="h-3.5 w-3.5" /> Vorher / Nachher
        </span>
        <h1 className="mt-4 text-3xl font-semibold">Original vs. Explainable PrivacyAssist</h1>
        <p className="mt-2 text-muted-foreground">
          Beide Ansichten analysieren dieselbe Seite ({site.domain}). Links das Original aus dem
          Paper, rechts unsere Erweiterung.
        </p>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {/* Original */}
        <div className="rounded-xl border bg-surface p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">Original PrivacyAssist</h2>
            <span className="rounded-full border bg-muted px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
              Baseline
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Score = abnehmend mit Anzahl externer Scripts
          </p>

          <div className="mt-4 flex items-center gap-5 rounded-lg border bg-surface-elevated p-4">
            <PrivacyScoreRing score={baselineScore} size={96} stroke={9} />
            <div className="text-sm">
              <div>
                <strong>{external}</strong> externe Scripts
              </div>
              <div>
                <strong>{internal}</strong> interne Scripts
              </div>
            </div>
          </div>

          <ul className="mt-5 space-y-2 text-sm">
            {site.scripts.map((s) => (
              <li key={s.id} className="flex items-center justify-between rounded-md border p-2.5">
                <span className="truncate font-mono text-xs">{s.host}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                    s.isExternal
                      ? "border border-warning/40 bg-warning/10"
                      : "border border-border bg-muted"
                  }`}
                >
                  {s.isExternal ? "extern" : "intern"}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-5 rounded-lg bg-muted p-3 text-xs text-muted-foreground">
            Limitation: Externe Schriftarten erscheinen genauso „schlecht" wie Werbe-Tracker.
            Interne Tracker bleiben unsichtbar.
          </div>
        </div>

        {/* Explainable */}
        <div className="rounded-xl border-2 border-primary/30 bg-surface p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">Explainable PrivacyAssist</h2>
            <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] uppercase tracking-wider text-primary-foreground">
              Erweiterung
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Score gewichtet Tracking & unbekannte Scripts stärker
          </p>

          <div className="mt-4 flex items-center gap-5 rounded-lg border bg-surface-elevated p-4">
            <PrivacyScoreRing score={site.privacyScore} size={96} stroke={9} />
            <ExplainerCallout tone="warn">{site.recommendation}</ExplainerCallout>
          </div>

          <ul className="mt-5 space-y-2">
            {[...grouped.entries()].map(([cat, count]) => {
              const Icon = categoryIcons[cat];
              const meta = categoryMeta[cat];
              return (
                <li key={cat} className="flex items-center justify-between rounded-md border p-2.5">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-foreground/70" />
                    <span className="text-sm font-medium">{meta.label}</span>
                    <span className="text-xs text-muted-foreground">({count})</span>
                  </div>
                  <ScriptCategoryBadge category={cat} size="sm" />
                </li>
              );
            })}
          </ul>

          <div className="mt-5 rounded-lg bg-primary/5 p-3 text-xs text-foreground/80">
            HCI-Verbesserung: Nutzer:innen sehen nicht nur <em>woher</em>, sondern <em>wofür</em>.
            Bezug zu Hypothesen H1 (Verständnis) und H2 (Entscheidungsqualität).
          </div>
        </div>
      </div>
    </main>
  );
}
