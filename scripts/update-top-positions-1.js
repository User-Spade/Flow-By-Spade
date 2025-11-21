const fs = require('fs');
const db = JSON.parse(fs.readFileSync('data/bjj-database.json', 'utf8'));

// Top Control Positions - White Belt Content

// CLOSED GUARD TOP
db.positions.closed_guard_top.belt_levels.white = {
  concepts: [
    "Break opponent's guard to pass",
    "Maintain good posture to prevent sweeps and submissions",
    "Control opponent's hips and legs",
    "Create space to initiate guard break"
  ],
  techniques: [],
  common_mistakes: [
    "Posturing too high making balance vulnerable",
    "Leaning forward into submission range",
    "Not controlling opponent's hips",
    "Putting weight on knees instead of feet"
  ],
  key_details: [
    "Keep posture upright with straight back",
    "Hands control opponent's hips or collar",
    "Weight on balls of feet, not knees",
    "Elbows tight to defend collar chokes"
  ],
  transitions_available: ["open_guard_top", "half_guard_top", "side_control", "standing_neutral"],
  prerequisites: ["wrestling_shot_entry"]
};

db.positions.closed_guard_top.system = {
  ...db.positions.closed_guard_top.system,
  opponent_relative: ["inside_guard", "chest_to_chest"],
  stability_score: 2,
  movement_directions_allowed: ["backward_retreat", "forward_pressure", "lateral_shift"],
  leads_to_position_ids: ["open_guard_top", "half_guard_top", "side_control", "standing_neutral"],
  entry_from_position_ids: ["wrestling_shot_entry", "standing_neutral"],
  risk_level: "high"
};

db.positions.closed_guard_top.learning = {
  ...db.positions.closed_guard_top.learning,
  alternate_names: ["Inside Closed Guard", "In the Guard"],
  description: "Position where you are inside your opponent's closed guard. Your goal is to maintain posture, break the guard, and pass to a dominant position.",
  key_concepts: [
    "Posture is king - stay upright to prevent attacks",
    "Control hips to limit opponent's movement",
    "Break guard before attempting to pass",
    "Protect neck from collar chokes"
  ],
  entry_steps: [
    "End up between opponent's legs after takedown or guard pull",
    "Establish base with one knee up or both knees",
    "Grip opponent's collar or pants to control",
    "Posture up to create space"
  ],
  maintenance_steps: [
    "Keep back straight and head up",
    "Hands control opponent's hips or gi",
    "Weight distributed on feet, not knees",
    "Constantly work toward guard break"
  ],
  escape_overview: "Break the guard using standing or kneeling guard break, then pass",
  common_mistakes: [
    "Hunching forward exposing neck to chokes",
    "Flat on knees with no mobility",
    "Hands too high allowing hip control",
    "Not addressing guard break early"
  ],
  goals: [
    "Break opponent's closed guard",
    "Pass to side control or mount",
    "Avoid submissions and sweeps",
    "Maintain safe posture throughout"
  ]
};

// OPEN GUARD TOP
db.positions.open_guard_top.belt_levels.white = {
  concepts: [
    "Control opponent's legs and hips",
    "Maintain pressure and base to prevent sweeps",
    "Pass around or through guard",
    "Stay balanced against guard retention"
  ],
  techniques: [],
  common_mistakes: [
    "Standing too upright without grips",
    "Allowing opponent to control both sleeves",
    "Not addressing hooks and grips",
    "Diving forward without control"
  ],
  key_details: [
    "Control at least one leg or grip",
    "Maintain wide base for balance",
    "Pressure forward constantly",
    "Watch for sweeps and submissions"
  ],
  transitions_available: ["side_control", "half_guard_top", "knee_on_belly", "closed_guard_top"],
  prerequisites: ["closed_guard_top"]
};

db.positions.open_guard_top.system = {
  ...db.positions.open_guard_top.system,
  opponent_relative: ["passing", "facing_guard"],
  stability_score: 2,
  movement_directions_allowed: ["forward_pressure", "lateral_shift", "backward_retreat"],
  leads_to_position_ids: ["side_control", "half_guard_top", "knee_on_belly", "closed_guard_top"],
  entry_from_position_ids: ["closed_guard_top", "standing_neutral"],
  risk_level: "medium"
};

db.positions.open_guard_top.learning = {
  ...db.positions.open_guard_top.learning,
  alternate_names: ["Passing Open Guard", "Open Guard Pass Position"],
  description: "Position where opponent's guard is open and you are working to pass around or through their legs to achieve a dominant top position.",
  key_concepts: [
    "Control opponent's legs to limit mobility",
    "Maintain balance against guard retention",
    "Pressure forward to flatten opponent",
    "Work to pass around or through legs"
  ],
  entry_steps: [
    "Break closed guard or start standing",
    "Establish grips on opponent's legs or gi",
    "Create base and posture",
    "Begin guard passing sequence"
  ],
  maintenance_steps: [
    "Control at least one leg",
    "Keep weight forward over opponent",
    "Wide base to prevent sweeps",
    "Move with purpose toward pass"
  ],
  escape_overview: "Complete guard pass to side control, mount, or knee on belly",
  common_mistakes: [
    "Allowing opponent both sleeve grips",
    "Standing without controlling legs",
    "Not managing distance properly",
    "Telegraphing pass direction"
  ],
  goals: [
    "Pass guard to side control",
    "Avoid sweeps and submissions",
    "Maintain top position throughout",
    "Advance to mount or back"
  ]
};

// SIDE CONTROL
db.positions.side_control.belt_levels.white = {
  concepts: [
    "Pin opponent's shoulders and hips to mat",
    "Control opponent's near arm and far hip",
    "Distribute weight to immobilize",
    "Prevent opponent from creating space"
  ],
  techniques: [],
  common_mistakes: [
    "Weight too high on opponent's chest",
    "Not controlling opponent's hips",
    "Giving space for opponent to escape",
    "Crossing feet allowing reversal"
  ],
  key_details: [
    "Chest pressure on opponent's chest",
    "Control near arm with your arm or head",
    "Hips low, sprawled away from opponent",
    "Head pressure on opponent's face"
  ],
  transitions_available: ["mount", "knee_on_belly", "north_south", "back_control", "half_guard_top"],
  prerequisites: ["open_guard_top"]
};

db.positions.side_control.system = {
  ...db.positions.side_control.system,
  opponent_relative: ["on_top", "chest_to_chest", "perpendicular"],
  stability_score: 4,
  movement_directions_allowed: ["forward_pressure", "lateral_shift"],
  leads_to_position_ids: ["mount", "knee_on_belly", "north_south", "back_control", "half_guard_top"],
  entry_from_position_ids: ["open_guard_top", "half_guard_top", "turtle_top", "wrestling_shot_entry"],
  risk_level: "low"
};

db.positions.side_control.learning = {
  ...db.positions.side_control.learning,
  alternate_names: ["Side Mount", "Cross Side", "100 Kilos"],
  description: "A dominant top position where you are perpendicular to your opponent, chest-to-chest, pinning them to the mat. One of the fundamental top control positions in BJJ.",
  key_concepts: [
    "Heavy pressure to immobilize opponent",
    "Control opponent's near arm and far hip",
    "Prevent space creation with tight connection",
    "Foundation for attacks and transitions"
  ],
  entry_steps: [
    "Pass opponent's guard to the side",
    "Drop chest pressure on their chest",
    "Control near arm with your arm or head",
    "Sprawl hips away from opponent"
  ],
  maintenance_steps: [
    "Maintain chest pressure constantly",
    "Keep hips low and sprawled",
    "Control near arm to prevent framing",
    "Pressure head on their face"
  ],
  escape_overview: "Opponent must create frames and space to shrimp and recover guard",
  common_mistakes: [
    "Weight too high allowing easy bridge",
    "Hips too close allowing reversal",
    "Not controlling opponent's arms",
    "Static position without pressure"
  ],
  goals: [
    "Maintain dominant control",
    "Transition to mount or back",
    "Attempt submissions (Americana, Kimura, arm triangle)",
    "Prevent opponent's escape"
  ]
};

fs.writeFileSync('data/bjj-database.json', JSON.stringify(db, null, 2));
console.log('Updated: closed_guard_top, open_guard_top, side_control');
