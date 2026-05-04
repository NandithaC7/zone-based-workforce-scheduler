// seed/seed.js
// ─────────────────────────────────────────────────────────────────────────────
// WHAT IS A SEED FILE?
//   A seed file is a one-time script that populates your database with
//   initial data. You run it ONCE when setting up. After that, the data
//   lives in MongoDB permanently — you don't run it again unless you want
//   to reset everything.
//
// WHY DO WE NEED THIS?
//   Your frontend currently reads zones/teams/workers/resources from
//   mockData.ts — a hardcoded file. When we switch to a real backend,
//   that data needs to exist in MongoDB. This script puts it there.
//
// HOW TO RUN:
//   npm run seed
//   (which runs: node seed/seed.js)
//
// WHAT IT DOES:
//   1. Connects to MongoDB
//   2. Deletes all existing zones, teams, workers, resources (clean slate)
//   3. Inserts all 3 zones, 6 teams, 60 workers, 8 resources
//   4. Disconnects and exits
// ─────────────────────────────────────────────────────────────────────────────

require("dotenv").config();
console.log("MONGO_URI:", process.env.MONGO_URI); // sanity check

const mongoose = require("mongoose");

const Zone     = require("../models/Zone");
const Team     = require("../models/Team");
const Worker   = require("../models/Worker");
const Resource = require("../models/Resource");

// ── THE EXACT SAME DATA AS YOUR mockData.ts ──────────────────────────────────
const zones = [
  { zoneId: "z1", name: "North Zone" },
  { zoneId: "z2", name: "South Zone" },
  { zoneId: "z3", name: "East Zone"  },
];

const teams = [
  { teamId: "t1", zoneId: "z1", name: "Alpha Team"   },
  { teamId: "t2", zoneId: "z1", name: "Beta Team"    },
  { teamId: "t3", zoneId: "z2", name: "Gamma Team"   },
  { teamId: "t4", zoneId: "z2", name: "Delta Team"   },
  { teamId: "t5", zoneId: "z3", name: "Epsilon Team" },
  { teamId: "t6", zoneId: "z3", name: "Zeta Team"    },
];

const workers = [
  // Alpha Team (t1)
  { workerId: "t1-w1",  teamId: "t1", name: "Arjun Sharma"       },
  { workerId: "t1-w2",  teamId: "t1", name: "Priya Nair"         },
  { workerId: "t1-w3",  teamId: "t1", name: "Ravi Teja"          },
  { workerId: "t1-w4",  teamId: "t1", name: "Sneha Iyer"         },
  { workerId: "t1-w5",  teamId: "t1", name: "Kiran Reddy"        },
  { workerId: "t1-w6",  teamId: "t1", name: "Meera Pillai"       },
  { workerId: "t1-w7",  teamId: "t1", name: "Suresh Babu"        },
  { workerId: "t1-w8",  teamId: "t1", name: "Deepa Menon"        },
  { workerId: "t1-w9",  teamId: "t1", name: "Nikhil Rao"         },
  { workerId: "t1-w10", teamId: "t1", name: "Asha Kumar"         },
  // Beta Team (t2)
  { workerId: "t2-w1",  teamId: "t2", name: "Rahul Verma"        },
  { workerId: "t2-w2",  teamId: "t2", name: "Kavya Singh"        },
  { workerId: "t2-w3",  teamId: "t2", name: "Aditya Joshi"       },
  { workerId: "t2-w4",  teamId: "t2", name: "Pooja Gupta"        },
  { workerId: "t2-w5",  teamId: "t2", name: "Vikram Das"         },
  { workerId: "t2-w6",  teamId: "t2", name: "Anita Bose"         },
  { workerId: "t2-w7",  teamId: "t2", name: "Sanjay Patil"       },
  { workerId: "t2-w8",  teamId: "t2", name: "Lakshmi Rao"        },
  { workerId: "t2-w9",  teamId: "t2", name: "Rohan Mehta"        },
  { workerId: "t2-w10", teamId: "t2", name: "Divya Nair"         },
  // Gamma Team (t3)
  { workerId: "t3-w1",  teamId: "t3", name: "Manoj Tiwari"       },
  { workerId: "t3-w2",  teamId: "t3", name: "Sunita Desai"       },
  { workerId: "t3-w3",  teamId: "t3", name: "Prasad Kulkarni"    },
  { workerId: "t3-w4",  teamId: "t3", name: "Rekha Jain"         },
  { workerId: "t3-w5",  teamId: "t3", name: "Ajay Mishra"        },
  { workerId: "t3-w6",  teamId: "t3", name: "Nalini Choudhary"   },
  { workerId: "t3-w7",  teamId: "t3", name: "Devendra Yadav"     },
  { workerId: "t3-w8",  teamId: "t3", name: "Smita Pandey"       },
  { workerId: "t3-w9",  teamId: "t3", name: "Harish Shukla"      },
  { workerId: "t3-w10", teamId: "t3", name: "Varsha Bhatt"       },
  // Delta Team (t4)
  { workerId: "t4-w1",  teamId: "t4", name: "Sachin More"        },
  { workerId: "t4-w2",  teamId: "t4", name: "Usha Patil"         },
  { workerId: "t4-w3",  teamId: "t4", name: "Girish Naik"        },
  { workerId: "t4-w4",  teamId: "t4", name: "Pallavi Shah"       },
  { workerId: "t4-w5",  teamId: "t4", name: "Dinesh Sawant"      },
  { workerId: "t4-w6",  teamId: "t4", name: "Shruti Kamat"       },
  { workerId: "t4-w7",  teamId: "t4", name: "Vinod Gawde"        },
  { workerId: "t4-w8",  teamId: "t4", name: "Ashwini Hegde"      },
  { workerId: "t4-w9",  teamId: "t4", name: "Sunil Lotlikar"     },
  { workerId: "t4-w10", teamId: "t4", name: "Madhuri Dessai"     },
  // Epsilon Team (t5)
  { workerId: "t5-w1",  teamId: "t5", name: "Bhaskar Rao"        },
  { workerId: "t5-w2",  teamId: "t5", name: "Chitra Reddy"       },
  { workerId: "t5-w3",  teamId: "t5", name: "Ganesh Murthy"      },
  { workerId: "t5-w4",  teamId: "t5", name: "Indira Varma"       },
  { workerId: "t5-w5",  teamId: "t5", name: "Jagdish Shetty"     },
  { workerId: "t5-w6",  teamId: "t5", name: "Kamala Devi"        },
  { workerId: "t5-w7",  teamId: "t5", name: "Lakshmana Raju"     },
  { workerId: "t5-w8",  teamId: "t5", name: "Mythili Subramanian"},
  { workerId: "t5-w9",  teamId: "t5", name: "Nataraj Pillai"     },
  { workerId: "t5-w10", teamId: "t5", name: "Oviya Krishnan"     },
  // Zeta Team (t6)
  { workerId: "t6-w1",  teamId: "t6", name: "Pavan Kale"         },
  { workerId: "t6-w2",  teamId: "t6", name: "Quamar Sheikh"      },
  { workerId: "t6-w3",  teamId: "t6", name: "Ramesh Thorat"      },
  { workerId: "t6-w4",  teamId: "t6", name: "Saraswati Jadhav"   },
  { workerId: "t6-w5",  teamId: "t6", name: "Tukaram Mane"       },
  { workerId: "t6-w6",  teamId: "t6", name: "Urmila Shinde"      },
  { workerId: "t6-w7",  teamId: "t6", name: "Vaibhav Pawar"      },
  { workerId: "t6-w8",  teamId: "t6", name: "Wahida Ansari"      },
  { workerId: "t6-w9",  teamId: "t6", name: "Xavier D'Souza"     },
  { workerId: "t6-w10", teamId: "t6", name: "Yamini Kulkarni"    },
];

const resources = [
  { resourceId: "r1", name: "Excavator #1",   workload: "heavy" },
  { resourceId: "r2", name: "CCTV Monitor",   workload: "light" },
  { resourceId: "r3", name: "Forklift #3",    workload: "heavy" },
  { resourceId: "r4", name: "Patrol Vehicle", workload: "light" },
  { resourceId: "r5", name: "Drill Unit A",   workload: "heavy" },
  { resourceId: "r6", name: "Survey Kit",     workload: "light" },
  { resourceId: "r7", name: "Crane #2",       workload: "heavy" },
  { resourceId: "r8", name: "Radio Station",  workload: "light" },
];

// ── MAIN SEED FUNCTION ────────────────────────────────────────────────────────
async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    await Zone.deleteMany({});
    await Team.deleteMany({});
    await Worker.deleteMany({});
    await Resource.deleteMany({});
    console.log("Cleared existing data");

    await Zone.insertMany(zones);
    await Team.insertMany(teams);
    await Worker.insertMany(workers);
    await Resource.insertMany(resources);

    console.log(`Seeded: ${zones.length} zones, ${teams.length} teams, ${workers.length} workers, ${resources.length} resources`);

    await mongoose.disconnect();
    console.log("Database is ready.");
    process.exit(0);
  } catch (err) {
    console.error("Seed failed:", err.message);
    process.exit(1);
  }
}

seed();
