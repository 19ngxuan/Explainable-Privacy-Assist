export type ScriptCategory =
  | "essential"
  | "functional"
  | "analytics"
  | "advertising"
  | "social"
  | "external"
  | "unknown";

export type RiskLevel = "low" | "medium" | "high" | "unknown";

export type Script = {
  id: string;
  url: string;
  host: string;
  isExternal: boolean;
  sizeKb: number;
  category: ScriptCategory;
  risk: RiskLevel;
  purpose: string;
  blockImpact: string;
  recommendation: "allow" | "block" | "decide";
};

export type MockSite = {
  id: string;
  name: string;
  domain: string;
  type: "news" | "shop" | "video" | "health";
  description: string;
  privacyScore: number; // 0-100, higher = better privacy
  recommendation: string;
  scripts: Script[];
};

export const categoryMeta: Record<
  ScriptCategory,
  {
    label: string;
    short: string;
    recommendation: string;
    tone: "neutral" | "info" | "warn" | "danger" | "unknown";
  }
> = {
  essential: {
    label: "Essenziell",
    short: "Notwendig damit die Seite funktioniert (Login, Warenkorb, Sicherheit).",
    recommendation: "erlauben",
    tone: "neutral",
  },
  functional: {
    label: "Funktional",
    short: "Verbessert die Bedienung, z. B. Videoplayer, Karten, Schriftarten.",
    recommendation: "meist erlauben",
    tone: "info",
  },
  analytics: {
    label: "Analytics",
    short: "Misst, wie die Seite genutzt wird – häufig auch über mehrere Seiten hinweg.",
    recommendation: "eher blockieren",
    tone: "warn",
  },
  advertising: {
    label: "Werbung & Tracking",
    short: "Erstellt Profile über dein Verhalten, um personalisierte Werbung anzuzeigen.",
    recommendation: "blockieren",
    tone: "danger",
  },
  social: {
    label: "Social Media",
    short: "Verbindet die Seite mit sozialen Netzwerken, oft mit Tracking durch Dritte.",
    recommendation: "eher blockieren",
    tone: "warn",
  },
  external: {
    label: "Externe Ressourcen",
    short: "Lädt Inhalte von Drittanbietern wie Schriftarten oder CDNs.",
    recommendation: "vorsichtig prüfen",
    tone: "info",
  },
  unknown: {
    label: "Unbekannt",
    short: "Der Zweck konnte nicht eindeutig bestimmt werden.",
    recommendation: "vorsichtig entscheiden",
    tone: "unknown",
  },
};

export const mockSites: MockSite[] = [
  {
    id: "news",
    name: "Daily Tribune",
    domain: "dailytribune.example",
    type: "news",
    description: "Eine typische Nachrichtenseite mit Werbung und Trackern.",
    privacyScore: 38,
    recommendation:
      "Diese Seite lädt mehrere Werbe- und Tracking-Scripts. Wir empfehlen, Tracking zu blockieren – die Inhalte bleiben lesbar.",
    scripts: [
      {
        id: "n1",
        url: "https://dailytribune.example/static/app.js",
        host: "dailytribune.example",
        isExternal: false,
        sizeKb: 84,
        category: "essential",
        risk: "low",
        purpose:
          "Lädt das Layout und die Navigation der Seite. Ohne dieses Script funktioniert die Seite nicht.",
        blockImpact: "Die Seite wird leer oder unbenutzbar.",
        recommendation: "allow",
      },
      {
        id: "n2",
        url: "https://fonts.gstatic.com/s/inter.woff2",
        host: "fonts.gstatic.com",
        isExternal: true,
        sizeKb: 34,
        category: "external",
        risk: "low",
        purpose: "Lädt Schriftarten von Google. Sendet deine IP-Adresse an Google.",
        blockImpact: "Texte erscheinen in Standardschrift.",
        recommendation: "decide",
      },
      {
        id: "n3",
        url: "https://www.google-analytics.com/analytics.js",
        host: "google-analytics.com",
        isExternal: true,
        sizeKb: 46,
        category: "analytics",
        risk: "medium",
        purpose:
          "Misst dein Verhalten auf der Seite (Klicks, Scrollen) und sendet es an Google – auch über andere Seiten hinweg.",
        blockImpact: "Die Seite funktioniert normal weiter, ohne dass dein Besuch erfasst wird.",
        recommendation: "block",
      },
      {
        id: "n4",
        url: "https://securepubads.g.doubleclick.net/tag.js",
        host: "doubleclick.net",
        isExternal: true,
        sizeKb: 132,
        category: "advertising",
        risk: "high",
        purpose:
          "Erstellt ein Profil über dich, um personalisierte Werbung anzuzeigen. Teilt Daten mit zahlreichen Werbepartnern.",
        blockImpact: "Werbeflächen bleiben leer, Inhalte sind weiter verfügbar.",
        recommendation: "block",
      },
      {
        id: "n5",
        url: "https://connect.facebook.net/en_US/fbevents.js",
        host: "facebook.net",
        isExternal: true,
        sizeKb: 78,
        category: "social",
        risk: "high",
        purpose: "Meldet deinen Besuch an Meta/Facebook, auch wenn du dort kein Konto hast.",
        blockImpact: "Facebook-Buttons funktionieren möglicherweise nicht.",
        recommendation: "block",
      },
      {
        id: "n6",
        url: "https://cdn.taboola.com/libtrc/dailytribune-network/loader.js",
        host: "taboola.com",
        isExternal: true,
        sizeKb: 210,
        category: "advertising",
        risk: "high",
        purpose: "Empfehlungswidget, das dein Klickverhalten verfolgt.",
        blockImpact: "Das Empfehlungs-Modul verschwindet.",
        recommendation: "block",
      },
      {
        id: "n7",
        url: "https://dailytribune.example/static/comments.js",
        host: "dailytribune.example",
        isExternal: false,
        sizeKb: 22,
        category: "functional",
        risk: "low",
        purpose: "Aktiviert die Kommentarfunktion am Ende des Artikels.",
        blockImpact: "Kommentare werden nicht angezeigt.",
        recommendation: "allow",
      },
      {
        id: "n8",
        url: "https://script.hotjar.com/modules.b3d6.js",
        host: "hotjar.com",
        isExternal: true,
        sizeKb: 95,
        category: "analytics",
        risk: "medium",
        purpose: "Zeichnet Mausbewegungen und Sitzungen auf (Session Replay).",
        blockImpact: "Keine sichtbare Auswirkung.",
        recommendation: "block",
      },
      {
        id: "n9",
        url: "https://cdn.example-tracking.io/pulse.js",
        host: "example-tracking.io",
        isExternal: true,
        sizeKb: 18,
        category: "unknown",
        risk: "unknown",
        purpose:
          "Ein Drittanbieter-Script ohne klare Funktion. Solche Scripts sind oft Teil eines Werbe- oder Tracking-Netzwerks.",
        blockImpact: "Vermutlich keine sichtbare Auswirkung.",
        recommendation: "block",
      },
    ],
  },
  {
    id: "shop",
    name: "Maple & Co.",
    domain: "maple-shop.example",
    type: "shop",
    description: "Online-Shop mit Bezahlfunktion und einigen Trackern.",
    privacyScore: 62,
    recommendation:
      "Wesentliche Shop-Funktionen brauchen ein paar Scripts. Werbe-Tracker können ohne Funktionsverlust blockiert werden.",
    scripts: [
      {
        id: "s1",
        url: "https://maple-shop.example/checkout.js",
        host: "maple-shop.example",
        isExternal: false,
        sizeKb: 64,
        category: "essential",
        risk: "low",
        purpose: "Verarbeitet Warenkorb und Bestellung sicher.",
        blockImpact: "Du kannst nichts kaufen.",
        recommendation: "allow",
      },
      {
        id: "s2",
        url: "https://js.stripe.com/v3/",
        host: "stripe.com",
        isExternal: true,
        sizeKb: 110,
        category: "essential",
        risk: "low",
        purpose: "Zahlungsabwicklung über Stripe – verschlüsselt und PCI-konform.",
        blockImpact: "Kreditkartenzahlung funktioniert nicht.",
        recommendation: "allow",
      },
      {
        id: "s3",
        url: "https://maps.googleapis.com/maps/api/js",
        host: "googleapis.com",
        isExternal: true,
        sizeKb: 88,
        category: "functional",
        risk: "medium",
        purpose: "Zeigt eine Karte mit Filialen. Sendet deine IP an Google.",
        blockImpact: "Die Karte bleibt leer.",
        recommendation: "decide",
      },
      {
        id: "s4",
        url: "https://www.googletagmanager.com/gtm.js",
        host: "googletagmanager.com",
        isExternal: true,
        sizeKb: 56,
        category: "analytics",
        risk: "medium",
        purpose: "Lädt mehrere Analyse- und Werbe-Tags von Google.",
        blockImpact: "Die Seite funktioniert weiter.",
        recommendation: "block",
      },
      {
        id: "s5",
        url: "https://static.criteo.net/js/ld/ld.js",
        host: "criteo.net",
        isExternal: true,
        sizeKb: 72,
        category: "advertising",
        risk: "high",
        purpose: "Retargeting – zeigt dir Produkte als Werbung auf anderen Seiten.",
        blockImpact: "Keine personalisierte Werbung – die Seite funktioniert.",
        recommendation: "block",
      },
      {
        id: "s6",
        url: "https://platform.twitter.com/widgets.js",
        host: "twitter.com",
        isExternal: true,
        sizeKb: 38,
        category: "social",
        risk: "medium",
        purpose: "Bindet einen X/Twitter-Feed ein und meldet deinen Besuch an X.",
        blockImpact: "Der Social-Feed im Footer fehlt.",
        recommendation: "block",
      },
      {
        id: "s7",
        url: "https://maple-shop.example/recommend.js",
        host: "maple-shop.example",
        isExternal: false,
        sizeKb: 30,
        category: "functional",
        risk: "low",
        purpose: "Zeigt Produktempfehlungen auf Basis deiner Sitzung.",
        blockImpact: "Keine Empfehlungen sichtbar.",
        recommendation: "allow",
      },
    ],
  },
  {
    id: "health",
    name: "VitaCheck",
    domain: "vitacheck.example",
    type: "health",
    description: "Gesundheitsportal mit Symptom-Check.",
    privacyScore: 28,
    recommendation:
      "Gesundheitsdaten sind besonders sensibel. Diese Seite teilt Verhaltensdaten mit Werbe- und Analytics-Anbietern – wir empfehlen strikte Blockierung.",
    scripts: [
      {
        id: "h1",
        url: "https://vitacheck.example/app.js",
        host: "vitacheck.example",
        isExternal: false,
        sizeKb: 92,
        category: "essential",
        risk: "low",
        purpose: "Symptom-Check und Navigation.",
        blockImpact: "Die Seite funktioniert nicht mehr.",
        recommendation: "allow",
      },
      {
        id: "h2",
        url: "https://www.google-analytics.com/analytics.js",
        host: "google-analytics.com",
        isExternal: true,
        sizeKb: 46,
        category: "analytics",
        risk: "high",
        purpose:
          "Sammelt Verhaltensdaten – auf Gesundheitsseiten besonders heikel, weil Rückschlüsse auf Erkrankungen möglich sind.",
        blockImpact: "Keine sichtbare Auswirkung.",
        recommendation: "block",
      },
      {
        id: "h3",
        url: "https://bat.bing.com/bat.js",
        host: "bing.com",
        isExternal: true,
        sizeKb: 24,
        category: "advertising",
        risk: "high",
        purpose: "Microsoft Advertising Tag – verfolgt Conversions.",
        blockImpact: "Keine sichtbare Auswirkung.",
        recommendation: "block",
      },
      {
        id: "h4",
        url: "https://cdn.unknown-ads.io/v2/track.js",
        host: "unknown-ads.io",
        isExternal: true,
        sizeKb: 12,
        category: "unknown",
        risk: "unknown",
        purpose:
          "Unbekannter Anbieter ohne öffentlich dokumentierten Zweck. Auf einer Gesundheitsseite besonders auffällig.",
        blockImpact: "Vermutlich keine sichtbare Auswirkung.",
        recommendation: "block",
      },
      {
        id: "h5",
        url: "https://fonts.gstatic.com/inter.woff2",
        host: "fonts.gstatic.com",
        isExternal: true,
        sizeKb: 30,
        category: "external",
        risk: "low",
        purpose: "Lädt Schriftarten von Google.",
        blockImpact: "Standardschrift wird verwendet.",
        recommendation: "decide",
      },
    ],
  },
  {
    id: "video",
    name: "StreamHub",
    domain: "streamhub.example",
    type: "video",
    description: "Videoplattform mit Player und Empfehlungssystem.",
    privacyScore: 54,
    recommendation:
      "Der Player benötigt mehrere interne Scripts. Externe Werbe-Tracker können ohne Funktionsverlust blockiert werden.",
    scripts: [
      {
        id: "v1",
        url: "https://streamhub.example/player.js",
        host: "streamhub.example",
        isExternal: false,
        sizeKb: 220,
        category: "essential",
        risk: "low",
        purpose: "Der Videoplayer selbst.",
        blockImpact: "Videos lassen sich nicht abspielen.",
        recommendation: "allow",
      },
      {
        id: "v2",
        url: "https://streamhub.example/analytics-internal.js",
        host: "streamhub.example",
        isExternal: false,
        sizeKb: 40,
        category: "analytics",
        risk: "medium",
        purpose:
          "Internes Tracking – misst, was du anschaust. Auch interne Scripts können Tracking betreiben.",
        blockImpact: "Empfehlungen funktionieren weniger gut.",
        recommendation: "decide",
      },
      {
        id: "v3",
        url: "https://imasdk.googleapis.com/js/sdkloader/ima3.js",
        host: "googleapis.com",
        isExternal: true,
        sizeKb: 130,
        category: "advertising",
        risk: "high",
        purpose: "Spielt Werbung vor dem Video ab und verfolgt Anzeigen-Interaktionen.",
        blockImpact: "Keine Pre-Roll-Werbung. Video startet schneller.",
        recommendation: "block",
      },
      {
        id: "v4",
        url: "https://streamhub.example/recommend.js",
        host: "streamhub.example",
        isExternal: false,
        sizeKb: 36,
        category: "functional",
        risk: "low",
        purpose: "Berechnet Empfehlungen für nächste Videos.",
        blockImpact: "Empfehlungsleiste verschwindet.",
        recommendation: "allow",
      },
      {
        id: "v5",
        url: "https://www.youtube.com/iframe_api",
        host: "youtube.com",
        isExternal: true,
        sizeKb: 18,
        category: "external",
        risk: "medium",
        purpose: "Eingebettete YouTube-Inhalte – aktiviert YouTube-Cookies.",
        blockImpact: "YouTube-Einbettungen funktionieren nicht.",
        recommendation: "decide",
      },
    ],
  },
];

export const findScript = (id: string) => {
  for (const site of mockSites) {
    const s = site.scripts.find((x) => x.id === id);
    if (s) return { site, script: s };
  }
  return null;
};
