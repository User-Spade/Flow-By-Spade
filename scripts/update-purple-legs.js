const fs = require('fs');
const db = JSON.parse(fs.readFileSync('data/bjj-database.json', 'utf8'));

// Purple Belt Leg Entanglements - Part 1

// SINGLE LEG X
db.positions.single_leg_x.belt_levels.purple = {
  concepts: [
    "Control one leg with your legs forming X",
    "Stand up from bottom position",
    "Off-balance opponent on one leg",
    "Gateway to leg attacks",
    "Transition from X-guard or DLR"
  ],
  techniques: [],
  common_mistakes: [
    "Weak X formation - legs not engaged",
    "Not standing up when opportunity presents",
    "Poor hand control on trapped leg",
    "Sitting instead of elevating"
  ],
  key_details: [
    "One leg hooks inside opponent's leg",
    "Other leg hooks outside same leg",
    "Hands control opponent's trapped leg",
    "Can stand up to finish sweep or attack"
  ],
  transitions_available: ["x_guard", "outside_ashi_garami", "standing_position", "sweep_to_top"],
  prerequisites: ["x_guard"]
};

db.positions.single_leg_x.system = {
  ...db.positions.single_leg_x.system,
  opponent_relative: ["on_bottom", "leg_isolated"],
  stability_score: 4,
  movement_directions_allowed: ["elevating", "standing", "rotating"],
  leads_to_position_ids: ["x_guard", "outside_ashi_garami", "standing_neutral", "side_control"],
  entry_from_position_ids: ["x_guard", "de_la_riva", "reverse_de_la_riva"],
  risk_level: "low"
};

db.positions.single_leg_x.learning = {
  ...db.positions.single_leg_x.learning,
  alternate_names: ["SLX", "Single Leg X-Guard", "One Leg X"],
  description: "Position where both your legs control one of opponent's legs in an X formation. Allows you to stand up and sweep or enter leg entanglements. More dynamic than full X-guard.",
  key_concepts: [
    "Legs form X on single leg",
    "Stand up to complete sweep",
    "Gateway to ashi garami positions",
    "Control one leg completely"
  ],
  entry_steps: [
    "From X-guard or DLR",
    "Isolate one of opponent's legs",
    "Hook inside and outside of same leg",
    "Elevate and prepare to stand"
  ],
  maintenance_steps: [
    "Keep X formation tight on leg",
    "Hands control trapped leg",
    "Stay mobile - ready to stand",
    "Elevate opponent off-balance"
  ],
  escape_overview: "Stand up for sweep or enter leg attacks",
  common_mistakes: [
    "Static X without standing",
    "Weak hooks easily cleared",
    "No hand control on leg",
    "Not following opponent's movement"
  ],
  goals: [
    "Stand up and complete sweep",
    "Enter outside ashi garami",
    "Control and off-balance opponent",
    "Develop leg entanglement entries"
  ]
};

// OUTSIDE ASHI GARAMI
db.positions.outside_ashi_garami.belt_levels.purple = {
  concepts: [
    "Control opponent's leg from outside",
    "Fundamental leg entanglement position",
    "Straight ankle lock primary attack",
    "Hip position creates control",
    "Perpendicular to opponent"
  ],
  techniques: [],
  common_mistakes: [
    "Poor hip position - not perpendicular",
    "Weak leg control allowing escape",
    "Not controlling upper body",
    "Crossing feet (dangerous)"
  ],
  key_details: [
    "Your legs control opponent's one leg",
    "Hip perpendicular to opponent",
    "Outside position on trapped leg",
    "Hands control leg and upper body"
  ],
  transitions_available: ["inside_ashi_garami", "50_50_guard", "straight_ankle_lock"],
  prerequisites: ["single_leg_x"]
};

db.positions.outside_ashi_garami.system = {
  ...db.positions.outside_ashi_garami.system,
  opponent_relative: ["perpendicular", "leg_isolated"],
  stability_score: 4,
  movement_directions_allowed: ["rotating", "hip_movement"],
  leads_to_position_ids: ["inside_ashi_garami", "50_50_guard", "submission"],
  entry_from_position_ids: ["single_leg_x", "x_guard"],
  risk_level: "medium"
};

db.positions.outside_ashi_garami.learning = {
  ...db.positions.outside_ashi_garami.learning,
  alternate_names: ["Outside Ashi", "Standard Ashi", "Ashi Garami"],
  description: "Fundamental leg entanglement where you control opponent's leg from the outside position. Perpendicular body alignment. Primary position for straight ankle locks in IBJJF legal competition.",
  key_concepts: [
    "Perpendicular hip position is key",
    "Outside control of trapped leg",
    "Straight ankle lock primary attack",
    "Control prevents opponent's escape"
  ],
  entry_steps: [
    "From single leg X or X-guard",
    "Rotate body perpendicular to opponent",
    "Secure outside position on leg",
    "Control with legs and hands"
  ],
  maintenance_steps: [
    "Maintain perpendicular hip position",
    "Legs tight on trapped leg",
    "Control opponent's upper body",
    "Ready to attack ankle or transition"
  ],
  escape_overview: "Attack straight ankle lock or transition to other leg positions",
  common_mistakes: [
    "Hip alignment wrong",
    "Weak leg control",
    "Crossing feet under opponent",
    "Not controlling free leg"
  ],
  goals: [
    "Execute straight ankle lock",
    "Transition to inside ashi",
    "Control leg completely",
    "Develop modern leg attack system"
  ]
};

// INSIDE ASHI GARAMI
db.positions.inside_ashi_garami.belt_levels.purple = {
  concepts: [
    "Control opponent's leg from inside",
    "More dominant than outside ashi",
    "Heel hook position (where legal)",
    "Better control of opponent's hip",
    "Prevents opponent standing"
  ],
  techniques: [],
  common_mistakes: [
    "Losing inside position",
    "Not controlling opponent's upper body",
    "Weak leg entanglement",
    "Allowing opponent to rotate free"
  ],
  key_details: [
    "Inside position on trapped leg",
    "Your inside leg crosses opponent's hip",
    "Outside leg controls trapped leg",
    "Hands control upper body and leg"
  ],
  transitions_available: ["outside_ashi_garami", "50_50_guard", "heel_hook"],
  prerequisites: ["outside_ashi_garami"]
};

db.positions.inside_ashi_garami.system = {
  ...db.positions.inside_ashi_garami.system,
  opponent_relative: ["perpendicular", "leg_isolated"],
  stability_score: 5,
  movement_directions_allowed: ["rotating", "hip_movement"],
  leads_to_position_ids: ["outside_ashi_garami", "50_50_guard", "submission"],
  entry_from_position_ids: ["outside_ashi_garami", "single_leg_x"],
  risk_level: "low"
};

db.positions.inside_ashi_garami.learning = {
  ...db.positions.inside_ashi_garami.learning,
  alternate_names: ["Inside Ashi", "Inside Position", "Cross Ashi"],
  description: "Superior leg entanglement position where you control opponent's leg from inside. More dominant than outside ashi. Primary position for heel hooks where legal (no-gi/advanced competition).",
  key_concepts: [
    "Inside position is dominant",
    "Leg crosses opponent's hip for control",
    "Heel hook primary attack (where legal)",
    "Prevents opponent escaping or standing"
  ],
  entry_steps: [
    "From outside ashi or SLX",
    "Transition to inside position",
    "Cross inside leg over opponent's hip",
    "Secure trapped leg with outside leg"
  ],
  maintenance_steps: [
    "Maintain inside position",
    "Keep legs tight on trapped leg",
    "Control opponent's upper body",
    "Isolate leg completely"
  ],
  escape_overview: "Attack heel hook (where legal) or transition positions",
  common_mistakes: [
    "Losing inside control",
    "Weak hip cross",
    "Not securing trapped leg",
    "Allowing opponent to turn into you"
  ],
  goals: [
    "Master dominant leg position",
    "Attack heel hook (where legal)",
    "Prevent opponent's escapes",
    "Develop modern leg lock system"
  ]
};

// 50/50 GUARD
db.positions['50_50_guard'].belt_levels.purple = {
  concepts: [
    "Symmetrical leg entanglement position",
    "Both players have similar control",
    "Tactical position - advantages for both",
    "Requires specific escapes and attacks",
    "Controversial position (stalling debates)"
  ],
  techniques: [],
  common_mistakes: [
    "Being passive in 50/50",
    "Not fighting for inside position",
    "Poor leg entanglement details",
    "Not understanding submission opportunities"
  ],
  key_details: [
    "Both players have one leg entangled",
    "Symmetrical position",
    "Inside control is advantage",
    "Can attack or be attacked"
  ],
  transitions_available: ["inside_ashi_garami", "outside_ashi_garami", "back_escape"],
  prerequisites: ["outside_ashi_garami", "inside_ashi_garami"]
};

db.positions['50_50_guard'].system = {
  ...db.positions['50_50_guard'].system,
  opponent_relative: ["symmetrical", "leg_entangled"],
  stability_score: 3,
  movement_directions_allowed: ["rotating", "hip_movement"],
  leads_to_position_ids: ["inside_ashi_garami", "outside_ashi_garami", "standing_neutral"],
  entry_from_position_ids: ["inside_ashi_garami", "outside_ashi_garami"],
  risk_level: "medium"
};

db.positions['50_50_guard'].learning = {
  ...db.positions['50_50_guard'].learning,
  alternate_names: ["50/50", "Fifty Fifty", "5050 Guard"],
  description: "Symmetrical leg entanglement position where both players have similar control. Requires specific technical knowledge to attack or escape. Popular in sport BJJ but controversial due to stalling potential.",
  key_concepts: [
    "Symmetrical entanglement",
    "Inside control is key advantage",
    "Both can attack or defend",
    "Technical position requiring study"
  ],
  entry_steps: [
    "From ashi garami positions",
    "Opponent enters their leg into yours",
    "Both legs become entangled",
    "Fight for inside position"
  ],
  maintenance_steps: [
    "Fight for inside control",
    "Maintain leg entanglement",
    "Control opponent's upper body",
    "Look for submission or escape"
  ],
  escape_overview: "Establish inside control or escape to standing",
  common_mistakes: [
    "Passive 50/50 (stalling)",
    "Not fighting for inside",
    "Poor leg positioning details",
    "Not understanding attacks available"
  ],
  goals: [
    "Understand 50/50 mechanics",
    "Attack from 50/50 position",
    "Escape 50/50 when disadvantaged",
    "Develop modern leg entanglement game"
  ]
};

fs.writeFileSync('data/bjj-database.json', JSON.stringify(db, null, 2));
console.log('Updated: single_leg_x, outside_ashi_garami, inside_ashi_garami, 50_50_guard');
