export function isFirefox(userAgent: string): boolean {
  return userAgent?.includes("Gecko") && userAgent?.includes("rv:");
}
