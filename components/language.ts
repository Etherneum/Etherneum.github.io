export type Language = "en" | "es";

export function normalizeLanguage(value: string | null | undefined): Language {
  return value === "es" ? "es" : "en";
}
