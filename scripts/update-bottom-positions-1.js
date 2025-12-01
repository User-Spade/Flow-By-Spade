const fs = require('fs');
const db = JSON.parse(fs.readFileSync('data/bjj-database.json', 'utf8'));

// Bottom Positions Part 1 - White Belt Content

// CLOSED GUARD BOTTOM
db.positions.closed_guard_bottom.belt_levels.white = {
  concepts: [
    "Control opponent's posture - break them down",
    "Create angles for attacks and sweeps",
    "Use legs to control distance and posture",
    "Guard is an attacking position, not defensive"
  ],
  techniques: [],
  common_mistakes: [
    "Being flat on back with no angle",
    "Letting opponent stand up easily",
    "Not controlling opponent's sleeves or collar",
    "Keeping guard closed when opponent stands"
  ],
  key_details: [
    "Ankles locked behind opponent's back",
    "Pull opponent down with collar grips",
    "Angle body to create attack opportunities",
    "Squeeze knees to limit opponent's movement"
  ],
  transitions_available: ["open_guard_bottom", "half_guard_bottom", "side_control_bottom"],
  prerequisites: []
};

db.positions.closed_guard_bottom.system = {
  ...db.positions.closed_guard_bottom.system,
  opponent_relative: ["on_bottom", "legs_wrapped"],
  stability_score: 4,
  movement_directions_allowed: ["hip_movement", "pulling"],
  leads_to_position_ids: ["open_guard_bottom", "half_guard_bottom", "side_control_bottom", "mount"],
  entry_from_position_ids: ["standing_neutral", "open_guard_bottom"],
  risk_level: "low"
};

db.positions.closed_guard_bottom.learning = {
  ...db.positions.closed_guard_bottom.learning,
  alternate_names: ["Closed Guard", "Full Guard"],
  description: "Fundamental guard position where your legs are wrapped around opponent's waist with ankles locked. Provides strong control and numerous attacking options.",
  key_concepts: [
    "Break opponent's posture to control",
    "Create angles for attacks",
    "Guard is offensive - attack constantly",
    "Control opponent's arms and collar"
  ],
  entry_steps: [
    "From standing, pull opponent into your guard",
    "Lock ankles behind opponent's back",
    "Establish collar and sleeve grips",
    "Break opponent's posture down"
  ],
  maintenance_steps: [
    "Keep ankles locked",
    "Control opponent's posture with grips",
    "Create angles by hip movement",
    "Attack with sweeps or submissions"
  ],
  escape_overview: "Sweep opponent or submit them; if passed, recover guard or escape",
  common_mistakes: [
    "Staying flat without angles",
    "Letting opponent posture up",
    "Not controlling sleeves/collar",
    "Keeping guard closed when opponent stands"
  ],
  goals: [
    "Control opponent's posture",
    "Attack with triangle, armbar, or kimura",
    "Execute sweeps to top position",
    "Prevent opponent from passing guard"
  ]
};

// OPEN GUARD BOTTOM
db.positions.open_guard_bottom.belt_levels.white = {
  concepts: [
    "Manage distance with legs and feet",
    "Control opponent's sleeves, collar, and posture",
    "Create angles for sweeps and attacks",
    "Keep opponent from passing to side"
  ],
  techniques: [],
  common_mistakes: [
    "Letting opponent control your legs",
    "Flat on back with no movement",
    "Not keeping opponent at optimal distance",
    "Weak grips allowing opponent to break free"
  ],
  key_details: [
    "Feet on opponent's hips or biceps",
    "Strong collar and sleeve grips",
    "Hips mobile and ready to move",
    "Constantly adjust distance with legs"
  ],
  transitions_available: ["closed_guard_bottom", "half_guard_bottom", "side_control_bottom"],
  prerequisites: ["closed_guard_bottom"]
};

db.positions.open_guard_bottom.system = {
  ...db.positions.open_guard_bottom.system,
  opponent_relative: ["on_bottom", "legs_open"],
  stability_score: 3,
  movement_directions_allowed: ["hip_movement", "pulling", "pushing"],
  leads_to_position_ids: ["closed_guard_bottom", "half_guard_bottom", "side_control_bottom", "mount"],
  entry_from_position_ids: ["closed_guard_bottom", "standing_neutral"],
  risk_level: "medium"
};

db.positions.open_guard_bottom.learning = {
  ...db.positions.open_guard_bottom.learning,
  alternate_names: ["Open Guard", "Feet on Hips Guard"],
  description: "Guard position where legs are not locked around opponent. Requires active leg and grip management to control distance and create attacking opportunities.",
  key_concepts: [
    "Legs control distance - never flat",
    "Grips control opponent's ability to pass",
    "Mobility is key - hip movement essential",
    "Create angles for sweeps and attacks"
  ],
  entry_steps: [
    "Opponent opens your closed guard or you open it",
    "Place feet on opponent's hips",
    "Establish strong sleeve and collar grips",
    "Create distance and prepare to attack"
  ],
  maintenance_steps: [
    "Keep feet engaged on opponent",
    "Maintain strong grips",
    "Move hips constantly",
    "Re-establish guard if passed"
  ],
  escape_overview: "Sweep opponent to top or return to closed guard",
  common_mistakes: [
    "Letting opponent grab your legs",
    "Being flat without hip movement",
    "Weak or broken grips",
    "Not managing distance properly"
  ],
  goals: [
    "Execute scissor sweep or hip bump sweep",
    "Return to closed guard when advantageous",
    "Prevent guard passing",
    "Attack with submissions from open guard"
  ]
};

// HALF GUARD BOTTOM
db.positions.half_guard_bottom.belt_levels.white = {
  concepts: [
    "Get underhook on trapped leg side",
    "Control opponent's crossface arm",
    "Create frames to prevent flat position",
    "Recover full guard or sweep to top"
  ],
  techniques: [],
  common_mistakes: [
    "Being flat on back with no frames",
    "Letting opponent get crossface",
    "Not fighting for underhook",
    "Keeping lockdown too long without sweeping"
  ],
  key_details: [
    "One leg traps opponent's leg",
    "Underhook is crucial for control",
    "Frame to prevent being flattened",
    "Get to side or create angles"
  ],
  transitions_available: ["closed_guard_bottom", "open_guard_bottom", "side_control_bottom"],
  prerequisites: ["closed_guard_bottom"]
};

db.positions.half_guard_bottom.system = {
  ...db.positions.half_guard_bottom.system,
  opponent_relative: ["on_bottom", "leg_trapping"],
  stability_score: 3,
  movement_directions_allowed: ["hip_movement", "pulling"],
  leads_to_position_ids: ["closed_guard_bottom", "open_guard_bottom", "side_control_bottom", "half_guard_top"],
  entry_from_position_ids: ["closed_guard_bottom", "open_guard_bottom", "side_control_bottom"],
  risk_level: "medium"
};

db.positions.half_guard_bottom.learning = {
  ...db.positions.half_guard_bottom.learning,
  alternate_names: ["Half Guard", "Bottom Half"],
  description: "Guard position where you have one of opponent's legs trapped between yours. Defensive position that can be converted to sweeps or full guard recovery.",
  key_concepts: [
    "Underhook is gold - fight for it",
    "Prevent crossface at all costs",
    "Get to side not flat on back",
    "Use lockdown or frames to control"
  ],
  entry_steps: [
    "Opponent passing your guard catches one leg",
    "Immediately fight for underhook",
    "Block crossface with frame",
    "Get to your side facing opponent"
  ],
  maintenance_steps: [
    "Maintain underhook if you have it",
    "Frame against opponent's shoulder",
    "Stay on side, not flat",
    "Work to recover full guard or sweep"
  ],
  escape_overview: "Recover to full guard or sweep to top position",
  common_mistakes: [
    "Being flat on your back",
    "Losing underhook battle",
    "Accepting crossface control",
    "Static position without working for improvement"
  ],
  goals: [
    "Recover to closed or open guard",
    "Execute half guard sweep to top",
    "Prevent being passed to side control",
    "Get to dog fight position"
  ]
};

fs.writeFileSync('data/bjj-database.json', JSON.stringify(db, null, 2));
console.log('Updated: closed_guard_bottom, open_guard_bottom, half_guard_bottom');
