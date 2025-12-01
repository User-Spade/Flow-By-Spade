#!/usr/bin/env node
/*
  Rear Mount Expansion
  - Adds advanced rear-mount top & bottom sub-positions with full belt content.
*/

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const dbPath = path.join(root, 'data', 'bjj-database.json');
const mapPath = path.join(root, 'data', 'foundation-mapping.json');

const BELTS = ['white','blue','purple','brown','black'];

function load(p){ return JSON.parse(fs.readFileSync(p,'utf8')); }
function save(p,data){ fs.writeFileSync(p, JSON.stringify(data, null, 2)); }
function backupPath(p){ const dir = path.dirname(p); const base = path.basename(p, '.json'); return path.join(dir, `${base}.backup.${new Date().toISOString().replace(/[:.]/g,'-')}.json`); }

function beltBlock(concepts, details, mistakes, transitions){
  return {
    concepts: Array.isArray(concepts) ? concepts : [concepts],
    details: Array.isArray(details) ? details : [details],
    mistakes: Array.isArray(mistakes) ? mistakes : [mistakes],
    transitions: transitions || []
  };
}

function makeBelts(spec){
  const out = {};
  for (const belt of BELTS) {
    const data = spec[belt];
    out[belt] = {
      concepts: data?.concepts || [],
      techniques: [],
      common_mistakes: data?.mistakes || [],
      key_details: data?.details || [],
      transitions_available: data?.transitions || [],
      prerequisites: []
    };
  }
  return out;
}

function createPosition(cfg){
  return {
    belt_levels: cfg.belts,
    techniques: [],
    transitions: [],
    system: {
      position_id: cfg.id,
      min_belt: cfg.min_belt,
      category: cfg.category,
      opponent_relative: cfg.category === 'top_control' ? ['behind','hooks_in'] : ['pinned','back_taken'],
      stability_score: cfg.category === 'top_control' ? 5 : 3,
      movement_directions_allowed: cfg.category === 'top_control'
        ? ['forward_pressure','rotational']
        : ['backward_retreat','rotational','lateral_shift'],
      allowed_technique_ids: [],
      leads_to_position_ids: [],
      entry_from_position_ids: [],
      risk_level: cfg.category === 'top_control' ? 'low' : 'high'
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
  // --- Top Control Variants ---
  createPosition({
    id: 'seatbelt_straightjacket_top',
    display: 'Straightjacket Seatbelt Control',
    foundation: 'rear_mount_top',
    rank: 1,
    category: 'top_control',
    min_belt: 'purple',
    description: 'Rear control variation emphasizing cross-wrist (straightjacket) grips to expose chokes and armlocks.',
    key_concepts: ['Pin both wrists before opening attacks','Keep chest glued as you feed grips','Use hip switches to follow escapes'],
    entry_steps: ['From back control, capture opponent’s top wrist with choking hand','Reach under far arm to grab secondary wrist','Pull wrists to midline to limit defense'],
    maintenance_steps: ['Shoulders glued behind opponent’s shoulders','Alternate hip pressure to follow scoots','Hide choking-arm elbow behind opponent’s shoulder'],
    escape_overview: 'Opponent must clear at least one trapped wrist before turning to face you.',
    common_mistakes_learning: ['Letting wrists drift away from torso','Leaning too far over shoulder and falling off'],
    goals: ['Dominate hand fighting battles','Create predictable reactions for RNC, bow-and-arrow, or armbar entries'],
    belts: makeBelts({
      white: beltBlock('Control wrists before attacking neck','Stay chest-to-back','Crossing feet during control',['back_control']),
      blue: beltBlock('Pull wrists to belly button to break defense','Switch hips when opponent slides to mat','Chasing choke without grip dominance',['body_triangle','back_control']),
      purple: beltBlock('Layer straightjacket grip with lapel feed','Use shoulder crunch to expose chin','Allowing wrist to slip out to far side',['body_triangle','seatbelt_trap_system_top']),
      brown: beltBlock('Trap one arm with leg while keeping wrists pinned','Threaten armbar when opponent straightens arm','Forgetting to follow hip escapes with hooks',['body_triangle','rear_triangle_trap_top']),
      black: beltBlock('Cycle between straightjacket, short choke, and wrist ride traps','Float chest-to-head when opponent granbys','Letting opponent re-grip your choking wrist',['floating_mount_transitions','rear_triangle_trap_top'])
    })
  }),
  createPosition({
    id: 'backpack_latstrap_top',
    display: 'Backpack Lat Strap Ride',
    foundation: 'rear_mount_top',
    rank: 1,
    category: 'top_control',
    min_belt: 'brown',
    description: 'Hybrid between rear mount and body lock where you ride diagonally with a lat strap and one hook, setting up rolling back takes.',
    key_concepts: ['Trap the lat line before rolling','Stay glued to opponent’s far hip','Switch between single and double hooks dynamically'],
    entry_steps: ['From turtle or standing back exposure, drop hook in and thread arm across lat','Roll to side keeping chest glued to shoulder line'],
    maintenance_steps: ['Keep far hook active while floating second leg','Use lat strap to pull opponent into lap','Switch to double underhooks if opponent sits up'],
    escape_overview: 'Opponent must clear lat strap or stand up to shake rider off.',
    common_mistakes_learning: ['Rolling without a hook','Letting lat grip slip to armpit'],
    goals: ['Seamless transition between turtle, mount, and back','Hunt bow-and-arrow, armbars, or leg entries mid scramble'],
    belts: makeBelts({
      white: beltBlock('Maintain chest contact when rolling','Always keep at least one hook','Rolling without grip control',['back_control']),
      blue: beltBlock('Use lat grip to pull opponent into lap','Follow granby attempts with opposite hook','Letting opponent clear hook before rolling',['body_triangle','back_control']),
      purple: beltBlock('Switch from seatbelt to lat strap depending on posture','Clamp knee behind opponent’s shoulder','Leaving hips too low on mat',['body_triangle','seatbelt_straightjacket_top']),
      brown: beltBlock('Connect lat strap to gift-wrap to expose collar','Spin to technical mount if opponent turns','Failing to chase head as opponent stands up',['s_mount_top','floating_mount_transitions']),
      black: beltBlock('Use lat strap to drop into saddle/false reap when opponent posts','Cycle between crab-ride and body triangle seamlessly','Pausing mid-roll without a hook',['floating_mount_transitions','false_reap'])
    })
  }),
  createPosition({
    id: 'rear_triangle_trap_top',
    display: 'Rear Triangle Trap',
    foundation: 'rear_mount_top',
    rank: 1,
    category: 'top_control',
    min_belt: 'black',
    description: 'Hooking both legs around opponent’s shoulder line to trap an arm/neck triangle while maintaining seatbelt pressure.',
    key_concepts: ['Isolate shoulder line before locking triangle','Angle hips diagonally behind opponent’s shoulder','Control far arm to prevent escapes'],
    entry_steps: ['From back control, feed leg over opponent’s shoulder','Lock triangle behind opponent’s back while keeping seatbelt'],
    maintenance_steps: ['Squeeze knees to keep arm trapped','Use overhook arm to lift opponent’s chin','Adjust angle by posting foot on mat'],
    escape_overview: 'Opponent must free trapped arm or rotate under triangle pressure.',
    common_mistakes_learning: ['Locking triangle without controlling secondary arm','Falling off the top side while adjusting angle'],
    goals: ['Finish rear triangle submissions','Transition to armbar/omoplata flows without losing back'],
    belts: makeBelts({
      white: beltBlock('Keep hooks before attempting leg traps','Control opponent’s shoulders','Trying submissions without control',['back_control']),
      blue: beltBlock('Swim foot over shoulder only after seatbelt secure','Angle hips off-center','Leaving opponent’s far arm free',['body_triangle','back_control']),
      purple: beltBlock('Feed lapel or wrist to prevent posture','Hide foot behind opponent’s spine','Allowing opponent to drop shoulders to mat',['body_triangle','seatbelt_straightjacket_top']),
      brown: beltBlock('Transition between triangle, armbar, and crucifix','Use off-hand to push opponent’s head forward','Letting opponent stack you during finish',['s_mount_top','floating_mount_transitions']),
      black: beltBlock('Float between rear triangle and backside 50/50 entries','Switch grips to hunt double trouble finishes','Releasing seatbelt before secondary controls',['floating_mount_transitions','false_reap'])
    })
  }),

  // --- Bottom Defensive Variants ---
  createPosition({
    id: 'body_triangle_escape_bottom',
    display: 'Body Triangle Escape Mechanics',
    foundation: 'rear_mount_bottom',
    rank: 13,
    category: 'bottom_control',
    min_belt: 'blue',
    description: 'Focused defense against tight body triangles, emphasizing hip clearing and foot battles.',
    key_concepts: ['Address choking hand while peeling lock','Turn toward lock to relieve pressure','Slide hips below opponent’s knee line'],
    entry_steps: ['Opponent locks body triangle from back control','Pressure compresses ribs limiting breathing'],
    maintenance_steps: ['Control top foot with both hands','Bridge toward lock to create slack','Knee pry to open figure-four'],
    escape_overview: 'Free the figure-four, then resume standard back escapes to half guard or turtle.',
    common_mistakes_learning: ['Trying to pry with fingers only','Rolling belly-down while lock is tight'],
    goals: ['Break lock safely','Return to guard while keeping neck protected'],
    belts: makeBelts({
      white: beltBlock('Protect neck before touching the lock','Breathe and stay calm','Focusing only on the legs',['rear_mount_bottom']),
      blue: beltBlock('Grab top foot and peel toward pinky toe','Bridge toward lock for slack','Letting opponent re-grab collar mid escape',['half_guard_bottom','turtle_bottom']),
      purple: beltBlock('Use knee pry with opposite leg','Switch between lock-side and safe-side escapes','Ignoring opponent’s secondary grips',['half_guard_bottom','closed_guard_bottom']),
      brown: beltBlock('Transition directly into leg entanglement counters','Stand when lock breaks to clear hooks','Failing to trap opponent’s arm during escape',['standing_neutral','false_reap']),
      black: beltBlock('Exploit lock breaks to enter backside 50/50 or saddle','Counter-attack immediately once hips clear','Staying static after unlocking legs',['false_reap','reverse_x'])
    })
  }),
  createPosition({
    id: 'straightjacket_defense_bottom',
    display: 'Straightjacket Defense System',
    foundation: 'rear_mount_bottom',
    rank: 13,
    category: 'bottom_control',
    min_belt: 'purple',
    description: 'Structured counters when opponent traps both wrists (straightjacket) from the back.',
    key_concepts: ['Fight top wrist first','Use elbow flare to break second grip','Hip escape as soon as one arm frees'],
    entry_steps: ['Opponent controls both wrists at chest','Choking arm hidden behind shoulder'],
    maintenance_steps: ['Peel top wrist with thumb strip','Drive elbow to mat to clear second control','Slide shoulders to mat the moment space opens'],
    escape_overview: 'Break double wrist control then resume standard back escapes.',
    common_mistakes_learning: ['Trying to free bottom wrist first','Turning away before wrists are separated'],
    goals: ['Keep neck safe','Regain individual wrist control quickly'],
    belts: makeBelts({
      white: beltBlock('Grab opponent’s knuckles not fingers','Stay tucked while peeling','Panicking and exposing neck',['rear_mount_bottom']),
      blue: beltBlock('Peel top wrist toward opposite pocket','Bridge as soon as grips weaken','Trying to spin without hook clearance',['half_guard_bottom']),
      purple: beltBlock('Use elbow wedge to clear second grip','Immediately pummel hand inside seatbelt','Letting opponent re-grip before shoulders move',['turtle_bottom','half_guard_bottom']),
      brown: beltBlock('Trap opponent’s arm with leg once freed','Turn into them for single-leg finish','Ignoring lapel feeds while hand fighting',['standing_neutral','half_guard_bottom']),
      black: beltBlock('Counter with immediate wrist control to attack kimuras','Invert when opponent re-reaches for wrists','Failing to secure sleeves before standing',['false_reap','standing_neutral'])
    })
  }),
  createPosition({
    id: 'rear_mount_granby_chain_bottom',
    display: 'Granby & Hip Heist Chain',
    foundation: 'rear_mount_bottom',
    rank: 13,
    category: 'bottom_control',
    min_belt: 'brown',
    description: 'Advanced sequence combining shoulder rolls, hip heists, and hook clears to turn into the opponent.',
    key_concepts: ['Clear hooks before rolling','Use granby to land on knees, not shoulders','Connect to single-leg or guard immediately'],
    entry_steps: ['Opponent loses one hook chasing choke','Space opens near far hip'],
    maintenance_steps: ['Clamp opponent’s arm before rolling','Roll over near shoulder while tucking chin','Come up on elbow then knees'],
    escape_overview: 'Use granby to face opponent, finishing in turtle, single-leg, or guard.',
    common_mistakes_learning: ['Rolling without clearing hook','Leaving arm trapped leading to armbar'],
    goals: ['Reverse into top position','Create scramble opportunities versus elite hooks'],
    belts: makeBelts({
      white: beltBlock('Clear foot before attempting roll','Protect neck while turning','Rolling blindly into choke',['rear_mount_bottom']),
      blue: beltBlock('Trap opponent’s arm before hip heist','Roll diagonally not straight back','Giving up underhook as you roll',['turtle_bottom']),
      purple: beltBlock('Link granby to sit-up guard upon landing','Grip pants/ankles during roll','Letting opponent follow with seatbelt intact',['turtle_bottom','half_guard_bottom']),
      brown: beltBlock('Chain granby into single-leg or kimura trap','Use hip heist to force scramble','Staying kneeling without underhooks',['standing_neutral','half_guard_bottom']),
      black: beltBlock('Invert to backside 50/50 when opponent re-hooks mid roll','Turn defense into immediate offense','Pausing mid roll allowing re-seatbelt',['false_reap','standing_neutral'])
    })
  }),
  createPosition({
    id: 'rear_mount_inversion_bottom',
    display: 'Inversion Backdoor Escape',
    foundation: 'rear_mount_bottom',
    rank: 13,
    category: 'bottom_control',
    min_belt: 'black',
    description: 'Elite-level counter that inverts under opponent’s hooks to enter leg entanglements or scramble out the back door.',
    key_concepts: ['Control opponent’s ankles before inverting','Tuck head to inside hip','Kick through aggressively once hips clear'],
    entry_steps: ['Opponent posts hands to attack collar','Hooks loosen creating inside space'],
    maintenance_steps: ['Clamp opponent’s ankle to hip','Invert on inside shoulder and thread legs','Spin to seated guard or leg entanglement'],
    escape_overview: 'Roll under opponent to exit behind them or attack legs.',
    common_mistakes_learning: ['Inverting without ankle control','Leaving neck exposed to short choke'],
    goals: ['Turn defense into immediate leg attack or scramble','Exit straight to standing if leg attacks fail'],
    belts: makeBelts({
      white: beltBlock('Master basic escapes before advanced spins','Protect neck first','Attempting inversion with hooks in place',['rear_mount_bottom']),
      blue: beltBlock('Drill shoulder stand mechanics safely','Only invert once hooks are loose','Rolling without grips',['turtle_bottom']),
      purple: beltBlock('Control ankle with both hands while tilting hips','Aim to land in seated guard','Letting opponent follow your hips',['false_reap']),
      brown: beltBlock('Connect inversion to backside 50/50 or crab ride','Switch to single-leg if opponent stands','Hanging upside down without plan',['reverse_x','standing_neutral']),
      black: beltBlock('Invert directly into double-trouble leg locks','Counterattack immediately on landing','Giving opponent chance to re-seat hooks',['double_trouble','standing_neutral'])
    })
  })
];

function main(){
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
    db.positions[id] = pos;
    mapping.foundations[id] = {
      position_id: id,
      foundation: pos.__foundation,
      rank: pos.__rank
    };
    delete pos.__foundation;
    delete pos.__rank;
    created.push(id);
  }

  console.log('Created', created.length, 'positions. Skipped', skipped.length);
  created.forEach(id => console.log(' +', id));
  skipped.forEach(id => console.log(' (skip)', id));

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
