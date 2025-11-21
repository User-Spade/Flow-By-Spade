const fs = require('fs');
const db = JSON.parse(fs.readFileSync('data/bjj-database.json', 'utf8'));

// Blue Belt Guard Positions - Part 3

// COLLAR SLEEVE GUARD
db.positions.collar_sleeve_guard.belt_levels.blue = {
  concepts: [
    "Asymmetric grips - collar and opposite sleeve",
    "Control posture and distance",
    "Create angles for attacks",
    "Gateway to many submissions",
    "Fundamental open guard control"
  ],
  techniques: [],
  common_mistakes: [
    "Weak collar grip easily broken",
    "Not controlling distance with legs",
    "Being flat without angles",
    "Letting opponent get double underhooks"
  ],
  key_details: [
    "One hand grips deep collar",
    "Other hand controls opposite sleeve",
    "Feet manage distance (hip and bicep)",
    "Create angles with hip movement"
  ],
  transitions_available: ["triangle_setup", "omoplata_setup", "spider_guard", "lasso_guard"],
  prerequisites: ["open_guard_bottom"]
};

db.positions.collar_sleeve_guard.system = {
  ...db.positions.collar_sleeve_guard.system,
  opponent_relative: ["on_bottom", "legs_open"],
  stability_score: 4,
  movement_directions_allowed: ["hip_movement", "pulling", "pushing"],
  leads_to_position_ids: ["spider_guard", "lasso_guard", "closed_guard_bottom", "open_guard_bottom"],
  entry_from_position_ids: ["open_guard_bottom", "closed_guard_bottom"],
  risk_level: "low"
};

db.positions.collar_sleeve_guard.learning = {
  ...db.positions.collar_sleeve_guard.learning,
  alternate_names: ["Collar Sleeve", "Cross Collar Sleeve"],
  description: "Fundamental open guard using collar and opposite sleeve grips. Excellent control for setting up sweeps and submissions. Very versatile and high-percentage position.",
  key_concepts: [
    "Collar grip breaks posture",
    "Sleeve grip prevents posting",
    "Legs create distance control",
    "Angles open up attacks"
  ],
  entry_steps: [
    "From open or closed guard",
    "Grip deep in opponent's collar",
    "Grip opposite sleeve",
    "Place feet on hip and bicep"
  ],
  maintenance_steps: [
    "Maintain deep collar grip",
    "Keep sleeve control",
    "Legs actively manage distance",
    "Create angles with hip movement"
  ],
  escape_overview: "Sweep or attack with triangle/omoplata",
  common_mistakes: [
    "Shallow collar grip",
    "Static feet not controlling distance",
    "No angles - staying centered",
    "Losing grips to opponent's grip breaks"
  ],
  goals: [
    "Execute collar sleeve sweeps",
    "Attack triangle choke",
    "Set up omoplata",
    "Control and frustrate passing attempts"
  ]
};

// KNEE SHIELD HALF GUARD
db.positions.knee_shield_half_guard.belt_levels.blue = {
  concepts: [
    "Knee creates barrier between you and opponent",
    "Maintain distance and prevent flattening",
    "Powerful position for sweeps",
    "Can attack or recover full guard",
    "Active frames essential"
  ],
  techniques: [],
  common_mistakes: [
    "Passive knee shield - just blocking",
    "Not getting underhook",
    "Being flat on back",
    "Letting opponent get crossface"
  ],
  key_details: [
    "Inside knee creates shield against opponent's chest",
    "Fight for underhook on trapped leg side",
    "Outside foot controls opponent's hip",
    "Frame and stay on side"
  ],
  transitions_available: ["half_guard_bottom", "closed_guard_bottom", "deep_half", "sweep_to_top"],
  prerequisites: ["half_guard_bottom"]
};

db.positions.knee_shield_half_guard.system = {
  ...db.positions.knee_shield_half_guard.system,
  opponent_relative: ["on_bottom", "leg_trapping"],
  stability_score: 4,
  movement_directions_allowed: ["hip_movement", "pushing", "rotating"],
  leads_to_position_ids: ["half_guard_bottom", "closed_guard_bottom", "deep_half_guard", "side_control"],
  entry_from_position_ids: ["half_guard_bottom", "open_guard_bottom"],
  risk_level: "low"
};

db.positions.knee_shield_half_guard.learning = {
  ...db.positions.knee_shield_half_guard.learning,
  alternate_names: ["Knee Shield", "Z-Guard Half Guard", "Shield Guard"],
  description: "Half guard variation where inside knee creates a frame/shield against opponent's chest. Much more offensive than standard half guard with excellent sweeping options.",
  key_concepts: [
    "Knee shield maintains critical distance",
    "Underhook provides offensive control",
    "Stay on side never flat",
    "Active frames prevent flattening"
  ],
  entry_steps: [
    "From half guard bottom",
    "Insert inside knee to opponent's chest/shoulder",
    "Get underhook on trapped leg side",
    "Outside foot on opponent's hip"
  ],
  maintenance_steps: [
    "Keep knee shield active and pressing",
    "Maintain underhook",
    "Stay on your side",
    "Ready to sweep or recover guard"
  ],
  escape_overview: "Sweep opponent or recover full guard",
  common_mistakes: [
    "Passive knee just sitting there",
    "Flat on back instead of side",
    "No underhook",
    "Accepting crossface"
  ],
  goals: [
    "Execute knee shield sweeps",
    "Recover to full guard",
    "Prevent being flattened",
    "Attack from offensive half guard"
  ]
};

// Z GUARD
db.positions.z_guard.belt_levels.blue = {
  concepts: [
    "Legs create 'Z' shape controlling opponent",
    "Top leg frames across opponent's body",
    "Bottom leg controls opponent's leg",
    "Create angles for sweeps",
    "Maintain frames and distance"
  ],
  techniques: [],
  common_mistakes: [
    "Weak frames allowing pressure",
    "Being flat without angle",
    "Not controlling opponent's far arm",
    "Letting opponent settle their weight"
  ],
  key_details: [
    "Top leg creates knee shield",
    "Bottom leg traps opponent's leg",
    "Form 'Z' shape with legs",
    "Hands control opponent's far side"
  ],
  transitions_available: ["knee_shield_half_guard", "deep_half_guard", "sweep_to_top"],
  prerequisites: ["knee_shield_half_guard", "half_guard_bottom"]
};

db.positions.z_guard.system = {
  ...db.positions.z_guard.system,
  opponent_relative: ["on_bottom", "leg_configuration"],
  stability_score: 4,
  movement_directions_allowed: ["hip_movement", "pushing", "rotating"],
  leads_to_position_ids: ["knee_shield_half_guard", "deep_half_guard", "side_control"],
  entry_from_position_ids: ["knee_shield_half_guard", "half_guard_bottom"],
  risk_level: "low"
};

db.positions.z_guard.learning = {
  ...db.positions.z_guard.learning,
  alternate_names: ["Z-Guard", "93 Guard"],
  description: "Specific half guard variation where legs form a 'Z' shape. Top leg frames while bottom leg controls opponent's trapped leg. Very systematic approach to half guard with clear protocols.",
  key_concepts: [
    "Z-shape leg configuration creates frames",
    "Systematic approach to half guard",
    "Top leg manages distance",
    "Bottom leg controls trapped leg"
  ],
  entry_steps: [
    "From half guard or knee shield",
    "Top leg across opponent's body (knee shield)",
    "Bottom leg controls trapped leg",
    "Create Z shape with legs"
  ],
  maintenance_steps: [
    "Maintain Z-shape configuration",
    "Active top leg framing",
    "Control opponent's far arm",
    "Stay on angle not flat"
  ],
  escape_overview: "Sweep opponent or recover to better guards",
  common_mistakes: [
    "Collapsed frames losing Z-shape",
    "Flat on back",
    "No far arm control",
    "Static without attacking"
  ],
  goals: [
    "Execute Z-guard sweeps",
    "Maintain superior half guard position",
    "Prevent opponent from passing",
    "Attack systematically from Z-guard"
  ]
};

// LOCKDOWN
db.positions.lockdown.belt_levels.blue = {
  concepts: [
    "Triangle legs around opponent's trapped leg",
    "Immobilize opponent's base",
    "Control opponent's posture and movement",
    "Set up sweeps and attacks",
    "Eddie Bravo 10th Planet technique"
  ],
  techniques: [],
  common_mistakes: [
    "Staying in lockdown too long (static)",
    "Not working for underhook",
    "Letting opponent get crossface",
    "Using lockdown defensively only"
  ],
  key_details: [
    "Bottom leg across opponent's trapped leg",
    "Top leg triangles over bottom ankle",
    "Creates figure-four on opponent's leg",
    "Use to off-balance and sweep"
  ],
  transitions_available: ["half_guard_bottom", "electric_chair", "old_school_sweep"],
  prerequisites: ["half_guard_bottom"]
};

db.positions.lockdown.system = {
  ...db.positions.lockdown.system,
  opponent_relative: ["on_bottom", "leg_locked"],
  stability_score: 3,
  movement_directions_allowed: ["hip_movement", "pulling"],
  leads_to_position_ids: ["half_guard_bottom", "sweep_to_top", "submission"],
  entry_from_position_ids: ["half_guard_bottom"],
  risk_level: "medium"
};

db.positions.lockdown.learning = {
  ...db.positions.lockdown.learning,
  alternate_names: ["Lockdown Half Guard", "10th Planet Lockdown"],
  description: "Half guard variation where you triangle your legs around opponent's trapped leg. Popularized by Eddie Bravo. Immobilizes opponent's leg creating sweeping and submission opportunities.",
  key_concepts: [
    "Leg triangle immobilizes opponent's leg",
    "Creates off-balance for sweeps",
    "Gateway to electric chair and old school",
    "Must be active not passive"
  ],
  entry_steps: [
    "From half guard bottom",
    "Get bottom leg across opponent's trapped shin",
    "Triangle top leg over bottom ankle",
    "Lock tight around opponent's leg"
  ],
  maintenance_steps: [
    "Keep lockdown tight",
    "Fight for underhook",
    "Angle body for sweeps",
    "Stay active - attack constantly"
  ],
  escape_overview: "Sweep opponent or attack with electric chair",
  common_mistakes: [
    "Static lockdown (stalling)",
    "No underhook allowing crossface",
    "Not creating angles",
    "Defensive mindset instead of attacking"
  ],
  goals: [
    "Execute old school sweep",
    "Attack electric chair submission",
    "Control and off-balance opponent",
    "Set up 10th Planet sequences"
  ]
};

fs.writeFileSync('data/bjj-database.json', JSON.stringify(db, null, 2));
console.log('Updated: collar_sleeve_guard, knee_shield_half_guard, z_guard, lockdown');
