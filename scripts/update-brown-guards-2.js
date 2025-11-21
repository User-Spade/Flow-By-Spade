const fs = require('fs');
const db = JSON.parse(fs.readFileSync('data/bjj-database.json', 'utf8'));

// Brown Belt Advanced Guards - Part 2

// SQUID GUARD
db.positions.squid_guard.belt_levels.brown = {
  concepts: [
    "Evolution of worm guard",
    "Both legs entangled in lapel",
    "Creates even stronger control",
    "Part of Keenan system",
    "Advanced lapel guard variation"
  ],
  techniques: [],
  common_mistakes: [
    "Not establishing worm first",
    "Poor lapel management",
    "Losing second leg entanglement",
    "Static position without attacks"
  ],
  key_details: [
    "Both legs in lapel system",
    "Progression from worm guard",
    "Extremely strong control",
    "Sweeps and submissions available"
  ],
  transitions_available: ["worm_guard", "ringworm_guard", "sweep_to_top", "triangle_setup"],
  prerequisites: ["worm_guard", "spider_guard"]
};

db.positions.squid_guard.system = {
  ...db.positions.squid_guard.system,
  opponent_relative: ["on_bottom", "legs_entangled"],
  stability_score: 5,
  movement_directions_allowed: ["hip_movement", "pulling"],
  leads_to_position_ids: ["worm_guard", "ringworm_guard", "side_control", "triangle_choke"],
  entry_from_position_ids: ["worm_guard"],
  risk_level: "low"
};

db.positions.squid_guard.learning = {
  ...db.positions.squid_guard.learning,
  alternate_names: ["Squid Guard", "Double Worm"],
  description: "Advanced evolution of worm guard where both legs are entangled in lapel system. Part of Keenan Cornelius's lapel guard system. Provides extremely strong control and multiple attacking options.",
  key_concepts: [
    "Both legs in lapel entanglement",
    "Evolution from worm guard",
    "Creates maximum control",
    "Multiple attack options"
  ],
  entry_steps: [
    "From established worm guard",
    "Feed second leg into system",
    "Create squid configuration",
    "Maintain lapel control"
  ],
  maintenance_steps: [
    "Keep both legs entangled",
    "Maintain lapel tension",
    "Control opponent's posture",
    "Create attacking opportunities"
  ],
  escape_overview: "Sweep or submit from strong control position",
  common_mistakes: [
    "Attempting without worm mastery",
    "Losing lapel tension",
    "Not using both legs effectively",
    "Over-complicating position"
  ],
  goals: [
    "Master lapel guard system",
    "Create unpassable position",
    "Attack from strong control",
    "Develop modern guard game"
  ]
};

// RINGWORM GUARD
db.positions.ringworm_guard.belt_levels.brown = {
  concepts: [
    "Circular lapel configuration",
    "Lapel returns to your grip",
    "Creates loop control",
    "Part of worm guard system",
    "Unique control mechanics"
  ],
  techniques: [],
  common_mistakes: [
    "Not completing lapel loop",
    "Losing circular configuration",
    "Poor grip on returning lapel",
    "Not understanding system"
  ],
  key_details: [
    "Lapel wraps and returns",
    "Creates ring-like control",
    "Grip returned lapel",
    "Part of Keenan system"
  ],
  transitions_available: ["worm_guard", "squid_guard", "sweep_to_top"],
  prerequisites: ["worm_guard", "lapel_guard_mastery"]
};

db.positions.ringworm_guard.system = {
  ...db.positions.ringworm_guard.system,
  opponent_relative: ["on_bottom", "legs_open"],
  stability_score: 5,
  movement_directions_allowed: ["hip_movement", "pulling"],
  leads_to_position_ids: ["worm_guard", "squid_guard", "side_control"],
  entry_from_position_ids: ["worm_guard", "squid_guard"],
  risk_level: "low"
};

db.positions.ringworm_guard.learning = {
  ...db.positions.ringworm_guard.learning,
  alternate_names: ["Ringworm Guard", "Loop Guard"],
  description: "Advanced variation of worm guard where lapel creates circular loop returning to your grip. Part of Keenan Cornelius system. Creates unique control mechanics through circular lapel configuration.",
  key_concepts: [
    "Lapel creates circular loop",
    "Returns to your control",
    "Ring-like configuration",
    "Unique control mechanics"
  ],
  entry_steps: [
    "From worm or squid guard",
    "Complete lapel loop",
    "Return lapel to your grip",
    "Establish ringworm control"
  ],
  maintenance_steps: [
    "Maintain circular configuration",
    "Keep lapel tension",
    "Control with loop",
    "Create angles for attacks"
  ],
  escape_overview: "Sweep using circular control mechanics",
  common_mistakes: [
    "Loop not completed properly",
    "Losing returning lapel grip",
    "Not using circular mechanics",
    "Over-complicating system"
  ],
  goals: [
    "Master advanced lapel guards",
    "Create unique control",
    "Develop circular mechanics",
    "Complete Keenan system"
  ]
};

// GUBBER GUARD
db.positions.gubber_guard.belt_levels.brown = {
  concepts: [
    "Reverse collar grip guard",
    "Opponent's collar fed behind their back",
    "Creates powerful breaking mechanics",
    "Used by multiple high-level competitors",
    "Modern guard development"
  ],
  techniques: [],
  common_mistakes: [
    "Not feeding collar deep enough",
    "Losing collar grip",
    "Poor leg positioning",
    "Not using breaking mechanics"
  ],
  key_details: [
    "Collar fed behind opponent's back",
    "Reverse grip control",
    "Breaks down posture",
    "Strong sweeping position"
  ],
  transitions_available: ["collar_sleeve_guard", "spider_guard", "sweep_to_top"],
  prerequisites: ["collar_sleeve_guard", "spider_guard"]
};

db.positions.gubber_guard.system = {
  ...db.positions.gubber_guard.system,
  opponent_relative: ["on_bottom", "legs_open"],
  stability_score: 4,
  movement_directions_allowed: ["hip_movement", "pulling"],
  leads_to_position_ids: ["collar_sleeve_guard", "spider_guard", "side_control"],
  entry_from_position_ids: ["collar_sleeve_guard", "open_guard_bottom"],
  risk_level: "low"
};

db.positions.gubber_guard.learning = {
  ...db.positions.gubber_guard.learning,
  alternate_names: ["Gubber Guard", "Reverse Collar Guard"],
  description: "Modern guard where opponent's collar is fed behind their back with reverse grip. Creates powerful breaking mechanics and sweeping opportunities. Used by high-level competitors in sport BJJ.",
  key_concepts: [
    "Collar fed behind back",
    "Reverse grip mechanics",
    "Breaks down posture strongly",
    "Modern competition guard"
  ],
  entry_steps: [
    "From collar sleeve guard",
    "Feed collar behind opponent's back",
    "Establish reverse grip",
    "Position legs for control"
  ],
  maintenance_steps: [
    "Maintain deep collar grip",
    "Break down posture",
    "Use legs for control",
    "Create sweeping angles"
  ],
  escape_overview: "Sweep using collar breaking mechanics",
  common_mistakes: [
    "Collar not fed deep enough",
    "Losing reverse grip",
    "Not breaking posture",
    "Static without attacking"
  ],
  goals: [
    "Master modern guard systems",
    "Create powerful breaks",
    "Develop competition guards",
    "Sweep with collar control"
  ]
};

fs.writeFileSync('data/bjj-database.json', JSON.stringify(db, null, 2));
console.log('Updated: squid_guard, ringworm_guard, gubber_guard');
console.log('\n✅ Brown Belt Advanced Guards Complete! (6/6)');
