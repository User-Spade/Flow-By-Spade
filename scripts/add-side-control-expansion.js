#!/usr/bin/env node
/*
  Side Control Expansion
  - Adds advanced side-control top & bottom variants to satisfy belt ramp requirements.
*/

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const dbPath = path.join(root, 'data', 'bjj-database.json');
const mapPath = path.join(root, 'data', 'foundation-mapping.json');

const BELTS = ['white', 'blue', 'purple', 'brown', 'black'];

const DEFAULT_TRANSITIONS = [];

function load(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function save(p, data) {
  fs.writeFileSync(p, JSON.stringify(data, null, 2));
}

function backupPath(p) {
  const dir = path.dirname(p);
  const base = path.basename(p, '.json');
  return path.join(dir, `${base}.backup.${new Date().toISOString().replace(/[:.]/g, '-')}.json`);
}

function beltBlock(concepts, details, mistakes, transitions = DEFAULT_TRANSITIONS) {
  return {
    concepts: Array.isArray(concepts) ? concepts : [concepts],
    details: Array.isArray(details) ? details : [details],
    mistakes: Array.isArray(mistakes) ? mistakes : [mistakes],
    transitions: transitions
  };
}

function makeBelts(spec) {
  const out = {};
  for (const belt of BELTS) {
    const data = spec[belt] || {};
    out[belt] = {
      concepts: data.concepts || [],
      techniques: [],
      common_mistakes: data.mistakes || [],
      key_details: data.details || [],
      transitions_available: data.transitions || [],
      prerequisites: []
    };
  }
  return out;
}

function createPosition(cfg) {
  const isTop = cfg.category === 'top_control';
  return {
    belt_levels: cfg.belts,
    techniques: [],
    transitions: [],
    system: {
      position_id: cfg.id,
      min_belt: cfg.min_belt,
      category: cfg.category,
      opponent_relative: cfg.opponent_relative || (isTop ? ['on_top', 'perpendicular'] : ['on_bottom', 'pinned']),
      stability_score: cfg.stability_score ?? (isTop ? 4 : 3),
      movement_directions_allowed: cfg.movement || (isTop ? ['forward_pressure', 'lateral_shift'] : ['hip_movement', 'lateral_shift']),
      allowed_technique_ids: [],
      leads_to_position_ids: cfg.leads || [],
      entry_from_position_ids: cfg.entries || [],
      risk_level: cfg.risk || (isTop ? 'low' : 'high')
    },
    learning: {
      display_name: cfg.display,
      alternate_names: cfg.altNames || [],
      description: cfg.description,
      key_concepts: cfg.key_concepts,
      entry_steps: cfg.entry_steps,
      maintenance_steps: cfg.maintenance_steps,
      escape_overview: cfg.escape_overview,
      common_mistakes: cfg.common_mistakes_learning,
      goals: cfg.goals
    },
    __foundation: cfg.foundation,
    __rank: cfg.rank
  };
}

const additions = [
  // --- Bottom Variants ---
  createPosition({
    id: 'side_control_bottom_underhook_chain',
    display: 'Underhook Pummel Reguard',
    foundation: 'side_control_bottom',
    rank: 11,
    category: 'bottom_control',
    min_belt: 'purple',
    opponent_relative: ['on_bottom', 'inside_underhook'],
    movement: ['hip_movement', 'lateral_shift'],
    leads: ['half_guard_bottom', 'deep_half_guard', 'closed_guard_bottom'],
    entries: ['side_control_bottom', 'kesa_gatame_bottom'],
    risk: 'medium',
    description: 'Escaping side control by digging a far-side underhook, getting on your side, and building up to rechase half guard or a single-leg style dogfight.',
    key_concepts: [
      'Frame first, pummel second',
      'Elbow-knee connection buys the space to move',
      'Use the underhook to come up or reguard'
    ],
    entry_steps: [
      'Create frames on neck and hip to stop pressure',
      'Turn to your side and dig far-side underhook',
      'Slide knee inside while walking hips away'
    ],
    maintenance_steps: [
      'Hide your head under opponent’s chest as you pummel',
      'Clamp underhook elbow tight to ribs',
      'Connect elbow to knee before scooting back underneath'
    ],
    escape_overview: 'Use the underhook to off-balance, insert your knee line, and recover to half guard, deep half, or seated dogfight situations.',
    common_mistakes_learning: [
      'Trying to pummel while flat on your back',
      'Leaving frames behind which lets opponent crossface',
      'Coming up to knees without clearing whizzer'
    ],
    goals: [
      'Win the far-side underhook battle',
      'Insert knee shield to recover guard',
      'Stand up or sweep once underhook established'
    ],
    belts: makeBelts({
      white: beltBlock(
        [
          'Frame before digging for underhooks',
          'Stay on your side, not flat'
        ],
        [
          'Slide elbow to mat before reaching',
          'Use knee-to-elbow connection to shield'
        ],
        [
          'Reaching with arm while flat',
          'Turning away from opponent'
        ],
        ['half_guard_bottom']
      ),
      blue: beltBlock(
        [
          'Fight crossface before attacking far arm',
          'Use bridge-then-shrimp timing'
        ],
        [
          'Connect elbow to knee before inserting hook'
        ],
        [
          'Pummeling without controlling opponent’s hips'
        ],
        ['half_guard_bottom', 'closed_guard_bottom']
      ),
      purple: beltBlock(
        [
          'Chain underhook to knee shield or dogfight',
          'Monitor whizzer pressure during build up'
        ],
        [
          'Head stays tucked under opponent’s chin'
        ],
        [
          'Letting opponent post the far leg to kill hip escape'
        ],
        ['half_guard_bottom', 'deep_half_guard', 'turtle_bottom']
      ),
      brown: beltBlock(
        [
          'Switch between inside knee shield and reverse de la Riva when space opens'
        ],
        [
          'Use belt/lat grips to stand once underhook is won'
        ],
        [
          'Coming up without clearing collar grips'
        ],
        ['half_guard_bottom', 'deep_half_guard', 'standing_neutral']
      ),
      black: beltBlock(
        [
          'Turn underhook winnings into immediate sweep threats',
          'Float into backside 50/50 if opponent whizzers hard'
        ],
        [
          'Transition from dogfight to leg entanglements smoothly'
        ],
        [
          'Hanging under opponent’s sprawl without re-guard path'
        ],
        ['deep_half_guard', 'reverse_x', 'standing_neutral']
      )
    })
  }),
  createPosition({
    id: 'side_control_bottom_turtle_chain',
    display: 'Turtle Granby Recovery',
    foundation: 'side_control_bottom',
    rank: 11,
    category: 'bottom_control',
    min_belt: 'brown',
    opponent_relative: ['on_bottom', 'transitioning'],
    movement: ['rolling', 'sitting_back'],
    leads: ['turtle_bottom', 'standing_neutral', 'closed_guard_bottom'],
    entries: ['side_control_bottom', 'north_south'],
    risk: 'high',
    description: 'Chain that turns framed side-control escapes into turtle, granby rolls, or sit-up guard recoveries without conceding hooks.',
    key_concepts: [
      'Protect neck while exposing hips to move',
      'Use turtle as a waypoint, not the destination',
      'Roll only after clearing near-side knee'
    ],
    entry_steps: [
      'Frame and turn toward opponent to create inside space',
      'Thread near-side knee under their hip',
      'Build to turtle as you clear crossface'
    ],
    maintenance_steps: [
      'Hide elbows to prevent seatbelt grabs',
      'Granby only when their weight is forward',
      'Sit back to guard the moment hooks appear'
    ],
    escape_overview: 'Use turtle to force reactions, then granby or sit through to guard/standing scrambles.',
    common_mistakes_learning: [
      'Rolling while opponent still controls hip',
      'Leaving arm behind leading to kimura traps',
      'Pausing in turtle without winning hand fight'
    ],
    goals: [
      'Convert side control pressure into movement',
      'Arrive in turtle with frames already established',
      'Exit turtle into guard, single legs, or leg locks'
    ],
    belts: makeBelts({
      white: beltBlock(
        [
          'Protect your neck before turning to turtle',
          'Knees and elbows stay glued'
        ],
        [
          'Frame with forearms before sitting up'
        ],
        [
          'Turning away and giving back exposure'
        ],
        ['turtle_bottom']
      ),
      blue: beltBlock(
        [
          'Only roll when you control opponent’s wrist',
          'Use Granby to land on knees, not shoulders'
        ],
        [
          'Clear near-side hook before rolling'
        ],
        [
          'Reaching with outside arm during roll'
        ],
        ['turtle_bottom', 'closed_guard_bottom']
      ),
      purple: beltBlock(
        [
          'Combine turtle sit-outs with knee-elbow recovery',
          'Re-grip collar before initiating granby'
        ],
        [
          'Head hides behind near knee as you roll'
        ],
        [
          'Rolling backwards without blocking hooks'
        ],
        ['turtle_bottom', 'closed_guard_bottom', 'standing_neutral']
      ),
      brown: beltBlock(
        [
          'Flow from turtle to sit-up guard, then to single-leg or loop choke threats'
        ],
        [
          'Use wrist control to drag opponent past you'
        ],
        [
          'Letting opponent chase crucifix during granby'
        ],
        ['standing_neutral', 'closed_guard_bottom', 'half_guard_bottom']
      ),
      black: beltBlock(
        [
          'Granby directly into kiss-of-the-dragon or crab-ride chains',
          'Counter-attack with immediate leg entries'
        ],
        [
          'Invert under their posted leg to take back'
        ],
        [
          'Trying flashy rolls without clearing grips first'
        ],
        ['standing_neutral', 'false_reap', 'turtle_bottom']
      )
    })
  }),
  createPosition({
    id: 'side_control_bottom_inversion_chain',
    display: 'Inverted Leg Pummel Reguard',
    foundation: 'side_control_bottom',
    rank: 11,
    category: 'bottom_control',
    min_belt: 'black',
    opponent_relative: ['on_bottom', 'inverting'],
    movement: ['inverting', 'hip_movement'],
    leads: ['inverted_guard', 'reverse_de_la_riva', 'false_reap'],
    entries: ['side_control_bottom', 'knee_on_belly'],
    risk: 'high',
    description: 'Advanced inversion sequence that threads legs back inside opponent’s hip line to re-enter modern guards or leg entanglements.',
    key_concepts: [
      'Clear crossface and far hip before inverting',
      'Leg pummels replace frames once shoulders spin',
      'End inverted but connected to opponent’s leg line'
    ],
    entry_steps: [
      'Frame and hip escape to create inside space',
      'Catch far hip with shin while far leg circles overhead',
      'Invert toward opponent’s legs and reinsert hooks'
    ],
    maintenance_steps: [
      'Hide head near opponent’s thigh to avoid chokes',
      'Clamp both ankles before sitting back to guard',
      'Angle hips to shoot into leg entanglement of choice'
    ],
    escape_overview: 'Spin underneath to re-guard or enter leg attacks without absorbing top pressure.',
    common_mistakes_learning: [
      'Inverting without first breaking collar/crossface grips',
      'Leaving arms behind which exposes kimuras',
      'Pausing upside down with no leg entanglement planned'
    ],
    goals: [
      'Return to aggressive guard positions',
      'Threaten leg locks immediately after inversion',
      'Use inversion to create back exposure chances'
    ],
    belts: makeBelts({
      white: beltBlock(
        [
          'Master basic shrimp escapes before trying inversions'
        ],
        [
          'Always protect neck before spinning'
        ],
        [
          'Attempting advanced spins without structure'
        ],
        ['side_control_bottom']
      ),
      blue: beltBlock(
        [
          'Only invert once crossface is cleared'
        ],
        [
          'Keep elbows tight as you spin'
        ],
        [
          'Rolling blindly without gripping ankles'
        ],
        ['turtle_bottom', 'open_guard_bottom']
      ),
      purple: beltBlock(
        [
          'Use shin-on-bicep or knee shield before entering inversion'
        ],
        [
          'Catch far hip with inside leg as you rotate'
        ],
        [
          'Letting opponent follow to north-south'
        ],
        ['inverted_guard', 'reverse_de_la_riva']
      ),
      brown: beltBlock(
        [
          'Switch between kiss-of-the-dragon, matrix, or saddle entries mid inversion'
        ],
        [
          'Control opponent’s ankle with both hands before sitting back'
        ],
        [
          'Leaving torso exposed to d’arce attempts'
        ],
        ['reverse_de_la_riva', 'false_reap', 'saddle']
      ),
      black: beltBlock(
        [
          'Invert directly into backside 50/50 or double-trouble',
          'Use leg pummels to chase back takes if opponent retreats'
        ],
        [
          'Float between leg entanglement and crab-ride as opponent turns'
        ],
        [
          'Settling for guard without immediate attacks'
        ],
        ['false_reap', 'double_trouble', 'standing_neutral']
      )
    })
  }),

  // --- Top Variants ---
  createPosition({
    id: 'reverse_kesa_side_control',
    display: 'Reverse Kesa Side Control',
    foundation: 'side_control_top',
    rank: 3,
    category: 'top_control',
    min_belt: 'brown',
    opponent_relative: ['on_top', 'reverse_kesa'],
    movement: ['lateral_shift', 'rotational'],
    leads: ['mount', 'back_control', 's_mount_top', 'north_south'],
    entries: ['side_control', 'knee_on_belly', 'north_south'],
    risk: 'medium',
    description: 'Hip-switch side control variation facing opponent’s legs to trap their near arm while hunting spinning arm locks and mount entries.',
    key_concepts: [
      'Switch hips without letting chest lose contact',
      'Kill near arm before letting opponent frame',
      'Rotate back to standard side control when needed'
    ],
    entry_steps: [
      'From standard side control, windshield-wiper hips to face legs',
      'Thread far arm under opponent’s near arm to trap it',
      'Walk hips toward opponent’s head to keep pressure'
    ],
    maintenance_steps: [
      'Anchor far hip with elbow/lat connection',
      'Use far-side underhook to monitor opponent’s hip turn',
      'Float between reverse kesa and north-south to chase reactions'
    ],
    escape_overview: 'Opponent must free trapped arm and re-insert knee shield or turn to turtle.',
    common_mistakes_learning: [
      'Switching hips without clearing near-side elbow',
      'Leaning back and giving space for underhook',
      'Forgetting to monitor far hip allowing leg recoveries'
    ],
    goals: [
      'Trap near arm for gift-wrap and armlock chains',
      'Open paths to S-mount or back exposure',
      'Force opponent to turn giving north-south d’arce looks'
    ],
    belts: makeBelts({
      white: beltBlock(
        [
          'Stabilize regular side control before switching hips'
        ],
        [
          'Keep chest glued when rotating'
        ],
        [
          'Jumping to reverse without base'
        ],
        ['side_control']
      ),
      blue: beltBlock(
        [
          'Control near arm with your lat or hip'
        ],
        [
          'Post hand near head to balance'
        ],
        [
          'Leaving hips too far from opponent’s shoulder'
        ],
        ['north_south', 'mount']
      ),
      purple: beltBlock(
        [
          'Use reverse kesa to expose far-side underhook openings'
        ],
        [
          'Drive hips toward head to stop reguard'
        ],
        [
          'Allowing opponent to sit up into single-leg'
        ],
        ['mount', 's_mount_top', 'back_control']
      ),
      brown: beltBlock(
        [
          'Cycle reverse kesa, north-south, and standard side control based on frames'
        ],
        [
          'Feed near arm into gift-wrap before transitioning'
        ],
        [
          'Ignoring opponent’s far leg pummels'
        ],
        ['mount', 's_mount_top', 'back_control']
      ),
      black: beltBlock(
        [
          'Flow to arm triangles, wrist rides, or kneebar traps from reverse orientation'
        ],
        [
          'Use hip-switch to bait turtle then chase back'
        ],
        [
          'Staying in reverse kesa after opponent recovers frames'
        ],
        ['s_mount_top', 'back_control', 'north_south']
      )
    })
  }),
  createPosition({
    id: 'lapel_staple_side_control',
    display: 'Lapel Staple Side Control',
    foundation: 'side_control_top',
    rank: 3,
    category: 'top_control',
    min_belt: 'black',
    opponent_relative: ['on_top', 'lapel_trap'],
    movement: ['forward_pressure', 'lateral_shift'],
    leads: ['back_control', 'arm_trapped_back_mount', 's_mount_top', 'north_south'],
    entries: ['side_control', 'north_south', 'knee_on_belly'],
    risk: 'low',
    description: 'Dominant lapel-feeding side control where you staple opponent’s near arm with their own lapel to open relentless submission chains.',
    key_concepts: [
      'Feed lapel under opponent’s far arm before releasing crossface',
      'Stapled arm kills frames and exposes neck',
      'Keep hips mobile to follow shrimp attempts'
    ],
    entry_steps: [
      'Open near-side lapel and thread it under opponent’s armpit',
      'Pass lapel to far hand while shoulder driving head away',
      'Pin lapel to mat, stapling arm across their body'
    ],
    maintenance_steps: [
      'Keep lapel taut while knees windshield-wiper around hips',
      'Use free hand to hunt underhook or collar choke',
      'Switch to mount/back the moment opponent turns'
    ],
    escape_overview: 'Opponent must free stapled arm or re-guard before serious attacks arrive.',
    common_mistakes_learning: [
      'Letting lapel slack which frees the arm',
      'Leaning too far over head and losing base',
      'Forgetting to block near-side hip while feeding lapel'
    ],
    goals: [
      'Deny opponent’s frames entirely',
      'Create layered lapel submissions (paper-cutter, bow-and-arrow, Ezekiel)',
      'Transition to back or mount when they turn'
    ],
    belts: makeBelts({
      white: beltBlock(
        [
          'Win basic crossface/underhook before trying lapel feeds'
        ],
        [
          'Stay heavy while adjusting grips'
        ],
        [
          'Letting opponent sit up during lapel setup'
        ],
        ['side_control']
      ),
      blue: beltBlock(
        [
          'Feed lapel only after clearing near elbow',
          'Keep chest pressure during hand transfer'
        ],
        [
          'Use knee posted near hip for base'
        ],
        [
          'Giving lapel slack as you pass it'
        ],
        ['north_south', 'knee_on_belly']
      ),
      purple: beltBlock(
        [
          'Staple the arm then pin hip with shin to completely immobilize'
        ],
        [
          'Switch to paper-cutter or baseball choke when opponent turns'
        ],
        [
          'Reaching far collar and losing chest contact'
        ],
        ['s_mount_top', 'mount', 'back_control']
      ),
      brown: beltBlock(
        [
          'Layer lapel feed with gift-wrap or wrist control for traps'
        ],
        [
          'Walk around head to north-south to tighten lapel choke'
        ],
        [
          'Failing to adjust when opponent re-frames near hip'
        ],
        ['s_mount_top', 'back_control', 'arm_trapped_back_mount']
      ),
      black: beltBlock(
        [
          'Cycle between lapel staple, crucifix, and arm-trap back takes seamlessly'
        ],
        [
          'Use lapel to pull opponent into your knee line for easy mounts'
        ],
        [
          'Neglecting collar tension when transitioning'
        ],
        ['arm_trapped_back_mount', 'back_control', 'north_south']
      )
    })
  })
];

function main() {
  const db = load(dbPath);
  const mapping = load(mapPath);
  const created = [];
  const skipped = [];

  for (const pos of additions) {
    const id = pos.system.position_id;
    if (db.positions[id]) {
      skipped.push(id);
      continue;
    }
    db.positions[id] = { ...pos };
    mapping.foundations[id] = {
      position_id: id,
      foundation: pos.__foundation,
      rank: pos.__rank
    };
    delete db.positions[id].__foundation;
    delete db.positions[id].__rank;
    created.push(id);
  }

  console.log('Created', created.length, 'positions. Skipped', skipped.length);
  created.forEach((id) => console.log(' +', id));
  skipped.forEach((id) => console.log(' (skip)', id));

  const dbBackup = backupPath(dbPath);
  const mapBackup = backupPath(mapPath);
  save(dbBackup, load(dbPath));
  save(mapBackup, load(mapPath));
  save(dbPath, db);
  save(mapPath, mapping);
  console.log('Backups saved:');
  console.log(' ', dbBackup);
  console.log(' ', mapBackup);
}

main();
