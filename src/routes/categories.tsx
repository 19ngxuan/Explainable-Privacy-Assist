import { createFileRoute } from "@tanstack/react-router";
import { categoryMeta, mockSites, type ScriptCategory } from "@/data/mockSites";
import { categoryIcons } from "@/components/categoryIcons";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Script-Kategorien · Explainable PrivacyAssist" },
      {
        name: "description",
        content:
          "Sieben Zweckkategorien von Web-Scripts – in einfacher Sprache erklärt: Essenziell, Funktional, Analytics, Werbung, Social, Externe Ressourcen, Unbekannt.",
      },
      { property: "og:title", content: "Script-Kategorien" },
      {
        property: "og:description",
        content: "Was tun Scripts auf Webseiten – verständlich erklärt.",
      },
    ],
  }),
  component: Categories,
});

const order: ScriptCategory[] = [
  "essential",
  "functional",
  "analytics",
  "advertising",
  "social",
  "external",
  "unknown",
];

function countAcrossSites(cat: ScriptCategory) {
  return mockSites.reduce(
    (acc, s) => acc + s.scripts.filter((sc) => sc.category === cat).length,
    0,
  );
}

const toneBg: Record<string, string> = {
  neutral: "from-secondary to-secondary",
  info: "from-accent to-surface",
  warn: "from-warning/25 to-surface",
  danger: "from-danger/15 to-surface",
  unknown: "from-unknown/15 to-surface",
};

function Categories() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold">Was tun Scripts wirklich?</h1>
        <p className="mt-2 text-muted-foreground">
          Statt nur „internes" oder „externes" Script zeigen wir den wahrscheinlichen Zweck. Hier
          siehst du alle sieben Kategorien mit kurzer Erklärung in einfacher Sprache.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {order.map((cat) => {
          const meta = categoryMeta[cat];
          const Icon = categoryIcons[cat];
          const count = countAcrossSites(cat);
          return (
            <article
              key={cat}
              className={`group relative overflow-hidden rounded-xl border bg-gradient-to-br ${toneBg[meta.tone]} p-5`}
            >
              <div className="flex items-start justify-between">
                <div className="grid h-10 w-10 place-items-center rounded-lg border bg-surface text-foreground/80">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="rounded-full border bg-surface/70 px-2 py-0.5 text-[11px] text-muted-foreground">
                  {count} im Demo-Datensatz
                </span>
              </div>
              <h2 className="mt-4 text-lg font-semibold">{meta.label}</h2>
              <p className="mt-1 text-sm text-foreground/80">{meta.short}</p>
              <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3 text-xs">
                <span className="text-muted-foreground">Empfehlung</span>
                <span className="font-medium text-foreground">{meta.recommendation}</span>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-10 rounded-xl border bg-surface p-5 text-sm text-muted-foreground">
        <strong className="text-foreground">Hinweis:</strong> Die Klassifikation ist im Prototyp
        vorab festgelegt (Wizard-of-Oz). In einer realen Implementierung käme sie aus Listen wie
        EasyList/Privacy Badger plus heuristischer Zuordnung.
      </div>
    </main>
  );
}
