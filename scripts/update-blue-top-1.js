const fs = require('fs');
const db = JSON.parse(fs.readFileSync('data/bjj-database.json', 'utf8'));

// Blue Belt Top Control Positions - Part 1

// NORTH SOUTH
db.positions.north_south.belt_levels.blue = {
  concepts: [
    "Chest-to-chest perpendicular to opponent",
    "Head control essential",
    "Heavy chest pressure on opponent's face/chest",
    "Transition position and submission platform",
    "Control hips to prevent escape"
  ],
  techniques: [],
  common_mistakes: [
    "Weight too high - easy to roll",
    "Not controlling opponent's arms",
    "Giving opponent space to escape",
    "Static position without attacking"
  ],
  key_details: [
    "Chest heavy on opponent's chest/face",
    "Arms wrap under opponent's armpits or head",
    "Hips low and heavy",
    "Sprawl legs back for base"
  ],
  transitions_available: ["side_control", "mount", "submission_attacks"],
  prerequisites: ["side_control"]
};

db.positions.north_south.system = {
  ...db.positions.north_south.system,
  opponent_relative: ["on_top", "head_to_head"],
  stability_score: 4,
  movement_directions_allowed: ["forward_pressure", "lateral_shift"],
  leads_to_position_ids: ["side_control", "mount", "back_control"],
  entry_from_position_ids: ["side_control", "mount"],
  risk_level: "low"
};

db.positions.north_south.learning = {
  ...db.positions.north_south.learning,
  alternate_names: ["North-South", "N/S", "Head-to-Head"],
  description: "Top control position where you are chest-to-chest with opponent, your head near their head. Perpendicular orientation to opponent. Strong control with multiple submission options.",
  key_concepts: [
    "Chest pressure is suffocating",
    "Control opponent's arms",
    "Low hips prevent escape",
    "Gateway to many chokes"
  ],
  entry_steps: [
    "From side control or mount",
    "Step over opponent's head",
    "Drop chest heavy on opponent",
    "Control arms and settle weight"
  ],
  maintenance_steps: [
    "Maintain heavy chest pressure",
    "Control opponent's arms",
    "Hips low and heavy",
    "React to escape attempts"
  ],
  escape_overview: "Attack submissions or transition to other positions",
  common_mistakes: [
    "Weight too high (easy to roll)",
    "No arm control",
    "Space between bodies",
    "Not using chest pressure effectively"
  ],
  goals: [
    "Attack north-south choke",
    "Transition to mount or side control",
    "Maintain heavy pressure",
    "Attack kimura or arm triangle"
  ]
};

// TECHNICAL MOUNT
db.positions.technical_mount.belt_levels.blue = {
  concepts: [
    "One leg across opponent's body",
    "Other leg hooks under opponent's leg",
    "Superior mount variation for control",
    "Better armbar position than full mount",
    "Prevents bridge escape"
  ],
  techniques: [],
  common_mistakes: [
    "Not keeping leg tight across body",
    "Hook too loose on bottom leg",
    "Weight distribution wrong",
    "Not controlling opponent's arms"
  ],
  key_details: [
    "Top leg across opponent's torso",
    "Bottom leg hooks under their leg",
    "Chest forward for pressure",
    "Control opponent's far arm"
  ],
  transitions_available: ["mount", "armbar_setup", "back_control"],
  prerequisites: ["mount"]
};

db.positions.technical_mount.system = {
  ...db.positions.technical_mount.system,
  opponent_relative: ["on_top", "leg_configuration"],
  stability_score: 5,
  movement_directions_allowed: ["forward_pressure"],
  leads_to_position_ids: ["mount", "armbar_finish", "back_control"],
  entry_from_position_ids: ["mount", "side_control"],
  risk_level: "low"
};

db.positions.technical_mount.learning = {
  ...db.positions.technical_mount.learning,
  alternate_names: ["Technical Mount", "S-Mount", "Modified Mount"],
  description: "Mount variation with one leg across opponent's body and other leg hooking under their leg. Superior position for armbars and back takes. More stable than standard mount.",
  key_concepts: [
    "Leg configuration prevents bridge",
    "Excellent armbar setup position",
    "More control than standard mount",
    "Hook prevents opponent escaping"
  ],
  entry_steps: [
    "From mount when opponent turns",
    "Bring one leg across their body",
    "Hook other leg under their leg",
    "Maintain chest pressure"
  ],
  maintenance_steps: [
    "Keep top leg tight across body",
    "Maintain hook on bottom leg",
    "Chest forward with pressure",
    "Control far arm for armbar"
  ],
  escape_overview: "Attack armbar or transition to back control",
  common_mistakes: [
    "Loose leg across body",
    "Weak hook easily cleared",
    "Weight back instead of forward",
    "Not isolating arm for armbar"
  ],
  goals: [
    "Execute armbar from technical mount",
    "Transition to back control",
    "Maintain superior mount position",
    "Prevent bridge escapes"
  ]
};

// SIDE CONTROL VARIANTS
db.positions.side_control_variants.belt_levels.blue = {
  concepts: [
    "Multiple side control positions exist",
    "Kesa gatame (scarf hold)",
    "Reverse kesa gatame",
    "Modified side control",
    "Each has specific uses and submissions"
  ],
  techniques: [],
  common_mistakes: [
    "Not understanding which variant to use when",
    "Poor weight distribution in variants",
    "Not transitioning between variants",
    "Using wrong variant for body types"
  ],
  key_details: [
    "Kesa gatame - head control, far arm trapped",
    "Reverse kesa - facing opponent's legs",
    "Modified - knees in tight, different base",
    "Each variant has specific escape defenses"
  ],
  transitions_available: ["side_control", "mount", "north_south", "submission_attacks"],
  prerequisites: ["side_control"]
};

db.positions.side_control_variants.system = {
  ...db.positions.side_control_variants.system,
  opponent_relative: ["on_top", "perpendicular"],
  stability_score: 4,
  movement_directions_allowed: ["forward_pressure", "lateral_shift"],
  leads_to_position_ids: ["side_control", "mount", "north_south", "back_control"],
  entry_from_position_ids: ["side_control", "half_guard_top"],
  risk_level: "low"
};

db.positions.side_control_variants.learning = {
  ...db.positions.side_control_variants.learning,
  alternate_names: ["Kesa Gatame", "Scarf Hold", "Modified Side"],
  description: "Various side control positions beyond standard. Includes kesa gatame, reverse kesa, and modified variations. Each has specific applications and submission opportunities.",
  key_concepts: [
    "Different variants for different situations",
    "Kesa gatame - strong head control",
    "Reverse kesa - different escape patterns",
    "Modified - more mobile position"
  ],
  entry_steps: [
    "From standard side control",
    "Transition to appropriate variant",
    "Kesa: sit back, trap arm",
    "Reverse: turn toward legs"
  ],
  maintenance_steps: [
    "Maintain appropriate weight distribution",
    "Control key points for each variant",
    "Be ready to transition variants",
    "Attack from each position"
  ],
  escape_overview: "Each variant has specific submission attacks",
  common_mistakes: [
    "Not knowing when to use each variant",
    "Poor posture in variants",
    "Static in one variant",
    "Wrong variant for opponent's escape"
  ],
  goals: [
    "Master multiple side control positions",
    "Attack armbars from kesa gatame",
    "Flow between variants",
    "Counter different escape attempts"
  ]
};

fs.writeFileSync('data/bjj-database.json', JSON.stringify(db, null, 2));
console.log('Updated: north_south, technical_mount, side_control_variants');
