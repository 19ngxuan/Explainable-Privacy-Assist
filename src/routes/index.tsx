import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Eye, Sparkles, GaugeCircle, BookOpen } from "lucide-react";
import { PrivacyScoreRing } from "@/components/PrivacyScoreRing";
import { ScriptCategoryBadge } from "@/components/ScriptCategoryBadge";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Explainable PrivacyAssist – Zweckbasierte Script-Erklärungen" },
      {
        name: "description",
        content:
          "Interaktiver Forschungs-Prototyp: Statt nur intern/extern erklären wir den Zweck jedes Scripts und helfen Nutzer:innen, bessere Datenschutzentscheidungen zu treffen.",
      },
      { property: "og:title", content: "Explainable PrivacyAssist" },
      {
        property: "og:description",
        content: "From Script Visibility to Script Explainability – ein HCI-Prototyp.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-gradient-to-b from-accent/40 to-transparent" />
        <div className="mx-auto max-w-6xl px-6 pt-20 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border bg-surface/80 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              HCI · Usable Privacy · Prototyp einer Folgestudie
            </span>
            <h1 className="mt-5 text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
              From Script Visibility
              <br />
              to <span className="text-primary">Script Explainability.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
              PrivacyAssist zeigt, <em>woher</em> ein Script kommt. Unser Prototyp erklärt,{" "}
              <em>wofür</em> es wahrscheinlich da ist – damit Nutzer:innen verstehen, was passiert,
              und bessere Datenschutzentscheidungen treffen.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                to="/demo"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Demo öffnen <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/compare"
                className="inline-flex items-center gap-2 rounded-md border bg-surface px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Vorher / Nachher
              </Link>
            </div>
          </motion.div>

          {/* Hero visual */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-14 grid gap-6 md:grid-cols-[1.4fr_1fr]"
          >
            <div className="rounded-2xl border bg-surface p-6 shadow-sm">
              <div className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Zweckbasierte Klassifikation
              </div>
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    "essential",
                    "functional",
                    "analytics",
                    "advertising",
                    "social",
                    "external",
                    "unknown",
                  ] as const
                ).map((c) => (
                  <ScriptCategoryBadge key={c} category={c} />
                ))}
              </div>
              <p className="mt-5 text-sm leading-relaxed text-foreground/80">
                Jedes geladene Script wird einer Zweckkategorie zugeordnet und in einfacher Sprache
                erklärt. So sehen Nutzer:innen nicht nur eine Liste, sondern verstehen, warum ein
                Script datenschutzrelevant sein kann.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-2xl border bg-surface p-6 shadow-sm">
              <div className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Privacy Score
              </div>
              <PrivacyScoreRing score={38} size={160} />
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Kontextualisiert – nicht nur „Anzahl externer Scripts".
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              Icon: Eye,
              title: "Zweck statt nur Herkunft",
              body: "Sieben Kategorien von essenziell bis unbekannt – jeweils mit Laien-Erklärung.",
            },
            {
              Icon: GaugeCircle,
              title: "Kontextueller Score",
              body: "Der Privacy Score gewichtet Tracking & unbekannte Scripts stärker als harmlose Fonts.",
            },
            {
              Icon: BookOpen,
              title: "Adaptive Tiefe",
              body: "Standard, Extended, Detailed – passend zur Privacy Competence der Nutzer:innen.",
            },
          ].map(({ Icon, title, body }) => (
            <div key={title} className="rounded-xl border bg-surface p-5">
              <div className="grid h-9 w-9 place-items-center rounded-md bg-primary/10 text-primary">
                <Icon className="h-4.5 w-4.5" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-foreground">{title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
