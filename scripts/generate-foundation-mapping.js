const fs = require('fs');
const db = JSON.parse(fs.readFileSync('data/bjj-database.json','utf8'));

// Foundation ordering (dominance perspective, lower = better for top)
const foundationRanks = {
  rear_mount_top: 1,
  full_mount_top: 2,
  side_control_top: 3,
  knee_on_belly_top: 4,
  turtle_top: 5,
  guard_top: 6,
  neutral: 7,
  guard_bottom: 8,
  turtle_bottom: 9,
  knee_on_belly_bottom: 10,
  side_control_bottom: 11,
  full_mount_bottom: 12,
  rear_mount_bottom: 13,
};

function classify(positionId, position) {
  const id = positionId;
  const cat = position.system.category;
  const name = position.learning.display_name.toLowerCase();

  // Rear Mount Top & transitional states
  if (/back_control|body_triangle/.test(id)) return { foundation: 'rear_mount_top' };
  if (/arm_trapped_back_mount/.test(id)) return { foundation: 'full_mount_top', notes: 'Arm trapped mount treated as dominant mount variation' };
  if (/seatbelt_traps|backpack_position/.test(id)) return { foundation: 'turtle_top', transitional_target: 'rear_mount_top', notes: 'Transitional control depth toward rear mount' };

  // Full Mount Top
  if (/mount$/.test(id) && cat === 'top_control' && !/bottom/.test(id)) return { foundation: 'full_mount_top' };
  if (/technical_mount/.test(id)) return { foundation: 'full_mount_top', notes: 'Technical mount variant' };

  // Side Control Top
  if (/side_control/.test(id) && !/bottom/.test(id)) return { foundation: 'side_control_top' };
  if (/north_south/.test(id)) return { foundation: 'side_control_top', notes: 'North-south treated as side control family' };
  if (/smash_pass_position|leg_drag_control/.test(id)) return { foundation: 'guard_top', notes: 'Passing phase rather than established side control' };

  // Knee on Belly Top
  if (/knee_on_belly/.test(id) && !/bottom/.test(id)) return { foundation: 'knee_on_belly_top' };

  // Turtle Top
  if (/turtle_top/.test(id)) return { foundation: 'turtle_top' };
  if (/tight_waist_hip_ride/.test(id)) return { foundation: 'turtle_top', transitional_target: 'rear_mount_top', notes: 'Hip ride seeks back exposure' };

  // Guard Top (inside opponent guard or active passing pre-control)
  if (/closed_guard_top|open_guard_top/.test(id)) return { foundation: 'guard_top' };
  if (/half_guard_top/.test(id)) return { foundation: 'neutral', notes: 'Half guard top considered balanced' };
  if (/half_guard_top_variations/.test(id)) return { foundation: 'neutral', notes: 'Half guard top variations neutral' };
  if (/headquarters_position|double_under_pass|over_under_pass|leg_pinning_systems|crab_ride|berimbolo_control|smash_pass_position/.test(id)) return { foundation: 'guard_top', notes: 'Passing / control build-up phase' };

  // Neutral (standing, scrambles, 50/50, half guard variants, dynamic transitions)
  if (cat === 'standing') return { foundation: 'neutral', notes: 'Standing engagement phase' };
  if (/scramble_positions|dynamic_leg_entanglement_transitions/.test(id)) return { foundation: 'neutral', notes: 'Chaotic transitional phase' };
  if (/50_50_guard/.test(id)) return { foundation: 'neutral', notes: 'Symmetrical leg entanglement' };
  if (/deep_half_guard|knee_shield_half_guard|z_guard|tornado_guard/.test(id)) return { foundation: 'neutral', notes: 'Half guard variant treated as neutral equilibrium' };

  // Guard Bottom (all named guard variants + leg entanglements except exceptions handled above)
  if (/closed_guard_bottom|open_guard_bottom|butterfly_guard|de_la_riva|reverse_de_la_riva|spider_guard|lasso_guard|x_guard|single_leg_x|outside_ashi_garami|inside_ashi_garami|cross_ashi_garami|honey_hole|false_reap|butterfly_x|k_guard|worm_guard|squid_guard|ringworm_guard|gubber_guard|collar_sleeve_guard|matrix_position|inverted_guard|rdlr_inverted_entries|modified_x_guard|collar_dlr_hybrid|reverse_x/.test(id)) return { foundation: 'guard_bottom' };
  if (/half_guard_bottom/.test(id)) return { foundation: 'neutral', notes: 'Half guard bottom treated as neutral (balanced potential)' };
  if (/half_guard_bottom_variations/.test(id)) return { foundation: 'neutral' };
  if (/lockdown/.test(id)) return { foundation: 'neutral', notes: 'Lockdown half guard retains equilibrium' };

  // Turtle Bottom
  if (/turtle_bottom/.test(id)) return { foundation: 'turtle_bottom' };
  if (/turtle_bottom_variations/.test(id)) return { foundation: 'turtle_bottom' };

  // Knee on Belly Bottom (if explicitly present)
  if (/knee_on_belly_bottom/.test(id)) return { foundation: 'knee_on_belly_bottom' };

  // Side Control Bottom
  if (/side_control_bottom/.test(id)) return { foundation: 'side_control_bottom' };

  // Full Mount Bottom
  if (/mount_bottom/.test(id)) return { foundation: 'full_mount_bottom' };

  // Rear Mount Bottom
  if (/back_mount_bottom|rear_mount_bottom|back_control_bottom/.test(id)) return { foundation: 'rear_mount_bottom' };

  // Transition states - map to closest related foundation with annotation
  if (cat === 'transition_state') {
    // Heuristic: if leads_to includes back control treat as turtle_top transitional
    if (position.system.leads_to_position_ids.some(x => /back_control/.test(x))) {
      return { foundation: 'turtle_top', transitional_target: 'rear_mount_top', notes: 'Transition toward back control' };
    }
    return { foundation: 'neutral', notes: 'General transition state' };
  }

  // Leg entanglements default to guard_bottom unless symmetrical already handled
  if (cat === 'leg_entanglement') return { foundation: 'guard_bottom' };

  // Advanced guard / hybrid default to guard_bottom
  if (cat === 'advanced_guard' || cat === 'hybrid') return { foundation: 'guard_bottom' };

  // Fallback neutral
  return { foundation: 'neutral', notes: 'Default classification fallback' };
}

const mapping = { generated_at: new Date().toISOString(), foundations: {} };
Object.entries(db.positions).forEach(([id, position]) => {
  const result = classify(id, position);
  mapping.foundations[id] = {
    position_id: id,
    foundation: result.foundation,
    rank: foundationRanks[result.foundation],
    transitional_target: result.transitional_target,
    notes: result.notes,
  };
});

fs.writeFileSync('data/foundation-mapping.json', JSON.stringify(mapping, null, 2));
console.log('Foundation mapping generated for', Object.keys(mapping.foundations).length, 'positions');
