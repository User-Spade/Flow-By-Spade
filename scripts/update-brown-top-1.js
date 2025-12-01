const fs = require('fs');
const db = JSON.parse(fs.readFileSync('data/bjj-database.json', 'utf8'));

// Brown Belt Top Control - Part 1

// LEG PINNING SYSTEMS
db.positions.leg_pinning_systems.belt_levels.brown = {
  concepts: [
    "Systematically controlling opponent's legs",
    "Using legs to pin opponent's legs",
    "Creates immobility for passing",
    "Advanced passing strategy",
    "Leg weaving techniques"
  ],
  techniques: [],
  common_mistakes: [
    "Not fully controlling legs",
    "Weak pinning pressure",
    "Losing leg control during pass",
    "Not using systematic approach"
  ],
  key_details: [
    "Use your legs to pin theirs",
    "Creates passing opportunities",
    "Systematic leg control",
    "Opponent's mobility restricted"
  ],
  transitions_available: ["side_control", "mount", "knee_on_belly", "headquarters_position"],
  prerequisites: ["headquarters_position", "pressure_passing"]
};

db.positions.leg_pinning_systems.system = {
  ...db.positions.leg_pinning_systems.system,
  opponent_relative: ["on_top", "legs_controlled"],
  stability_score: 4,
  movement_directions_allowed: ["forward_pressure", "leg_weaving"],
  leads_to_position_ids: ["side_control", "mount", "knee_on_belly", "headquarters_position"],
  entry_from_position_ids: ["headquarters_position", "half_guard_top"],
  risk_level: "low"
};

db.positions.leg_pinning_systems.learning = {
  ...db.positions.leg_pinning_systems.learning,
  alternate_names: ["Leg Pins", "Leg Weaving Systems"],
  description: "Advanced passing system using your legs to systematically control and pin opponent's legs. Creates immobility allowing safe passage to dominant positions. Expert-level passing strategy.",
  key_concepts: [
    "Systematic leg control",
    "Use legs to pin opponent's",
    "Creates passing opportunities",
    "Restricts opponent's mobility"
  ],
  entry_steps: [
    "From headquarters or half guard top",
    "Begin leg weaving sequence",
    "Pin opponent's legs systematically",
    "Establish control for passing"
  ],
  maintenance_steps: [
    "Keep legs pinned",
    "Maintain pressure",
    "Use systematic approach",
    "Progress to pass"
  ],
  escape_overview: "Complete pass to side control or mount",
  common_mistakes: [
    "Not pinning completely",
    "Losing leg control",
    "Rushing the pass",
    "Not understanding system"
  ],
  goals: [
    "Master systematic passing",
    "Control with legs",
    "Develop advanced passing game",
    "Pass safely and efficiently"
  ]
};

// DOUBLE UNDER PASS
db.positions.double_under_pass.belt_levels.brown = {
  concepts: [
    "Both arms under opponent's legs",
    "Powerful pressure passing",
    "Stack and control",
    "Wrestling-based pass",
    "High percentage technique"
  ],
  techniques: [],
  common_mistakes: [
    "Not getting deep enough under legs",
    "Weak head position",
    "Poor weight distribution",
    "Not finishing to side control"
  ],
  key_details: [
    "Both arms under both legs",
    "Head pressure on chest/belly",
    "Stack opponent's hips",
    "Drive forward to complete"
  ],
  transitions_available: ["side_control", "mount", "north_south"],
  prerequisites: ["pressure_passing_fundamentals", "stacking"]
};

db.positions.double_under_pass.system = {
  ...db.positions.double_under_pass.system,
  opponent_relative: ["on_top", "passing"],
  stability_score: 4,
  movement_directions_allowed: ["forward_pressure", "stacking"],
  leads_to_position_ids: ["side_control", "mount", "north_south"],
  entry_from_position_ids: ["open_guard_top", "half_guard_top"],
  risk_level: "low"
};

db.positions.double_under_pass.learning = {
  ...db.positions.double_under_pass.learning,
  alternate_names: ["Double Under", "Double Underhook Pass"],
  description: "Classic pressure pass with both arms under opponent's legs. Creates powerful stacking pressure and control. Wrestling-based technique with high success rate. Brown belt refinement of fundamental pass.",
  key_concepts: [
    "Both arms under legs",
    "Stack with pressure",
    "Head drives into body",
    "Wrestling-based passing"
  ],
  entry_steps: [
    "From open or half guard top",
    "Get both arms under legs",
    "Establish head pressure",
    "Begin stacking opponent"
  ],
  maintenance_steps: [
    "Keep arms deep under legs",
    "Maintain head pressure",
    "Stack hips up",
    "Drive forward to complete"
  ],
  escape_overview: "Complete pass to side control or north-south",
  common_mistakes: [
    "Arms not deep enough",
    "Poor head position",
    "Not stacking hips",
    "Stalling in middle"
  ],
  goals: [
    "Master pressure passing",
    "Develop wrestling-based game",
    "Use stacking effectively",
    "Pass with control"
  ]
};

// OVER UNDER PASS
db.positions.over_under_pass.belt_levels.brown = {
  concepts: [
    "One arm over one leg, one arm under other",
    "Asymmetric pressure passing",
    "Creates control and leverage",
    "Brazilian jiu-jitsu classic",
    "High level passing technique"
  ],
  techniques: [],
  common_mistakes: [
    "Not getting deep enough with over/under",
    "Poor head position",
    "Weak shoulder pressure",
    "Not controlling the hip"
  ],
  key_details: [
    "One arm over, one under",
    "Shoulder drives into hip",
    "Control with head and arms",
    "Pressure-based passing"
  ],
  transitions_available: ["side_control", "north_south", "mount"],
  prerequisites: ["pressure_passing", "side_control"]
};

db.positions.over_under_pass.system = {
  ...db.positions.over_under_pass.system,
  opponent_relative: ["on_top", "passing"],
  stability_score: 4,
  movement_directions_allowed: ["forward_pressure", "shoulder_driving"],
  leads_to_position_ids: ["side_control", "north_south", "mount"],
  entry_from_position_ids: ["open_guard_top", "half_guard_top"],
  risk_level: "low"
};

db.positions.over_under_pass.learning = {
  ...db.positions.over_under_pass.learning,
  alternate_names: ["Over Under", "Over Under Pass"],
  description: "Classic BJJ pressure pass with one arm over leg and one under. Creates asymmetric pressure and control. Brazilian jiu-jitsu fundamental used at highest levels. Brown belt mastery of timing and pressure.",
  key_concepts: [
    "Asymmetric over/under configuration",
    "Shoulder pressure into hip",
    "Head controls movement",
    "Classic BJJ passing"
  ],
  entry_steps: [
    "From open or half guard",
    "Establish over/under grips",
    "Drive shoulder into hip",
    "Begin pressure passing"
  ],
  maintenance_steps: [
    "Keep over/under deep",
    "Maintain shoulder pressure",
    "Control with head",
    "Drive to complete pass"
  ],
  escape_overview: "Complete pass to side control or north-south",
  common_mistakes: [
    "Grips not deep enough",
    "No shoulder pressure",
    "Head not controlling",
    "Not finishing completely"
  ],
  goals: [
    "Master classic BJJ passing",
    "Develop pressure game",
    "Use timing effectively",
    "Pass with control and pressure"
  ]
};

fs.writeFileSync('data/bjj-database.json', JSON.stringify(db, null, 2));
console.log('Updated: leg_pinning_systems, double_under_pass, over_under_pass');
