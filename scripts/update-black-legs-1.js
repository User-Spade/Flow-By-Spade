const fs = require('fs');
const db = JSON.parse(fs.readFileSync('data/bjj-database.json', 'utf8'));

// Black Belt Leg Entanglements - Part 1

// SADDLE
db.positions.saddle.belt_levels.black = {
  concepts: [
    "Primary leg lock finishing position",
    "Inside sankaku on near leg",
    "Danaher Death Squad signature position",
    "Heel hook finishing mechanics",
    "Master-level leg entanglement control"
  ],
  techniques: [],
  common_mistakes: [
    "Not achieving proper inside sankaku",
    "Weak leg control allowing escape",
    "Poor hip positioning",
    "Not understanding finishing mechanics",
    "Attempting without expert instruction"
  ],
  key_details: [
    "Inside sankaku configuration",
    "Near leg controlled",
    "Optimal heel hook angle",
    "Hip control essential",
    "Danaher system centerpiece"
  ],
  transitions_available: ["outside_ashi_garami", "honey_hole", "heel_hook_finish"],
  prerequisites: ["outside_ashi_garami", "inside_ashi_garami", "heel_hook_mastery"]
};

db.positions.saddle.system = {
  ...db.positions.saddle.system,
  opponent_relative: ["on_side", "legs_entangled"],
  stability_score: 5,
  movement_directions_allowed: ["hip_control", "attacking"],
  leads_to_position_ids: ["outside_ashi_garami", "honey_hole", "heel_hook_finish"],
  entry_from_position_ids: ["outside_ashi_garami", "inside_ashi_garami"],
  risk_level: "medium"
};

db.positions.saddle.learning = {
  ...db.positions.saddle.learning,
  alternate_names: ["Saddle", "411", "Inside Sankaku"],
  description: "Primary leg lock finishing position in modern leg lock systems. Inside sankaku configuration on near leg creates optimal heel hook mechanics. Centerpiece of Danaher Death Squad system. Master-level position requiring expert understanding.",
  key_concepts: [
    "Inside sankaku is key configuration",
    "Near leg entanglement creates control",
    "Optimal finishing position for heel hooks",
    "Systematic approach to leg locks",
    "Requires extensive training"
  ],
  entry_steps: [
    "From ashi garami positions",
    "Create inside sankaku on near leg",
    "Establish hip control",
    "Secure saddle configuration",
    "Prepare for heel hook finish"
  ],
  maintenance_steps: [
    "Maintain inside sankaku",
    "Control opponent's hips",
    "Keep near leg secured",
    "Perfect body positioning",
    "Ready to finish attack"
  ],
  escape_overview: "Finish with heel hook or transition to other leg positions",
  common_mistakes: [
    "Sankaku not truly inside position",
    "Weak leg control",
    "Poor hip alignment",
    "Rushing the finish",
    "Insufficient training before attempting"
  ],
  goals: [
    "Master modern leg locks",
    "Develop systematic approach",
    "Finish with heel hooks safely",
    "Understand Danaher system",
    "Train under expert instruction"
  ]
};

// DOUBLE TROUBLE
db.positions.double_trouble.belt_levels.black = {
  concepts: [
    "Both legs entangled simultaneously",
    "Creates maximum leg control",
    "Advanced leg lock position",
    "Multiple attack options available",
    "Complex entanglement system"
  ],
  techniques: [],
  common_mistakes: [
    "Not controlling both legs effectively",
    "Weak entanglement on either leg",
    "Poor body positioning",
    "Not using systematic approach",
    "Attempting without proper training"
  ],
  key_details: [
    "Both opponent's legs controlled",
    "Complex entanglement configuration",
    "Multiple submission options",
    "Requires expert timing",
    "High-level leg lock position"
  ],
  transitions_available: ["saddle", "outside_ashi_garami", "heel_hook_finish", "knee_bar"],
  prerequisites: ["saddle", "outside_ashi_garami", "leg_lock_mastery"]
};

db.positions.double_trouble.system = {
  ...db.positions.double_trouble.system,
  opponent_relative: ["on_side", "both_legs_entangled"],
  stability_score: 5,
  movement_directions_allowed: ["hip_control", "attacking"],
  leads_to_position_ids: ["saddle", "outside_ashi_garami", "heel_hook_finish", "knee_bar"],
  entry_from_position_ids: ["saddle", "outside_ashi_garami"],
  risk_level: "medium"
};

db.positions.double_trouble.learning = {
  ...db.positions.double_trouble.learning,
  alternate_names: ["Double Trouble", "Both Legs Position"],
  description: "Advanced leg entanglement controlling both of opponent's legs simultaneously. Creates maximum control and multiple attacking options. Complex position requiring master-level understanding and training.",
  key_concepts: [
    "Both legs controlled creates dominance",
    "Complex entanglement mechanics",
    "Multiple submission paths",
    "Requires systematic approach",
    "Expert-level position"
  ],
  entry_steps: [
    "From saddle or ashi positions",
    "Capture second leg",
    "Establish double entanglement",
    "Secure control on both legs",
    "Create attacking position"
  ],
  maintenance_steps: [
    "Control both legs simultaneously",
    "Maintain entanglement integrity",
    "Perfect body positioning",
    "Create submission opportunities",
    "Use systematic approach"
  ],
  escape_overview: "Finish with leg attacks or transition to single leg positions",
  common_mistakes: [
    "Losing control of one leg",
    "Weak entanglement mechanics",
    "Poor positional understanding",
    "Not training systematically",
    "Attempting prematurely"
  ],
  goals: [
    "Master advanced leg locks",
    "Control both legs effectively",
    "Develop complex entanglements",
    "Finish with multiple attacks",
    "Train under expert supervision"
  ]
};

fs.writeFileSync('data/bjj-database.json', JSON.stringify(db, null, 2));
console.log('Updated: saddle, double_trouble');
