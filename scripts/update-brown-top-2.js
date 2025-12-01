const fs = require('fs');
const db = JSON.parse(fs.readFileSync('data/bjj-database.json', 'utf8'));

// Brown Belt Top Control - Part 2

// CHEST TO CHEST HALF GUARD
db.positions.chest_to_chest_half.belt_levels.brown = {
  concepts: [
    "Chest-to-chest pressure in half guard",
    "Shoulder of justice applied",
    "Opponent flattened and controlled",
    "High pressure top position",
    "Submission and pass opportunities"
  ],
  techniques: [],
  common_mistakes: [
    "Not getting true chest-to-chest contact",
    "Weak shoulder pressure",
    "Allowing opponent to create frames",
    "Not controlling far arm"
  ],
  key_details: [
    "Full chest contact",
    "Shoulder into face/neck",
    "Flatten opponent",
    "Control far arm"
  ],
  transitions_available: ["side_control", "mount", "kimura", "darce_choke"],
  prerequisites: ["half_guard_top", "pressure_passing"]
};

db.positions.chest_to_chest_half.system = {
  ...db.positions.chest_to_chest_half.system,
  opponent_relative: ["on_top", "chest_to_chest"],
  stability_score: 5,
  movement_directions_allowed: ["forward_pressure", "shoulder_pressure"],
  leads_to_position_ids: ["side_control", "mount", "kimura_finish", "darce_choke"],
  entry_from_position_ids: ["half_guard_top"],
  risk_level: "low"
};

db.positions.chest_to_chest_half.learning = {
  ...db.positions.chest_to_chest_half.learning,
  alternate_names: ["Chest to Chest", "Heavy Half Guard Top"],
  description: "Dominant half guard top position with full chest-to-chest contact and shoulder pressure. Flattens opponent creating submission opportunities. High-pressure control position used by pressure passers.",
  key_concepts: [
    "Full chest contact creates control",
    "Shoulder of justice pressure",
    "Opponent flattened completely",
    "Multiple attack options"
  ],
  entry_steps: [
    "From half guard top",
    "Establish chest-to-chest contact",
    "Drive shoulder into face/neck",
    "Control far arm and flatten"
  ],
  maintenance_steps: [
    "Maintain chest contact",
    "Keep shoulder pressure",
    "Don't allow frames",
    "Control far arm continuously"
  ],
  escape_overview: "Pass to mount/side or submit",
  common_mistakes: [
    "Not achieving true chest contact",
    "Shoulder pressure too weak",
    "Allowing frames to develop",
    "Not controlling far arm"
  ],
  goals: [
    "Master pressure half guard",
    "Develop shoulder pressure",
    "Submit from top half",
    "Use weight effectively"
  ]
};

// TIGHT WAIST HIP RIDE
db.positions.tight_waist_hip_ride.belt_levels.brown = {
  concepts: [
    "Wrestling technique applied to BJJ",
    "Controlling opponent from side/back",
    "Tight waist grip with hip pressure",
    "Transitions to back or turns opponent",
    "Wrestling-based control"
  ],
  techniques: [],
  common_mistakes: [
    "Loose tight waist grip",
    "Not using hip pressure",
    "Poor weight distribution",
    "Not transitioning when available"
  ],
  key_details: [
    "Tight waist around opponent",
    "Hip drives into their hip",
    "Wrestling control position",
    "Creates back exposure"
  ],
  transitions_available: ["back_control", "turtle_top", "side_control"],
  prerequisites: ["turtle_top", "wrestling_fundamentals"]
};

db.positions.tight_waist_hip_ride.system = {
  ...db.positions.tight_waist_hip_ride.system,
  opponent_relative: ["on_side", "hip_to_hip"],
  stability_score: 4,
  movement_directions_allowed: ["hip_pressure", "rotating"],
  leads_to_position_ids: ["back_control", "turtle_top", "side_control"],
  entry_from_position_ids: ["turtle_top", "side_control"],
  risk_level: "low"
};

db.positions.tight_waist_hip_ride.learning = {
  ...db.positions.tight_waist_hip_ride.learning,
  alternate_names: ["Tight Waist", "Hip Ride", "Tight Waist Hip Ride"],
  description: "Wrestling-based control position using tight waist grip and hip pressure. Controls opponent from side allowing transitions to back or turning them. Wrestling technique adapted for BJJ.",
  key_concepts: [
    "Wrestling control adapted to BJJ",
    "Tight waist creates control",
    "Hip pressure drives action",
    "Creates back exposure"
  ],
  entry_steps: [
    "From turtle top or side control",
    "Establish tight waist grip",
    "Drive hip into opponent's hip",
    "Control and create pressure"
  ],
  maintenance_steps: [
    "Keep tight waist secure",
    "Maintain hip pressure",
    "Control opponent's movement",
    "Ready to transition"
  ],
  escape_overview: "Transition to back control or flatten opponent",
  common_mistakes: [
    "Tight waist too loose",
    "No hip pressure",
    "Static without transitions",
    "Poor weight distribution"
  ],
  goals: [
    "Master wrestling controls",
    "Take the back efficiently",
    "Develop top turtle game",
    "Use hip pressure effectively"
  ]
};

// SEATBELT TRAPS
db.positions.seatbelt_traps.belt_levels.brown = {
  concepts: [
    "Using seatbelt grip to create traps",
    "Opponent's arms trapped in system",
    "High-level back control variation",
    "Creates submission opportunities",
    "Advanced back control concept"
  ],
  techniques: [],
  common_mistakes: [
    "Not establishing seatbelt properly",
    "Allowing opponent to defend arms",
    "Not using trapping mechanics",
    "Weak hooks"
  ],
  key_details: [
    "Seatbelt grip fundamental",
    "Trap opponent's defensive arms",
    "Creates submission openings",
    "Advanced back control"
  ],
  transitions_available: ["back_control", "rear_naked_choke", "armbar_from_back"],
  prerequisites: ["back_control", "seatbelt_control"]
};

db.positions.seatbelt_traps.system = {
  ...db.positions.seatbelt_traps.system,
  opponent_relative: ["back_control", "arms_trapped"],
  stability_score: 5,
  movement_directions_allowed: ["adjusting_position", "attacking"],
  leads_to_position_ids: ["back_control", "rear_naked_choke", "armbar_from_back"],
  entry_from_position_ids: ["back_control"],
  risk_level: "low"
};

db.positions.seatbelt_traps.learning = {
  ...db.positions.seatbelt_traps.learning,
  alternate_names: ["Seatbelt Traps", "Arm Trap Back Control"],
  description: "Advanced back control variation using seatbelt grip to systematically trap opponent's defensive arms. Creates submission opportunities by controlling arm defense. Expert-level back control concept.",
  key_concepts: [
    "Seatbelt creates trapping system",
    "Opponent's arms controlled",
    "Opens submission opportunities",
    "Advanced back control strategy"
  ],
  entry_steps: [
    "From back control position",
    "Establish strong seatbelt",
    "Create traps for defensive arms",
    "Set up submissions"
  ],
  maintenance_steps: [
    "Maintain seatbelt control",
    "Keep arms trapped",
    "Use hooks for stability",
    "Attack when ready"
  ],
  escape_overview: "Submit opponent with trapped arms",
  common_mistakes: [
    "Seatbelt not secure",
    "Not actually trapping arms",
    "Weak hook control",
    "Not capitalizing on traps"
  ],
  goals: [
    "Master advanced back control",
    "Trap opponent's defenses",
    "Finish from back reliably",
    "Develop systematic approach"
  ]
};

// ARM TRAPPED BACK MOUNT
db.positions.arm_trapped_back_mount.belt_levels.brown = {
  concepts: [
    "Back mount with opponent's arm trapped",
    "Hybrid of mount and back control",
    "Creates unique submission opportunities",
    "High-level control position",
    "Advanced mount variation"
  ],
  techniques: [],
  common_mistakes: [
    "Not securing trapped arm",
    "Weak mount control",
    "Allowing opponent to free arm",
    "Not transitioning when needed"
  ],
  key_details: [
    "Mount position from back",
    "One arm trapped behind",
    "Creates submission openings",
    "Dominant control"
  ],
  transitions_available: ["mount", "back_control", "armbar", "ezekiel_choke"],
  prerequisites: ["mount", "back_control", "arm_trap_mechanics"]
};

db.positions.arm_trapped_back_mount.system = {
  ...db.positions.arm_trapped_back_mount.system,
  opponent_relative: ["on_top", "arm_trapped"],
  stability_score: 5,
  movement_directions_allowed: ["adjusting_position", "attacking"],
  leads_to_position_ids: ["mount", "back_control", "armbar_finish", "ezekiel_choke"],
  entry_from_position_ids: ["mount", "back_control"],
  risk_level: "low"
};

db.positions.arm_trapped_back_mount.learning = {
  ...db.positions.arm_trapped_back_mount.learning,
  alternate_names: ["Arm Trap Mount", "Back Mount", "Trapped Arm Mount"],
  description: "Advanced mount position where opponent's arm is trapped while controlling from back-facing angle. Creates unique submission opportunities combining mount and back control. Expert-level position.",
  key_concepts: [
    "Hybrid mount/back position",
    "Arm trapped creates control",
    "Multiple submission options",
    "Dominant finishing position"
  ],
  entry_steps: [
    "From mount or back control",
    "Trap opponent's arm behind",
    "Establish mount from back angle",
    "Secure control and position"
  ],
  maintenance_steps: [
    "Keep arm trapped",
    "Maintain mount control",
    "Control opponent's movement",
    "Set up submissions"
  ],
  escape_overview: "Submit with armbars, chokes, or other attacks",
  common_mistakes: [
    "Arm not truly trapped",
    "Weak mount control",
    "Allowing arm to escape",
    "Not attacking quickly"
  ],
  goals: [
    "Master advanced mount variations",
    "Trap and control opponent",
    "Finish with submissions",
    "Combine position concepts"
  ]
};

fs.writeFileSync('data/bjj-database.json', JSON.stringify(db, null, 2));
console.log('Updated: chest_to_chest_half, tight_waist_hip_ride, seatbelt_traps, arm_trapped_back_mount');
console.log('\n🎉 BROWN BELT COMPLETE! All 16 positions populated.');
console.log('\nBrown Belt Summary:');
console.log('  • Advanced Guards: 6 positions (K, Butterfly X, Worm, Squid, Ringworm, Gubber)');
console.log('  • Leg Entanglements: 2 positions (Cross Ashi, Reverse X)');
console.log('  • Transition: 1 position (Baby Bolo)');
console.log('  • Top Control: 7 positions (Leg Pins, Double Under, Over Under, Chest-to-Chest Half, Tight Waist Hip Ride, Seatbelt Traps, Arm Trapped Back Mount)');
console.log('\nDatabase Progress: 70/93 positions (75.3% complete)');
console.log('Remaining: Black Belt (21 positions)');
