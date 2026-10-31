import type { LucideIcon } from "lucide-react";

/** Icon + short title + one-line note: the unit of every "essentials" style list. */
export interface IconNote {
  icon: LucideIcon;
  title: string;
  note: string;
}

/** Copy for the opening block of a page. `accent` is the italic, ember-coloured last line. */
export interface IntroContent {
  eyebrow: string;
  title: string[];
  accent: string;
  kanji: string;
  lede?: string;
}
