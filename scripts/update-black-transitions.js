const fs = require('fs');
const db = JSON.parse(fs.readFileSync('data/bjj-database.json', 'utf8'));

// Black Belt Transitions

// SAMURAI ROLL POSITIONS
db.positions.samurai_roll_positions.belt_levels.black = {
  concepts: [
    "Rolling transition from turtle/front headlock",
    "Creates back exposure during roll",
    "Wrestling-based transition",
    "Multiple entries and finishes",
    "Dynamic movement system"
  ],
  techniques: [],
  common_mistakes: [
    "Poor rolling mechanics",
    "Not timing the roll correctly",
    "Weak control during transition",
    "Not securing back control",
    "Stopping mid-transition"
  ],
  key_details: [
    "Rolling transition technique",
    "Creates back exposure",
    "Wrestling-based movement",
    "Timing is crucial",
    "Must complete roll"
  ],
  transitions_available: ["back_control", "front_headlock_web", "turtle_top"],
  prerequisites: ["front_headlock_web", "rolling_mechanics", "back_control"]
};

db.positions.samurai_roll_positions.system = {
  ...db.positions.samurai_roll_positions.system,
  opponent_relative: ["transitioning", "rolling"],
  stability_score: 3,
  movement_directions_allowed: ["rolling", "rotating"],
  leads_to_position_ids: ["back_control", "front_headlock_web", "turtle_top"],
  entry_from_position_ids: ["front_headlock_web", "turtle_top"],
  risk_level: "medium"
};

db.positions.samurai_roll_positions.learning = {
  ...db.positions.samurai_roll_positions.learning,
  alternate_names: ["Samurai Roll", "Rolling Back Take"],
  description: "Dynamic rolling transition from turtle or front headlock creating back exposure. Wrestling-based technique requiring precise timing and control. Master-level transition with multiple entry and finish options.",
  key_concepts: [
    "Rolling creates back exposure",
    "Wrestling-based transition",
    "Timing is essential",
    "Must maintain control during roll",
    "Dynamic movement required"
  ],
  entry_steps: [
    "From front headlock or turtle top",
    "Establish control points",
    "Initiate rolling motion",
    "Maintain control throughout",
    "Complete to back control"
  ],
  maintenance_steps: [
    "Keep control during roll",
    "Maintain momentum",
    "Don't stop mid-transition",
    "Perfect timing",
    "Secure position at completion"
  ],
  escape_overview: "Complete roll to secure back control",
  common_mistakes: [
    "Poor timing",
    "Losing control during roll",
    "Stopping mid-transition",
    "Not securing back",
    "Weak rolling mechanics"
  ],
  goals: [
    "Master dynamic transitions",
    "Take back with rolls",
    "Develop timing",
    "Use wrestling techniques",
    "Complete transitions smoothly"
  ]
};

// ROLLING BACK TAKES
db.positions.rolling_back_takes.belt_levels.black = {
  concepts: [
    "Family of rolling transitions to back",
    "Includes berimbolo, samurai roll, etc",
    "Modern sport BJJ emphasis",
    "Requires inversion and rotation",
    "Dynamic back attack system"
  ],
  techniques: [],
  common_mistakes: [
    "Poor rolling mechanics",
    "Not inverting properly",
    "Weak grip control during rolls",
    "Not securing hooks",
    "Stopping momentum"
  ],
  key_details: [
    "Multiple rolling back takes",
    "Inversion required",
    "Grip control essential",
    "Momentum-based",
    "Modern competition techniques"
  ],
  transitions_available: ["back_control", "de_la_riva", "berimbolo_control", "scramble_positions"],
  prerequisites: ["berimbolo_control", "inversion", "de_la_riva", "back_control"]
};

db.positions.rolling_back_takes.system = {
  ...db.positions.rolling_back_takes.system,
  opponent_relative: ["transitioning", "rolling"],
  stability_score: 3,
  movement_directions_allowed: ["rolling", "inverting", "rotating"],
  leads_to_position_ids: ["back_control", "de_la_riva", "berimbolo_control", "scramble_positions"],
  entry_from_position_ids: ["de_la_riva", "berimbolo_control"],
  risk_level: "medium"
};

db.positions.rolling_back_takes.learning = {
  ...db.positions.rolling_back_takes.learning,
  alternate_names: ["Rolling Back Takes", "Rolling Transitions", "Back Take Rolls"],
  description: "Family of dynamic rolling transitions to back control. Includes berimbolo, samurai roll, and other rolling techniques. Modern sport BJJ emphasis requiring inversion and momentum. Master-level back attack system.",
  key_concepts: [
    "Multiple rolling techniques",
    "Dynamic back attacks",
    "Inversion and rotation required",
    "Momentum-based transitions",
    "Modern competition emphasis"
  ],
  entry_steps: [
    "From guard or top positions",
    "Create rolling angle",
    "Initiate inversion/rotation",
    "Maintain grip control",
    "Complete to back control"
  ],
  maintenance_steps: [
    "Keep momentum throughout",
    "Maintain grip control",
    "Don't stop during transition",
    "Perfect rolling mechanics",
    "Secure hooks at completion"
  ],
  escape_overview: "Complete roll to secure back control with hooks",
  common_mistakes: [
    "Poor rolling mechanics",
    "Losing grips during transition",
    "Not maintaining momentum",
    "Weak inversion",
    "Not securing position"
  ],
  goals: [
    "Master dynamic back takes",
    "Develop rolling techniques",
    "Use modern transitions",
    "Compete at high level",
    "Take back efficiently"
  ]
};

// SCRAMBLE POSITIONS
db.positions.scramble_positions.belt_levels.black = {
  concepts: [
    "Chaotic transitional moments",
    "Both competitors fighting for position",
    "Requires reading and reaction",
    "Wrestling-heavy situations",
    "Mastery separates skill levels"
  ],
  techniques: [],
  common_mistakes: [
    "Panicking during scrambles",
    "Not reading opponent's movement",
    "Poor positioning awareness",
    "Wasting energy unnecessarily",
    "Not capitalizing on opportunities"
  ],
  key_details: [
    "Chaotic transitions",
    "Requires excellent awareness",
    "Wrestling skills important",
    "Reading opponent crucial",
    "Opportunities in chaos"
  ],
  transitions_available: ["back_control", "front_headlock_web", "turtle_top", "guard_positions", "side_control"],
  prerequisites: ["wrestling_fundamentals", "position_awareness", "scrambling_practice"]
};

db.positions.scramble_positions.system = {
  ...db.positions.scramble_positions.system,
  opponent_relative: ["transitioning", "scrambling"],
  stability_score: 2,
  movement_directions_allowed: ["all_directions", "dynamic"],
  leads_to_position_ids: ["back_control", "front_headlock_web", "turtle_top", "guard_recovery", "side_control"],
  entry_from_position_ids: ["any_position"],
  risk_level: "medium"
};

db.positions.scramble_positions.learning = {
  ...db.positions.scramble_positions.learning,
  alternate_names: ["Scrambles", "Scrambling", "Chaotic Transitions"],
  description: "Chaotic transitional moments where both competitors fight for position. Requires excellent awareness, wrestling skills, and ability to read opponent's movement. Master-level scrambling separates elite from good.",
  key_concepts: [
    "Chaos creates opportunities",
    "Reading opponent is key",
    "Wrestling skills essential",
    "Positioning awareness crucial",
    "Mastery through experience"
  ],
  entry_steps: [
    "Recognize scramble beginning",
    "Stay calm and aware",
    "Read opponent's movement",
    "React to opportunities",
    "Secure advantageous position"
  ],
  maintenance_steps: [
    "Maintain awareness",
    "Don't panic",
    "Keep moving intelligently",
    "Create and recognize opportunities",
    "Control chaos"
  ],
  escape_overview: "Secure dominant position from scramble",
  common_mistakes: [
    "Panicking",
    "Not reading opponent",
    "Wasting energy",
    "Missing opportunities",
    "Poor wrestling skills"
  ],
  goals: [
    "Master scrambling",
    "Develop wrestling skills",
    "Read opponent movement",
    "Stay calm in chaos",
    "Win scrambles consistently"
  ]
};

// DYNAMIC LEG ENTANGLEMENT TRANSITIONS
db.positions.dynamic_leg_entanglement_transitions.belt_levels.black = {
  concepts: [
    "Flowing between leg entanglements",
    "Systematic leg lock transitions",
    "Following opponent's movements",
    "Danaher system transitions",
    "Master-level leg lock game"
  ],
  techniques: [],
  common_mistakes: [
    "Not following opponent's movements",
    "Staying in static position",
    "Poor understanding of system",
    "Weak transitional control",
    "Not using systematic approach"
  ],
  key_details: [
    "Flow between leg positions",
    "Systematic transitions",
    "Follow opponent's escapes",
    "Maintain leg control",
    "Danaher system approach"
  ],
  transitions_available: ["saddle", "outside_ashi_garami", "inside_ashi_garami", "honey_hole", "50_50_guard"],
  prerequisites: ["saddle", "outside_ashi_garami", "inside_ashi_garami", "leg_lock_system_understanding"]
};

db.positions.dynamic_leg_entanglement_transitions.system = {
  ...db.positions.dynamic_leg_entanglement_transitions.system,
  opponent_relative: ["transitioning", "legs_entangled"],
  stability_score: 4,
  movement_directions_allowed: ["flowing", "adjusting", "following"],
  leads_to_position_ids: ["saddle", "outside_ashi_garami", "inside_ashi_garami", "honey_hole", "50_50_guard"],
  entry_from_position_ids: ["any_leg_entanglement"],
  risk_level: "medium"
};

db.positions.dynamic_leg_entanglement_transitions.learning = {
  ...db.positions.dynamic_leg_entanglement_transitions.learning,
  alternate_names: ["Dynamic Leg Transitions", "Leg Lock Transitions", "Flowing Leg Game"],
  description: "Master-level ability to flow dynamically between leg entanglements. Systematic approach following opponent's escape attempts. Centerpiece of modern leg lock systems. Requires extensive training in leg lock systems.",
  key_concepts: [
    "Flow between positions",
    "Systematic approach essential",
    "Follow opponent's movements",
    "Maintain control throughout",
    "Danaher system mastery"
  ],
  entry_steps: [
    "From any leg entanglement",
    "Read opponent's escape",
    "Follow their movement",
    "Transition systematically",
    "Maintain or improve position"
  ],
  maintenance_steps: [
    "Stay dynamic not static",
    "Follow escapes",
    "Use systematic approach",
    "Maintain leg control",
    "Create finishing opportunities"
  ],
  escape_overview: "Flow to finishing positions or maintain control",
  common_mistakes: [
    "Being static in position",
    "Not following movements",
    "Poor system understanding",
    "Weak transitional control",
    "Attempting without training"
  ],
  goals: [
    "Master leg lock systems",
    "Flow between positions",
    "Follow opponent's movements",
    "Finish from any entanglement",
    "Train under expert instruction"
  ]
};

fs.writeFileSync('data/bjj-database.json', JSON.stringify(db, null, 2));
console.log('Updated: samurai_roll_positions, rolling_back_takes, scramble_positions, dynamic_leg_entanglement_transitions');
console.log('\n✅ Black Belt Transitions Complete! (4/4)');
