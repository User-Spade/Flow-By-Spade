const fs = require('fs');
const db = JSON.parse(fs.readFileSync('data/bjj-database.json', 'utf8'));

// Final Bottom Positions - White Belt Content

// SIDE CONTROL BOTTOM
db.positions.side_control_bottom.belt_levels.white = {
  concepts: [
    "Create frames to prevent submissions",
    "Shrimp to create space and recover guard",
    "Protect your neck at all times",
    "Work methodically - don't panic"
  ],
  techniques: [],
  common_mistakes: [
    "Turning away and giving up back",
    "Flat on back with no frames",
    "Pushing on opponent's head",
    "Using strength without technique"
  ],
  key_details: [
    "Frame on opponent's neck and hip",
    "Shrimp hips away to create space",
    "Knee shield when possible",
    "Never turn away from opponent"
  ],
  transitions_available: ["closed_guard_bottom", "open_guard_bottom", "half_guard_bottom", "turtle_bottom"],
  prerequisites: []
};

db.positions.side_control_bottom.system = {
  ...db.positions.side_control_bottom.system,
  opponent_relative: ["on_bottom", "perpendicular"],
  stability_score: 2,
  movement_directions_allowed: ["hip_movement"],
  leads_to_position_ids: ["closed_guard_bottom", "open_guard_bottom", "half_guard_bottom", "turtle_bottom", "mount"],
  entry_from_position_ids: ["closed_guard_bottom", "open_guard_bottom", "half_guard_bottom", "mount"],
  risk_level: "high"
};

db.positions.side_control_bottom.learning = {
  ...db.positions.side_control_bottom.learning,
  alternate_names: ["Bottom Side Control", "Under Side Control"],
  description: "Defensive position where opponent has side control on top of you. Focus is on survival, creating frames, and escaping back to guard or a better position.",
  key_concepts: [
    "Frames prevent weight and submissions",
    "Shrimping creates the space to escape",
    "Protect neck - don't give up back",
    "Breathe and work methodically"
  ],
  entry_steps: [
    "Opponent passes your guard to side control",
    "Immediately create frames (neck and hip)",
    "Turn slightly toward opponent",
    "Prepare to shrimp and recover guard"
  ],
  maintenance_steps: [
    "Maintain frames constantly",
    "Shrimp hips to create space",
    "Insert knee shield when possible",
    "Work to recover half or full guard"
  ],
  escape_overview: "Shrimp to create space, insert knee, recover to guard",
  common_mistakes: [
    "Turning away (gives up back)",
    "Flat with no frames (easy to submit)",
    "Pushing opponent's head",
    "Panicking and using all energy"
  ],
  goals: [
    "Survive and breathe",
    "Create frames to maintain space",
    "Shrimp to recover guard",
    "Prevent mount and back control"
  ]
};

// TURTLE BOTTOM
db.positions.turtle_bottom.belt_levels.white = {
  concepts: [
    "Protect your neck and arms",
    "Sit back to guard when opportunity arises",
    "Don't stay static - move to escape or return to guard",
    "Temporary defensive position"
  ],
  techniques: [],
  common_mistakes: [
    "Staying in turtle too long",
    "Exposing neck to chokes",
    "Letting opponent get harness control",
    "Weight too far forward allowing back take"
  ],
  key_details: [
    "Elbows tight to knees",
    "Hands protecting neck",
    "Base wide for stability",
    "Look for opportunity to sit to guard"
  ],
  transitions_available: ["closed_guard_bottom", "open_guard_bottom", "side_control_bottom", "back_control"],
  prerequisites: ["side_control_bottom"]
};

db.positions.turtle_bottom.system = {
  ...db.positions.turtle_bottom.system,
  opponent_relative: ["on_bottom", "defending"],
  stability_score: 2,
  movement_directions_allowed: ["rolling", "sitting_back"],
  leads_to_position_ids: ["closed_guard_bottom", "open_guard_bottom", "side_control_bottom", "back_control"],
  entry_from_position_ids: ["side_control_bottom", "half_guard_bottom", "mount"],
  risk_level: "high"
};

db.positions.turtle_bottom.learning = {
  ...db.positions.turtle_bottom.learning,
  alternate_names: ["Turtle", "Bottom Turtle", "Referee Position"],
  description: "Defensive position on hands and knees used temporarily to prevent being submitted or to recover guard. High risk of back control if maintained too long.",
  key_concepts: [
    "Temporary position only",
    "Protect neck and prevent back control",
    "Sit to guard as soon as possible",
    "Roll through if opponent overcommits"
  ],
  entry_steps: [
    "Turn to hands and knees from bottom position",
    "Tuck elbows tight to knees",
    "Hands protect neck",
    "Wide base for stability"
  ],
  maintenance_steps: [
    "Keep elbows tight",
    "Protect neck constantly",
    "Wait for opportunity to sit to guard",
    "Be ready to roll through forward"
  ],
  escape_overview: "Sit back to guard or roll through to top position",
  common_mistakes: [
    "Staying in turtle defensively",
    "Exposing neck or arms",
    "Letting opponent secure seatbelt",
    "Poor base allowing easy back take"
  ],
  goals: [
    "Sit back to guard quickly",
    "Prevent back control",
    "Roll through for sweep if possible",
    "Avoid clock choke and crucifix"
  ]
};

fs.writeFileSync('data/bjj-database.json', JSON.stringify(db, null, 2));
console.log('Updated: side_control_bottom, turtle_bottom');
console.log('\\n🎉 WHITE BELT COMPLETE! All 20 fundamental positions populated.');
