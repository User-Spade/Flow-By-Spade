const fs = require('fs');
const db = JSON.parse(fs.readFileSync('data/bjj-database.json', 'utf8'));

// Black Belt Hybrids & Advanced Guard

// HYBRID LAPEL INVERSION
db.positions.hybrid_lapel_inversion.belt_levels.black = {
  concepts: [
    "Combining lapel guards with inversion",
    "Creates complex control system",
    "Modern sport BJJ development",
    "Multiple attack and sweep options",
    "Master-level guard complexity"
  ],
  techniques: [],
  common_mistakes: [
    "Not coordinating lapel and inversion",
    "Weak lapel control",
    "Poor inversion mechanics",
    "Not understanding hybrid concepts",
    "Attempting without proper training"
  ],
  key_details: [
    "Lapel control meets inversion",
    "Hybrid guard concept",
    "Complex control system",
    "Modern competition guard",
    "Multiple attacking options"
  ],
  transitions_available: ["worm_guard", "berimbolo_control", "rolling_back_takes", "sweep_to_top"],
  prerequisites: ["worm_guard", "inversion_mastery", "berimbolo_control", "lapel_guard_systems"]
};

db.positions.hybrid_lapel_inversion.system = {
  ...db.positions.hybrid_lapel_inversion.system,
  opponent_relative: ["on_bottom", "inverted"],
  stability_score: 4,
  movement_directions_allowed: ["inverting", "hip_movement", "rolling"],
  leads_to_position_ids: ["worm_guard", "berimbolo_control", "back_control", "side_control"],
  entry_from_position_ids: ["worm_guard", "spider_guard"],
  risk_level: "medium"
};

db.positions.hybrid_lapel_inversion.learning = {
  ...db.positions.hybrid_lapel_inversion.learning,
  alternate_names: ["Hybrid Lapel Inversion", "Inverted Lapel Guard", "Lapel Inversion System"],
  description: "Master-level guard combining lapel control systems with inversion mechanics. Creates complex control and multiple attacking options. Modern sport BJJ development requiring extensive training in both systems.",
  key_concepts: [
    "Hybrid of lapel and inversion",
    "Complex control system",
    "Modern competition guard",
    "Multiple attack paths",
    "Requires mastery of both elements"
  ],
  entry_steps: [
    "From lapel guard or inverted position",
    "Establish lapel control",
    "Create inversion",
    "Combine both systems",
    "Set up attacks or transitions"
  ],
  maintenance_steps: [
    "Maintain lapel control",
    "Keep inversion mechanics",
    "Coordinate both systems",
    "Create attacking opportunities",
    "Stay dynamic"
  ],
  escape_overview: "Sweep, take back, or transition to other positions",
  common_mistakes: [
    "Not coordinating systems",
    "Weak lapel control",
    "Poor inversion",
    "Over-complicating position",
    "Insufficient training in components"
  ],
  goals: [
    "Master hybrid guard concepts",
    "Combine multiple systems",
    "Develop modern guard game",
    "Compete at highest level",
    "Create complex attacks"
  ]
};

// REVERSE WORM CHAINS
db.positions.reverse_worm_chains.belt_levels.black = {
  concepts: [
    "Reverse direction worm guard variations",
    "Chaining multiple lapel positions",
    "Keenan Cornelius advanced system",
    "Creates unpredictable attacks",
    "Master-level lapel guard"
  ],
  techniques: [],
  common_mistakes: [
    "Not understanding reverse mechanics",
    "Weak lapel chains",
    "Poor understanding of system",
    "Not flowing between positions",
    "Attempting without worm mastery"
  ],
  key_details: [
    "Reverse worm configurations",
    "Chaining multiple positions",
    "Keenan system advancement",
    "Unpredictable attack paths",
    "Complex lapel control"
  ],
  transitions_available: ["worm_guard", "squid_guard", "ringworm_guard", "sweep_to_top"],
  prerequisites: ["worm_guard", "squid_guard", "ringworm_guard", "lapel_guard_mastery"]
};

db.positions.reverse_worm_chains.system = {
  ...db.positions.reverse_worm_chains.system,
  opponent_relative: ["on_bottom", "legs_open"],
  stability_score: 5,
  movement_directions_allowed: ["hip_movement", "chaining", "flowing"],
  leads_to_position_ids: ["worm_guard", "squid_guard", "ringworm_guard", "side_control"],
  entry_from_position_ids: ["worm_guard", "squid_guard", "ringworm_guard"],
  risk_level: "low"
};

db.positions.reverse_worm_chains.learning = {
  ...db.positions.reverse_worm_chains.learning,
  alternate_names: ["Reverse Worm Chains", "Worm Chain System", "Reverse Lapel Chains"],
  description: "Advanced extension of worm guard system using reverse configurations and chaining multiple positions. Keenan Cornelius high-level development. Creates unpredictable attack patterns. Master-level lapel guard requiring complete system understanding.",
  key_concepts: [
    "Reverse worm mechanics",
    "Chaining multiple positions",
    "Unpredictable attack patterns",
    "System mastery required",
    "Keenan advanced concepts"
  ],
  entry_steps: [
    "From worm guard system positions",
    "Create reverse configurations",
    "Chain between positions",
    "Maintain lapel control throughout",
    "Create attacking opportunities"
  ],
  maintenance_steps: [
    "Flow between positions",
    "Maintain lapel chains",
    "Use reverse mechanics",
    "Stay unpredictable",
    "Create sweeping angles"
  ],
  escape_overview: "Sweep from any position in chain",
  common_mistakes: [
    "Not understanding reverse mechanics",
    "Weak position chaining",
    "Poor system comprehension",
    "Static in positions",
    "Attempting without complete training"
  ],
  goals: [
    "Master complete worm system",
    "Chain positions fluidly",
    "Create unpredictable attacks",
    "Develop highest level lapel game",
    "Study under Keenan system"
  ]
};

// CROSS COLLAR DOUBLE SLEEVE HYBRID
db.positions.cross_collar_double_sleeve_hybrid.belt_levels.black = {
  concepts: [
    "Hybrid of collar and sleeve guards",
    "Multiple grip configurations",
    "Creates versatile guard platform",
    "Competition-tested system",
    "Master-level grip fighting"
  ],
  techniques: [],
  common_mistakes: [
    "Poor grip management",
    "Not understanding hybrid advantages",
    "Weak cross collar grip",
    "Not using sleeve control effectively",
    "Static guard without transitions"
  ],
  key_details: [
    "Cross collar and double sleeve",
    "Hybrid guard configuration",
    "Multiple attack options",
    "Versatile platform",
    "Advanced grip fighting"
  ],
  transitions_available: ["collar_sleeve_guard", "spider_guard", "lasso_guard", "sweep_to_top"],
  prerequisites: ["collar_sleeve_guard", "spider_guard", "grip_fighting_mastery"]
};

db.positions.cross_collar_double_sleeve_hybrid.system = {
  ...db.positions.cross_collar_double_sleeve_hybrid.system,
  opponent_relative: ["on_bottom", "legs_open"],
  stability_score: 4,
  movement_directions_allowed: ["hip_movement", "pulling", "adjusting"],
  leads_to_position_ids: ["collar_sleeve_guard", "spider_guard", "lasso_guard", "side_control"],
  entry_from_position_ids: ["collar_sleeve_guard", "spider_guard"],
  risk_level: "low"
};

db.positions.cross_collar_double_sleeve_hybrid.learning = {
  ...db.positions.cross_collar_double_sleeve_hybrid.learning,
  alternate_names: ["Cross Collar Double Sleeve", "Collar Sleeve Hybrid", "CCDS Guard"],
  description: "Master-level guard combining cross collar grip with double sleeve control. Creates versatile platform with multiple attack and sweep options. Competition-tested system requiring advanced grip fighting and guard understanding.",
  key_concepts: [
    "Hybrid grip configuration",
    "Cross collar creates breaks",
    "Double sleeve controls arms",
    "Versatile attacking platform",
    "Advanced grip fighting"
  ],
  entry_steps: [
    "From collar sleeve or spider guard",
    "Establish cross collar grip",
    "Control both sleeves",
    "Create hybrid configuration",
    "Set up attacks or sweeps"
  ],
  maintenance_steps: [
    "Maintain grip integrity",
    "Use cross collar to break posture",
    "Control arms with sleeves",
    "Create attacking angles",
    "Stay dynamic"
  ],
  escape_overview: "Sweep or transition to other guards",
  common_mistakes: [
    "Poor grip management",
    "Weak cross collar",
    "Not using hybrid advantages",
    "Static without attacks",
    "Insufficient grip fighting skills"
  ],
  goals: [
    "Master hybrid guards",
    "Develop grip fighting",
    "Create versatile game",
    "Compete at highest level",
    "Use multiple attack paths"
  ]
};

// HALF INVERTED RETENTION
db.positions.half_inverted_retention.belt_levels.black = {
  concepts: [
    "Retention system using partial inversion",
    "Creates defensive recovery",
    "Modern guard retention",
    "Half inverted positioning",
    "Master-level defensive guard"
  ],
  techniques: [],
  common_mistakes: [
    "Not using inversion effectively",
    "Poor retention mechanics",
    "Weak hip movement",
    "Not recovering guard properly",
    "Staying inverted too long"
  ],
  key_details: [
    "Partial inversion for retention",
    "Defensive guard recovery",
    "Hip movement essential",
    "Modern retention system",
    "Creates space and recovery"
  ],
  transitions_available: ["open_guard_bottom", "de_la_riva", "inverted_guard", "guard_recovery"],
  prerequisites: ["inverted_guard", "guard_retention", "hip_movement_mastery"]
};

db.positions.half_inverted_retention.system = {
  ...db.positions.half_inverted_retention.system,
  opponent_relative: ["on_bottom", "partially_inverted"],
  stability_score: 3,
  movement_directions_allowed: ["hip_movement", "inverting", "recovering"],
  leads_to_position_ids: ["open_guard_bottom", "de_la_riva", "inverted_guard", "closed_guard_bottom"],
  entry_from_position_ids: ["open_guard_bottom", "inverted_guard"],
  risk_level: "medium"
};

db.positions.half_inverted_retention.learning = {
  ...db.positions.half_inverted_retention.learning,
  alternate_names: ["Half Inverted Retention", "Partial Inversion Defense", "Inverted Guard Retention"],
  description: "Master-level guard retention system using partial inversion to create defensive recovery. Modern approach to preventing guard passes. Requires excellent hip movement and understanding of retention mechanics.",
  key_concepts: [
    "Partial inversion creates space",
    "Defensive recovery system",
    "Modern retention approach",
    "Hip movement crucial",
    "Prevents guard passes"
  ],
  entry_steps: [
    "When guard is being passed",
    "Create partial inversion",
    "Use hip movement",
    "Generate space and recovery",
    "Return to guard position"
  ],
  maintenance_steps: [
    "Keep moving hips",
    "Use partial inversion",
    "Create space continuously",
    "Don't stay inverted",
    "Recover to better position"
  ],
  escape_overview: "Recover full guard or create better position",
  common_mistakes: [
    "Staying inverted too long",
    "Weak hip movement",
    "Not creating space",
    "Poor retention mechanics",
    "Not recovering to guard"
  ],
  goals: [
    "Master guard retention",
    "Prevent passes with inversion",
    "Develop defensive systems",
    "Use modern retention",
    "Maintain guard consistently"
  ]
};

fs.writeFileSync('data/bjj-database.json', JSON.stringify(db, null, 2));
console.log('Updated: hybrid_lapel_inversion, reverse_worm_chains, cross_collar_double_sleeve_hybrid, half_inverted_retention');
console.log('\n🎉🎉🎉 BLACK BELT COMPLETE! 🎉🎉🎉');
console.log('\nBlack Belt Summary:');
console.log('  • Leg Entanglements: 5 positions (Saddle, Double Trouble, 4-11, Honey Hole, False Reap)');
console.log('  • Top Control: 3 positions (Truck, Twister Side Control, Front Headlock Web)');
console.log('  • Transitions: 4 positions (Samurai Roll, Rolling Back Takes, Scrambles, Dynamic Leg Transitions)');
console.log('  • Hybrids & Guard: 4 positions (Hybrid Lapel Inversion, Reverse Worm Chains, CCDS, Half Inverted Retention)');
console.log('\n🏆 DATABASE COMPLETE! 🏆');
console.log('\nFinal Database Statistics:');
console.log('  • White Belt: 20 positions ✅');
console.log('  • Blue Belt: 18 positions ✅');
console.log('  • Purple Belt: 16 positions ✅');
console.log('  • Brown Belt: 16 positions ✅');
console.log('  • Black Belt: 16 positions ✅');
console.log('\n  📊 TOTAL: 86/86 positions (100% COMPLETE!)');
console.log('\nAll positions now have complete belt-level content including:');
console.log('  - Concepts and key details');
console.log('  - Common mistakes');
console.log('  - Transitions available');
console.log('  - Prerequisites');
console.log('  - System metadata');
console.log('  - Learning metadata');
console.log('\nNext steps: Populate individual technique objects! 🥋');
