import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { findScript, categoryMeta } from "@/data/mockSites";
import { ScriptCategoryBadge } from "@/components/ScriptCategoryBadge";
import { RiskIndicator } from "@/components/RiskIndicator";
import { ExplainerCallout } from "@/components/ExplainerCallout";
import { ArrowLeft, Globe, HardDrive } from "lucide-react";

export const Route = createFileRoute("/script/$id")({
  loader: ({ params }) => {
    const found = findScript(params.id);
    if (!found) throw notFound();
    return found;
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.script.host} · Script-Detail` : "Script-Detail";
    return {
      meta: [
        { title },
        {
          name: "description",
          content: loaderData?.script.purpose ?? "Script-Detailansicht",
        },
        { property: "og:title", content: title },
      ],
    };
  },
  component: ScriptDetail,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl p-12 text-center">
      <h1 className="text-2xl font-semibold">Script nicht gefunden</h1>
      <Link to="/demo" className="mt-4 inline-block text-primary hover:underline">
        Zurück zur Demo
      </Link>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="mx-auto max-w-3xl p-12">
      <h1 className="text-xl font-semibold">Fehler</h1>
      <p className="text-muted-foreground">{error.message}</p>
      <button onClick={reset} className="mt-4 text-primary hover:underline">
        Erneut versuchen
      </button>
    </div>
  ),
});

function ScriptDetail() {
  const data = Route.useLoaderData() as ReturnType<typeof findScript> & object;
  const { script, site } = data;
  const meta = categoryMeta[script.category];

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <Link
        to="/demo"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Zurück zur Demo
      </Link>

      <div className="mt-4 rounded-xl border bg-surface p-6">
        <div className="flex flex-wrap items-center gap-2">
          <ScriptCategoryBadge category={script.category} />
          <RiskIndicator risk={script.risk} />
          <span className="text-xs text-muted-foreground">
            auf {site.name} ({site.domain})
          </span>
        </div>
        <h1 className="mt-3 break-all font-mono text-lg font-medium">{script.url}</h1>
        <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Globe className="h-3.5 w-3.5" /> {script.host} (
            {script.isExternal ? "extern" : "intern"})
          </span>
          <span className="inline-flex items-center gap-1.5">
            <HardDrive className="h-3.5 w-3.5" /> {script.sizeKb} KB
          </span>
        </div>
      </div>

      <section className="mt-6 space-y-4">
        <ExplainerCallout title="Was macht dieses Script wahrscheinlich?">
          {script.purpose}
        </ExplainerCallout>

        <div className="rounded-xl border bg-surface p-5">
          <h2 className="text-sm font-semibold">Was passiert, wenn ich es blockiere?</h2>
          <p className="mt-1.5 text-sm text-foreground/85">{script.blockImpact}</p>
        </div>

        <div className="rounded-xl border bg-surface p-5">
          <h2 className="text-sm font-semibold">Warum ist das relevant für deinen Datenschutz?</h2>
          <p className="mt-1.5 text-sm text-foreground/85">
            Diese Kategorie – <strong>{meta.label}</strong> – {meta.short.toLowerCase()} Wir
            empfehlen daher: <strong>{meta.recommendation}</strong>.
          </p>
          {(script.risk === "high" || script.risk === "unknown") && (
            <p className="mt-2 text-sm text-danger">
              Dieses Script wird visuell hervorgehoben, weil es entweder ein hohes Tracking-Risiko
              hat oder sein Zweck nicht eindeutig klassifizierbar war.
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <button className="flex-1 rounded-md bg-danger px-4 py-2.5 text-sm font-medium text-danger-foreground">
            Blockieren
          </button>
          <button className="flex-1 rounded-md border bg-surface px-4 py-2.5 text-sm font-medium">
            Erlauben
          </button>
        </div>
      </section>
    </main>
  );
}
