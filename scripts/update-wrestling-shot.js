const fs = require('fs');
const db = JSON.parse(fs.readFileSync('data/bjj-database.json', 'utf8'));

// Wrestling Shot Entry
const pos = db.positions.wrestling_shot_entry;
pos.belt_levels.white = {
  concepts: [
    "Level change to penetrate opponent's defense",
    "Drive forward with legs for penetration",
    "Head placement for control",
    "Secure leg or legs for takedown"
  ],
  techniques: [],
  common_mistakes: [
    "Telegraphing the shot with upper body movement",
    "Not changing levels enough",
    "Leading with head down exposing guillotine",
    "Not driving through with legs"
  ],
  key_details: [
    "Drop level quickly and explosively",
    "Keep back straight during penetration",
    "Head up or to side, never straight down",
    "Drive feet and hips forward"
  ],
  transitions_available: ["side_control", "half_guard_top", "turtle_top", "closed_guard_bottom"],
  prerequisites: ["standing_neutral", "collar_tie"]
};

pos.system = {
  ...pos.system,
  opponent_relative: ["penetrating", "level_change"],
  stability_score: 2,
  movement_directions_allowed: ["forward_pressure"],
  leads_to_position_ids: ["side_control", "half_guard_top", "turtle_top", "closed_guard_bottom"],
  entry_from_position_ids: ["standing_neutral", "collar_tie", "single_underhook"],
  risk_level: "high"
};

pos.learning = {
  ...pos.learning,
  alternate_names: ["Takedown Entry", "Shot", "Level Change"],
  description: "The act of dropping your level and driving forward to attack your opponent's legs for a takedown. Includes single leg, double leg, and high crotch entries.",
  key_concepts: [
    "Change levels to get under opponent's hips",
    "Explosive penetration step",
    "Keep head safe from guillotine",
    "Drive through target, not just to it"
  ],
  entry_steps: [
    "From standing clinch or neutral position",
    "Drop level by bending knees (not waist)",
    "Step penetration foot between opponent's legs",
    "Drive forward with head up"
  ],
  maintenance_steps: [
    "Keep driving forward with legs",
    "Maintain head position safety",
    "Secure leg or legs",
    "Finish takedown to top position"
  ],
  escape_overview: "Opponent can sprawl, guillotine, or wizzer to defend",
  common_mistakes: [
    "Bending at waist instead of knees",
    "Stopping forward drive too early",
    "Head position too low (guillotine danger)",
    "Not committing fully to the shot"
  ],
  goals: [
    "Secure single leg or double leg",
    "Complete takedown to top position",
    "Avoid guillotine and sprawl defenses",
    "Land in dominant top position"
  ]
};

fs.writeFileSync('data/bjj-database.json', JSON.stringify(db, null, 2));
console.log('Updated wrestling_shot_entry');
