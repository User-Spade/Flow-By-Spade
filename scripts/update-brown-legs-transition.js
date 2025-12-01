const fs = require('fs');
const db = JSON.parse(fs.readFileSync('data/bjj-database.json', 'utf8'));

// Brown Belt Leg Entanglements & Transition

// CROSS ASHI GARAMI
db.positions.cross_ashi_garami.belt_levels.brown = {
  concepts: [
    "Crossing angle in ashi garami",
    "Creates different finishing mechanics",
    "Body positioned across opponent",
    "Part of Danaher leg lock system",
    "Advanced heel hook position"
  ],
  techniques: [],
  common_mistakes: [
    "Not achieving proper crossing angle",
    "Weak leg control",
    "Poor hip positioning",
    "Not understanding finishing mechanics"
  ],
  key_details: [
    "Body crosses opponent's body",
    "Different angle than standard ashi",
    "Heel hook finishing position",
    "Control hips and legs"
  ],
  transitions_available: ["outside_ashi_garami", "inside_ashi_garami", "submission"],
  prerequisites: ["outside_ashi_garami", "inside_ashi_garami", "heel_hook_mechanics"]
};

db.positions.cross_ashi_garami.system = {
  ...db.positions.cross_ashi_garami.system,
  opponent_relative: ["on_side", "legs_entangled"],
  stability_score: 4,
  movement_directions_allowed: ["hip_movement", "rotating"],
  leads_to_position_ids: ["outside_ashi_garami", "inside_ashi_garami", "heel_hook_finish"],
  entry_from_position_ids: ["outside_ashi_garami", "inside_ashi_garami"],
  risk_level: "medium"
};

db.positions.cross_ashi_garami.learning = {
  ...db.positions.cross_ashi_garami.learning,
  alternate_names: ["Cross Ashi", "Crossing Ashi Garami"],
  description: "Advanced leg entanglement where body crosses opponent's at different angle than standard ashi. Part of modern leg lock systems. Creates unique finishing mechanics for heel hooks and leg attacks.",
  key_concepts: [
    "Crossing angle creates control",
    "Different from standard ashi",
    "Advanced finishing position",
    "Part of systematic approach"
  ],
  entry_steps: [
    "From ashi garami position",
    "Create crossing angle",
    "Position body across opponent",
    "Control leg and hips"
  ],
  maintenance_steps: [
    "Maintain crossing angle",
    "Keep leg control tight",
    "Control opponent's hips",
    "Ready for submissions"
  ],
  escape_overview: "Control and finish with leg attacks",
  common_mistakes: [
    "Angle not truly crossing",
    "Weak leg control",
    "Not understanding system",
    "Attempting without proper training"
  ],
  goals: [
    "Master advanced leg locks",
    "Create finishing positions",
    "Develop systematic approach",
    "Finish with heel hooks"
  ]
};

// REVERSE X
db.positions.reverse_x.belt_levels.brown = {
  concepts: [
    "Inverted X-guard configuration",
    "Body positioned in reverse",
    "Different mechanics than standard X",
    "Advanced back take entries",
    "Modern X-guard variation"
  ],
  techniques: [],
  common_mistakes: [
    "Poor hook placement",
    "Weak positional control",
    "Not using reverse mechanics",
    "Losing back take opportunities"
  ],
  key_details: [
    "Hooks in reverse configuration",
    "Body inverted relative to standard",
    "Strong back take entries",
    "Unique sweeping mechanics"
  ],
  transitions_available: ["x_guard", "back_control", "sweep_to_top"],
  prerequisites: ["x_guard", "single_leg_x"]
};

db.positions.reverse_x.system = {
  ...db.positions.reverse_x.system,
  opponent_relative: ["on_bottom", "legs_entangled"],
  stability_score: 4,
  movement_directions_allowed: ["elevating", "rotating", "inverting"],
  leads_to_position_ids: ["x_guard", "back_control", "side_control"],
  entry_from_position_ids: ["x_guard", "single_leg_x"],
  risk_level: "low"
};

db.positions.reverse_x.learning = {
  ...db.positions.reverse_x.learning,
  alternate_names: ["Reverse X", "Inverted X Guard"],
  description: "Advanced X-guard variation where body is positioned in reverse configuration. Creates different mechanics and strong back take entries. Modern development in X-guard systems.",
  key_concepts: [
    "Reverse of standard X configuration",
    "Different mechanical advantages",
    "Strong back take entries",
    "Modern guard evolution"
  ],
  entry_steps: [
    "From X-guard or single leg X",
    "Invert body position",
    "Establish reverse hooks",
    "Create control and angles"
  ],
  maintenance_steps: [
    "Maintain reverse configuration",
    "Keep hooks active",
    "Control opponent's base",
    "Create back take opportunities"
  ],
  escape_overview: "Take the back or sweep to top position",
  common_mistakes: [
    "Not fully inverting",
    "Weak hook placement",
    "Missing back take chances",
    "Static without attacking"
  ],
  goals: [
    "Master X-guard variations",
    "Take the back efficiently",
    "Develop modern guard game",
    "Use reverse mechanics"
  ]
};

// BABY BOLO
db.positions.baby_bolo.belt_levels.brown = {
  concepts: [
    "Simplified berimbolo technique",
    "Faster execution than full berimbolo",
    "Transition to back or top",
    "Competition-tested technique",
    "Modern transition system"
  ],
  techniques: [],
  common_mistakes: [
    "Not creating proper angle",
    "Slow execution",
    "Losing momentum during roll",
    "Not securing back control"
  ],
  key_details: [
    "Simplified berimbolo mechanics",
    "Quick transition to back",
    "Less rotation required",
    "Competition-effective"
  ],
  transitions_available: ["back_control", "de_la_riva", "berimbolo_control"],
  prerequisites: ["de_la_riva", "berimbolo_control", "inversion"]
};

db.positions.baby_bolo.system = {
  ...db.positions.baby_bolo.system,
  opponent_relative: ["transitioning", "rotating"],
  stability_score: 3,
  movement_directions_allowed: ["rotating", "inverting", "rolling"],
  leads_to_position_ids: ["back_control", "de_la_riva", "berimbolo_control"],
  entry_from_position_ids: ["de_la_riva", "reverse_de_la_riva"],
  risk_level: "medium"
};

db.positions.baby_bolo.learning = {
  ...db.positions.baby_bolo.learning,
  alternate_names: ["Baby Bolo", "Mini Berimbolo"],
  description: "Simplified version of berimbolo transition requiring less rotation. Allows faster execution to back control. Popular in competition as efficient alternative to full berimbolo. Modern sport BJJ technique.",
  key_concepts: [
    "Simplified berimbolo mechanics",
    "Faster than full technique",
    "Less rotation needed",
    "Back take efficiency"
  ],
  entry_steps: [
    "From DLR or reverse DLR",
    "Create inversion angle",
    "Execute simplified roll",
    "Secure back control quickly"
  ],
  maintenance_steps: [
    "Maintain momentum",
    "Keep control during transition",
    "Don't stop in middle",
    "Secure position upon completion"
  ],
  escape_overview: "Complete transition to back control or top position",
  common_mistakes: [
    "Not enough momentum",
    "Stopping mid-transition",
    "Poor angle creation",
    "Not finishing to back control"
  ],
  goals: [
    "Master efficient back takes",
    "Develop competition skills",
    "Use modern transitions",
    "Simplify complex techniques"
  ]
};

fs.writeFileSync('data/bjj-database.json', JSON.stringify(db, null, 2));
console.log('Updated: cross_ashi_garami, reverse_x, baby_bolo');
console.log('\n✅ Brown Belt Leg Entanglements & Transition Complete!');
