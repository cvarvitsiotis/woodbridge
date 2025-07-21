const enOrdinalRules = new Intl.PluralRules("en-US", { type: "ordinal" });

const ordinals = new Map([
  ["one", "st"],
  ["two", "nd"],
  ["few", "rd"],
  ["other", "th"],
]);

export function getOrdinal(num: number): string | undefined {
  const rule = enOrdinalRules.select(num);

  return ordinals.get(rule);
}
