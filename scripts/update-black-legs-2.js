const fs = require('fs');
const db = JSON.parse(fs.readFileSync('data/bjj-database.json', 'utf8'));

// Black Belt Leg Entanglements - Part 2

// 4 11 POSITION
db.positions['4_11_position'].belt_levels.black = {
  concepts: [
    "Numeric reference to leg configuration",
    "Another name for saddle position",
    "Part of Danaher terminology",
    "Inside sankaku on near leg",
    "Master-level finishing position"
  ],
  techniques: [],
  common_mistakes: [
    "Not understanding it's saddle position",
    "Poor inside sankaku",
    "Weak leg control",
    "Not using systematic approach",
    "Confusion with terminology"
  ],
  key_details: [
    "4-11 refers to leg configuration",
    "Inside sankaku fundamental",
    "Same as saddle position",
    "Danaher system terminology",
    "Expert finishing position"
  ],
  transitions_available: ["saddle", "outside_ashi_garami", "honey_hole", "heel_hook_finish"],
  prerequisites: ["saddle", "outside_ashi_garami", "leg_lock_mastery"]
};

db.positions['4_11_position'].system = {
  ...db.positions['4_11_position'].system,
  opponent_relative: ["on_side", "legs_entangled"],
  stability_score: 5,
  movement_directions_allowed: ["hip_control", "attacking"],
  leads_to_position_ids: ["saddle", "outside_ashi_garami", "honey_hole", "heel_hook_finish"],
  entry_from_position_ids: ["outside_ashi_garami", "inside_ashi_garami"],
  risk_level: "medium"
};

db.positions['4_11_position'].learning = {
  ...db.positions['4_11_position'].learning,
  alternate_names: ["4-11", "411", "Four Eleven", "Saddle"],
  description: "Alternative name for saddle position using numeric reference to leg configuration. Part of Danaher Death Squad terminology. Inside sankaku on near leg creating optimal heel hook mechanics. Master-level leg entanglement.",
  key_concepts: [
    "Numeric reference to configuration",
    "Same position as saddle",
    "Inside sankaku fundamental",
    "Part of systematic terminology",
    "Expert finishing position"
  ],
  entry_steps: [
    "From ashi garami positions",
    "Create inside sankaku",
    "Establish 4-11 configuration",
    "Control near leg and hips",
    "Prepare for finish"
  ],
  maintenance_steps: [
    "Maintain inside sankaku",
    "Control opponent's hips",
    "Keep 4-11 configuration",
    "Perfect positioning",
    "Ready to attack"
  ],
  escape_overview: "Finish with heel hook or transition",
  common_mistakes: [
    "Confusion with terminology",
    "Not recognizing saddle position",
    "Weak inside sankaku",
    "Poor systematic understanding",
    "Insufficient training"
  ],
  goals: [
    "Master leg lock terminology",
    "Understand Danaher system",
    "Finish with heel hooks",
    "Develop systematic approach",
    "Train under expert guidance"
  ]
};

// HONEY HOLE
db.positions.honey_hole.belt_levels.black = {
  concepts: [
    "Crossover inside sankaku position",
    "Eddie Cummings signature position",
    "Far leg entanglement with inside sankaku",
    "Creates powerful heel hook mechanics",
    "Alternative to saddle configuration"
  ],
  techniques: [],
  common_mistakes: [
    "Not achieving proper crossover",
    "Weak inside sankaku on far leg",
    "Poor hip control",
    "Not understanding differences from saddle",
    "Attempting without proper training"
  ],
  key_details: [
    "Inside sankaku on far leg",
    "Crossover configuration",
    "Eddie Cummings specialty",
    "Different mechanics than saddle",
    "Powerful finishing position"
  ],
  transitions_available: ["saddle", "outside_ashi_garami", "heel_hook_finish"],
  prerequisites: ["saddle", "outside_ashi_garami", "heel_hook_mastery"]
};

db.positions.honey_hole.system = {
  ...db.positions.honey_hole.system,
  opponent_relative: ["on_side", "legs_entangled"],
  stability_score: 5,
  movement_directions_allowed: ["hip_control", "attacking"],
  leads_to_position_ids: ["saddle", "outside_ashi_garami", "heel_hook_finish"],
  entry_from_position_ids: ["outside_ashi_garami", "saddle"],
  risk_level: "medium"
};

db.positions.honey_hole.learning = {
  ...db.positions.honey_hole.learning,
  alternate_names: ["Honey Hole", "Cross Ashi", "Far Leg Saddle"],
  description: "Advanced leg entanglement with inside sankaku on far leg instead of near. Eddie Cummings signature position. Creates powerful heel hook mechanics with different configuration than saddle. Master-level finishing position.",
  key_concepts: [
    "Inside sankaku on far leg",
    "Crossover configuration key",
    "Different from saddle mechanics",
    "Eddie Cummings development",
    "Alternative finishing position"
  ],
  entry_steps: [
    "From ashi garami or saddle",
    "Cross to far leg",
    "Create inside sankaku",
    "Establish honey hole configuration",
    "Control hips and position"
  ],
  maintenance_steps: [
    "Maintain far leg sankaku",
    "Control opponent's hips",
    "Keep crossover configuration",
    "Perfect body positioning",
    "Ready for heel hook"
  ],
  escape_overview: "Finish with heel hook or transition to other positions",
  common_mistakes: [
    "Not achieving true crossover",
    "Weak far leg control",
    "Confusion with saddle",
    "Poor hip positioning",
    "Insufficient systematic training"
  ],
  goals: [
    "Master leg lock variations",
    "Understand crossover mechanics",
    "Develop alternative finishing positions",
    "Finish from honey hole",
    "Train with expert instruction"
  ]
};

// FALSE REAP
db.positions.false_reap.belt_levels.black = {
  concepts: [
    "Legal position resembling reap",
    "Leg positioned differently than illegal reap",
    "Creates control without crossing centerline",
    "IBJJF legal leg entanglement",
    "Requires understanding of legal mechanics"
  ],
  techniques: [],
  common_mistakes: [
    "Accidentally creating illegal reap",
    "Not understanding rule differences",
    "Poor leg positioning",
    "Weak control mechanics",
    "Confusion with actual reap"
  ],
  key_details: [
    "Legal under IBJJF rules",
    "Leg doesn't cross centerline",
    "Resembles reap position",
    "Creates control and attacks",
    "Understanding legality crucial"
  ],
  transitions_available: ["outside_ashi_garami", "saddle", "straight_ankle_lock"],
  prerequisites: ["outside_ashi_garami", "understanding_reaping_rules"]
};

db.positions.false_reap.system = {
  ...db.positions.false_reap.system,
  opponent_relative: ["on_side", "legs_entangled"],
  stability_score: 4,
  movement_directions_allowed: ["hip_control", "attacking"],
  leads_to_position_ids: ["outside_ashi_garami", "saddle", "straight_ankle_lock"],
  entry_from_position_ids: ["outside_ashi_garami"],
  risk_level: "low"
};

db.positions.false_reap.learning = {
  ...db.positions.false_reap.learning,
  alternate_names: ["False Reap", "Legal Reap Position"],
  description: "Legal leg entanglement position resembling illegal reap but with leg positioned to avoid crossing centerline. IBJJF legal position. Creates control and attacking opportunities while staying within rules. Requires understanding of reaping rules.",
  key_concepts: [
    "Legal position under IBJJF",
    "Resembles reap without illegality",
    "Leg positioning is key",
    "Understanding rules crucial",
    "Creates control and attacks"
  ],
  entry_steps: [
    "From ashi garami positions",
    "Position leg like reap",
    "Ensure doesn't cross centerline",
    "Maintain legal configuration",
    "Create control and attacks"
  ],
  maintenance_steps: [
    "Keep position legal",
    "Maintain control",
    "Monitor leg positioning",
    "Stay within rules",
    "Create attacking opportunities"
  ],
  escape_overview: "Attack with legal submissions or transition to other positions",
  common_mistakes: [
    "Creating illegal reap accidentally",
    "Not understanding rules",
    "Poor leg positioning",
    "Confusion about legality",
    "Not monitoring position"
  ],
  goals: [
    "Master legal leg entanglements",
    "Understand reaping rules",
    "Create control within rules",
    "Compete safely under IBJJF",
    "Develop rule-compliant game"
  ]
};

fs.writeFileSync('data/bjj-database.json', JSON.stringify(db, null, 2));
console.log('Updated: 4_11_position, honey_hole, false_reap');
console.log('\n✅ Black Belt Leg Entanglements Complete! (5/5)');
