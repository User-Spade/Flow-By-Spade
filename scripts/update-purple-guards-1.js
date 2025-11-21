const fs = require('fs');
const db = JSON.parse(fs.readFileSync('data/bjj-database.json', 'utf8'));

// Purple Belt Advanced Guard Positions - Part 1

// DEEP HALF GUARD
db.positions.deep_half_guard.belt_levels.purple = {
  concepts: [
    "Get underneath opponent deep under their base",
    "Control opponent's far leg",
    "Create powerful sweeping angles",
    "Invisible to opponent's attacks",
    "Eddie Bravo 10th Planet position"
  ],
  techniques: [],
  common_mistakes: [
    "Not getting deep enough under opponent",
    "Poor head position",
    "Not controlling far leg properly",
    "Staying static without sweeping"
  ],
  key_details: [
    "Get deep under opponent's center",
    "Control their far leg with hands",
    "Your head under their near hip",
    "Use leverage to sweep"
  ],
  transitions_available: ["half_guard_bottom", "sweep_to_top", "waiter_sweep"],
  prerequisites: ["half_guard_bottom", "knee_shield_half_guard"]
};

db.positions.deep_half_guard.system = {
  ...db.positions.deep_half_guard.system,
  opponent_relative: ["on_bottom", "underneath"],
  stability_score: 4,
  movement_directions_allowed: ["rotating", "elevating"],
  leads_to_position_ids: ["half_guard_bottom", "side_control", "sweep_to_top"],
  entry_from_position_ids: ["half_guard_bottom", "knee_shield_half_guard"],
  risk_level: "low"
};

db.positions.deep_half_guard.learning = {
  ...db.positions.deep_half_guard.learning,
  alternate_names: ["Deep Half", "DHG"],
  description: "Position where you get deep underneath opponent's base, controlling their far leg. Popularized by Eddie Bravo and Bernardo Faria. Creates powerful sweeping mechanics and is safe from most attacks.",
  key_concepts: [
    "Deep position under opponent's center",
    "Far leg control is critical",
    "Sweeps use opponent's weight",
    "Very safe from submissions"
  ],
  entry_steps: [
    "From half guard bottom",
    "Dive deep under opponent's near hip",
    "Control their far leg with hands",
    "Head positioned under their hip"
  ],
  maintenance_steps: [
    "Stay deep under opponent",
    "Maintain far leg control",
    "Keep head safe under hip",
    "Create sweeping angles"
  ],
  escape_overview: "Execute waiter sweep or Homer Simpson sweep",
  common_mistakes: [
    "Not deep enough (opponent can attack)",
    "Losing far leg control",
    "Head exposed to attacks",
    "Static without attacking"
  ],
  goals: [
    "Master deep half sweeps",
    "Use as safe defensive position",
    "Develop Bernardo Faria style game",
    "Sweep larger opponents effectively"
  ]
};

// TORNADO GUARD
db.positions.tornado_guard.belt_levels.purple = {
  concepts: [
    "Dynamic spinning guard variation",
    "Creates powerful torque for sweeps",
    "Circular motion off-balances opponent",
    "Lapel control enhances position",
    "Requires timing and coordination"
  ],
  techniques: [],
  common_mistakes: [
    "Poor timing on spin",
    "Not completing rotation",
    "Weak grips during spin",
    "Spinning without opponent's weight"
  ],
  key_details: [
    "Lapel or collar grip essential",
    "Spin under opponent",
    "Use momentum for sweep",
    "Timing with opponent's movement"
  ],
  transitions_available: ["sweep_to_top", "back_control", "x_guard"],
  prerequisites: ["de_la_riva", "x_guard"]
};

db.positions.tornado_guard.system = {
  ...db.positions.tornado_guard.system,
  opponent_relative: ["on_bottom", "rotating"],
  stability_score: 2,
  movement_directions_allowed: ["rotating", "inverting"],
  leads_to_position_ids: ["side_control", "back_control", "x_guard"],
  entry_from_position_ids: ["de_la_riva", "x_guard", "open_guard_bottom"],
  risk_level: "high"
};

db.positions.tornado_guard.learning = {
  ...db.positions.tornado_guard.learning,
  alternate_names: ["Tornado", "Spinning Guard"],
  description: "Dynamic guard using spinning/rotating motion to create torque and sweep opponent. Requires excellent timing and coordination. Creates powerful off-balancing through circular momentum.",
  key_concepts: [
    "Rotation creates torque",
    "Timing with opponent's movement",
    "Lapel control stabilizes spin",
    "Complete rotation for sweep"
  ],
  entry_steps: [
    "From DLR or open guard",
    "Secure lapel or collar grip",
    "Initiate spin under opponent",
    "Use momentum to complete sweep"
  ],
  maintenance_steps: [
    "Maintain grips through spin",
    "Complete full rotation",
    "Use opponent's weight",
    "Transition to top position"
  ],
  escape_overview: "Complete spin for sweep or take back",
  common_mistakes: [
    "Spinning without proper grips",
    "Poor timing - opponent not loaded",
    "Incomplete rotation",
    "Not using momentum effectively"
  ],
  goals: [
    "Execute tornado sweep",
    "Develop dynamic guard game",
    "Master timing and coordination",
    "Create unexpected sweep angles"
  ]
};

// RDLR INVERTED ENTRIES
db.positions.rdlr_inverted_entries.belt_levels.purple = {
  concepts: [
    "Inversion from RDLR to enter berimbolo",
    "Granby roll mechanics",
    "Creates back exposure",
    "Modern sport BJJ technique",
    "Requires flexibility and timing"
  ],
  techniques: [],
  common_mistakes: [
    "Poor inversion technique",
    "Not controlling opponent's leg",
    "Wrong timing on entry",
    "Incomplete rotation exposing back"
  ],
  key_details: [
    "Start from RDLR position",
    "Control far leg firmly",
    "Invert and rotate",
    "Thread through for back"
  ],
  transitions_available: ["berimbolo_control", "back_control", "reverse_de_la_riva"],
  prerequisites: ["reverse_de_la_riva", "berimbolo_control"]
};

db.positions.rdlr_inverted_entries.system = {
  ...db.positions.rdlr_inverted_entries.system,
  opponent_relative: ["on_bottom", "inverting"],
  stability_score: 2,
  movement_directions_allowed: ["inverting", "rotating"],
  leads_to_position_ids: ["berimbolo_control", "back_control", "reverse_de_la_riva"],
  entry_from_position_ids: ["reverse_de_la_riva"],
  risk_level: "high"
};

db.positions.rdlr_inverted_entries.learning = {
  ...db.positions.rdlr_inverted_entries.learning,
  alternate_names: ["RDLR Inversion", "Berimbolo Entry", "Inverted RDLR"],
  description: "Advanced technique using inversion from RDLR to enter berimbolo and attack opponent's back. Requires flexibility, timing, and coordination. Hallmark of modern sport BJJ.",
  key_concepts: [
    "Inversion creates back exposure",
    "Far leg control prevents escape",
    "Granby roll mechanics apply",
    "Gateway to berimbolo back take"
  ],
  entry_steps: [
    "From RDLR position",
    "Secure far leg control",
    "Invert and begin rotation",
    "Thread through for back take"
  ],
  maintenance_steps: [
    "Maintain far leg grip",
    "Complete inversion",
    "Rotate to opponent's back",
    "Establish back control"
  ],
  escape_overview: "Complete inversion to berimbolo back take",
  common_mistakes: [
    "Incomplete inversion",
    "Losing far leg grip",
    "Poor timing getting stacked",
    "Not rotating fully"
  ],
  goals: [
    "Master berimbolo entries",
    "Develop inversion skills",
    "Attack back from bottom",
    "Compete in modern sport BJJ"
  ]
};

// MODIFIED X GUARD
db.positions.modified_x_guard.belt_levels.purple = {
  concepts: [
    "X-guard variation with different leg configuration",
    "Better control against certain passes",
    "Prevents opponent circling",
    "More stable than traditional X",
    "Modern X-guard evolution"
  ],
  techniques: [],
  common_mistakes: [
    "Reverting to standard X configuration",
    "Poor leg positioning",
    "Not using modification advantages",
    "Weak elevation"
  ],
  key_details: [
    "Modified leg configuration",
    "Both legs still control opponent",
    "Better against certain escapes",
    "Maintains elevation capability"
  ],
  transitions_available: ["x_guard", "single_leg_x", "sweep_to_top"],
  prerequisites: ["x_guard", "single_leg_x"]
};

db.positions.modified_x_guard.system = {
  ...db.positions.modified_x_guard.system,
  opponent_relative: ["on_bottom", "under_opponent"],
  stability_score: 4,
  movement_directions_allowed: ["elevating", "rotating"],
  leads_to_position_ids: ["x_guard", "single_leg_x", "side_control"],
  entry_from_position_ids: ["x_guard", "butterfly_guard"],
  risk_level: "low"
};

db.positions.modified_x_guard.learning = {
  ...db.positions.modified_x_guard.learning,
  alternate_names: ["Modified X", "X-Guard Variation"],
  description: "Variation of X-guard with modified leg configuration. Addresses certain escapes and passing strategies that work against traditional X-guard. More stable against specific movements.",
  key_concepts: [
    "Modified configuration prevents escapes",
    "Addresses traditional X weaknesses",
    "Maintains elevation control",
    "Modern evolution of X-guard"
  ],
  entry_steps: [
    "From traditional X-guard",
    "Modify leg configuration",
    "Maintain elevation and control",
    "Adjust based on opponent's pass"
  ],
  maintenance_steps: [
    "Keep modified leg position",
    "Elevate opponent consistently",
    "React to passing attempts",
    "Sweep or transition"
  ],
  escape_overview: "Sweep opponent or return to traditional X",
  common_mistakes: [
    "Not understanding modification purpose",
    "Wrong configuration for situation",
    "Losing elevation",
    "Reverting unnecessarily"
  ],
  goals: [
    "Understand X-guard variations",
    "Counter specific passing styles",
    "Develop adaptive X-guard game",
    "Master position nuances"
  ]
};

fs.writeFileSync('data/bjj-database.json', JSON.stringify(db, null, 2));
console.log('Updated: deep_half_guard, tornado_guard, rdlr_inverted_entries, modified_x_guard');
