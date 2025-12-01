const fs = require('fs');
const db = JSON.parse(fs.readFileSync('data/bjj-database.json', 'utf8'));

// Blue Belt Top Control Positions - Part 2

// HALF GUARD TOP VARIATIONS
db.positions.half_guard_top_variations.belt_levels.blue = {
  concepts: [
    "Multiple half guard passing strategies",
    "Underhook pass",
    "Crossface pass",
    "Knee slice from half guard",
    "Each counters different bottom positions"
  ],
  techniques: [],
  common_mistakes: [
    "Using same pass against all half guard types",
    "Not recognizing which variant opponent is using",
    "Poor pressure during pass",
    "Giving up underhook too easily"
  ],
  key_details: [
    "Identify opponent's half guard type",
    "Crossface critical against knee shield",
    "Underhook dominant for standard half",
    "Knee slice cuts through lazy half guard"
  ],
  transitions_available: ["side_control", "mount", "knee_on_belly"],
  prerequisites: ["half_guard_top"]
};

db.positions.half_guard_top_variations.system = {
  ...db.positions.half_guard_top_variations.system,
  opponent_relative: ["on_top", "leg_trapped"],
  stability_score: 3,
  movement_directions_allowed: ["forward_pressure", "lateral_shift"],
  leads_to_position_ids: ["side_control", "mount", "knee_on_belly"],
  entry_from_position_ids: ["half_guard_top", "open_guard_top"],
  risk_level: "medium"
};

db.positions.half_guard_top_variations.learning = {
  ...db.positions.half_guard_top_variations.learning,
  alternate_names: ["Half Guard Passing Variations", "Advanced Half Passing"],
  description: "Multiple strategies for passing different half guard variations. Includes underhook passing, crossface passing, and knee slice. Each counters specific half guard types.",
  key_concepts: [
    "Different half guards need different passes",
    "Underhook pass for standard half",
    "Crossface crucial against knee shield",
    "Knee slice for lazy/flat half guard"
  ],
  entry_steps: [
    "Recognize opponent's half guard type",
    "Choose appropriate passing strategy",
    "Establish key controls (crossface/underhook)",
    "Execute systematic pass"
  ],
  maintenance_steps: [
    "Maintain pressure throughout pass",
    "Don't let opponent recover full guard",
    "Control near arm consistently",
    "Complete pass to secure position"
  ],
  escape_overview: "Complete pass to side control or mount",
  common_mistakes: [
    "One-size-fits-all passing",
    "No crossface against knee shield",
    "Losing underhook battle",
    "Not recognizing lockdown vs knee shield"
  ],
  goals: [
    "Pass various half guard types",
    "Master multiple passing systems",
    "Counter knee shield effectively",
    "Develop systematic passing approach"
  ]
};

// BACKPACK POSITION
db.positions.backpack_position.belt_levels.blue = {
  concepts: [
    "Back control while opponent is on their knees/standing",
    "Hooks in from behind",
    "Opponent trying to stand or escape",
    "Transition to mat or finish standing",
    "Dynamic back control"
  ],
  techniques: [],
  common_mistakes: [
    "Losing hooks when opponent stands",
    "Not controlling opponent's hands",
    "Weight distribution wrong",
    "Not finishing choke before they stand"
  ],
  key_details: [
    "Hooks maintained even as opponent rises",
    "Seatbelt grip essential",
    "Can attack chokes standing",
    "Drag opponent back to mat or finish standing"
  ],
  transitions_available: ["back_control", "rear_naked_choke", "standing_back_take"],
  prerequisites: ["back_control", "turtle_top"]
};

db.positions.backpack_position.system = {
  ...db.positions.backpack_position.system,
  opponent_relative: ["behind", "hooks_in"],
  stability_score: 4,
  movement_directions_allowed: ["forward_pressure"],
  leads_to_position_ids: ["back_control", "submission", "standing_neutral"],
  entry_from_position_ids: ["back_control", "turtle_top"],
  risk_level: "low"
};

db.positions.backpack_position.learning = {
  ...db.positions.backpack_position.learning,
  alternate_names: ["Backpack", "Standing Back Control", "Koala Guard"],
  description: "Back control position where opponent is on their knees or standing while you maintain hooks and seatbelt grip. Dynamic transition position requiring excellent hook control.",
  key_concepts: [
    "Maintain hooks as opponent changes levels",
    "Seatbelt grip never releases",
    "Can finish standing or drag down",
    "Very secure back control variant"
  ],
  entry_steps: [
    "From back control, opponent tries to stand",
    "Maintain hooks as they rise",
    "Keep seatbelt grip tight",
    "Rise with opponent maintaining position"
  ],
  maintenance_steps: [
    "Hooks tight as opponent moves",
    "Seatbelt grip maintained",
    "Weight on opponent's back",
    "Ready to attack or drag down"
  ],
  escape_overview: "Finish rear naked choke or drag to mat",
  common_mistakes: [
    "Losing hooks when opponent stands",
    "Weight back instead of forward",
    "No seatbelt grip",
    "Not attacking choke quickly enough"
  ],
  goals: [
    "Maintain back control during transitions",
    "Finish rear naked choke standing",
    "Drag opponent back to mat",
    "Develop dynamic back control"
  ]
};

// BODY TRIANGLE
db.positions.body_triangle.belt_levels.blue = {
  concepts: [
    "Triangle legs around opponent's body from back",
    "Extremely secure back control",
    "Frees hands for attacks",
    "Difficult for opponent to escape",
    "Squeeze creates pressure"
  ],
  techniques: [],
  common_mistakes: [
    "Triangling on wrong side (near hip bone)",
    "Not maintaining seatbelt grip",
    "Legs crossed lazily without squeeze",
    "Forgetting to attack with hands free"
  ],
  key_details: [
    "Triangle around opponent's torso",
    "Ankle locked in opposite knee pit",
    "Squeeze with legs for pressure",
    "Hands free to attack chokes"
  ],
  transitions_available: ["back_control", "rear_naked_choke", "armbar_from_back"],
  prerequisites: ["back_control"]
};

db.positions.body_triangle.system = {
  ...db.positions.body_triangle.system,
  opponent_relative: ["behind", "leg_triangle"],
  stability_score: 5,
  movement_directions_allowed: ["forward_pressure", "squeezing"],
  leads_to_position_ids: ["back_control", "submission"],
  entry_from_position_ids: ["back_control"],
  risk_level: "low"
};

db.positions.body_triangle.learning = {
  ...db.positions.body_triangle.learning,
  alternate_names: ["Body Triangle", "Back Triangle", "Figure Four Body Lock"],
  description: "Back control variation where legs are triangled around opponent's torso. Extremely secure control that frees hands for attacks. Very difficult to escape.",
  key_concepts: [
    "Triangle locks around torso not just legs",
    "Frees hands for chokes",
    "Squeeze creates additional pressure",
    "Almost impossible to escape when locked"
  ],
  entry_steps: [
    "From back control with hooks",
    "Thread one leg across opponent's body",
    "Lock ankle in opposite knee pit",
    "Squeeze triangle tight"
  ],
  maintenance_steps: [
    "Maintain triangle lock",
    "Keep seatbelt grip",
    "Squeeze with legs",
    "Attack with free hands"
  ],
  escape_overview: "Attack rear naked choke or other back attacks",
  common_mistakes: [
    "Triangle on hip bone (painful for you)",
    "No squeeze just crossed legs",
    "Forgetting to attack",
    "Losing seatbelt while triangling"
  ],
  goals: [
    "Secure unescapable back control",
    "Attack rear naked choke",
    "Use freed hands for collar chokes",
    "Maintain position indefinitely"
  ]
};

// TURTLE TOP VARIATIONS
db.positions.turtle_top_variations.belt_levels.blue = {
  concepts: [
    "Multiple turtle attack strategies",
    "Clock choke setup",
    "Crucifix position",
    "Rolling back takes",
    "Different from basic turtle control"
  ],
  techniques: [],
  common_mistakes: [
    "Reaching too far for head (guillotine risk)",
    "Not controlling near arm properly",
    "Letting opponent sit back to guard",
    "Missing back take opportunities"
  ],
  key_details: [
    "Control near arm for crucifix",
    "Setup clock choke with lapel grip",
    "Roll opponent for back takes",
    "Prevent opponent returning to guard"
  ],
  transitions_available: ["back_control", "crucifix", "clock_choke", "side_control"],
  prerequisites: ["turtle_top"]
};

db.positions.turtle_top_variations.system = {
  ...db.positions.turtle_top_variations.system,
  opponent_relative: ["on_top", "perpendicular"],
  stability_score: 3,
  movement_directions_allowed: ["forward_pressure", "lateral_shift", "rotating"],
  leads_to_position_ids: ["back_control", "crucifix", "side_control"],
  entry_from_position_ids: ["turtle_top", "side_control"],
  risk_level: "medium"
};

db.positions.turtle_top_variations.learning = {
  ...db.positions.turtle_top_variations.learning,
  alternate_names: ["Advanced Turtle Attacks", "Turtle Finishing Positions"],
  description: "Advanced attacking positions from turtle including clock choke, crucifix, and rolling back takes. More sophisticated than basic turtle control.",
  key_concepts: [
    "Clock choke requires lapel control",
    "Crucifix traps both arms",
    "Rolling back takes use momentum",
    "Each attack counters different escapes"
  ],
  entry_steps: [
    "From basic turtle top position",
    "Identify opponent's turtle type",
    "Setup appropriate attack",
    "Control key grips for chosen attack"
  ],
  maintenance_steps: [
    "Maintain top pressure",
    "Control near arm consistently",
    "React to opponent's movement",
    "Execute chosen attack systematically"
  ],
  escape_overview: "Finish submission or take back control",
  common_mistakes: [
    "Going for head (guillotine vulnerable)",
    "No near arm control",
    "Missing timing on rolls",
    "Not setting up attacks properly"
  ],
  goals: [
    "Master clock choke from turtle",
    "Execute crucifix position",
    "Rolling back takes",
    "Prevent opponent escaping to guard"
  ]
};

fs.writeFileSync('data/bjj-database.json', JSON.stringify(db, null, 2));
console.log('Updated: half_guard_top_variations, backpack_position, body_triangle, turtle_top_variations');
