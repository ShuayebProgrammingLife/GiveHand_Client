export const EVENT_TYPES = [
  "Donation",
  "Education",
  "Health Camp",
  "Food Distribution",
  "Plantation",
  "Cleanup",
  "Others",
] as const;

export const OTHERS = "Others";

// blood DONATION -> Blood Donation
export function normalizeType(value: string): string {
  return value
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, 30)
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}


// after others and clicking on others, it will show a text field to enter the type of event

export const PHOTO_PRESETS = [
  { label: "Winter Clothes", url: "" },
  { label: "Blankets", url: "" },
  { label: "Education", url: "" },
  { label: "Food", url: "" },
  { label: "Plantation", url: "" },
  { label: "Cleanup", url: "" },
];

