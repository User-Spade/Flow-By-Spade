const fs = require('fs');
const db = JSON.parse(fs.readFileSync('data/bjj-database.json', 'utf8'));

// Blue Belt Guard Positions - Part 2

// SPIDER GUARD
db.positions.spider_guard.belt_levels.blue = {
  concepts: [
    "Control opponent's sleeves with hands",
    "Feet on biceps for distance management",
    "Create extension to prevent passing",
    "Off-balance opponent for sweeps",
    "Transition to other guards or attacks"
  ],
  techniques: [],
  common_mistakes: [
    "Letting go of sleeve grips",
    "Feet not active on biceps",
    "Being flat without creating angles",
    "Too much extension - getting tired"
  ],
  key_details: [
    "Both hands grip opponent's sleeves",
    "Feet placed on biceps/elbows",
    "Create extension to control distance",
    "Use legs to push/pull for off-balance"
  ],
  transitions_available: ["lasso_guard", "collar_sleeve_guard", "triangle_setup", "omoplata_setup"],
  prerequisites: ["open_guard_bottom"]
};

db.positions.spider_guard.system = {
  ...db.positions.spider_guard.system,
  opponent_relative: ["on_bottom", "legs_extended"],
  stability_score: 4,
  movement_directions_allowed: ["pushing", "pulling", "hip_movement"],
  leads_to_position_ids: ["lasso_guard", "collar_sleeve_guard", "closed_guard_bottom", "open_guard_bottom"],
  entry_from_position_ids: ["open_guard_bottom", "closed_guard_bottom"],
  risk_level: "low"
};

db.positions.spider_guard.learning = {
  ...db.positions.spider_guard.learning,
  alternate_names: ["Spider", "Biceps Control"],
  description: "Guard where you control both sleeves and place feet on opponent's biceps/elbows. Excellent for maintaining distance and setting up sweeps. Very effective against standing passes.",
  key_concepts: [
    "Sleeve grips are mandatory",
    "Feet create frames on biceps",
    "Extension controls opponent's posture",
    "Legs act as adjustable distance controllers"
  ],
  entry_steps: [
    "From open guard, grip both sleeves",
    "Place one foot on bicep, then the other",
    "Create extension to control posture",
    "Adjust leg pressure to manage distance"
  ],
  maintenance_steps: [
    "Never let go of sleeve grips",
    "Keep feet active on biceps",
    "Adjust extension based on opponent's movement",
    "Create angles for sweeps"
  ],
  escape_overview: "Sweep opponent or transition to submissions",
  common_mistakes: [
    "Releasing sleeve grips",
    "Static feet not actively pushing",
    "Over-extending and losing control",
    "Not creating angles - staying centered"
  ],
  goals: [
    "Execute spider guard sweeps",
    "Transition to triangle or omoplata",
    "Control standing opponent effectively",
    "Prevent guard passing"
  ]
};

// LASSO GUARD
db.positions.lasso_guard.belt_levels.blue = {
  concepts: [
    "Lasso controls opponent's arm by threading leg through",
    "Creates powerful sweeping mechanics",
    "Limits opponent's movement options",
    "Can be combined with other guards",
    "Use to attack or sweep"
  ],
  techniques: [],
  common_mistakes: [
    "Weak lasso easily removed",
    "Not controlling opposite side",
    "Being flat without angles",
    "Lasso on both sides (too defensive)"
  ],
  key_details: [
    "Thread leg through opponent's arm (elbow pit)",
    "Grip sleeve with same-side hand",
    "Other side controls with foot/grip",
    "Hip angle creates off-balance"
  ],
  transitions_available: ["spider_guard", "collar_sleeve_guard", "omoplata_setup", "triangle_setup"],
  prerequisites: ["spider_guard", "open_guard_bottom"]
};

db.positions.lasso_guard.system = {
  ...db.positions.lasso_guard.system,
  opponent_relative: ["on_bottom", "leg_threaded"],
  stability_score: 4,
  movement_directions_allowed: ["hip_movement", "pulling", "rotating"],
  leads_to_position_ids: ["spider_guard", "collar_sleeve_guard", "open_guard_bottom"],
  entry_from_position_ids: ["spider_guard", "open_guard_bottom"],
  risk_level: "low"
};

db.positions.lasso_guard.learning = {
  ...db.positions.lasso_guard.learning,
  alternate_names: ["Lasso", "Spider Lasso", "Threaded Guard"],
  description: "Guard where one leg is threaded through opponent's arm creating a lasso control. Very strong control limiting opponent's options and setting up powerful sweeps.",
  key_concepts: [
    "Lasso leg threads through arm pit",
    "Creates mechanical advantage for sweeps",
    "Limits opponent's ability to pass",
    "Asymmetric control - one side locked"
  ],
  entry_steps: [
    "From spider or open guard",
    "Thread one leg through opponent's arm",
    "Grip sleeve with same-side hand",
    "Control opposite side with foot/grip"
  ],
  maintenance_steps: [
    "Keep lasso tight through arm",
    "Maintain sleeve grip",
    "Create angles with hips",
    "Control opposite side actively"
  ],
  escape_overview: "Sweep opponent or attack with omoplata/triangle",
  common_mistakes: [
    "Loose lasso easily removed",
    "Forgetting to control opposite side",
    "Static position without sweeping",
    "Lassoing both arms (overly defensive)"
  ],
  goals: [
    "Execute lasso sweeps",
    "Attack with omoplata from lasso",
    "Control and frustrate opponent's passing",
    "Transition to other guard variations"
  ]
};

// X GUARD
db.positions.x_guard.belt_levels.blue = {
  concepts: [
    "Control both of opponent's legs with your legs",
    "Create X shape with your legs",
    "Elevate and off-balance opponent",
    "Powerful sweeping position",
    "Can stand up from here"
  ],
  techniques: [],
  common_mistakes: [
    "Weak X formation - legs not engaged",
    "Not elevating opponent",
    "Poor hand/arm control",
    "Being flat instead of on shoulder"
  ],
  key_details: [
    "One leg hooks between opponent's legs",
    "Other leg hooks outside opponent's thigh",
    "Hands control opponent's legs/belt",
    "On your side/shoulder for mobility"
  ],
  transitions_available: ["single_leg_x", "butterfly_guard", "sweep_to_top", "back_take"],
  prerequisites: ["butterfly_guard", "de_la_riva"]
};

db.positions.x_guard.system = {
  ...db.positions.x_guard.system,
  opponent_relative: ["on_bottom", "under_opponent"],
  stability_score: 4,
  movement_directions_allowed: ["elevating", "rotating", "hip_movement"],
  leads_to_position_ids: ["single_leg_x", "butterfly_guard", "side_control", "back_control"],
  entry_from_position_ids: ["butterfly_guard", "de_la_riva", "reverse_de_la_riva"],
  risk_level: "low"
};

db.positions.x_guard.learning = {
  ...db.positions.x_guard.learning,
  alternate_names: ["X-Guard", "Cross Guard"],
  description: "Position where your legs form an X shape controlling both of opponent's legs. Powerful sweeping position that elevates opponent off the ground. Very effective against standing opponents.",
  key_concepts: [
    "Legs form X controlling both opponent's legs",
    "Elevation removes opponent's base",
    "On your side for maximum control",
    "Hands assist in controlling legs/hips"
  ],
  entry_steps: [
    "From butterfly, DLR, or RDLR",
    "Get underneath opponent",
    "Hook one leg between opponent's legs",
    "Hook other leg on outside of thigh forming X"
  ],
  maintenance_steps: [
    "Keep X formation tight",
    "Actively elevate opponent",
    "Maintain side position",
    "Control opponent's legs with hands"
  ],
  escape_overview: "Sweep opponent or transition to single leg X",
  common_mistakes: [
    "Weak hooks not elevating",
    "Being flat on back",
    "Poor hand control",
    "Not staying on shoulder/side"
  ],
  goals: [
    "Execute X-guard sweeps",
    "Stand up to single leg",
    "Transition to leg entanglements",
    "Control and elevate standing opponent"
  ]
};

fs.writeFileSync('data/bjj-database.json', JSON.stringify(db, null, 2));
console.log('Updated: spider_guard, lasso_guard, x_guard');
