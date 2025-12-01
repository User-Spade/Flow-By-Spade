const fs = require('fs');
const db = JSON.parse(fs.readFileSync('data/bjj-database.json', 'utf8'));

// Final Top Control Positions - White Belt Content

// BACK CONTROL
db.positions.back_control.belt_levels.white = {
  concepts: [
    "Hooks in to secure position",
    "Seatbelt grip for upper body control",
    "Stay behind opponent's shoulders",
    "Most dominant position for chokes"
  ],
  techniques: [],
  common_mistakes: [
    "Crossing feet in front of opponent (ankle lock risk)",
    "Losing seatbelt grip",
    "Weight too far back allowing escape",
    "Not controlling opponent's hands"
  ],
  key_details: [
    "Two hooks inside opponent's thighs",
    "Seatbelt grip (one over shoulder, one under arm)",
    "Chest tight to opponent's back",
    "Head beside opponent's head"
  ],
  transitions_available: ["mount", "back_control"],
  prerequisites: ["mount", "turtle_top"]
};

db.positions.back_control.system = {
  ...db.positions.back_control.system,
  opponent_relative: ["behind", "hooks_in"],
  stability_score: 5,
  movement_directions_allowed: ["forward_pressure"],
  leads_to_position_ids: ["mount", "back_control"],
  entry_from_position_ids: ["mount", "turtle_top", "side_control", "knee_on_belly"],
  risk_level: "low"
};

db.positions.back_control.learning = {
  ...db.positions.back_control.learning,
  alternate_names: ["Back Mount", "Taking the Back", "Rear Mount"],
  description: "The most dominant position in BJJ where you are behind your opponent with hooks in and control of their upper body. Highest point value position with best submission opportunities.",
  key_concepts: [
    "Hooks secure the position",
    "Seatbelt controls upper body",
    "Stay tight to opponent's back",
    "Primary goal is rear naked choke"
  ],
  entry_steps: [
    "Get to opponent's back from mount, turtle, or scramble",
    "Insert first hook inside opponent's thigh",
    "Secure seatbelt grip (over/under)",
    "Insert second hook on opposite side"
  ],
  maintenance_steps: [
    "Keep hooks in - never cross feet in front",
    "Maintain tight seatbelt grip",
    "Chest glued to opponent's back",
    "Follow opponent's escape attempts"
  ],
  escape_overview: "Opponent must clear hooks and turn to face you",
  common_mistakes: [
    "Crossing feet (exposes to ankle lock)",
    "Losing seatbelt grip",
    "Weight too far back",
    "Not controlling opponent's hands before choking"
  ],
  goals: [
    "Secure back control with hooks",
    "Attack rear naked choke",
    "Control opponent's defensive hands",
    "Maintain highest point position"
  ]
};

// TURTLE TOP
db.positions.turtle_top.belt_levels.white = {
  concepts: [
    "Break opponent down flat",
    "Take the back if possible",
    "Control near arm and far hip",
    "Don't let opponent come up to guard"
  ],
  techniques: [],
  common_mistakes: [
    "Reaching too far forward (guillotine risk)",
    "Not controlling opponent's near arm",
    "Letting opponent sit back to guard",
    "Weight distribution causing opponent to roll"
  ],
  key_details: [
    "Chest pressure on opponent's back",
    "Control near arm with one hand",
    "Control far hip with other hand",
    "Knees wide for base"
  ],
  transitions_available: ["back_control", "side_control", "mount"],
  prerequisites: ["side_control"]
};

db.positions.turtle_top.system = {
  ...db.positions.turtle_top.system,
  opponent_relative: ["on_top", "perpendicular"],
  stability_score: 3,
  movement_directions_allowed: ["forward_pressure", "lateral_shift"],
  leads_to_position_ids: ["back_control", "side_control", "mount"],
  entry_from_position_ids: ["side_control", "half_guard_top", "standing_neutral"],
  risk_level: "medium"
};

db.positions.turtle_top.learning = {
  ...db.positions.turtle_top.learning,
  alternate_names: ["Attacking Turtle", "Top of Turtle"],
  description: "Position where opponent is on hands and knees (turtle) and you are on top working to break them down or take their back. Common transitional position.",
  key_concepts: [
    "Break opponent flat to mat",
    "Insert hooks for back control",
    "Control near arm to prevent escape",
    "Use weight to prevent opponent standing"
  ],
  entry_steps: [
    "Opponent turtles from bottom position",
    "Get chest on opponent's back",
    "Control near arm (underhook or wrist)",
    "Control far hip to prevent rolling"
  ],
  maintenance_steps: [
    "Maintain chest pressure",
    "Keep opponent's weight forward",
    "Work for back control by inserting hooks",
    "Prevent opponent returning to guard"
  ],
  escape_overview: "Force opponent flat and take back, or force to side control",
  common_mistakes: [
    "Reaching for head (guillotine vulnerability)",
    "Not controlling near arm",
    "Letting opponent sit back to guard",
    "Poor base allowing opponent to roll"
  ],
  goals: [
    "Take opponent's back (back control)",
    "Force opponent flat to side control",
    "Prevent opponent escaping to guard",
    "Attack with clock choke or crucifix"
  ]
};

fs.writeFileSync('data/bjj-database.json', JSON.stringify(db, null, 2));
console.log('Updated: back_control, turtle_top');
