const fs = require('fs');
const db = JSON.parse(fs.readFileSync('data/bjj-database.json', 'utf8'));

// Continue Top Control Positions - White Belt Content

// HALF GUARD TOP
db.positions.half_guard_top.belt_levels.white = {
  concepts: [
    "Control opponent's upper body to prevent sweeps",
    "Pressure into opponent to limit mobility",
    "Free trapped leg to complete pass",
    "Prevent opponent from recovering full guard"
  ],
  techniques: [],
  common_mistakes: [
    "Allowing opponent to get underhook",
    "Weight too high making you easy to sweep",
    "Not controlling opponent's far arm",
    "Letting opponent go to knees (dog fight)"
  ],
  key_details: [
    "Crossface or underhook to control upper body",
    "Weight forward on opponent",
    "Knee slide or backstep to free leg",
    "Prevent opponent's bottom leg from hooking"
  ],
  transitions_available: ["side_control", "mount", "knee_on_belly", "back_control"],
  prerequisites: ["open_guard_top"]
};

db.positions.half_guard_top.system = {
  ...db.positions.half_guard_top.system,
  opponent_relative: ["on_top", "leg_trapped"],
  stability_score: 3,
  movement_directions_allowed: ["forward_pressure", "lateral_shift"],
  leads_to_position_ids: ["side_control", "mount", "knee_on_belly", "back_control"],
  entry_from_position_ids: ["open_guard_top", "closed_guard_top", "side_control"],
  risk_level: "medium"
};

db.positions.half_guard_top.learning = {
  ...db.positions.half_guard_top.learning,
  alternate_names: ["Passing Half Guard", "Half Guard Pass Position"],
  description: "Position where opponent has trapped one of your legs between theirs while you work to free it and complete the guard pass to side control or mount.",
  key_concepts: [
    "Control upper body to limit opponent's options",
    "Pressure forward to flatten opponent",
    "Free trapped leg methodically",
    "Prevent underhooks and recovery to full guard"
  ],
  entry_steps: [
    "Opponent catches your leg during guard pass",
    "Establish crossface or underhook immediately",
    "Get chest pressure on opponent",
    "Begin working to free trapped leg"
  ],
  maintenance_steps: [
    "Maintain crossface or underhook control",
    "Keep weight forward and low",
    "Work knee slide or backstep to extract leg",
    "Prevent opponent from going to knees"
  ],
  escape_overview: "Complete pass by freeing leg to side control, mount, or knee on belly",
  common_mistakes: [
    "Allowing opponent to get underhook",
    "Weight too high being easy to sweep",
    "Not addressing opponent's lockdown",
    "Giving up crossface control"
  ],
  goals: [
    "Free trapped leg",
    "Pass to side control or mount",
    "Prevent sweeps and back takes",
    "Maintain top pressure throughout"
  ]
};

// MOUNT
db.positions.mount.belt_levels.white = {
  concepts: [
    "Sit high on opponent's chest",
    "Control opponent's arms and hips",
    "Maintain balance while attacking",
    "Weight distribution to prevent escape"
  ],
  techniques: [],
  common_mistakes: [
    "Sitting too low allowing bridge escape",
    "Crossing feet under opponent's butt",
    "Weight distribution too far forward or back",
    "Not controlling opponent's arms"
  ],
  key_details: [
    "Hips tight to opponent's chest",
    "Feet hooked under opponent's legs or spread wide",
    "Chest pressure forward",
    "Hands control opponent's arms or post for balance"
  ],
  transitions_available: ["technical_mount", "back_control", "side_control"],
  prerequisites: ["side_control", "half_guard_top"]
};

db.positions.mount.system = {
  ...db.positions.mount.system,
  opponent_relative: ["on_top", "straddling"],
  stability_score: 5,
  movement_directions_allowed: ["forward_pressure"],
  leads_to_position_ids: ["technical_mount", "back_control", "side_control"],
  entry_from_position_ids: ["side_control", "half_guard_top", "knee_on_belly", "turtle_top"],
  risk_level: "low"
};

db.positions.mount.learning = {
  ...db.positions.mount.learning,
  alternate_names: ["Full Mount", "Mounted Position"],
  description: "The most dominant position in BJJ where you sit on top of your opponent's torso, straddling them. Provides maximum control and numerous submission opportunities.",
  key_concepts: [
    "High mount position for maximum control",
    "Grapevine legs or spread base for stability",
    "Control opponent's arms to prevent escape",
    "Balance while maintaining pressure"
  ],
  entry_steps: [
    "From side control, swing leg over opponent's body",
    "Plant knee tight to opponent's armpit",
    "Bring second knee to opposite side",
    "Sit up with hips tight to chest"
  ],
  maintenance_steps: [
    "Keep hips low and tight",
    "Grapevine legs or spread base wide",
    "Lean forward when opponent bridges",
    "Control or trap opponent's arms"
  ],
  escape_overview: "Opponent must bridge and roll or shrimp to create space",
  common_mistakes: [
    "Sitting too low on stomach",
    "Crossing feet underneath",
    "Sitting upright when opponent bridges",
    "Not controlling opponent's arms"
  ],
  goals: [
    "Maintain dominant position",
    "Attack with Americana, cross collar choke, or armbar",
    "Transition to technical mount or back",
    "Force opponent to give up back"
  ]
};

// KNEE ON BELLY
db.positions.knee_on_belly.belt_levels.white = {
  concepts: [
    "Balance on opponent's belly with knee",
    "Control opponent's collar and far arm",
    "Pressure creates discomfort and reactions",
    "Gateway position to mount or back"
  ],
  techniques: [],
  common_mistakes: [
    "Weight too much on knee causing imbalance",
    "Not controlling opponent's far arm",
    "Posting foot too far away",
    "Static position without transitions"
  ],
  key_details: [
    "Knee centered on opponent's belly/chest",
    "Far foot posted for balance",
    "Near hand controls collar",
    "Far hand controls opponent's far arm"
  ],
  transitions_available: ["mount", "side_control", "back_control"],
  prerequisites: ["side_control"]
};

db.positions.knee_on_belly.system = {
  ...db.positions.knee_on_belly.system,
  opponent_relative: ["on_top", "knee_pressing"],
  stability_score: 3,
  movement_directions_allowed: ["lateral_shift", "forward_pressure"],
  leads_to_position_ids: ["mount", "side_control", "back_control"],
  entry_from_position_ids: ["side_control", "half_guard_top"],
  risk_level: "medium"
};

db.positions.knee_on_belly.learning = {
  ...db.positions.knee_on_belly.learning,
  alternate_names: ["KOB", "Knee on Stomach", "Knee Mount"],
  description: "A mobile top position where you place one knee on opponent's belly/chest while maintaining balance and control. Excellent for transitions and creating reactions.",
  key_concepts: [
    "Balance is key - distribute weight properly",
    "Control collar and far arm",
    "Mobile position for quick transitions",
    "Pressure creates defensive reactions to exploit"
  ],
  entry_steps: [
    "From side control, bring near knee to opponent's belly",
    "Post far foot for balance",
    "Grip collar with near hand",
    "Control far arm with far hand"
  ],
  maintenance_steps: [
    "Keep knee centered on belly/chest",
    "Maintain collar and arm control",
    "Post foot at proper distance",
    "Be ready to transition on opponent's escape"
  ],
  escape_overview: "Opponent will try to push knee away or shrimp - use these to transition",
  common_mistakes: [
    "Too much weight on knee (unstable)",
    "Not controlling far arm",
    "Posted foot too close or too far",
    "Staying static without attacking"
  ],
  goals: [
    "Control opponent with pressure",
    "Transition to mount or back when they escape",
    "Attack submissions (baseball choke, armbars)",
    "Score points and advance position"
  ]
};

fs.writeFileSync('data/bjj-database.json', JSON.stringify(db, null, 2));
console.log('Updated: half_guard_top, mount, knee_on_belly');
