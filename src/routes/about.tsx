import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Forschung · Explainable PrivacyAssist" },
      {
        name: "description",
        content:
          "Wissenschaftlicher Hintergrund, Forschungsfrage, Hypothesen H1–H5 und Methodik der Folgestudie zu PrivacyAssist.",
      },
      { property: "og:title", content: "Forschungs-Hintergrund" },
      {
        property: "og:description",
        content: "From Script Visibility to Script Explainability – HCI-Folgestudie.",
      },
    ],
  }),
  component: About,
});

const hypotheses = [
  {
    id: "H1",
    title: "Verständnis",
    body: "Nutzer:innen mit zweckbasierten Erklärungen verstehen Script Tracking besser.",
  },
  {
    id: "H2",
    title: "Entscheidungsqualität",
    body: "Sie treffen häufiger angemessene Block-/Erlaube-Entscheidungen.",
  },
  {
    id: "H3",
    title: "Wahrgenommene Kontrolle",
    body: "Zweckbasierte Erklärungen erhöhen das Gefühl von Kontrolle.",
  },
  {
    id: "H4",
    title: "Moderation Privacy Competence",
    body: "Der Effekt ist stärker bei niedriger/mittlerer Privacy Competence.",
  },
  {
    id: "H5",
    title: "Risiko Overload",
    body: "Zu viele Erklärungen können Komplexität & Belastung erhöhen.",
  },
];

function About() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Folgestudie · HCI / Usable Privacy
      </div>
      <h1 className="mt-2 text-3xl font-semibold">
        From Script Visibility to Script Explainability
      </h1>
      <p className="mt-3 text-muted-foreground">
        Das Originalpaper zeigt mit PrivacyAssist drei UI-Tiefen für unterschiedliche Privacy
        Competence. Offen bleibt: Welche <strong>Qualität</strong> der dargestellten Information
        führt zu besseren Entscheidungen? Diese Folgestudie ergänzt PrivacyAssist um zweckbasierte
        Script-Erklärungen.
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Forschungsfrage</h2>
        <blockquote className="mt-3 rounded-lg border-l-4 border-primary bg-surface p-4 text-sm leading-relaxed">
          Verbessern zweckbasierte Script-Erklärungen das Verständnis, das Vertrauen und die
          Entscheidungsqualität von Nutzer:innen im Vergleich zu einer einfachen internen/externen
          Script-Anzeige?
        </blockquote>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Hypothesen</h2>
        <div className="mt-4 space-y-3">
          {hypotheses.map((h) => (
            <div key={h.id} className="rounded-lg border bg-surface p-4">
              <div className="flex items-baseline gap-3">
                <span className="rounded-md bg-primary px-2 py-0.5 text-xs font-mono text-primary-foreground">
                  {h.id}
                </span>
                <h3 className="text-sm font-semibold">{h.title}</h3>
              </div>
              <p className="mt-1.5 text-sm text-foreground/80">{h.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Studiendesign</h2>
        <p className="mt-2 text-sm text-foreground/85">
          Mixed-Methods Between-Subjects Experiment mit 80–120 Teilnehmenden, drei UI-Bedingungen:
        </p>
        <ul className="mt-3 space-y-2 text-sm">
          <li className="rounded-md border bg-surface p-3">
            <strong>A · Baseline:</strong> Original PrivacyAssist (intern/extern, Score = #extern)
          </li>
          <li className="rounded-md border bg-surface p-3">
            <strong>B · Zweckbasiert:</strong> Scripts nach Kategorie + Erklärung
          </li>
          <li className="rounded-md border bg-surface p-3">
            <strong>C · Zweck + persona-adaptiv:</strong> zusätzlich tiefenangepasst an Privacy
            Competence
          </li>
        </ul>
        <p className="mt-3 text-xs text-muted-foreground">
          Messinstrumente: Verständnistest, Entscheidungsqualität (Ground-Truth Klassifikation),
          NASA-TLX, UEQ, Vertrauen-/Kontrollskala, Think-Aloud.
        </p>
      </section>

      <section className="mt-10 rounded-xl border bg-surface p-5 text-xs text-muted-foreground">
        <strong className="text-foreground">Wizard-of-Oz Hinweis:</strong> Im Prototyp ist die
        Klassifikation von Scripts vorab festgelegt. Eine reale Implementierung würde Listen wie
        EasyList/EasyPrivacy, Disconnect oder Heuristiken nutzen.
      </section>
    </main>
  );
}
