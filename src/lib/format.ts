/** Formats a sat amount with thin-space-free thousands separators: 1250000 -> "1,250,000". */
export function formatSats(sats: number): string {
  return Math.round(sats).toLocaleString("en-US");
}
