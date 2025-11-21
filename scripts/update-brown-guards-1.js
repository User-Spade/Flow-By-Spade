const fs = require('fs');
const db = JSON.parse(fs.readFileSync('data/bjj-database.json', 'utf8'));

// Brown Belt Advanced Guards - Part 1

// K GUARD
db.positions.k_guard.belt_levels.brown = {
  concepts: [
    "Hybrid guard using lapel control",
    "K-shape leg configuration",
    "Creates trapping mechanics",
    "Lapel wrapped around opponent's leg",
    "Modern lapel guard variation"
  ],
  techniques: [],
  common_mistakes: [
    "Weak lapel control easily broken",
    "Not maintaining K-shape configuration",
    "Poor leg positioning",
    "Not using lapel trap effectively"
  ],
  key_details: [
    "Lapel wrapped around opponent's leg",
    "Legs form K-shape",
    "Control opponent's posture",
    "Use lapel to restrict movement"
  ],
  transitions_available: ["worm_guard", "spider_guard", "sweep_to_top"],
  prerequisites: ["spider_guard", "lapel_guard_basics"]
};

db.positions.k_guard.system = {
  ...db.positions.k_guard.system,
  opponent_relative: ["on_bottom", "legs_open"],
  stability_score: 4,
  movement_directions_allowed: ["hip_movement", "pulling"],
  leads_to_position_ids: ["worm_guard", "spider_guard", "side_control"],
  entry_from_position_ids: ["spider_guard", "open_guard_bottom"],
  risk_level: "low"
};

db.positions.k_guard.learning = {
  ...db.positions.k_guard.learning,
  alternate_names: ["K Guard", "K-Shape Guard"],
  description: "Advanced lapel guard where legs form K-shape while controlling opponent with wrapped lapel. Modern guard variation using gi control. Creates unique trapping and sweeping opportunities.",
  key_concepts: [
    "K-shape leg configuration",
    "Lapel wrapped creates control",
    "Restricts opponent's movement",
    "Gateway to other lapel guards"
  ],
  entry_steps: [
    "From spider or open guard",
    "Feed lapel around opponent's leg",
    "Create K-shape with legs",
    "Establish control and grips"
  ],
  maintenance_steps: [
    "Maintain lapel wrap",
    "Keep K-shape configuration",
    "Control opponent's posture",
    "Create sweeping angles"
  ],
  escape_overview: "Sweep opponent or transition to other guards",
  common_mistakes: [
    "Lapel wrap too loose",
    "Losing K-shape",
    "Static without attacking",
    "Poor lapel management"
  ],
  goals: [
    "Master lapel guard systems",
    "Create trapping mechanics",
    "Develop modern guard game",
    "Sweep with lapel control"
  ]
};

// BUTTERFLY X
db.positions.butterfly_x.belt_levels.brown = {
  concepts: [
    "Hybrid of butterfly and X-guard",
    "Combines elements of both positions",
    "Versatile sweeping platform",
    "Can elevate or rotate",
    "Modern guard evolution"
  ],
  techniques: [],
  common_mistakes: [
    "Not committing to either position",
    "Poor hook placement",
    "Weak underhook control",
    "Not using hybrid advantages"
  ],
  key_details: [
    "Butterfly hook on one side",
    "X-guard configuration on other",
    "Underhook essential",
    "Can switch between sweep types"
  ],
  transitions_available: ["butterfly_guard", "x_guard", "single_leg_x", "sweep_to_top"],
  prerequisites: ["butterfly_guard", "x_guard"]
};

db.positions.butterfly_x.system = {
  ...db.positions.butterfly_x.system,
  opponent_relative: ["on_bottom", "hybrid_hooks"],
  stability_score: 4,
  movement_directions_allowed: ["elevating", "rotating", "hip_movement"],
  leads_to_position_ids: ["butterfly_guard", "x_guard", "single_leg_x", "side_control"],
  entry_from_position_ids: ["butterfly_guard", "x_guard"],
  risk_level: "low"
};

db.positions.butterfly_x.learning = {
  ...db.positions.butterfly_x.learning,
  alternate_names: ["Butterfly X", "Hybrid X"],
  description: "Advanced guard combining butterfly and X-guard elements. Uses butterfly hook on one side and X-guard configuration on other. Provides versatile sweeping options and transitions.",
  key_concepts: [
    "Hybrid combines both guard strengths",
    "Butterfly and X elements together",
    "Versatile sweeping platform",
    "Can adapt based on opponent"
  ],
  entry_steps: [
    "From butterfly or X-guard",
    "Establish butterfly hook one side",
    "Create X configuration other side",
    "Secure underhook control"
  ],
  maintenance_steps: [
    "Maintain hybrid configuration",
    "Keep both hooks active",
    "Underhook provides control",
    "Ready to sweep either direction"
  ],
  escape_overview: "Sweep using butterfly or X mechanics",
  common_mistakes: [
    "Not fully committing to hybrid",
    "Weak hooks on either side",
    "No underhook",
    "Static without attacking"
  ],
  goals: [
    "Master hybrid guard concepts",
    "Sweep with multiple options",
    "Develop adaptive guard game",
    "Transition fluidly between positions"
  ]
};

// WORM GUARD
db.positions.worm_guard.belt_levels.brown = {
  concepts: [
    "Lapel wrapped around own leg and opponent's",
    "Keenan Cornelius signature guard",
    "Creates powerful control",
    "Opponent trapped in lapel system",
    "Complex lapel guard"
  ],
  techniques: [],
  common_mistakes: [
    "Incorrect lapel wrapping sequence",
    "Losing lapel control",
    "Not maintaining leg configuration",
    "Poor understanding of system"
  ],
  key_details: [
    "Lapel wrapped around your leg",
    "Then wrapped around opponent's",
    "Creates worm-like control",
    "Powerful sweeping mechanics"
  ],
  transitions_available: ["squid_guard", "ringworm_guard", "sweep_to_top"],
  prerequisites: ["spider_guard", "lapel_guard_fundamentals"]
};

db.positions.worm_guard.system = {
  ...db.positions.worm_guard.system,
  opponent_relative: ["on_bottom", "legs_open"],
  stability_score: 5,
  movement_directions_allowed: ["hip_movement", "pulling"],
  leads_to_position_ids: ["squid_guard", "ringworm_guard", "side_control"],
  entry_from_position_ids: ["spider_guard", "k_guard"],
  risk_level: "low"
};

db.positions.worm_guard.learning = {
  ...db.positions.worm_guard.learning,
  alternate_names: ["Worm Guard", "Lapel Lasso"],
  description: "Advanced lapel guard created by Keenan Cornelius where lapel is wrapped around your own leg then opponent's. Creates extremely strong control and sweeping mechanics. Signature modern guard.",
  key_concepts: [
    "Lapel wraps your leg then opponent's",
    "Creates worm-like entanglement",
    "Very difficult to pass",
    "Powerful sweep mechanics"
  ],
  entry_steps: [
    "From spider or open guard",
    "Feed lapel around your leg",
    "Wrap around opponent's leg",
    "Establish worm configuration"
  ],
  maintenance_steps: [
    "Maintain lapel wraps",
    "Keep leg configuration",
    "Control opponent's posture",
    "Create sweeping angles"
  ],
  escape_overview: "Execute worm guard sweeps",
  common_mistakes: [
    "Wrapping sequence incorrect",
    "Lapel too loose",
    "Not understanding system",
    "Attempting without proper study"
  ],
  goals: [
    "Master Keenan Cornelius system",
    "Create unpassable guard",
    "Develop lapel guard expertise",
    "Sweep with lapel control"
  ]
};

fs.writeFileSync('data/bjj-database.json', JSON.stringify(db, null, 2));
console.log('Updated: k_guard, butterfly_x, worm_guard');
