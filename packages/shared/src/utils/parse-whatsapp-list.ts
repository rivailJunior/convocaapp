/**
 * Regex that matches numbered list entries like:
 *   1 - ALONSO ✅
 *   2 - RIVA
 *   10 - VICTOR FRAGATA ✅
 *   1 - Rocha 99
 *
 * Captures the name portion after the number+separator.
 */
const NUMBERED_LINE_REGEX = /^\s*\d+\s*[-–—.)\]]\s*(.+)/;

/**
 * Strip trailing whitespace and any non-letter/non-digit characters
 * commonly used as confirmation marks (✅, ✔, ❌, etc.)
 */
const stripTrailingMarks = (text: string): string => text.replace(/[^\p{L}\p{N}]+$/u, '');

const titleCase = (text: string): string =>
  text
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

/**
 * Parse a WhatsApp-style numbered list and extract participant names.
 *
 * Handles:
 * - Multiple sections (e.g. main list + "DIARISTAS")
 * - Names with numbers or special chars (e.g. "Rocha 99", "1000GOLS")
 * - Confirmation emojis (✅) — stripped from the name
 * - Duplicate names — kept only once (case-insensitive)
 *
 * @returns array of cleaned, title-cased names
 */
export const parseWhatsappList = (text: string): string[] => {
  const lines = text.split(/\r?\n/);
  const seen = new Set<string>();
  const names: string[] = [];

  for (const line of lines) {
    const match = line.match(NUMBERED_LINE_REGEX);
    if (!match) continue;

    const raw = stripTrailingMarks(match[1]!).trim();
    if (raw.length === 0) continue;

    const name = titleCase(raw);
    const key = name.toLowerCase();

    if (!seen.has(key)) {
      seen.add(key);
      names.push(name);
    }
  }

  return names;
};
