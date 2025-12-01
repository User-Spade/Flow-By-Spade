const fs = require('fs');
const db = JSON.parse(fs.readFileSync('data/bjj-database.json', 'utf8'));

// Blue Belt Guard Positions - Part 1

// BUTTERFLY GUARD
db.positions.butterfly_guard.belt_levels.blue = {
  concepts: [
    "Elevate opponent with underhooks and butterfly hooks",
    "Control opponent's posture and base",
    "Use hooks to sweep or create angles",
    "Transition to other guards or sweeps",
    "Stay on your sit bones - mobility is key"
  ],
  techniques: [],
  common_mistakes: [
    "Being too flat - need to sit up",
    "Weak underhooks allowing opponent to pass",
    "Not using hooks actively",
    "Letting opponent get grips without fighting"
  ],
  key_details: [
    "Feet inside opponent's thighs (butterfly hooks)",
    "Fight for underhooks constantly",
    "Stay off your back - sit up position",
    "Use hooks to lift and off-balance opponent"
  ],
  transitions_available: ["x_guard", "single_leg_x", "closed_guard_bottom", "back_control"],
  prerequisites: ["open_guard_bottom", "closed_guard_bottom"]
};

db.positions.butterfly_guard.system = {
  ...db.positions.butterfly_guard.system,
  opponent_relative: ["on_bottom", "sitting_up"],
  stability_score: 3,
  movement_directions_allowed: ["hip_movement", "pulling", "elevating"],
  leads_to_position_ids: ["x_guard", "single_leg_x", "closed_guard_bottom", "back_control"],
  entry_from_position_ids: ["closed_guard_bottom", "open_guard_bottom", "half_guard_bottom"],
  risk_level: "medium"
};

db.positions.butterfly_guard.learning = {
  ...db.positions.butterfly_guard.learning,
  alternate_names: ["Butterfly", "Hooks Guard", "Sitting Guard"],
  description: "Dynamic sitting guard position where you use inside hooks (butterfly hooks) and underhooks to control and sweep your opponent. High mobility guard excellent for off-balancing.",
  key_concepts: [
    "Underhooks provide control and sweeping power",
    "Butterfly hooks lift and destabilize opponent",
    "Sitting posture allows quick transitions",
    "Mobile guard - constantly adjust angles"
  ],
  entry_steps: [
    "From closed or open guard, sit up",
    "Insert butterfly hooks inside opponent's thighs",
    "Fight for underhooks on both sides",
    "Stay on sit bones with good posture"
  ],
  maintenance_steps: [
    "Maintain active butterfly hooks",
    "Fight for and keep underhooks",
    "Stay mobile and off your back",
    "Constantly adjust angles and pressure"
  ],
  escape_overview: "Sweep opponent or transition to other guards/positions",
  common_mistakes: [
    "Being flat instead of sitting up",
    "Passive hooks not actively lifting",
    "Losing underhook battles",
    "Static position without movement"
  ],
  goals: [
    "Execute butterfly sweeps",
    "Transition to back control or X-guard",
    "Control opponent's posture",
    "Prevent passes while setting up attacks"
  ]
};

// DE LA RIVA GUARD
db.positions.de_la_riva.belt_levels.blue = {
  concepts: [
    "Outside hook controls opponent's leg",
    "Far grip controls opponent's sleeve/collar",
    "Create off-balancing angles",
    "Prevent opponent from settling into passing position",
    "Use to sweep or take the back"
  ],
  techniques: [],
  common_mistakes: [
    "Weak De La Riva hook - foot not active",
    "Not controlling far arm/sleeve",
    "Being flat without creating angles",
    "Letting opponent step over the hook"
  ],
  key_details: [
    "Outside leg hooks behind opponent's near leg",
    "Inside foot on opponent's hip",
    "Far sleeve grip essential",
    "Near hand can grip pants or ankle"
  ],
  transitions_available: ["x_guard", "single_leg_x", "reverse_de_la_riva", "back_control"],
  prerequisites: ["open_guard_bottom"]
};

db.positions.de_la_riva.system = {
  ...db.positions.de_la_riva.system,
  opponent_relative: ["on_bottom", "legs_open"],
  stability_score: 3,
  movement_directions_allowed: ["hip_movement", "pulling", "rotating"],
  leads_to_position_ids: ["x_guard", "single_leg_x", "reverse_de_la_riva", "back_control"],
  entry_from_position_ids: ["open_guard_bottom", "closed_guard_bottom"],
  risk_level: "medium"
};

db.positions.de_la_riva.learning = {
  ...db.positions.de_la_riva.learning,
  alternate_names: ["DLR", "De La Riva Hook"],
  description: "Outside leg hooks behind opponent's near leg while controlling far sleeve. Named after Ricardo De La Riva. Excellent for sweeps and back takes.",
  key_concepts: [
    "Hook creates off-balance control",
    "Far sleeve grip prevents posting",
    "Active hook constantly pulling",
    "Creates angles for sweeps and back takes"
  ],
  entry_steps: [
    "From open guard, opponent stands or kneels",
    "Insert outside leg behind opponent's near leg",
    "Place inside foot on opponent's hip",
    "Grip far sleeve and near pants/ankle"
  ],
  maintenance_steps: [
    "Keep De La Riva hook active and tight",
    "Maintain far sleeve control",
    "Angle body to create off-balance",
    "Use inside foot to manage distance"
  ],
  escape_overview: "Sweep opponent or transition to X-guard/back control",
  common_mistakes: [
    "Passive hook easily removed",
    "No far sleeve grip",
    "Being static without angles",
    "Allowing opponent to backstep"
  ],
  goals: [
    "Execute De La Riva sweeps",
    "Transition to X-guard variations",
    "Take opponent's back",
    "Off-balance and control standing opponent"
  ]
};

// REVERSE DE LA RIVA
db.positions.reverse_de_la_riva.belt_levels.blue = {
  concepts: [
    "Inside hook controls opponent's leg",
    "Creates powerful sweeping angles",
    "Berimbolo and crab ride entries",
    "Control far leg with grip",
    "Invert to attack"
  ],
  techniques: [],
  common_mistakes: [
    "Weak reverse De La Riva hook",
    "Not controlling far leg properly",
    "Static position without inversions",
    "Letting opponent backstep free"
  ],
  key_details: [
    "Inside leg hooks opponent's near leg (opposite of DLR)",
    "Outside foot on hip or bicep",
    "Far leg grip essential",
    "Can invert for berimbolo"
  ],
  transitions_available: ["back_control", "x_guard", "de_la_riva", "berimbolo"],
  prerequisites: ["de_la_riva", "open_guard_bottom"]
};

db.positions.reverse_de_la_riva.system = {
  ...db.positions.reverse_de_la_riva.system,
  opponent_relative: ["on_bottom", "legs_open"],
  stability_score: 3,
  movement_directions_allowed: ["hip_movement", "inverting", "rotating"],
  leads_to_position_ids: ["back_control", "x_guard", "de_la_riva", "single_leg_x"],
  entry_from_position_ids: ["de_la_riva", "open_guard_bottom"],
  risk_level: "medium"
};

db.positions.reverse_de_la_riva.learning = {
  ...db.positions.reverse_de_la_riva.learning,
  alternate_names: ["RDLR", "Reverse DLR", "Inside Hook Guard"],
  description: "Inside leg hooks opponent's near leg (opposite configuration from DLR). Gateway to berimbolo, crab ride, and advanced sweeps. Popular in modern sport BJJ.",
  key_concepts: [
    "Inside hook creates inversion opportunities",
    "Far leg control prevents escape",
    "Mobility and inversions are key",
    "Opens berimbolo entries"
  ],
  entry_steps: [
    "From open guard or DLR",
    "Switch to inside leg hooking near leg",
    "Grip opponent's far leg (pants or ankle)",
    "Outside foot controls distance"
  ],
  maintenance_steps: [
    "Active inside hook maintaining control",
    "Strong far leg grip",
    "Stay mobile - ready to invert",
    "Create angles for sweeps"
  ],
  escape_overview: "Invert for berimbolo or sweep opponent",
  common_mistakes: [
    "Passive hook easily cleared",
    "No far leg grip",
    "Static without using inversions",
    "Poor timing on entries"
  ],
  goals: [
    "Execute berimbolo to back control",
    "Sweep opponent with RDLR sweeps",
    "Transition to X-guard",
    "Develop inversion skills"
  ]
};

fs.writeFileSync('data/bjj-database.json', JSON.stringify(db, null, 2));
console.log('Updated: butterfly_guard, de_la_riva, reverse_de_la_riva');
