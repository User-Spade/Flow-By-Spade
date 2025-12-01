const fs = require('fs');
const db = JSON.parse(fs.readFileSync('data/bjj-database.json', 'utf8'));

// Blue Belt Bottom Control Position

// TURTLE BOTTOM VARIATIONS
db.positions.turtle_bottom_variations.belt_levels.blue = {
  concepts: [
    "Defensive turtle vs offensive turtle",
    "Technical stand from turtle",
    "Rolling through from turtle",
    "Granby roll escapes",
    "Turtle is temporary - have a plan"
  ],
  techniques: [],
  common_mistakes: [
    "Static turtle with no escape plan",
    "Exposing neck to chokes",
    "Not protecting near arm (crucifix risk)",
    "Staying in turtle too long"
  ],
  key_details: [
    "Elbows tight to knees",
    "Weight balanced for mobility",
    "Head protected hands covering neck",
    "Ready to sit to guard or stand"
  ],
  transitions_available: ["closed_guard_bottom", "open_guard_bottom", "technical_standup", "granby_escape"],
  prerequisites: ["turtle_bottom"]
};

db.positions.turtle_bottom_variations.system = {
  ...db.positions.turtle_bottom_variations.system,
  opponent_relative: ["on_bottom", "defending"],
  stability_score: 2,
  movement_directions_allowed: ["rolling", "sitting_back", "standing"],
  leads_to_position_ids: ["closed_guard_bottom", "open_guard_bottom", "standing_neutral"],
  entry_from_position_ids: ["turtle_bottom", "side_control_bottom"],
  risk_level: "high"
};

db.positions.turtle_bottom_variations.learning = {
  ...db.positions.turtle_bottom_variations.learning,
  alternate_names: ["Advanced Turtle Escapes", "Offensive Turtle", "Dynamic Turtle"],
  description: "Advanced turtle bottom positions including technical standup, granby rolls, and offensive turtle movements. Transforms turtle from purely defensive to dynamic escape position.",
  key_concepts: [
    "Turtle is transition not destination",
    "Technical standup from turtle",
    "Granby roll to escape and recover guard",
    "Offensive turtle - attack from bottom"
  ],
  entry_steps: [
    "When in turtle bottom position",
    "Assess opponent's control level",
    "Choose escape: sit to guard, stand, or roll",
    "Execute escape before opponent settles"
  ],
  maintenance_steps: [
    "Protect neck constantly",
    "Keep elbows tight",
    "Stay mobile and ready to escape",
    "Time your escape with opponent's movement"
  ],
  escape_overview: "Technical standup, sit to guard, or granby roll",
  common_mistakes: [
    "Static turtle (sitting duck)",
    "Exposing neck or near arm",
    "No escape plan",
    "Waiting too long to escape"
  ],
  goals: [
    "Execute technical standup from turtle",
    "Granby roll to recover guard",
    "Sit to guard safely",
    "Avoid back control and submissions"
  ]
};

fs.writeFileSync('data/bjj-database.json', JSON.stringify(db, null, 2));
console.log('Updated: turtle_bottom_variations');
console.log('\n🎉 BLUE BELT COMPLETE! All 18 positions populated.');
console.log('\nBlue Belt Summary:');
console.log('- 10 Guard positions (butterfly, DLR, RDLR, spider, lasso, X-guard, collar-sleeve, knee shield, Z-guard, lockdown)');
console.log('- 7 Top control positions (north-south, technical mount, side control variants, half guard passing, backpack, body triangle, turtle attacks)');
console.log('- 1 Bottom position (turtle variations)');
