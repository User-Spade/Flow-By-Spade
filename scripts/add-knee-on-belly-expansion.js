#!/usr/bin/env node
/*
  Adds knee-on-belly top & bottom sub-positions with full belt content to meet belt ramp goals.
*/

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const dbPath = path.join(root, 'data', 'bjj-database.json');
const mapPath = path.join(root, 'data', 'foundation-mapping.json');

function load(p){ return JSON.parse(fs.readFileSync(p,'utf8')); }
function save(p,d){ fs.writeFileSync(p, JSON.stringify(d, null, 2)); }
function backupPath(p){ const dir=path.dirname(p); const base=path.basename(p,'.json'); return path.join(dir, `${base}.backup.${new Date().toISOString().replace(/[:.]/g,'-')}.json`);} 

const positions = [
  // ----- TOP CONTROL VARIANTS -----
  createPosition({
    id: 'reverse_knee_on_belly_top',
    display: 'Reverse Knee-On-Belly',
    foundation: 'knee_on_belly_top',
    rank: 4,
    category: 'top_control',
    min_belt: 'blue',
    description: 'Switching knee to the far hip while facing legs to expose back takes and spinning armbars.',
    key_concepts: ['Switch base without losing hip pressure','Control near arm before spinning','Use shin angle to block frames'],
    entry_steps: ['From standard knee-on-belly, windshield-wiper shin across torso','Rotate hips so you face opponent’s legs'],
    maintenance_steps: ['Post far hand for balance','Clamp shin against opponent’s ribs','Float hips to follow bridge attempts'],
    escape_overview: 'Opponent must reframe hips or chase your posted hand to re-guard.',
    common_mistakes_learning: ['Spinning without controlling near arm','Leaving heel too light and getting pummelled under'],
    goals: ['Open back exposure lanes','Transition to spinning armbar or mount'],
    belts: makeBelts({
      white: beltBlock('Keep chest connected even when switching','Post hand before spinning','Turning away from opponent',['knee_on_belly','side_control']),
      blue: beltBlock('Drag opponent’s elbow across as you rotate','Sit toward opponent’s head to threaten armbar','Letting opponent underhook supporting leg',['mount','back_control']),
      purple: beltBlock('Feed lapel while knee floats to shoulder line','Alternate between reverse ride and spinning back take','Chasing submission without clearing frames',['back_control','high_mount_top']),
      brown: beltBlock('Use reverse knee ride to trap far arm','Step over head for armbar chains','Giving up head position while switching',['s_mount_top','floating_mount_transitions']),
      black: beltBlock('Blend reverse lapel rides with leg-entry threats','Float knee between torso and hip to chase 4/11','Pausing mid-rotation without grips',['floating_mount_transitions','false_reap'])
    })
  }),
  createPosition({
    id: 'knee_on_belly_lapel_feed_top',
    display: 'Lapel Feed Knee-On-Belly',
    foundation: 'knee_on_belly_top',
    rank: 4,
    category: 'top_control',
    min_belt: 'purple',
    description: 'Using deep lapel feeds and cross-face grips from knee-on-belly to attack chokes and mount/back entries.',
    key_concepts: ['Feed lapel before lifting knee','Use far-side underhook to anchor','Balance hips while freeing hands to attack'],
    entry_steps: ['Open opponent’s lapel from side control','Slide knee to belly and feed lapel under arm'],
    maintenance_steps: ['Keep lapel taut as you post hand','Drop hips whenever opponent bridges','Walk around head to tighten collar pressure'],
    escape_overview: 'Opponent must break lapel grip or rotate under to recover guard.',
    common_mistakes_learning: ['Fishing for lapel without leg control','Letting opponent sit up during feed'],
    goals: ['Hit bow-and-arrow/cross choke','Force reactions that expose mount or back'],
    belts: makeBelts({
      white: beltBlock('Secure lapel grip before attacking','Knee pressure stays heavy','Leaning too far to grab lapel',['knee_on_belly','mount']),
      blue: beltBlock('Feed lapel palm-up then palm-down','Staple near arm with shin','Allowing opponent to grab pant leg',['mount','back_control']),
      purple: beltBlock('Walk toward head as you pull lapel','Switch to paper-cutter choke when frames appear','Ignoring opponent’s hip escape timing',['back_control','high_mount_top']),
      brown: beltBlock('Combine lapel feed with near-side underhook','Float into technical mount on reactions','Leaving outside leg unposted against bridges',['s_mount_top','floating_mount_transitions']),
      black: beltBlock('Cycle between lapel chokes, wrist rides, and leg entries','Feed lapel to opposite hand for crucifix chains','Letting opponent clear lapel without re-feeding',['back_control','false_reap'])
    })
  }),
  createPosition({
    id: 'knee_on_belly_switchbase_top',
    display: 'Switch-Base Knee Ride',
    foundation: 'knee_on_belly_top',
    rank: 4,
    category: 'top_control',
    min_belt: 'brown',
    description: 'Switching hips to face opponent’s legs, stapling near hip while hunting kimuras, arm triangles, and back takes.',
    key_concepts: ['Staple hip before switching base','Kill near-side underhook','Float to mount/back depending on reactions'],
    entry_steps: ['From knee-on-belly, slide shin to hip line','Switch hips so butt faces opponent’s head'],
    maintenance_steps: ['Clamp elbow to hip to block frames','Use cross-face to turn chin','Step over head when opponent pushes knee'],
    escape_overview: 'Opponent must win underhook or invert to create space beneath switched hips.',
    common_mistakes_learning: ['Switching base without posting hand','Letting opponent underhook supporting leg'],
    goals: ['Enter kimura/armbar chains','Transition to technical mount or back'],
    belts: makeBelts({
      white: beltBlock('Post hand before switching hips','Keep shin stapled to hip line','Switching without controlling far shoulder',['knee_on_belly','side_control']),
      blue: beltBlock('Use cross-face to expose far arm','Walk knee toward head after switch','Leaving weight too far back',['mount','technical_mount']),
      purple: beltBlock('Catch kimura grip before stepping over','Float between kimura trap and head-arm choke','Ignoring opponent’s bridge cues',['arm_trapped_back_mount','back_control']),
      brown: beltBlock('Chain switch-base to north-south and back takes','Hide foot to prevent half-guard recoveries','Overcommitting both hands to kimura',['floating_mount_transitions','back_control']),
      black: beltBlock('Blend switch-base with saddle/belly-down leg attacks','Pulse weight to chase late scrambles','Pausing mid-switch without frames',['floating_mount_transitions','false_reap'])
    })
  }),
  createPosition({
    id: 'knee_on_belly_mobility_top',
    display: 'Floating Knee-On-Belly Chains',
    foundation: 'knee_on_belly_top',
    rank: 4,
    category: 'top_control',
    min_belt: 'black',
    description: 'Dynamic knee ride that hops between hips, chest, and shoulders to overwhelm defenses and create submission chains.',
    key_concepts: ['Never park knee in one spot','Pulse weight through hands to stay light','Threaten passes/back takes simultaneously'],
    entry_steps: ['From knee ride, pop to feet and hover hips','Windshield-wiper knee between ribs and belly'],
    maintenance_steps: ['Follow opponent’s frames with opposite knee','Drop hips to reset pressure when needed','Layer lapel/pant controls to stay attached'],
    escape_overview: 'Opponent must catch inside frames or create inversion scrambles.',
    common_mistakes_learning: ['Hopping without hand posts','Giving up chest contact entirely'],
    goals: ['Cycle into mount/back/leg entries without reset'],
    belts: makeBelts({
      white: beltBlock('Keep at least one post when hopping','Return knee to belly quickly','Standing upright with no grips',['knee_on_belly']),
      blue: beltBlock('Switch knees using windshield-wiper motion','Slide into mount if opponent turns','Letting opponent underhook during hop',['mount','technical_mount']),
      purple: beltBlock('Alternate between knee ride and north-south spin','Feed lapel while floating','Ignoring opponent’s shoulders as steering wheel',['back_control','high_mount_top']),
      brown: beltBlock('Blend leg drag feel with knee ride','Threaten arm triangles mid-hop','Leaning only on head control',['s_mount_top','floating_mount_transitions']),
      black: beltBlock('Chain hops into back takes and saddle entries','Change tempos to bait reactions','Pausing mid-air with no plan',['floating_mount_transitions','false_reap'])
    })
  }),

  // ----- BOTTOM DEFENSIVE VARIANTS -----
  createPosition({
    id: 'knee_on_belly_bottom_frames',
    display: 'Knee-On-Belly Frame Battle',
    foundation: 'knee_on_belly_bottom',
    rank: 10,
    category: 'bottom_control',
    min_belt: 'blue',
    description: 'Building and rotating frames against a heavy knee ride to recover guard safely.',
    key_concepts: ['Inside elbow protects ribs','Frame on shin, not thigh','Use hip escape before pushing'],
    entry_steps: ['Opponent pops to knee-on-belly after passing','Crossface pins shoulders while knee rides stomach'],
    maintenance_steps: ['Shrimp away while framing shin','Connect elbow to inside knee line','Use far hand to protect crossface'],
    escape_overview: 'Frame, hip escape, then recover guard or turtle before opponent transitions.',
    common_mistakes_learning: ['Pushing chest instead of knee','Turning away before frames are set'],
    goals: ['Return to guard','Prevent mount/back progression'],
    belts: makeBelts({
      white: beltBlock('Hand on shin, elbow tight to ribs','Bridge before shrimping','Pushing opponent’s chest only',['open_guard_bottom','closed_guard_bottom']),
      blue: beltBlock('Insert knee shield once space opens','Frame on hip with opposite hand','Letting opponent cross-face freely',['open_guard_bottom','half_guard_bottom']),
      purple: beltBlock('Underhook exit to single leg when frames fail','Switch between shin shield and collar tie','Waiting flat for relief',['turtle_bottom','half_guard_bottom']),
      brown: beltBlock('Create Kuzushi by rocking opponent side to side','Threaten leg entries as they hop','Leaving inside arm exposed to americana',['butterfly_guard','single_leg_x']),
      black: beltBlock('Counter knee ride with false reap / K guard entries','Invert directly under knee for saddle','Staying linear instead of angling',['false_reap','reverse_x'])
    })
  }),
  createPosition({
    id: 'knee_on_belly_bottom_underhook',
    display: 'Underhook Battle vs Knee Ride',
    foundation: 'knee_on_belly_bottom',
    rank: 10,
    category: 'bottom_control',
    min_belt: 'purple',
    description: 'Winning the near-side underhook and coming up to single leg or half guard while defending heavy knee pressure.',
    key_concepts: ['Elbow-knee connection protects ribs','Underhook leads to coming up','Head position dictates direction'],
    entry_steps: ['Opponent staples lapel/collar and posts far hand','Your inside arm is pinched against body'],
    maintenance_steps: ['Pummel underhook while shielding neck','Drive forehead into opponent’s chest','Come to elbow before knees'],
    escape_overview: 'Win underhook, bump opponent forward, then come up or recover half guard.',
    common_mistakes_learning: ['Diving head-first without frames','Staying flat after underhooking'],
    goals: ['Arrive in single-leg or dogfight positions','Return to half/open guard'],
    belts: makeBelts({
      white: beltBlock('Protect neck with inside frame','Bridge to create underhook space','Reaching over opponent’s back',['closed_guard_bottom']),
      blue: beltBlock('Shoot underhook while kneeing through gap','Use far hand to post on mat','Turning belly-down before controlling wrist',['half_guard_bottom','turtle_bottom']),
      purple: beltBlock('Come to elbow-knee and chase single-leg','Switch to knee shield when opponent whizzers','Letting opponent cross-face before moving',['single_leg_x','butterfly_guard']),
      brown: beltBlock('Transition to body lock/stand-up when space opens','Use over-under grips to finish sweep','Hanging on underhook with no posture',['standing_neutral','butterfly_guard']),
      black: beltBlock('Chain underhook exits into backside 50/50/leg entanglements','Roll under for false reap if opponent sprawls','Ignoring lapel feeds as you stand',['false_reap','standing_neutral'])
    })
  }),
  createPosition({
    id: 'knee_on_belly_bottom_shinshield',
    display: 'Shin Shield Knee Ride Defense',
    foundation: 'knee_on_belly_bottom',
    rank: 10,
    category: 'bottom_control',
    min_belt: 'brown',
    description: 'Using inside shin shield and collar/pant grips to off-balance knee-on-belly pressure and recompose guard.',
    key_concepts: ['Shin across belt line', 'Opposite hand controls far sleeve or pant', 'Angle hips before pushing'],
    entry_steps: ['Opponent posts foot near hip after hopping to knee ride','Space opens under thigh when they adjust weight'],
    maintenance_steps: ['Frame shin inside opponent’s thigh','Keep toes flexed to steer pressure','Use collar grip to pull opponent forward'],
    escape_overview: 'Insert shin shield, off-balance opponent, then recover guard or attack legs.',
    common_mistakes_learning: ['Dropping shin low near knees','Letting opponent clear collar grip'],
    goals: ['Return to open guard with strong grips','Enter leg entanglements when opponent steps out'],
    belts: makeBelts({
      white: beltBlock('Insert knee between hips before pushing','Control opponent’s sleeve to stop crossface','Trying to bench opponent off',['open_guard_bottom']),
      blue: beltBlock('Use shin to lift knee while hip escaping','Kick through to half guard if collar lost','Allowing opponent to pin shin with hands',['half_guard_bottom','open_guard_bottom']),
      purple: beltBlock('Angle to outside and swing leg into De La Riva','Feed collar to threaten loop choke counters','Leaving collar grip slack',['de_la_riva','open_guard_bottom']),
      brown: beltBlock('Use shin shield to launch collar drag or leg entries','Switch grips to ankle for single-leg X','Keeping hips square under pressure',['single_leg_x','false_reap']),
      black: beltBlock('Invert under shin shield to chase backside 50/50','Turn defense into immediate off-balancing sweep','Letting opponent re-pin knee without re-framing',['reverse_x','false_reap'])
    })
  }),
  createPosition({
    id: 'knee_on_belly_bottom_inversion',
    display: 'Inversion Exits vs Knee Ride',
    foundation: 'knee_on_belly_bottom',
    rank: 10,
    category: 'bottom_control',
    min_belt: 'black',
    description: 'Advanced counters that invert under the knee ride to enter saddle/false reap or deep half-style scrambles.',
    key_concepts: ['Hide your head before inverting','Control opponent’s ankle/hip line','Kick through aggressively once hips clear'],
    entry_steps: ['Opponent posts far hand giving space under knee','You establish double inside leg position'],
    maintenance_steps: ['Frame near shin while scooping ankle','Invert on shoulder nearest opponent','Collect far hip before extending legs'],
    escape_overview: 'Invert to expose leg entanglements or scramble to seated guard with grips intact.',
    common_mistakes_learning: ['Inverting without controlling ankle','Leaving neck exposed to crossface'],
    goals: ['Enter false reap / saddle chains','Create immediate sweep threats from inversion'],
    belts: makeBelts({
      white: beltBlock('Protect neck before attempting advanced exits','Use basic frames first','Trying to invert with no grips',['open_guard_bottom']),
      blue: beltBlock('Drill shoulder roll mechanics safely','Only invert when hip line is clear','Inverting into opponent’s underhook',['turtle_bottom','open_guard_bottom']),
      purple: beltBlock('Catch ankle before rolling under','Use opposite foot to pummel inside','Allowing opponent to sprawl hips back',['false_reap','reverse_x']),
      brown: beltBlock('Chain inversion to backside 50/50 or matrix sweeps','Control secondary leg to avoid smash','Getting stuck upside down with no grips',['false_reap','reverse_x','standing_neutral']),
      black: beltBlock('Turn inversion defense into immediate submission threats','Backstep to inside sankaku on exposure','Losing chest-to-shin contact mid spin',['double_trouble','saddle','standing_neutral'])
    })
  })
];

function makeBelts(def){
  const belts = ['white','blue','purple','brown','black'];
  const result = {};
  for (const belt of belts) {
    const block = def[belt];
    result[belt] = {
      concepts: block?.concepts || [],
      techniques: [],
      common_mistakes: block?.mistakes || [],
      key_details: block?.details || [],
      transitions_available: block?.transitions || [],
      prerequisites: []
    };
  }
  return result;
}

function beltBlock(concepts, details, mistakes, transitions){
  return {
    concepts: Array.isArray(concepts) ? concepts : [concepts],
    details: Array.isArray(details) ? details : [details],
    mistakes: Array.isArray(mistakes) ? mistakes : [mistakes],
    transitions: transitions || []
  };
}

function createPosition(cfg){
  return {
    id: cfg.id,
    foundation: cfg.foundation,
    rank: cfg.rank,
    category: cfg.category,
    min_belt: cfg.min_belt,
    display: cfg.display,
    description: cfg.description,
    key_concepts: cfg.key_concepts,
    entry_steps: cfg.entry_steps,
    maintenance_steps: cfg.maintenance_steps,
    escape_overview: cfg.escape_overview,
    common_mistakes_learning: cfg.common_mistakes_learning,
    goals: cfg.goals,
    belts: cfg.belts
  };
}

function convert(pos){
  return {
    belt_levels: pos.belts,
    techniques: [],
    transitions: [],
    system: {
      position_id: pos.id,
      min_belt: pos.min_belt,
      category: pos.category,
      opponent_relative: pos.category === 'top_control' ? ['on_top','knee_pressing'] : ['pinned','knee_pressure'],
      stability_score: pos.category === 'top_control' ? 4 : 3,
      movement_directions_allowed: pos.category === 'top_control'
        ? ['forward_pressure','lateral_shift','rotational']
        : ['backward_retreat','rotational','lateral_shift'],
      allowed_technique_ids: [],
      leads_to_position_ids: [],
      entry_from_position_ids: [],
      risk_level: pos.category === 'top_control' ? 'medium' : 'high'
    },
    learning: {
      display_name: pos.display,
      alternate_names: [],
      description: pos.description,
      key_concepts: pos.key_concepts,
      entry_steps: pos.entry_steps,
      maintenance_steps: pos.maintenance_steps,
      escape_overview: pos.escape_overview,
      common_mistakes: pos.common_mistakes_learning,
      goals: pos.goals
    },
    __foundation: pos.foundation,
    __rank: pos.rank
  };
}

function main(){
  const db = load(dbPath);
  const mapping = load(mapPath);
  const created = [];
  const skipped = [];

  for (const pos of positions.map(convert)) {
    if (db.positions[pos.system.position_id]) {
      skipped.push(pos.system.position_id);
      continue;
    }
    db.positions[pos.system.position_id] = pos;
    mapping.foundations[pos.system.position_id] = {
      position_id: pos.system.position_id,
      foundation: pos.__foundation,
      rank: pos.__rank
    };
    delete pos.__foundation;
    delete pos.__rank;
    created.push(pos.system.position_id);
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
  console.log('Backups stored at');
  console.log(' ', dbBackup);
  console.log(' ', mapBackup);
}

main();
