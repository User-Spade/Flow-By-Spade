const fs = require('fs');
const db = JSON.parse(fs.readFileSync('data/bjj-database.json', 'utf8'));

// Purple Belt Remaining Positions

// INVERTED GUARD
db.positions.inverted_guard.belt_levels.purple = {
  concepts: [
    "Upside down guard position",
    "Creates unusual angles for opponent",
    "Gateway to berimbolo and back takes",
    "Requires flexibility",
    "Confusing for opponent to pass"
  ],
  techniques: [],
  common_mistakes: [
    "Exposing back while inverted",
    "Poor neck position (injury risk)",
    "Not controlling opponent's legs",
    "Inverting at wrong time"
  ],
  key_details: [
    "Shoulders on mat, hips elevated",
    "Control opponent's legs/hips",
    "Neck safe - not all weight on it",
    "Mobile - ready to rotate"
  ],
  transitions_available: ["berimbolo_control", "back_control", "reverse_de_la_riva"],
  prerequisites: ["reverse_de_la_riva", "flexibility"]
};

db.positions.inverted_guard.system = {
  ...db.positions.inverted_guard.system,
  opponent_relative: ["on_bottom", "inverted"],
  stability_score: 2,
  movement_directions_allowed: ["inverting", "rotating"],
  leads_to_position_ids: ["berimbolo_control", "back_control", "reverse_de_la_riva"],
  entry_from_position_ids: ["reverse_de_la_riva", "open_guard_bottom"],
  risk_level: "high"
};

db.positions.inverted_guard.learning = {
  ...db.positions.inverted_guard.learning,
  alternate_names: ["Inversion", "Upside Down Guard"],
  description: "Advanced guard position where you are upside down with shoulders on mat. Creates unusual angles that confuse passers. Gateway to berimbolo and back attacks. Requires good flexibility and neck strength.",
  key_concepts: [
    "Inversion creates confusion",
    "Protects back with leg control",
    "Gateway to advanced techniques",
    "Requires mobility and flexibility"
  ],
  entry_steps: [
    "From RDLR or open guard",
    "Initiate inversion safely",
    "Control opponent's legs/hips",
    "Prepare for berimbolo or recovery"
  ],
  maintenance_steps: [
    "Keep neck safe",
    "Maintain opponent leg control",
    "Stay mobile and ready to rotate",
    "Don't stay inverted too long"
  ],
  escape_overview: "Rotate to berimbolo or recover to guard",
  common_mistakes: [
    "Too much weight on neck",
    "Exposing back",
    "Static inversion",
    "Poor timing on entry"
  ],
  goals: [
    "Develop inversion skills safely",
    "Enter berimbolo from inversion",
    "Confuse opponent's passing",
    "Build modern guard game"
  ]
};

// MATRIX POSITION
db.positions.matrix_position.belt_levels.purple = {
  concepts: [
    "Extreme backward lean avoiding passes",
    "Counter to leg drag and pressure passing",
    "Requires back flexibility",
    "Creates recovery opportunities",
    "Defensive position with offensive options"
  ],
  techniques: [],
  common_mistakes: [
    "Poor back flexibility causing injury",
    "No recovery plan from matrix",
    "Staying too long in position",
    "Not using to re-guard"
  ],
  key_details: [
    "Lean back nearly touching mat with back",
    "Legs active creating frames",
    "Hand posts for support",
    "Ready to snap back up"
  ],
  transitions_available: ["open_guard_bottom", "de_la_riva", "reverse_de_la_riva"],
  prerequisites: ["open_guard_bottom", "flexibility"]
};

db.positions.matrix_position.system = {
  ...db.positions.matrix_position.system,
  opponent_relative: ["on_bottom", "extreme_angle"],
  stability_score: 2,
  movement_directions_allowed: ["recovering", "rotating"],
  leads_to_position_ids: ["open_guard_bottom", "de_la_riva", "reverse_de_la_riva"],
  entry_from_position_ids: ["open_guard_bottom", "de_la_riva"],
  risk_level: "high"
};

db.positions.matrix_position.learning = {
  ...db.positions.matrix_position.learning,
  alternate_names: ["Matrix", "Extreme Backward Lean"],
  description: "Advanced defensive position with extreme backward lean (like the Matrix movie). Temporarily avoids pressure passes and leg drags. Requires excellent back flexibility. Not a destination - transitional position only.",
  key_concepts: [
    "Extreme lean avoids passes",
    "Temporary defensive measure",
    "Requires flexibility",
    "Snap back to recover guard"
  ],
  entry_steps: [
    "When opponent pressure passing",
    "Lean back dramatically",
    "Post hand for support",
    "Keep legs active"
  ],
  maintenance_steps: [
    "Don't stay long (back injury risk)",
    "Keep legs active and framing",
    "Prepare to snap back up",
    "Look for recovery to guard"
  ],
  escape_overview: "Snap back up to recover guard position",
  common_mistakes: [
    "Staying too long in matrix",
    "No recovery plan",
    "Poor flexibility attempting",
    "Not keeping legs active"
  ],
  goals: [
    "Counter pressure passing",
    "Buy time to recover guard",
    "Develop defensive flexibility",
    "Escape dangerous passing positions"
  ]
};

// COLLAR DLR HYBRID
db.positions.collar_dlr_hybrid.belt_levels.purple = {
  concepts: [
    "Combines collar grip with DLR hook",
    "Creates powerful control",
    "Prevents opponent breaking grips",
    "Hybrid position benefits",
    "Modern guard development"
  ],
  techniques: [],
  common_mistakes: [
    "Not maintaining both elements (collar + hook)",
    "Weak collar grip easily broken",
    "Poor DLR hook placement",
    "Not using hybrid advantages"
  ],
  key_details: [
    "Strong collar grip",
    "Active DLR hook",
    "Other leg controls distance",
    "Combined control prevents passing"
  ],
  transitions_available: ["de_la_riva", "collar_sleeve_guard", "spider_guard"],
  prerequisites: ["de_la_riva", "collar_sleeve_guard"]
};

db.positions.collar_dlr_hybrid.system = {
  ...db.positions.collar_dlr_hybrid.system,
  opponent_relative: ["on_bottom", "legs_open"],
  stability_score: 4,
  movement_directions_allowed: ["hip_movement", "pulling"],
  leads_to_position_ids: ["de_la_riva", "collar_sleeve_guard", "spider_guard"],
  entry_from_position_ids: ["de_la_riva", "collar_sleeve_guard"],
  risk_level: "low"
};

db.positions.collar_dlr_hybrid.learning = {
  ...db.positions.collar_dlr_hybrid.learning,
  alternate_names: ["Collar DLR", "Hybrid DLR"],
  description: "Modern guard hybrid combining collar sleeve grips with De La Riva hook. Creates double-layer control that's difficult to break. Represents evolution of traditional guards mixing elements.",
  key_concepts: [
    "Hybrid combines strengths of both",
    "Collar grip + DLR hook",
    "Difficult to break both controls",
    "Modern guard evolution"
  ],
  entry_steps: [
    "From DLR or collar sleeve",
    "Establish collar grip",
    "Maintain DLR hook",
    "Other leg controls distance"
  ],
  maintenance_steps: [
    "Keep both collar and hook",
    "Don't let opponent break either",
    "Create angles for attacks",
    "Transition based on opponent's reaction"
  ],
  escape_overview: "Sweep or transition to other guards",
  common_mistakes: [
    "Losing one element of hybrid",
    "Static without attacking",
    "Not understanding hybrid benefits",
    "Poor grip management"
  ],
  goals: [
    "Master hybrid guard concepts",
    "Develop modern guard game",
    "Combine guard elements effectively",
    "Create difficult-to-pass positions"
  ]
};

fs.writeFileSync('data/bjj-database.json', JSON.stringify(db, null, 2));
console.log('Updated: inverted_guard, matrix_position, collar_dlr_hybrid');
