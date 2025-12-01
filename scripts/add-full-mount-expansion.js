#!/usr/bin/env node
/*
  Adds new full-mount related positions (top & bottom variants) with rich belt content.
*/

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const dbPath = path.join(root, 'data', 'bjj-database.json');
const mapPath = path.join(root, 'data', 'foundation-mapping.json');

function load(p){ return JSON.parse(fs.readFileSync(p,'utf8')); }
function save(p,data){ fs.writeFileSync(p, JSON.stringify(data, null, 2)); }
function backup(p){ const dir=path.dirname(p); const base=path.basename(p, '.json'); return path.join(dir, `${base}.backup.${new Date().toISOString().replace(/[:.]/g,'-')}.json`);} 

const additions = [
  createPosition({
    id: 'high_mount_bottom',
    display: 'High Mount (Bottom)',
    foundation: 'full_mount_bottom',
    rank: 12,
    category: 'bottom_control',
    min_belt: 'purple',
    description: 'Opponent has climbed into high mount, isolating your elbows above shoulder line.',
    key_concepts: [
      'Rebuild elbow-knee connection',
      'Frame on hips to slide body down',
      'Threaten to trap posts before bridging'
    ],
    entry_steps: [
      'Opponent walks knees toward your shoulders',
      'Arms are forced high, exposing isolation threats'
    ],
    maintenance_steps: [
      'Keep hands protecting neck',
      'Create wedges under opponent’s thighs',
      'Bridge and shrimp combo to drop them to mid-mount'
    ],
    escape_overview: 'Free one elbow, slide hips down, then re-enter elbow-knee escape or trap-and-roll chains.',
    common_mistakes_learning: [
      'Pushing opponent straight up',
      'Leaving arms extended for americana/armbar traps'
    ],
    goals: [
      'Return to standard mount lines',
      'Regain half or closed guard'
    ],
    belts: beltContent({
      white: {
        concepts: [
          'Keep chin tucked and hands protecting neck',
          'Hips active even when arms are trapped'
        ],
        details: [
          'Turn palms toward opponent’s knees to create wedges',
          'Bridge diagonally to off-balance before shrimp'
        ],
        mistakes: [
          'Exploding without isolating an arm',
          'Allowing elbows to drift outside'
        ],
        transitions: ['full_mount_bottom','half_guard_bottom']
      },
      blue: {
        concepts: [
          'Frame underneath opponent’s thighs',
          'Mix trap-and-roll with elbow-knee recovery'
        ],
        details: [
          'Use knee-to-elbow insert to catch half guard',
          'Rock side to side before committing to direction'
        ],
        mistakes: [
          'Trying to bench press opponent',
          'Leaving space for mounted triangle'
        ],
        transitions: ['half_guard_bottom','closed_guard_bottom']
      },
      purple: {
        concepts: [
          'Sequence frames: hips, ribs, then elbow',
          'Use hip heist to drop opponent back to midline'
        ],
        details: [
          'Sticky elbow grip on opponent’s knee seam',
          'Snap bridge timed with hip escape'
        ],
        mistakes: [
          'Giving up underhook without frames',
          'Rolling belly-down when hips pinned'
        ],
        transitions: ['half_guard_bottom','deep_half_guard','turtle_bottom']
      },
      brown: {
        concepts: [
          'Combine underhook pummels with knee shields',
          'Set traps for mounted triangle counters'
        ],
        details: [
          'Grip sequence: wrist, tricep, hip before bump',
          'Load opponent forward to catch leg entanglement entries'
        ],
        mistakes: [
          'Overcommitting to single escape pathway',
          'Failing to address cross-face hand fighting'
        ],
        transitions: ['single_leg_x','deep_half_guard','turtle_bottom']
      },
      black: {
        concepts: [
          'Flow between false-reap style hip inserts and upa traps',
          'Bait leg attacks to initiate scrambles'
        ],
        details: [
          'Hand fight to expose base before inversion',
          'Enter double-seated guards when opponent bases narrowly'
        ],
        mistakes: [
          'Chasing low-percentage inversions without grips',
          'Ignoring opponent’s lapel controls'
        ],
        transitions: ['false_reap','reverse_x','standing_neutral']
      }
    })
  }),
  createPosition({
    id: 's_mount_bottom',
    display: 'S-Mount (Bottom)',
    foundation: 'full_mount_bottom',
    rank: 12,
    category: 'bottom_control',
    min_belt: 'brown',
    description: 'Opponent turns knees along your shoulders, isolating one arm while hunting armlocks and chokes.',
    key_concepts: [
      'Hide the isolated arm',
      'Rotate hips to keep shoulder line flat',
      'Create space under trapped knee'
    ],
    entry_steps: [
      'Opponent climbs to S-mount after breaking elbows apart',
      'Your arm is threaded between their legs'
    ],
    maintenance_steps: [
      'Scoot hips underneath opponent’s heel',
      'Frame at hips and armpit simultaneously',
      'Angle chin toward trapped arm'
    ],
    escape_overview: 'Protect elbow, rotate shoulders, then slide knee between to re-guard or come to turtle.',
    common_mistakes_learning: [
      'Trying to rip arm free with strength',
      'Turning belly-down exposing back'
    ],
    goals: [
      'Recover guard before submission fully locked',
      'Transition to turtle with immediate hand fighting'
    ],
    belts: beltContent({
      white: {
        concepts: [
          'Two-on-one grip on isolated arm',
          'Bridge to lighten opponent’s weight'
        ],
        details: [
          'Grab own bicep to protect elbow',
          'Tuck elbow to ribs before movement'
        ],
        mistakes: [
          'Straightening arm into americana',
          'Letting opponent walk knees higher'
        ],
        transitions: ['full_mount_bottom']
      },
      blue: {
        concepts: [
          'Turn toward the trapped arm side',
          'Use leg pummels to block their heel'
        ],
        details: [
          'Catch opponent’s ankle with shin',
          'Bridge then shrimp to wedge knee inside'
        ],
        mistakes: [
          'Rolling away without frames',
          'Giving underhook to far arm'
        ],
        transitions: ['half_guard_bottom','turtle_bottom']
      },
      purple: {
        concepts: [
          'Connect elbow to hip while scooting',
          'Switch between elbow-knee recovery and technical stand'
        ],
        details: [
          'Use C-grip on opponent’s far knee',
          'Insert shin shield before turning'
        ],
        mistakes: [
          'Waiting for submission grip to lock',
          'Overcommitting to single direction'
        ],
        transitions: ['half_guard_bottom','deep_half_guard','turtle_bottom']
      },
      brown: {
        concepts: [
          'Beat knee line, then hand fight',
          'Set traps for leg entries as opponent dismounts'
        ],
        details: [
          'Thread underhook to come to single leg',
          'Use reverse shrimp to capture ashi'
        ],
        mistakes: [
          'Failing to control opponent’s posted hand',
          'Allowing cross-collar grip to settle'
        ],
        transitions: ['single_leg_x','butterfly_guard','turtle_bottom']
      },
      black: {
        concepts: [
          'Transition directly to leg entanglement scrambles',
          'Bait mounted crucifix attempts to spin under'
        ],
        details: [
          'Invert along trapped arm to enter false reap',
          'Use double-inside leg pummels to exit'
        ],
        mistakes: [
          'Giving up double wrist control',
          'Not clearing lapel feed before rolling'
        ],
        transitions: ['false_reap','reverse_x','standing_neutral']
      }
    })
  }),
  createPosition({
    id: 'mounted_crucifix_bottom',
    display: 'Mounted Crucifix (Bottom)',
    foundation: 'full_mount_bottom',
    rank: 12,
    category: 'bottom_control',
    min_belt: 'black',
    description: 'Opponent traps your arm with legs while mounting high over shoulders, attacking chokes and armbars simultaneously.',
    key_concepts: [
      'Protect trapped arm and neck simultaneously',
      'Rotate hips to free shoulder line',
      'Address lapel grips before escaping'
    ],
    entry_steps: [
      'Opponent isolates arm and steps over head',
      'Leg lace captures near-side arm'
    ],
    maintenance_steps: [
      'Bridge into opponent to slacken grip',
      'Thread free hand to relieve lapel pressure',
      'Look to turtle with immediate head protection'
    ],
    escape_overview: 'Turn toward trapped arm, free elbow, then re-guard or stand via technical rise.',
    common_mistakes_learning: [
      'Rolling away exposing back',
      'Ignoring lapel feed until choke locked'
    ],
    goals: [
      'Survive initial choke threat',
      'Reclaim elbow line to resume guard recovery'
    ],
    belts: beltContent({
      white: beltSimple('Stay calm, protect neck, reconnect elbow to ribs', 'Trap opponent’s posting hand before bridging', 'Turning belly-down'),
      blue: beltSimple('Peel lapel hand before movement', 'Use pendulum bridge to slacken hook', 'Letting opponent switch to armbar'),
      purple: beltSimple('Use reverse shrimp to free shoulder', 'Head frames near opponent’s hip to create space', 'Allowing opponent to scoop second arm'),
      brown: beltSimple('Transition directly to turtle with seatbelt awareness', 'Collect opponent’s knee for single-leg exit', 'Ignoring far-side hook while turning'),
      black: beltSimple('Counter-attack with false reap entries mid-escape', 'Invert under opponent when they post hands', 'Giving up second arm for crucifix finish', ['false_reap','standing_neutral','turtle_bottom'])
    }, ['half_guard_bottom','turtle_bottom'])
  }),
  createPosition({
    id: 'high_mount_top',
    display: 'High Mount Control',
    foundation: 'full_mount_top',
    rank: 2,
    category: 'top_control',
    min_belt: 'purple',
    description: 'Climbing knees near opponent’s shoulders to isolate arms and launch armlocks/chokes.',
    key_concepts: [
      'Control head and elbows',
      'Climb gradually to avoid being bridged',
      'Isolate one arm at a time'
    ],
    entry_steps: [
      'From standard mount, walk knees up the mat',
      'Win double under-hooks on arms'
    ],
    maintenance_steps: [
      'Hook over shoulders to stop elbow recovery',
      'Switch hips to follow bridging',
      'Feed lapel grips high'
    ],
    escape_overview: 'Opponent must drop you back toward hips or regain underhooks',
    common_mistakes_learning: [
      'Climbing too fast and losing base',
      'Leaving feet crossed'
    ],
    goals: [
      'Set up mounted triangle, armbars, or back takes',
      'Dominate hand fighting battles'
    ],
    belts: beltContent({
      white: beltBlock('Pin opponent’s elbows to mat', 'Post hands wide when climbing', 'Leaning over opponent’s head', ['mount','technical_mount']),
      blue: beltBlock('Walk knees while windshield-wipering feet', 'Switch to gift-wrap control when arm turns', 'Leaving hips too light', ['back_control','technical_mount']),
      purple: beltBlock('Layer lapel feeds with cross-face', 'Drop chest to follow bridges', 'Overcommitting both hands to one arm', ['s_mount_top','arm_trapped_back_mount']),
      brown: beltBlock('Chain between smother pressure and gift-wrap', 'Kill near-side underhook before isolating arm', 'Ignoring opponent’s hip bump timing', ['s_mount_top','back_control']),
      black: beltBlock('Bait elbow escapes to enter back exposure series', 'Use floating transitions into mounted crucifix', 'Allowing opponent to reframe knees', ['back_control','floating_mount_transitions'])
    })
  }),
  createPosition({
    id: 's_mount_top',
    display: 'S-Mount Control',
    foundation: 'full_mount_top',
    rank: 2,
    category: 'top_control',
    min_belt: 'brown',
    description: 'High mount variation with knee wedged beside opponent’s head, isolating an arm for armlocks/chokes.',
    key_concepts: [
      'Trap arm with shin and thigh',
      'Stay heavy toward opponent’s hips',
      'Control far shoulder for balance'
    ],
    entry_steps: [
      'From high mount, slide knee to ear line',
      'Scoot opposite leg toward armpit'
    ],
    maintenance_steps: [
      'Clamp knees to remove space',
      'Monitor opponent’s bridge direction',
      'Pin wrist before attacking'
    ],
    escape_overview: 'Opponent must free elbow or turn to turtle',
    common_mistakes_learning: ['Leaning over isolated arm','Letting opponent’s hips elevate you'],
    goals: ['Finish armbar/triangle', 'Transition to back or mounted crucifix'],
    belts: beltContent({
      white: beltBlock('Keep hips heavy when isolating arm','Post opposite hand for balance','Switching too early without control',['mount']),
      blue: beltBlock('Staple wrist before stepping over head','Use gift-wrap to expose back','Letting opponent underhook supporting leg',['back_control','high_mount_top']),
      purple: beltBlock('Angle torso toward opponent’s legs','Feed lapel for Ezekiel setups','Ignoring opponent’s bridge direction',['technical_mount','back_control']),
      brown: beltBlock('Switch between s-mount and mounted triangle','Hide foot behind opponent’s spine','Leaving gap for knee-elbow escape',['mounted_crucifix_top','back_control']),
      black: beltBlock('Float between armbar, omoplata, and leg entries','Use reverse sit to maintain hooks','Allowing opponent to invert under you',['floating_mount_transitions','back_control'])
    })
  }),
  createPosition({
    id: 'floating_mount_transitions',
    display: 'Floating Mount Transitions',
    foundation: 'full_mount_top',
    rank: 2,
    category: 'top_control',
    min_belt: 'black',
    description: 'Dynamic mount style using windshield-wiper knees to hover over hips, switching between mount, back, and leg entanglements.',
    key_concepts: [
      'Constant weight shifts',
      'Knee windshield-wipers to follow frames',
      'Threaten multiple submissions simultaneously'
    ],
    entry_steps: [
      'From standard or high mount, post hands and lighten knees',
      'Swing knees to track opponent’s frames'
    ],
    maintenance_steps: [
      'Float hips to the opposite side of opponent’s frames',
      'Drop knee wedges when opponent exposes underhook',
      'Switch to technical mount on overreactions'
    ],
    escape_overview: 'Opponent must win underhooks or create chaotic scramble to upset balance',
    common_mistakes_learning: ['Hovering too long without control','Giving up knee line for half guard'],
    goals: ['Seamless transitions to back, leg entanglements, or arm isolates'],
    belts: beltContent({
      white: beltBlock('Maintain chest contact even when floating','Use wide hand posts','Standing too tall and getting swept',['mount']),
      blue: beltBlock('Switch knees with windshield-wiper motion','Drop hips when opponent bridges','Giving both underhooks',['technical_mount','back_control']),
      purple: beltBlock('Enter knee-slide to back-take chains','Use cross-face to kill frames mid-float','Overcommitting weight to one side',['back_control','s_mount_top']),
      brown: beltBlock('Blend leg entries when opponent opens elbows','Trap far arm before switching sides','Failing to reset hips after near sweep',['mounted_crucifix_top','false_reap']),
      black: beltBlock('Cycle between mount, back, 4/11, and body triangle seamlessly','Use tempo changes to bait reactions','Pausing mid-transition without grips',['back_control','false_reap','standing_neutral'])
    })
  })
];

function beltContent(def){
  const belts = ['white','blue','purple','brown','black'];
  const out = {};
  for (const belt of belts) {
    const data = def[belt];
    let concepts = data?.concepts || [];
    let details = data?.details || [];
    let mistakes = data?.mistakes || [];
    let transitions = data?.transitions || [];
    out[belt] = {
      concepts,
      techniques: [],
      common_mistakes: mistakes,
      key_details: details,
      transitions_available: transitions,
      prerequisites: []
    };
  }
  return out;
}

function beltBlock(conceptLine, detailLine, mistakeLine, transitions){
  return {
    concepts: Array.isArray(conceptLine) ? conceptLine : [conceptLine],
    details: Array.isArray(detailLine) ? detailLine : [detailLine],
    mistakes: Array.isArray(mistakeLine) ? mistakeLine : [mistakeLine],
    transitions: transitions || []
  };
}

function beltSimple(conceptLine, detailLine, mistakeLine, transitions){
  return beltBlock(conceptLine, detailLine, mistakeLine, transitions);
}

function createPosition({ id, display, foundation, rank, category, min_belt, description, key_concepts, entry_steps, maintenance_steps, escape_overview, common_mistakes_learning, goals, belts }) {
  return {
    id,
    display,
    foundation,
    rank,
    category,
    min_belt,
    description,
    key_concepts,
    entry_steps,
    maintenance_steps,
    escape_overview,
    common_mistakes_learning,
    goals,
    belts
  };
}

function convert(position) {
  return {
    belt_levels: position.belts,
    techniques: [],
    transitions: [],
    system: {
      position_id: position.id,
      min_belt: position.min_belt,
      category: position.category,
      opponent_relative: position.category === 'top_control' ? ['on_top'] : ['pinned'],
      stability_score: position.category === 'top_control' ? 5 : 4,
      movement_directions_allowed: position.category === 'top_control'
        ? ['forward_pressure','lateral_shift','rotational']
        : ['backward_retreat','rotational','lateral_shift'],
      allowed_technique_ids: [],
      leads_to_position_ids: [],
      entry_from_position_ids: [],
      risk_level: position.category === 'top_control' ? 'low' : 'high'
    },
    learning: {
      display_name: position.display,
      alternate_names: [],
      description: position.description,
      key_concepts: position.key_concepts,
      entry_steps: position.entry_steps,
      maintenance_steps: position.maintenance_steps,
      escape_overview: position.escape_overview,
      common_mistakes: position.common_mistakes_learning,
      goals: position.goals
    },
    __foundation: position.foundation,
    __rank: position.rank
  };
}

function main(){
  const db = load(dbPath);
  const mapping = load(mapPath);

  const additionsConverted = additions.map(convert);
  const created = [];
  const skipped = [];

  for (const add of additionsConverted) {
    if (db.positions[add.system.position_id]) {
      skipped.push(add.system.position_id);
      continue;
    }
    db.positions[add.system.position_id] = add;
    created.push(add.system.position_id);
    mapping.foundations[add.system.position_id] = {
      position_id: add.system.position_id,
      foundation: add.__foundation,
      rank: add.__rank
    };
    delete add.__foundation;
    delete add.__rank;
  }

  console.log('Created:', created.length, 'Skipped:', skipped.length);
  created.forEach(id=>console.log(' +', id));
  skipped.forEach(id=>console.log(' (skip)', id));

  const dbBackup = backup(dbPath);
  const mapBackup = backup(mapPath);
  save(dbBackup, load(dbPath));
  save(mapBackup, load(mapPath));
  save(dbPath, db);
  save(mapPath, mapping);
  console.log('Backups at', dbBackup, 'and', mapBackup);
}

main();
