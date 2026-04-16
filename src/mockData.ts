// ─── ZONES ────────────────────────────────────────────────────────────────────
// A "zone" here means a geographic/operational area — think of it like how a
// large construction site or logistics company splits its field into North Zone,
// South Zone, etc. Each zone has multiple teams.
export const zones = [
  { id: "z1", name: "zone 1" },
  { id: "z2", name: "zone 2" },
  { id: "z3", name: "zone 3" },
];

// ─── TEAMS ────────────────────────────────────────────────────────────────────
// Each team belongs to a zone. Every team has exactly 10 workers.
export const teams = [
  { id: "t1", zoneId: "z1", name: "team A" },
  { id: "t2", zoneId: "z1", name: "team B" },
  { id: "t3", zoneId: "z1", name: "team C" },
  { id: "t4", zoneId: "z2", name: "team D" },
  { id: "t5", zoneId: "z3", name: "team E" },
  { id: "t6", zoneId: "z3", name: "team F" },
];

const workerNames = [
  "Arjun", "Arun", "Aditya", "Amit", "Anita", "Alok"
];

export const workers = teams.flatMap((team) =>
  workerNames.map((name, i) => ({
    id: `${team.id}-w${i + 1}`,
    teamId: team.id,
    name: `${name} (${team.name.split(" ")[0]})`,
  }))
);

export const resources = [
  { id: "r1", name: "resource A",   workload: "heavy" as const },
  { id: "r2", name: "resource B",   workload: "light" as const },
  { id: "r3", name: "resource C",    workload: "heavy" as const },
  { id: "r4", name: "resource D", workload: "light" as const },
  { id: "r5", name: "resource E",   workload: "heavy" as const },
  { id: "r6", name: "resource F",     workload: "light" as const },
  { id: "r7", name: "resource G",       workload: "heavy" as const },
  { id: "r8", name: "resource H   .",  workload: "light" as const },
];

export type WorkloadTag = "light" | "heavy" | "occupied";

export const tagColors: Record<WorkloadTag, string> = {
  light:    "#22c55e",
  heavy:    "#ef4444",
  occupied: "#f59e0b",
};
