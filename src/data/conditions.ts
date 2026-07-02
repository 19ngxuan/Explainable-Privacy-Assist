export type ConditionId = "A" | "B" | "C";

export type PrivacyCompetence = "low" | "medium" | "high";

export type ConditionConfig = {
  id: ConditionId;
  name: string;
  shortName: string;
  description: string;
  features: {
    originOnly: boolean;
    purposeCategories: boolean;
    adaptiveDepth: boolean;
  };
};

export const conditionConfigs: Record<ConditionId, ConditionConfig> = {
  A: {
    id: "A",
    name: "Baseline / Internal-External",
    shortName: "Baseline",
    description: "Privacy Score, interne/externe Scripts, Script-Anzahl und Blockieren/Erlauben.",
    features: {
      originOnly: true,
      purposeCategories: false,
      adaptiveDepth: false,
    },
  },
  B: {
    id: "B",
    name: "Purpose-Based Explanation",
    shortName: "Zweckbasiert",
    description: "Baseline plus Zweckkategorien, kurze Erklärung und Handlungshinweis.",
    features: {
      originOnly: false,
      purposeCategories: true,
      adaptiveDepth: false,
    },
  },
  C: {
    id: "C",
    name: "Persona-Adaptive Explanation Depth",
    shortName: "Persona-adaptiv",
    description: "Zweckbasierte Erklärung mit Tiefe je nach Privacy Competence.",
    features: {
      originOnly: false,
      purposeCategories: true,
      adaptiveDepth: true,
    },
  },
};

export const competenceLabels: Record<PrivacyCompetence, string> = {
  low: "Niedrig",
  medium: "Mittel",
  high: "Hoch",
};

export function parseConditionId(value: unknown): ConditionId {
  return value === "A" || value === "B" || value === "C" ? value : "B";
}

export function parsePrivacyCompetence(value: unknown): PrivacyCompetence {
  return value === "low" || value === "medium" || value === "high" ? value : "medium";
}
