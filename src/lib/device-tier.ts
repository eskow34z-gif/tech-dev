export type DeviceTier = "low" | "medium" | "high";

interface NavigatorWithHints extends Navigator {
  deviceMemory?: number;
}

export function getDeviceTier(): DeviceTier {
  if (typeof navigator === "undefined") return "high";

  const nav = navigator as NavigatorWithHints;
  const cores = nav.hardwareConcurrency ?? 8;
  const memory = nav.deviceMemory ?? 8;

  if (cores <= 4 || memory <= 4) return "low";
  if (cores <= 6 || memory <= 8) return "medium";
  return "high";
}
