#!/usr/bin/env node
/*
  Flow By Spade - Add Positions (Bottom Foundations)
  - Adds missing bottom foundation positions and key sub-positions
  - Ensures belt content is present with progressive depth per belt
  - Updates foundation-mapping.json accordingly

  Usage: node scripts/add-positions.js [--write]
  Without --write, prints a diff-style summary and exits.
*/

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const dbPath = path.join(root, 'data', 'bjj-database.json');
const mapPath = path.join(root, 'data', 'foundation-mapping.json');

const BELTS = ['white', 'blue', 'purple', 'brown', 'black'];

function load(p) { return JSON.parse(fs.readFileSync(p, 'utf8')); }
function save(p, data) { fs.writeFileSync(p, JSON.stringify(data, null, 2)); }
function backupPath(p) {
  const dir = path.dirname(p);
  const base = path.basename(p, '.json');
  return path.join(dir, `${base}.backup.${new Date().toISOString().replace(/[:.]/g, '-')}.json`);
}

function beltBlock(concepts, techniques, mistakes, details, transitions) {
  return { concepts, techniques, common_mistakes: mistakes, key_details: details, transitions_available: transitions, prerequisites: [] };
}

function progressiveContent({ baseConcepts, baseDetails, baseMistakes, baseTransitions }) {
  // Expand content progressively per belt (1, 2, 3, 4, 5 items)
  const make = (arr, n) => arr.slice(0, Math.min(arr.length, n));
  const white = beltBlock(make(baseConcepts, 1), [], make(baseMistakes, 1), make(baseDetails, 1), make(baseTransitions, 1));
  const blue = beltBlock(make(baseConcepts, 2), [], make(baseMistakes, 2), make(baseDetails, 2), make(baseTransitions, 2));
  const purple = beltBlock(make(baseConcepts, 3), [], make(baseMistakes, 3), make(baseDetails, 3), make(baseTransitions, 3));
  const brown = beltBlock(make(baseConcepts, 4), [], make(baseMistakes, 4), make(baseDetails, 4), make(baseTransitions, 4));
  const black = beltBlock(make(baseConcepts, 5), [], make(baseMistakes, 5), make(baseDetails, 5), make(baseTransitions, 5));
  return { white, blue, purple, brown, black };
}

function ensurePositions(db, mapping, additions) {
  const positions = db.positions || {};
  const out = { created: [], skipped: [] };
  for (const add of additions) {
    if (positions[add.system.position_id]) { out.skipped.push(add.system.position_id); continue; }
    positions[add.system.position_id] = add;
    out.created.push(add.system.position_id);
  }
  db.positions = positions;
  mapping.foundations = mapping.foundations || {};
  for (const m of additions) {
    const pid = m.system.position_id;
    if (!mapping.foundations[pid]) {
      mapping.foundations[pid] = { position_id: pid, foundation: m.__foundation, rank: m.__rank };
    }
    // cleanup temp fields
    delete m.__foundation; delete m.__rank;
  }
  return out;
}

function positionTemplate({ id, display, foundation, rank, category, description, keyConcepts, entrySteps, maintenance, escapeOverview, commonMistakes, goals, baseContent }) {
  return {
    belt_levels: progressiveContent(baseContent),
    techniques: [],
    transitions: [],
    system: {
      position_id: id,
      min_belt: 'white',
      category,
      opponent_relative: ['pinned', 'under_pressure'],
      stability_score: 4,
      movement_directions_allowed: ['backward_retreat','rotational','lateral_shift'],
      allowed_technique_ids: [],
      leads_to_position_ids: [],
      entry_from_position_ids: [],
      risk_level: 'high'
    },
    learning: {
      display_name: display,
      alternate_names: [],
      description,
      key_concepts: keyConcepts,
      entry_steps: entrySteps,
      maintenance_steps: maintenance,
      escape_overview: escapeOverview,
      common_mistakes: commonMistakes,
      goals
    },
    __foundation: foundation,
    __rank: rank
  };
}

function main() {
  const write = process.argv.includes('--write');
  const db = load(dbPath);
  const mapping = load(mapPath);

  const additions = [];

  // full_mount_bottom (base)
  additions.push(positionTemplate({
    id: 'full_mount_bottom',
    display: 'Full Mount (Bottom)',
    foundation: 'full_mount_bottom',
    rank: 12,
    category: 'bottom_control',
    description: 'You are mounted by the opponent. They are on top with knees on the mat controlling your torso.',
    keyConcepts: ['Protect neck and elbows', 'Create frames before bridging', 'Control opponent’s hips with your elbows/knees'],
    entrySteps: ['Opponent passes to mount', 'You get swept to mount'],
    maintenance: ['Elbows tight to ribs', 'Feet active, not flat', 'Head off the mat when bridging'],
    escapeOverview: 'Primary escapes include trap-and-roll (upa) and elbow-knee escape to half guard or closed guard.',
    commonMistakes: ['Pushing opponent straight up', 'Leaving arms extended', 'Bridging without isolating a post'],
    goals: ['Recover half guard or closed guard', 'Stand up in scramble'],
    baseContent: {
      baseConcepts: [
        'Isolate a post before bridging',
        'Frame at hips to create space',
        'Shrimp to insert a knee line',
        'Time your bridge with exhale',
        'Protect your neck first'
      ],
      baseDetails: [
        'Trap arm + foot on same side for upa',
        'Bridge toward the trapped side',
        'Elbow-knee connection to recover guard',
        'Hands on hips not chest when framing',
        'Use foot to hook and stop grapevines'
      ],
      baseMistakes: [
        'Bridging straight up with no direction',
        'Turning belly down (gives back)',
        'Letting arms get cross-collared',
        'Waiting flat without frames',
        'Fishing for submissions from bottom mount'
      ],
      baseTransitions: ['half_guard_bottom','closed_guard_bottom','turtle_bottom','standing_neutral']
    }
  }));

  // full_mount_bottom_grapevined (sub-position)
  additions.push(positionTemplate({
    id: 'full_mount_bottom_grapevined',
    display: 'Mount Bottom - Grapevined',
    foundation: 'full_mount_bottom',
    rank: 12,
    category: 'bottom_control',
    description: 'You are mounted with opponent’s feet laced inside your legs (grapevines), flattening your hips.',
    keyConcepts: ['Free a leg before bridging', 'Lower back off the mat first', 'Build to frames at hips or armpits'],
    entrySteps: ['Opponent establishes mount and grapevines your legs'],
    maintenance: ['Untangle one leg at a time', 'Keep elbows tight to avoid high mount', 'Use micro-bridges to create slack'],
    escapeOverview: 'Clear one hook, re-center hips, then pursue upa or elbow-knee escape.',
    commonMistakes: ['Trying to bridge with both legs trapped', 'Reaching hands high and getting isolated', 'Staying flat'],
    goals: ['Clear grapevines', 'Recover half guard or closed guard'],
    baseContent: {
      baseConcepts: [
        'Straighten one leg to free the grapevine',
        'Side-bridge to create slack on trapped side',
        'Knee-elbow connection to insert knee line',
        'Use foot pummeling to unhook ankles',
        'Shift hips before big bridge'
      ],
      baseDetails: [
        'Point toes down to slip hooks',
        'Windshield-wiper ankles to clear feet',
        'Bridge diagonally not straight up',
        'Frame on hips not chest',
        'Trap-and-roll after freeing one side'
      ],
      baseMistakes: [
        'Trying upa without isolating post',
        'Pushing opponent’s chest with arms',
        'Leaving both legs entangled',
        'Letting opponent climb to high mount',
        'Exploding without structure'
      ],
      baseTransitions: ['half_guard_bottom','closed_guard_bottom']
    }
  }));

  // rear_mount_bottom (base)
  additions.push(positionTemplate({
    id: 'rear_mount_bottom',
    display: 'Back Control (Bottom)',
    foundation: 'rear_mount_bottom',
    rank: 13,
    category: 'bottom_control',
    description: 'Opponent has back control with seatbelt and hooks or body triangle. You are defending chokes.',
    keyConcepts: ['Hand fight first', 'Hide your choking side', 'Get your shoulders to the mat'],
    entrySteps: ['Opponent takes the back from turtle or mount'],
    maintenance: ['Two-on-one on choking arm', 'Clear hooks with hips', 'Slide to safe side (overhook side)'],
    escapeOverview: 'Hand fight, get head to mat side, slide shoulders down to face them, clear hooks to half guard.',
    commonMistakes: ['Peeling the wrong hand', 'Rolling to choking arm side', 'Ignoring body triangle foot lock risk'],
    goals: ['Escape to half guard or closed guard', 'Turn in and recover top in scramble'],
    baseContent: {
      baseConcepts: [
        'Two-on-one on choking wrist',
        'Turn chin and hide underhook side',
        'Get shoulders to the mat',
        'Drop to overhook side to clear hook',
        'Slide hips below their knee line'
      ],
      baseDetails: [
        'Pin wrist to chest as you turn',
        'Foot pummel to clear top hook',
        'Trap foot on mat to peel body triangle',
        'Bridge on safe side to open hooks',
        'Turn to face once one hook is cleared'
      ],
      baseMistakes: [
        'Reaching with both hands same side',
        'Rolling into the choke',
        'Letting opponent re-grip gable grip',
        'Not sliding shoulders to the mat',
        'Panicking and extending arms'
      ],
      baseTransitions: ['half_guard_bottom','turtle_bottom','closed_guard_bottom']
    }
  }));

  // knee_on_belly_bottom (base)
  additions.push(positionTemplate({
    id: 'knee_on_belly_bottom',
    display: 'Knee-On-Belly (Bottom)',
    foundation: 'knee_on_belly_bottom',
    rank: 10,
    category: 'bottom_control',
    description: 'Opponent’s knee is pinning your abdomen while they control upper body and hip line.',
    keyConcepts: ['Frame on shin and hip', 'Bridge and hip escape to re-guard', 'Protect near-side underhook'],
    entrySteps: ['Opponent transitions from side control or mount'],
    maintenance: ['Frame on knee line, not thigh', 'Angle hips away then re-guard', 'Hand inside to prevent crossface'],
    escapeOverview: 'Frame the knee, hip escape to recover guard or come up to single-leg depending on space.',
    commonMistakes: ['Pushing at chest', 'Turning belly down', 'Letting near-side underhook'],
    goals: ['Recover open or closed guard', 'Enter single leg'],
    baseContent: {
      baseConcepts: [
        'Frame on knee/shin not chest',
        'Hip escape before pushing',
        'Point belly away then insert frames',
        'Look to underhook on exit',
        'Use inside elbow to block crossface'
      ],
      baseDetails: [
        'Catch ankle to off-balance when possible',
        'Bridge then shrimp for space',
        'Shin shield to recover guard',
        'Win underhook on far side for single',
        'Turn to turtle only if frames secured'
      ],
      baseMistakes: [
        'Exploding straight into opponent',
        'Leaving inside arm extended',
        'Staying flat and eating pressure',
        'Rolling away without frames',
        'Letting knee slide to chest'
      ],
      baseTransitions: ['open_guard_bottom','closed_guard_bottom','turtle_bottom','standing_neutral']
    }
  }));

  // kesa_gatame_bottom (side control variant bottom)
  additions.push(positionTemplate({
    id: 'kesa_gatame_bottom',
    display: 'Kesa Gatame (Bottom)',
    foundation: 'side_control_bottom',
    rank: 11,
    category: 'bottom_control',
    description: 'Opponent controls with scarf hold (kesa gatame), pinning your far arm and head/shoulder line.',
    keyConcepts: ['Bridge into them to create space', 'Leg hook counter to roll', 'Protect near elbow from isolation'],
    entrySteps: ['Opponent transitions from side control variants'],
    maintenance: ['Keep elbow near ribs', 'Bridge to off-balance and insert knee', 'Avoid pushing the head'],
    escapeOverview: 'Hook leg and bridge to roll, or create space to insert knee/shield and re-guard.',
    commonMistakes: ['Pushing the head with straight arm', 'Letting elbow get separated', 'Bridging without hooking leg'],
    goals: ['Recover guard or come on top via roll'],
    baseContent: {
      baseConcepts: [
        'Hook near leg before big bridge',
        'Turn toward them to create space',
        'Hide near elbow from isolation',
        'Insert knee line once space is made',
        'Use head position to prevent crossface'
      ],
      baseDetails: [
        'Catch belt/hip to anchor before roll',
        'Bridge diagonally toward head',
        'If they switch to kuzure, reframe quickly',
        'Clasp hands to protect elbow when needed',
        'Leg pummel for inside position'
      ],
      baseMistakes: [
        'Bridging before controlling leg',
        'Turning away and giving back',
        'Leaving arm extended under head',
        'Not moving hips after initial off-balance',
        'Waiting flat and fatiguing'
      ],
      baseTransitions: ['half_guard_bottom','open_guard_bottom','turtle_bottom']
    }
  }));

  const dbBefore = JSON.stringify(db);
  const mapBefore = JSON.stringify(mapping);
  const res = ensurePositions(db, mapping, additions);

  console.log('=== Add Positions (Bottom Foundations) ===');
  console.log(`Created: ${res.created.length}  Skipped: ${res.skipped.length}`);
  res.created.forEach(id => console.log('  + ' + id));
  if (!res.created.length) console.log('No new positions needed.');

  if (write) {
    const dbBackup = backupPath(dbPath);
    const mapBackup = backupPath(mapPath);
    save(dbBackup, JSON.parse(dbBefore));
    save(mapBackup, JSON.parse(mapBefore));
    save(dbPath, db);
    save(mapPath, mapping);
    console.log(`Backups saved to:\n  ${dbBackup}\n  ${mapBackup}`);
    console.log('Database and mapping updated.');
  } else {
    console.log('Dry-run complete. Re-run with --write to persist changes.');
  }
}

main();
