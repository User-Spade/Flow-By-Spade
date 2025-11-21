const fs = require('fs');
const db = JSON.parse(fs.readFileSync('data/bjj-database.json', 'utf8'));

// Black Belt Top Control

// TRUCK
db.positions.truck.belt_levels.black = {
  concepts: [
    "Eddie Bravo's signature position",
    "Rolling crucifix control",
    "Twister submission setup",
    "10th Planet Jiu Jitsu signature",
    "Master-level back attack system"
  ],
  techniques: [],
  common_mistakes: [
    "Not controlling both legs properly",
    "Weak shoulder control",
    "Poor body positioning",
    "Not understanding twister mechanics",
    "Attempting without proper training"
  ],
  key_details: [
    "Rolling crucifix configuration",
    "Both legs controlled",
    "Shoulder trapped",
    "Twister submission setup",
    "Eddie Bravo system"
  ],
  transitions_available: ["back_control", "twister_finish", "calf_slicer"],
  prerequisites: ["back_control", "lockdown", "rubber_guard_system"]
};

db.positions.truck.system = {
  ...db.positions.truck.system,
  opponent_relative: ["on_side", "legs_controlled"],
  stability_score: 5,
  movement_directions_allowed: ["rotating", "attacking"],
  leads_to_position_ids: ["back_control", "twister_finish", "calf_slicer"],
  entry_from_position_ids: ["back_control", "lockdown"],
  risk_level: "low"
};

db.positions.truck.learning = {
  ...db.positions.truck.learning,
  alternate_names: ["Truck", "The Truck", "Rolling Crucifix"],
  description: "Eddie Bravo's signature control position creating rolling crucifix configuration. Primary setup for twister submission. Signature position of 10th Planet Jiu Jitsu system. Master-level back attack requiring extensive training.",
  key_concepts: [
    "Rolling crucifix creates control",
    "Eddie Bravo signature position",
    "Twister submission setup",
    "Both legs controlled",
    "10th Planet system centerpiece"
  ],
  entry_steps: [
    "From back control or lockdown",
    "Trap opponent's shoulder",
    "Control both legs",
    "Establish truck position",
    "Create twister angle"
  ],
  maintenance_steps: [
    "Keep both legs controlled",
    "Maintain shoulder trap",
    "Control opponent's movement",
    "Perfect body positioning",
    "Set up twister or calf slicer"
  ],
  escape_overview: "Finish with twister, calf slicer, or transition to back",
  common_mistakes: [
    "Weak leg control",
    "Poor shoulder trap",
    "Not understanding 10th Planet system",
    "Rushing the twister",
    "Insufficient training"
  ],
  goals: [
    "Master 10th Planet system",
    "Develop truck control",
    "Finish with twister",
    "Create unique attacks",
    "Train under qualified instruction"
  ]
};

// TWISTER SIDE CONTROL
db.positions.twister_side_control.belt_levels.black = {
  concepts: [
    "Side control variation leading to twister",
    "Creates spinal lock opportunities",
    "Eddie Bravo development",
    "Combines side control and twister mechanics",
    "Advanced submission position"
  ],
  techniques: [],
  common_mistakes: [
    "Not controlling near arm properly",
    "Weak leg control",
    "Poor body positioning for twister",
    "Not understanding submission mechanics",
    "Attempting without proper training"
  ],
  key_details: [
    "Side control with twister setup",
    "Near arm controlled",
    "Leg configuration for twister",
    "Spinal lock mechanics",
    "10th Planet technique"
  ],
  transitions_available: ["side_control", "twister_finish", "truck"],
  prerequisites: ["side_control", "truck", "twister_mechanics"]
};

db.positions.twister_side_control.system = {
  ...db.positions.twister_side_control.system,
  opponent_relative: ["on_top", "side_control"],
  stability_score: 5,
  movement_directions_allowed: ["adjusting_position", "attacking"],
  leads_to_position_ids: ["side_control", "twister_finish", "truck"],
  entry_from_position_ids: ["side_control", "truck"],
  risk_level: "low"
};

db.positions.twister_side_control.learning = {
  ...db.positions.twister_side_control.learning,
  alternate_names: ["Twister Side Control", "Side Control Twister Setup"],
  description: "Advanced side control variation creating twister submission opportunities. Combines traditional side control with spinal lock mechanics. Eddie Bravo development. Master-level submission position.",
  key_concepts: [
    "Side control meets twister",
    "Creates spinal lock opportunities",
    "Unique submission position",
    "10th Planet development",
    "Advanced control and attack"
  ],
  entry_steps: [
    "From side control or truck",
    "Control near arm",
    "Establish leg positioning",
    "Create twister angle",
    "Set up spinal lock"
  ],
  maintenance_steps: [
    "Maintain side control",
    "Keep arm controlled",
    "Perfect leg positioning",
    "Create twister mechanics",
    "Ready to finish"
  ],
  escape_overview: "Finish with twister or transition to truck",
  common_mistakes: [
    "Weak arm control",
    "Poor leg positioning",
    "Not understanding twister mechanics",
    "Rushing the submission",
    "Insufficient systematic training"
  ],
  goals: [
    "Master twister submissions",
    "Develop unique attacks",
    "Combine position concepts",
    "Finish with spinal locks",
    "Train under expert guidance"
  ]
};

// FRONT HEADLOCK WEB
db.positions.front_headlock_web.belt_levels.black = {
  concepts: [
    "Complex front headlock system",
    "Multiple control points like web",
    "Wrestling-based position",
    "Creates submission and back take opportunities",
    "Master-level front headlock control"
  ],
  techniques: [],
  common_mistakes: [
    "Not controlling multiple points",
    "Weak headlock grip",
    "Poor body positioning",
    "Not using systematic approach",
    "Missing transition opportunities"
  ],
  key_details: [
    "Multiple control points",
    "Front headlock fundamental",
    "Web-like control system",
    "Wrestling-based technique",
    "Creates multiple options"
  ],
  transitions_available: ["back_control", "guillotine", "darce_choke", "anaconda_choke"],
  prerequisites: ["front_headlock", "wrestling_controls", "guillotine_mechanics"]
};

db.positions.front_headlock_web.system = {
  ...db.positions.front_headlock_web.system,
  opponent_relative: ["on_top", "head_controlled"],
  stability_score: 5,
  movement_directions_allowed: ["controlling", "attacking"],
  leads_to_position_ids: ["back_control", "guillotine", "darce_choke", "anaconda_choke"],
  entry_from_position_ids: ["turtle_top", "scramble_positions"],
  risk_level: "low"
};

db.positions.front_headlock_web.learning = {
  ...db.positions.front_headlock_web.learning,
  alternate_names: ["Front Headlock Web", "Web System", "Front Headlock System"],
  description: "Advanced front headlock system with multiple control points creating web-like control. Wrestling-based position creating submission and back take opportunities. Master-level systematic approach to front headlock.",
  key_concepts: [
    "Multiple control points like web",
    "Systematic front headlock approach",
    "Wrestling-based control",
    "Creates multiple attack paths",
    "Master-level position"
  ],
  entry_steps: [
    "From turtle top or scrambles",
    "Establish front headlock",
    "Create multiple control points",
    "Build web-like system",
    "Set up attacks or back take"
  ],
  maintenance_steps: [
    "Maintain headlock control",
    "Keep multiple control points",
    "Use systematic approach",
    "Create attacking opportunities",
    "Control opponent's movement"
  ],
  escape_overview: "Finish with submissions or take the back",
  common_mistakes: [
    "Single control point only",
    "Weak headlock",
    "Not using system",
    "Missing opportunities",
    "Poor wrestling understanding"
  ],
  goals: [
    "Master front headlock systems",
    "Develop wrestling-based controls",
    "Create multiple attack options",
    "Take back or submit",
    "Use systematic approach"
  ]
};

fs.writeFileSync('data/bjj-database.json', JSON.stringify(db, null, 2));
console.log('Updated: truck, twister_side_control, front_headlock_web');
console.log('\n✅ Black Belt Top Control Complete! (3/3)');
