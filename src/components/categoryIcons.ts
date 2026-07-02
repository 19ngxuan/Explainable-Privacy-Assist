import type { ScriptCategory } from "@/data/mockSites";
import { BarChart3, Globe, HelpCircle, Megaphone, Share2, Shield, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const categoryIcons: Record<ScriptCategory, LucideIcon> = {
  essential: Shield,
  functional: Wrench,
  analytics: BarChart3,
  advertising: Megaphone,
  social: Share2,
  external: Globe,
  unknown: HelpCircle,
};
