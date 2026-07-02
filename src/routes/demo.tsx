import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Globe, RefreshCw } from "lucide-react";
import { mockSites, categoryMeta, type ScriptCategory, type Script } from "@/data/mockSites";
import {
  competenceLabels,
  conditionConfigs,
  parseConditionId,
  parsePrivacyCompetence,
  type ConditionId,
  type PrivacyCompetence,
} from "@/data/conditions";
import { PrivacyScoreRing } from "@/components/PrivacyScoreRing";
import { categoryIcons } from "@/components/categoryIcons";
import { ScriptRow } from "@/components/ScriptRow";
import { ExplainerCallout } from "@/components/ExplainerCallout";
import { RiskIndicator } from "@/components/RiskIndicator";

type DemoSearch = {
  condition: ConditionId;
  competence: PrivacyCompetence;
};

export const Route = createFileRoute("/demo")({
  validateSearch: (search: Record<string, unknown>): DemoSearch => ({
    condition: parseConditionId(search.condition),
    competence: parsePrivacyCompetence(search.competence),
  }),
  head: () => ({
    meta: [
      { title: "Demo · Explainable PrivacyAssist" },
      {
        name: "description",
        content:
          "Klickbare Demo der erweiterten PrivacyAssist-Extension mit zweckbasierten Script-Erklärungen.",
      },
      { property: "og:title", content: "Demo · Explainable PrivacyAssist" },
      {
        property: "og:description",
        content: "Browser-Extension-Mockup mit Privacy Score und Zweck-Kategorien.",
      },
    ],
  }),
  component: Demo,
});

function Demo() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const [siteId, setSiteId] = useState(mockSites[0].id);
  const site = mockSites.find((s) => s.id === siteId)!;
  const [blocked, setBlocked] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(site.scripts.map((s) => [s.id, s.recommendation === "block"])),
  );
  const condition = conditionConfigs[search.condition];

  const grouped = useMemo(() => {
    const map = new Map<ScriptCategory, typeof site.scripts>();
    for (const s of site.scripts) {
      if (!map.has(s.category)) map.set(s.category, []);
      map.get(s.category)!.push(s);
    }
    return [...map.entries()];
  }, [site]);

  const switchSite = (id: string) => {
    const s = mockSites.find((x) => x.id === id)!;
    setSiteId(id);
    setBlocked(Object.fromEntries(s.scripts.map((sc) => [sc.id, sc.recommendation === "block"])));
  };

  const setCondition = (conditionId: ConditionId) => {
    navigate({
      search: (prev) => ({
        ...prev,
        condition: conditionId,
        competence: conditionId === "C" ? prev.competence : "medium",
      }),
    });
  };

  const setCompetence = (competence: PrivacyCompetence) => {
    navigate({
      search: (prev) => ({
        ...prev,
        condition: "C",
        competence,
      }),
    });
  };

  return (
    <main className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Demo</h1>
          <p className="text-sm text-muted-foreground">
            Wähle eine simulierte Webseite und erkunde die Extension auf der rechten Seite.
          </p>
        </div>
        <div className="flex gap-1.5">
          {mockSites.map((s) => (
            <button
              key={s.id}
              onClick={() => switchSite(s.id)}
              className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                s.id === siteId
                  ? "border-primary bg-primary text-primary-foreground"
                  : "bg-surface text-foreground hover:bg-muted"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      <ResearchControl
        condition={search.condition}
        competence={search.competence}
        onConditionChange={setCondition}
        onCompetenceChange={setCompetence}
      />

      <div className="grid gap-6 lg:grid-cols-[1.55fr_1fr]">
        {/* Browser mockup */}
        <div className="overflow-hidden rounded-xl border bg-surface shadow-sm">
          <div className="flex items-center gap-2 border-b bg-muted/60 px-4 py-2.5">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
            </div>
            <div className="ml-2 flex flex-1 items-center gap-2 rounded-md border bg-surface px-3 py-1 text-xs text-muted-foreground">
              <Globe className="h-3.5 w-3.5" />
              {site.domain}
            </div>
          </div>
          <SiteMock site={site} />
        </div>

        {/* Extension popup */}
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <div className="overflow-hidden rounded-xl border bg-surface shadow-lg">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <div>
                <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  Condition {condition.id} · {condition.shortName}
                </div>
                <div className="font-mono text-xs text-foreground">{site.domain}</div>
              </div>
              <button
                className="text-muted-foreground hover:text-foreground"
                title="Erneut analysieren"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[640px] space-y-4 overflow-y-auto p-4">
              {search.condition === "A" && (
                <BaselineView site={site} blocked={blocked} setBlocked={setBlocked} />
              )}
              {search.condition === "B" && (
                <ExtendedView
                  site={site}
                  grouped={grouped}
                  blocked={blocked}
                  setBlocked={setBlocked}
                />
              )}
              {search.condition === "C" && (
                <PersonaAdaptiveView
                  site={site}
                  grouped={grouped}
                  blocked={blocked}
                  setBlocked={setBlocked}
                  competence={search.competence}
                />
              )}
            </div>
          </div>
          <p className="mt-3 px-1 text-xs text-muted-foreground">
            Wizard-of-Oz Prototyp: Webseiten und Scripts sind simuliert.
          </p>
        </aside>
      </div>
    </main>
  );
}

function ResearchControl({
  condition,
  competence,
  onConditionChange,
  onCompetenceChange,
}: {
  condition: ConditionId;
  competence: PrivacyCompetence;
  onConditionChange: (condition: ConditionId) => void;
  onCompetenceChange: (competence: PrivacyCompetence) => void;
}) {
  return (
    <section className="mb-6 rounded-xl border bg-surface p-4 shadow-sm">
      <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Research Control
          </div>
          <h2 className="text-sm font-semibold">{conditionConfigs[condition].name}</h2>
          <p className="mt-1 max-w-2xl text-xs text-muted-foreground">
            {conditionConfigs[condition].description}
          </p>
        </div>
        <div className="rounded-md border bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
          nicht Teil der Extension-UI
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="flex gap-1.5 rounded-lg border bg-muted/40 p-1">
          {(["A", "B", "C"] as ConditionId[]).map((id) => (
            <button
              key={id}
              onClick={() => onConditionChange(id)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                condition === id
                  ? "bg-surface text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {id}
            </button>
          ))}
        </div>

        {condition === "C" && (
          <div className="flex gap-1.5 rounded-lg border bg-muted/40 p-1">
            {(["low", "medium", "high"] as PrivacyCompetence[]).map((level) => (
              <button
                key={level}
                onClick={() => onCompetenceChange(level)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  competence === level
                    ? "bg-surface text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {competenceLabels[level]}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function SiteMock({ site }: { site: (typeof mockSites)[number] }) {
  const blocks: Record<typeof site.type, React.ReactNode> = {
    news: (
      <>
        <div className="text-[11px] font-semibold uppercase tracking-wider text-primary">
          Politik
        </div>
        <h2 className="mt-1 text-2xl font-semibold leading-tight">
          Klimagipfel endet mit überraschender Einigung
        </h2>
        <div className="mt-2 text-xs text-muted-foreground">Heute · 5 min Lesezeit</div>
        <div className="mt-4 h-44 rounded-lg bg-gradient-to-br from-accent to-muted" />
        <p className="mt-4 text-sm leading-relaxed text-foreground/80">
          In den frühen Morgenstunden einigten sich die Verhandlungsdelegationen auf einen
          Kompromisstext. Beobachter sprechen von einem unerwarteten Durchbruch …
        </p>
      </>
    ),
    shop: (
      <>
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-lg border bg-surface-elevated p-3">
              <div className="h-20 rounded-md bg-gradient-to-br from-accent to-muted" />
              <div className="mt-2 text-sm font-medium">Artikel #{i}</div>
              <div className="text-xs text-muted-foreground">€ {19 + i * 10},00</div>
            </div>
          ))}
        </div>
        <button className="mt-4 w-full rounded-md bg-primary py-2 text-sm font-medium text-primary-foreground">
          In den Warenkorb
        </button>
      </>
    ),
    health: (
      <>
        <h2 className="text-xl font-semibold">Symptom-Check</h2>
        <div className="mt-3 space-y-2">
          {["Kopfschmerzen", "Müdigkeit", "Übelkeit"].map((s) => (
            <label
              key={s}
              className="flex items-center gap-2 rounded-md border bg-surface-elevated p-2.5 text-sm"
            >
              <input type="checkbox" className="accent-primary" /> {s}
            </label>
          ))}
        </div>
      </>
    ),
    video: (
      <>
        <div className="grid h-56 place-items-center rounded-lg bg-foreground/85 text-surface">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-surface/20">▶</div>
        </div>
        <h2 className="mt-3 text-base font-semibold">Wie funktioniert Tracking im Browser?</h2>
        <div className="text-xs text-muted-foreground">12.4K Aufrufe</div>
      </>
    ),
  };
  return <div className="p-6">{blocks[site.type]}</div>;
}

function scriptOriginLabel(script: Script) {
  return script.isExternal ? "extern" : "intern";
}

function BaselineView({
  site,
  blocked,
  setBlocked,
}: {
  site: (typeof mockSites)[number];
  blocked: Record<string, boolean>;
  setBlocked: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}) {
  const external = site.scripts.filter((script) => script.isExternal);
  const internal = site.scripts.filter((script) => !script.isExternal);
  const originGroups = [
    { key: "external", label: "Externe Scripts", scripts: external },
    { key: "internal", label: "Interne Scripts", scripts: internal },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 rounded-lg border bg-surface-elevated p-3">
        <PrivacyScoreRing score={site.privacyScore} size={86} stroke={8} />
        <div className="text-sm">
          <div className="font-medium">{site.scripts.length} Scripts geladen</div>
          <div className="text-xs text-muted-foreground">
            {internal.length} intern · {external.length} extern
          </div>
        </div>
      </div>

      {originGroups.map((group) => (
        <section key={group.key}>
          <header className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-semibold">{group.label}</h3>
            <span className="text-xs text-muted-foreground">{group.scripts.length}</span>
          </header>
          <div className="space-y-2">
            {group.scripts.map((script) => (
              <BaselineScriptRow
                key={script.id}
                script={script}
                blocked={!!blocked[script.id]}
                onToggle={() => setBlocked((b) => ({ ...b, [script.id]: !b[script.id] }))}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function BaselineScriptRow({
  script,
  blocked,
  onToggle,
}: {
  script: Script;
  blocked: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-lg border bg-surface p-3">
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                script.isExternal
                  ? "border border-warning/40 bg-warning/10 text-foreground"
                  : "border border-border bg-muted text-muted-foreground"
              }`}
            >
              {scriptOriginLabel(script)}
            </span>
            <span className="text-xs text-muted-foreground">{script.sizeKb} KB</span>
          </div>
          <div className="mt-1.5 truncate font-mono text-[12.5px] text-foreground/80">
            {script.host}
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
    </div>
  );
}

function ExtendedView({
  site,
  grouped,
  blocked,
  setBlocked,
}: {
  site: (typeof mockSites)[number];
  grouped: [ScriptCategory, typeof site.scripts][];
  blocked: Record<string, boolean>;
  setBlocked: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 rounded-lg border bg-surface-elevated p-3">
        <PrivacyScoreRing score={site.privacyScore} size={72} stroke={8} showLabel={false} />
        <div className="text-sm">
          <div className="font-medium">{site.scripts.length} Scripts geladen</div>
          <div className="text-xs text-muted-foreground">in {grouped.length} Zweckkategorien</div>
        </div>
      </div>
      <ExplainerCallout
        tone={site.privacyScore < 45 ? "danger" : site.privacyScore < 70 ? "warn" : "info"}
      >
        {site.recommendation}
      </ExplainerCallout>

      <div className="space-y-4">
        {grouped.map(([cat, scripts]) => {
          const Icon = categoryIcons[cat];
          const meta = categoryMeta[cat];
          return (
            <section key={cat}>
              <header className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-foreground/70" />
                  <h3 className="text-sm font-semibold">{meta.label}</h3>
                  <span className="text-xs text-muted-foreground">({scripts.length})</span>
                </div>
                <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
                  {meta.recommendation}
                </span>
              </header>
              <p className="mb-2 text-xs text-muted-foreground">{meta.short}</p>
              <div className="space-y-2">
                {scripts.map((s) => (
                  <ScriptRow
                    key={s.id}
                    script={s}
                    blocked={!!blocked[s.id]}
                    onToggle={() => setBlocked((b) => ({ ...b, [s.id]: !b[s.id] }))}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function PersonaAdaptiveView({
  site,
  grouped,
  blocked,
  setBlocked,
  competence,
}: {
  site: (typeof mockSites)[number];
  grouped: [ScriptCategory, typeof site.scripts][];
  blocked: Record<string, boolean>;
  setBlocked: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  competence: PrivacyCompetence;
}) {
  const problemScripts = site.scripts.filter((script) => script.recommendation === "block");
  const hasAllowedProblemScript = problemScripts.some((script) => !blocked[script.id]);
  const toggleProblemScripts = () => {
    setBlocked((current) => ({
      ...current,
      ...Object.fromEntries(problemScripts.map((script) => [script.id, hasAllowedProblemScript])),
    }));
  };
  const depthHint: Record<PrivacyCompetence, string> = {
    low: "Einfache Ansicht: Du siehst nur, zu welcher Kategorie ein Script gehört.",
    medium: "Mittlere Erklärung: Zweck plus Konsequenz beim Blockieren.",
    high: "Detaillierte Erklärung: Zweck, Risiko, Herkunft und technische Details.",
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 rounded-lg border bg-surface-elevated p-3">
        <PrivacyScoreRing score={site.privacyScore} size={72} stroke={8} showLabel={false} />
        <div className="text-sm">
          <div className="font-medium">{site.scripts.length} Scripts geladen</div>
          <div className="text-xs text-muted-foreground">
            Privacy Competence: {competenceLabels[competence]}
          </div>
        </div>
      </div>

      <ExplainerCallout
        tone={site.privacyScore < 45 ? "danger" : site.privacyScore < 70 ? "warn" : "info"}
      >
        {depthHint[competence]}
      </ExplainerCallout>

      {competence === "low" && problemScripts.length > 0 && (
        <button
          onClick={toggleProblemScripts}
          className={`w-full rounded-md px-4 py-2.5 text-sm font-medium transition-colors ${
            hasAllowedProblemScript
              ? "bg-danger text-danger-foreground"
              : "border bg-surface text-foreground hover:bg-muted"
          }`}
        >
          {hasAllowedProblemScript
            ? "Problematische Scripts blockieren"
            : "Problematische Scripts erlauben"}
        </button>
      )}

      <div className="space-y-4">
        {grouped.map(([cat, scripts]) => {
          const Icon = categoryIcons[cat];
          const meta = categoryMeta[cat];
          return (
            <section key={cat}>
              <header className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-foreground/70" />
                  <h3 className="text-sm font-semibold">{meta.label}</h3>
                  <span className="text-xs text-muted-foreground">({scripts.length})</span>
                </div>
                <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
                  {meta.recommendation}
                </span>
              </header>
              {competence === "medium" && (
                <p className="mb-2 text-xs text-muted-foreground">{meta.short}</p>
              )}
              <div className="space-y-2">
                {scripts.map((script) => (
                  <AdaptiveScriptRow
                    key={script.id}
                    script={script}
                    blocked={!!blocked[script.id]}
                    onToggle={() => setBlocked((b) => ({ ...b, [script.id]: !b[script.id] }))}
                    competence={competence}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function AdaptiveScriptRow({
  script,
  blocked,
  onToggle,
  competence,
}: {
  script: Script;
  blocked: boolean;
  onToggle: () => void;
  competence: PrivacyCompetence;
}) {
  const meta = categoryMeta[script.category];

  if (competence === "low") {
    return (
      <div className="rounded-lg border bg-surface p-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-foreground">{meta.label}</span>
          <span className="truncate font-mono text-[12.5px] text-muted-foreground">
            {script.host}
          </span>
        </div>
      </div>
    );
  }

  if (competence === "medium") {
    return (
      <div className="rounded-lg border bg-surface p-3">
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-foreground">{meta.label}</span>
              <RiskIndicator risk={script.risk} withLabel={false} />
              <span className="text-xs text-muted-foreground">
                {scriptOriginLabel(script)} · {script.sizeKb} KB
              </span>
            </div>
            <div className="mt-1.5 truncate font-mono text-[12.5px] text-foreground/80">
              {script.host}
            </div>
            <p className="mt-2 text-sm text-foreground/85">{script.purpose}</p>
            <div className="mt-2 rounded-md bg-muted p-2 text-xs text-foreground/75">
              Wenn blockiert: {script.blockImpact}
            </div>
          </div>
          <BlockToggle blocked={blocked} onToggle={onToggle} />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-surface p-3 ring-1 ring-foreground/5">
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-foreground">{meta.label}</span>
            <RiskIndicator risk={script.risk} />
            <span className="text-xs text-muted-foreground">
              {scriptOriginLabel(script)} · {script.sizeKb} KB
            </span>
          </div>
          <div className="mt-1.5 break-all font-mono text-[12.5px] text-foreground">
            {script.url}
          </div>
          <dl className="mt-3 grid gap-2 text-xs sm:grid-cols-2">
            <div className="rounded-md bg-muted p-2">
              <dt className="font-semibold text-muted-foreground">Host</dt>
              <dd className="mt-0.5 break-all text-foreground/85">{script.host}</dd>
            </div>
            <div className="rounded-md bg-muted p-2">
              <dt className="font-semibold text-muted-foreground">Begründung</dt>
              <dd className="mt-0.5 text-foreground/85">
                {meta.label}: {meta.short}
              </dd>
            </div>
          </dl>
          <p className="mt-3 text-sm text-foreground/85">{script.purpose}</p>
          <div className="mt-2 rounded-md border bg-surface-elevated p-2 text-xs text-foreground/75">
            Blockierfolge: {script.blockImpact}
          </div>
        </div>
        <BlockToggle blocked={blocked} onToggle={onToggle} />
      </div>
    </div>
  );
}

function BlockToggle({ blocked, onToggle }: { blocked: boolean; onToggle: () => void }) {
  return (
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
  );
}
