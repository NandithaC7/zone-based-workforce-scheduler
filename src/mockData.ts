export const zones = [
  { id: "z1", name: "North Zone" },
  { id: "z2", name: "South Zone" },
  { id: "z3", name: "East Zone" },
];

export const teams = [
  { id: "t1", zoneId: "z1", name: "Team 1" },
  { id: "t2", zoneId: "z1", name: "Team 2" },
  { id: "t3", zoneId: "z2", name: "Team 3" },
  { id: "t4", zoneId: "z2", name: "Team 4" },
  { id: "t5", zoneId: "z3", name: "Team 5" },
  { id: "t6", zoneId: "z3", name: "Team 6" },
];

export const workers = [
  //(t1) ──────────────────────────────────────────────────────
  { id: "t1-w1",  teamId: "t1", name: "Arjun Sharma" },
  { id: "t1-w2",  teamId: "t1", name: "Priya Nair" },
  { id: "t1-w3",  teamId: "t1", name: "Ravi Teja" },
  { id: "t1-w4",  teamId: "t1", name: "Sneha Iyer" },
  { id: "t1-w5",  teamId: "t1", name: "Kiran Reddy" },
  { id: "t1-w6",  teamId: "t1", name: "Meera Pillai" },
  { id: "t1-w7",  teamId: "t1", name: "Suresh Babu" },
  { id: "t1-w8",  teamId: "t1", name: "Deepa Menon" },
  { id: "t1-w9",  teamId: "t1", name: "Nikhil Rao" },
  { id: "t1-w10", teamId: "t1", name: "Asha Kumar" },

  // (t2) ───────────────────────────────────────────────────────
  { id: "t2-w1",  teamId: "t2", name: "Rahul Verma" },
  { id: "t2-w2",  teamId: "t2", name: "Kavya Singh" },
  { id: "t2-w3",  teamId: "t2", name: "Aditya Joshi" },
  { id: "t2-w4",  teamId: "t2", name: "Pooja Gupta" },
  { id: "t2-w5",  teamId: "t2", name: "Vikram Das" },
  { id: "t2-w6",  teamId: "t2", name: "Anita Bose" },
  { id: "t2-w7",  teamId: "t2", name: "Sanjay Patil" },
  { id: "t2-w8",  teamId: "t2", name: "Lakshmi Rao" },
  { id: "t2-w9",  teamId: "t2", name: "Rohan Mehta" },
  { id: "t2-w10", teamId: "t2", name: "Divya Nair" },

  // (t3) ──────────────────────────────────────────────────────
  { id: "t3-w1",  teamId: "t3", name: "Manoj Tiwari" },
  { id: "t3-w2",  teamId: "t3", name: "Sunita Desai" },
  { id: "t3-w3",  teamId: "t3", name: "Prasad Kulkarni" },
  { id: "t3-w4",  teamId: "t3", name: "Rekha Jain" },
  { id: "t3-w5",  teamId: "t3", name: "Ajay Mishra" },
  { id: "t3-w6",  teamId: "t3", name: "Nalini Choudhary" },
  { id: "t3-w7",  teamId: "t3", name: "Devendra Yadav" },
  { id: "t3-w8",  teamId: "t3", name: "Smita Pandey" },
  { id: "t3-w9",  teamId: "t3", name: "Harish Shukla" },
  { id: "t3-w10", teamId: "t3", name: "Varsha Bhatt" },

  // (t4) ──────────────────────────────────────────────────────
  { id: "t4-w1",  teamId: "t4", name: "Sachin More" },
  { id: "t4-w2",  teamId: "t4", name: "Usha Patil" },
  { id: "t4-w3",  teamId: "t4", name: "Girish Naik" },
  { id: "t4-w4",  teamId: "t4", name: "Pallavi Shah" },
  { id: "t4-w5",  teamId: "t4", name: "Dinesh Sawant" },
  { id: "t4-w6",  teamId: "t4", name: "Shruti Kamat" },
  { id: "t4-w7",  teamId: "t4", name: "Vinod Gawde" },
  { id: "t4-w8",  teamId: "t4", name: "Ashwini Hegde" },
  { id: "t4-w9",  teamId: "t4", name: "Sunil Lotlikar" },
  { id: "t4-w10", teamId: "t4", name: "Madhuri Dessai" },

  // (t5) ────────────────────────────────────────────────────
  { id: "t5-w1",  teamId: "t5", name: "Bhaskar Rao" },
  { id: "t5-w2",  teamId: "t5", name: "Chitra Reddy" },
  { id: "t5-w3",  teamId: "t5", name: "Ganesh Murthy" },
  { id: "t5-w4",  teamId: "t5", name: "Indira Varma" },
  { id: "t5-w5",  teamId: "t5", name: "Jagdish Shetty" },
  { id: "t5-w6",  teamId: "t5", name: "Kamala Devi" },
  { id: "t5-w7",  teamId: "t5", name: "Lakshmana Raju" },
  { id: "t5-w8",  teamId: "t5", name: "Mythili Subramanian" },
  { id: "t5-w9",  teamId: "t5", name: "Nataraj Pillai" },
  { id: "t5-w10", teamId: "t5", name: "Oviya Krishnan" },

//.(t6) ───────────────────────────────────────────────────────
  { id: "t6-w1",  teamId: "t6", name: "Pavan Kale" },
  { id: "t6-w2",  teamId: "t6", name: "Quamar Sheikh" },
  { id: "t6-w3",  teamId: "t6", name: "Ramesh Thorat" },
  { id: "t6-w4",  teamId: "t6", name: "Saraswati Jadhav" },
  { id: "t6-w5",  teamId: "t6", name: "Tukaram Mane" },
  { id: "t6-w6",  teamId: "t6", name: "Urmila Shinde" },
  { id: "t6-w7",  teamId: "t6", name: "Vaibhav Pawar" },
  { id: "t6-w8",  teamId: "t6", name: "Wahida Ansari" },
  { id: "t6-w9",  teamId: "t6", name: "Xavier D'Souza" },
  { id: "t6-w10", teamId: "t6", name: "Yamini Kulkarni" },
];

export const resources = [
  { id: "r1", name: "R1",   workload: "heavy" as const },
  { id: "r2", name: "R2",   workload: "light" as const },
  { id: "r3", name: "R3",    workload: "heavy" as const },
  { id: "r4", name: "R4", workload: "light" as const },
  { id: "r5", name: "R5",   workload: "heavy" as const },
  { id: "r6", name: "R6",     workload: "light" as const },
  { id: "r7", name: "R7",       workload: "heavy" as const },
  { id: "r8", name: "R8",  workload: "light" as const },
];

export type WorkloadTag = "light" | "heavy" | "occupied";

export const tagColors: Record<WorkloadTag, string> = {
  light:    "#22c55e",
  heavy:    "#ef4444",
  occupied: "#f59e0b",
};