const fs = require('fs');
const db = JSON.parse(fs.readFileSync('data/bjj-database.json', 'utf8'));

// Purple Belt Top Control and Transition Positions

// CRAB RIDE
db.positions.crab_ride.belt_levels.purple = {
  concepts: [
    "Ride opponent's back from side/turtle",
    "Control both arms from the side",
    "Transition to back control or submissions",
    "Prevents opponent escaping turtle",
    "Powerful control position"
  ],
  techniques: [],
  common_mistakes: [
    "Not controlling both arms effectively",
    "Weight distribution wrong",
    "Letting opponent return to guard",
    "Not transitioning to back or submissions"
  ],
  key_details: [
    "Ride on opponent's side from turtle",
    "Control both arms",
    "Chest pressure on their back",
    "Ready to take back or submit"
  ],
  transitions_available: ["back_control", "crucifix", "submission_attacks"],
  prerequisites: ["turtle_top_variations"]
};

db.positions.crab_ride.system = {
  ...db.positions.crab_ride.system,
  opponent_relative: ["on_top", "side_control"],
  stability_score: 5,
  movement_directions_allowed: ["forward_pressure", "lateral_shift"],
  leads_to_position_ids: ["back_control", "crucifix", "submission"],
  entry_from_position_ids: ["turtle_top", "berimbolo_control"],
  risk_level: "low"
};

db.positions.crab_ride.learning = {
  ...db.positions.crab_ride.learning,
  alternate_names: ["Crab Ride", "Side Ride"],
  description: "Advanced top position riding opponent's back from the side while controlling both arms. Often reached from berimbolo or turtle. Excellent control with numerous attack options.",
  key_concepts: [
    "Control both arms from side",
    "Ride opponent like a crab",
    "Gateway to back or submissions",
    "Prevents turtle escape"
  ],
  entry_steps: [
    "From berimbolo or turtle top",
    "Get to opponent's side",
    "Control both arms",
    "Establish riding position"
  ],
  maintenance_steps: [
    "Maintain arm control",
    "Chest pressure on back",
    "Follow opponent's movement",
    "Prepare for back take or submission"
  ],
  escape_overview: "Transition to back control or attack submissions",
  common_mistakes: [
    "Losing arm control",
    "Poor weight distribution",
    "Not finishing position",
    "Allowing escape to guard"
  ],
  goals: [
    "Master crab ride control",
    "Transition to back smoothly",
    "Attack crucifix or submissions",
    "Complete berimbolo sequences"
  ]
};

// BERIMBOLO CONTROL
db.positions.berimbolo_control.belt_levels.purple = {
  concepts: [
    "Rolling under opponent to take back",
    "Signature modern sport BJJ technique",
    "Requires inversion and rotation",
    "Creates back exposure",
    "From RDLR or inverted guard"
  ],
  techniques: [],
  common_mistakes: [
    "Incomplete rotation",
    "Losing leg control during roll",
    "Not finishing back take",
    "Poor timing on entry"
  ],
  key_details: [
    "Invert and roll under opponent",
    "Maintain leg control throughout",
    "Rotate to opponent's back",
    "Establish hooks and control"
  ],
  transitions_available: ["back_control", "crab_ride", "reverse_de_la_riva"],
  prerequisites: ["rdlr_inverted_entries", "inverted_guard"]
};

db.positions.berimbolo_control.system = {
  ...db.positions.berimbolo_control.system,
  opponent_relative: ["rotating", "transitioning"],
  stability_score: 3,
  movement_directions_allowed: ["rotating", "inverting"],
  leads_to_position_ids: ["back_control", "crab_ride", "reverse_de_la_riva"],
  entry_from_position_ids: ["rdlr_inverted_entries", "inverted_guard"],
  risk_level: "medium"
};

db.positions.berimbolo_control.learning = {
  ...db.positions.berimbolo_control.learning,
  alternate_names: ["Berimbolo", "Bolo"],
  description: "Dynamic technique rolling under opponent from inverted position to take their back. Signature technique of modern sport BJJ. Requires flexibility, timing, and excellent technique.",
  key_concepts: [
    "Roll under to opponent's back",
    "Inversion to back take",
    "Modern sport BJJ hallmark",
    "Requires significant practice"
  ],
  entry_steps: [
    "From RDLR inverted entry",
    "Maintain far leg control",
    "Roll under opponent",
    "Rotate to their back"
  ],
  maintenance_steps: [
    "Keep rolling momentum",
    "Maintain leg control",
    "Complete rotation",
    "Establish back control"
  ],
  escape_overview: "Complete roll to back control or crab ride",
  common_mistakes: [
    "Incomplete roll",
    "Losing leg grip",
    "Poor timing getting stacked",
    "Not drilling enough repetitions"
  ],
  goals: [
    "Master berimbolo technique",
    "Take back from bottom",
    "Develop modern sport game",
    "Build inversion skills"
  ]
};

// HEADQUARTERS POSITION
db.positions.headquarters_position.belt_levels.purple = {
  concepts: [
    "Pressure passing knee in middle",
    "Control opponent's legs and hips",
    "Systematically pass different guards",
    "Bernardo Faria style passing",
    "Pressure-based passing platform"
  ],
  techniques: [],
  common_mistakes: [
    "Not getting knee in correct position",
    "Poor weight distribution",
    "Letting opponent recover guard",
    "Not controlling hips properly"
  ],
  key_details: [
    "Knee in middle of opponent's legs",
    "Heavy pressure on hips",
    "Control both legs/hips",
    "Systematically advance to pass"
  ],
  transitions_available: ["side_control", "half_guard_top", "knee_on_belly"],
  prerequisites: ["open_guard_top", "pressure_passing"]
};

db.positions.headquarters_position.system = {
  ...db.positions.headquarters_position.system,
  opponent_relative: ["on_top", "passing"],
  stability_score: 4,
  movement_directions_allowed: ["forward_pressure", "lateral_shift"],
  leads_to_position_ids: ["side_control", "half_guard_top", "knee_on_belly"],
  entry_from_position_ids: ["open_guard_top", "half_guard_top"],
  risk_level: "low"
};

db.positions.headquarters_position.learning = {
  ...db.positions.headquarters_position.learning,
  alternate_names: ["Headquarters", "HQ Position", "Bernardo Pass Setup"],
  description: "Pressure passing position with knee in middle controlling opponent's legs and hips. Popularized by Bernardo Faria. Systematic approach to passing various guards using pressure and control.",
  key_concepts: [
    "Knee in middle creates control",
    "Heavy pressure prevents movement",
    "Systematic guard passing",
    "Controls multiple guard types"
  ],
  entry_steps: [
    "From open guard passing",
    "Get knee in middle of legs",
    "Establish hip control",
    "Apply heavy pressure"
  ],
  maintenance_steps: [
    "Maintain knee position",
    "Keep pressure heavy on hips",
    "Control opponent's legs",
    "Advance to complete pass"
  ],
  escape_overview: "Systematically pass to side control",
  common_mistakes: [
    "Knee position too high or low",
    "Not enough pressure",
    "Letting opponent re-guard",
    "Poor hip control"
  ],
  goals: [
    "Master pressure passing",
    "Pass various guard types",
    "Develop Bernardo Faria style",
    "Build systematic passing game"
  ]
};

// SMASH PASS POSITION
db.positions.smash_pass_position.belt_levels.purple = {
  concepts: [
    "Smash opponent's legs to one side",
    "Heavy shoulder pressure",
    "Flatten opponent",
    "Overwhelm with pressure",
    "Prevent guard recovery"
  ],
  techniques: [],
  common_mistakes: [
    "Not flattening opponent completely",
    "Shoulder pressure too high",
    "Letting legs escape to other side",
    "Not controlling near arm"
  ],
  key_details: [
    "Legs smashed to one side",
    "Shoulder drives into chest/face",
    "Weight heavy and low",
    "Near arm controlled"
  ],
  transitions_available: ["side_control", "north_south", "mount"],
  prerequisites: ["half_guard_top", "pressure_passing"]
};

db.positions.smash_pass_position.system = {
  ...db.positions.smash_pass_position.system,
  opponent_relative: ["on_top", "passing"],
  stability_score: 5,
  movement_directions_allowed: ["forward_pressure"],
  leads_to_position_ids: ["side_control", "north_south", "mount"],
  entry_from_position_ids: ["half_guard_top", "headquarters_position"],
  risk_level: "low"
};

db.positions.smash_pass_position.learning = {
  ...db.positions.smash_pass_position.learning,
  alternate_names: ["Smash Pass", "Pressure Pass"],
  description: "Heavy pressure passing technique smashing opponent's legs to one side while driving shoulder into chest. Overwhelming pressure-based pass. Very effective against flexible opponents.",
  key_concepts: [
    "Smash legs completely to side",
    "Heavy shoulder pressure",
    "Flatten opponent entirely",
    "Pressure overwhelms technique"
  ],
  entry_steps: [
    "From half guard or headquarters",
    "Drive legs to one side",
    "Shoulder into chest/face",
    "Flatten opponent completely"
  ],
  maintenance_steps: [
    "Keep legs smashed to side",
    "Maintain shoulder pressure",
    "Control near arm",
    "Advance to side control"
  ],
  escape_overview: "Complete pass to side control or mount",
  common_mistakes: [
    "Not smashing legs completely",
    "Shoulder too high (weak pressure)",
    "Opponent not flattened",
    "Giving up position during pass"
  ],
  goals: [
    "Master pressure passing",
    "Overwhelm opponent with weight",
    "Pass against flexible guards",
    "Develop heavy passing style"
  ]
};

// LEG DRAG CONTROL
db.positions.leg_drag_control.belt_levels.purple = {
  concepts: [
    "Drag opponent's leg across body",
    "Creates passing angle",
    "Control hip and leg",
    "Modern passing technique",
    "Beats many modern guards"
  ],
  techniques: [],
  common_mistakes: [
    "Not controlling hip properly",
    "Letting opponent turn into you",
    "Poor leg drag mechanics",
    "Not following through to pass"
  ],
  key_details: [
    "Drag leg across opponent's body",
    "Control hip with other hand",
    "Create perpendicular angle",
    "Drive through to back or pass"
  ],
  transitions_available: ["side_control", "back_control", "mount"],
  prerequisites: ["open_guard_top", "de_la_riva_passing"]
};

db.positions.leg_drag_control.system = {
  ...db.positions.leg_drag_control.system,
  opponent_relative: ["on_top", "passing"],
  stability_score: 4,
  movement_directions_allowed: ["lateral_shift", "forward_pressure"],
  leads_to_position_ids: ["side_control", "back_control", "mount"],
  entry_from_position_ids: ["open_guard_top", "de_la_riva"],
  risk_level: "low"
};

db.positions.leg_drag_control.learning = {
  ...db.positions.leg_drag_control.learning,
  alternate_names: ["Leg Drag", "Leg Drag Pass"],
  description: "Modern passing technique dragging opponent's leg across their body to create passing angle. Very effective against DLR and modern guards. Creates back take opportunities.",
  key_concepts: [
    "Drag leg across body",
    "Control hip to prevent turn",
    "Create perpendicular angle",
    "Gateway to back or side control"
  ],
  entry_steps: [
    "From open guard passing",
    "Grip opponent's leg",
    "Drag across their body",
    "Control hip with other hand"
  ],
  maintenance_steps: [
    "Keep leg dragged across",
    "Maintain hip control",
    "Don't let opponent turn in",
    "Advance to back or side"
  ],
  escape_overview: "Complete pass or take back",
  common_mistakes: [
    "Weak leg drag (easily recovered)",
    "No hip control",
    "Letting opponent face you",
    "Not finishing position"
  ],
  goals: [
    "Master modern passing",
    "Beat DLR and modern guards",
    "Create back take opportunities",
    "Develop leg drag system"
  ]
};

fs.writeFileSync('data/bjj-database.json', JSON.stringify(db, null, 2));
console.log('Updated: crab_ride, berimbolo_control, headquarters_position, smash_pass_position, leg_drag_control');
console.log('\n🎉 PURPLE BELT COMPLETE! All 16 positions populated.');
console.log('\nPurple Belt Summary:');
console.log('- 4 Leg entanglements (SLX, outside ashi, inside ashi, 50/50)');
console.log('- 5 Advanced guards (deep half, tornado, RDLR inverted, modified X, inverted guard)');
console.log('- 2 Advanced guards cont. (matrix, collar DLR hybrid)');
console.log('- 2 Top control (crab ride, headquarters)');
console.log('- 2 Passing positions (smash pass, leg drag)');
console.log('- 1 Transition (berimbolo control)');
