#!/usr/bin/env node
/*
  Flow By Spade - Fill Belt Content Gaps
  - For each position and belt, if arrays are empty, fill minimal progressive content
  - Never overwrites non-empty arrays
  - Transitions_available seeded from system.leads_to_position_ids (subset per belt)

  Usage: node scripts/fill-belt-content.js [--write]
*/

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const dbPath = path.join(root, 'data', 'bjj-database.json');
const mapPath = path.join(root, 'data', 'foundation-mapping.json');

const BELTS = ['white','blue','purple','brown','black'];

function load(p){ return JSON.parse(fs.readFileSync(p, 'utf8')); }
function save(p,d){ fs.writeFileSync(p, JSON.stringify(d, null, 2)); }
function backupPath(p){ const dir=path.dirname(p); const base=path.basename(p, '.json'); return path.join(dir, `${base}.backup.${new Date().toISOString().replace(/[:.]/g,'-')}.json`);} 

function pick(arr, n){ return arr.slice(0, Math.min(arr.length, n)); }

function progressiveCounts(belt){ return { white:1, blue:2, purple:3, brown:4, black:5 }[belt]; }

function baseTemplatesFor(foundation, displayName){
  // Very lightweight seed content tuned by foundation bucket
  const generic = {
    concepts:[
      `Structure before movement in ${displayName}`,
      `Frames first, then hips in ${displayName}`,
      `Breathe and pace escapes in ${displayName}`,
      `Win inside position before big movements`,
      `Connect elbows to hips to protect core`
    ],
    details:[
      `Head and hips move together for power`,
      `Angle your hips, avoid pushing straight`,
      `Connect knee line before full recovery`,
      `Use diagonal bridges, not vertical`,
      `Hand position matters more than strength`
    ],
    mistakes:[
      `Reaching with straight arms`,
      `Exploding without isolating a post`,
      `Ignoring neck protection`,
      `Turning belly down without frames`,
      `Waiting flat instead of building structure`
    ]
  };
  const guardBottom = {
    concepts:[`Break posture first`, `Angle off for attacks`, `Connect your guard to sweep paths`, `Grip sequence before opening`, `Threaten to create reactions`],
    details:[`Hip mobility > upper body strain`, `Use knee line to control distance`, `Climb your guard progressively`, `Frame before you pivot`, `Combine grips not single grabs`],
    mistakes:[`Opening guard with no grips`, `Staying square under pressure`, `Forgetting to re-close distance`, `Chasing submissions without control`, `Ignoring underhook battles`]
  };
  const guardTop = {
    concepts:[`Posture before passing`, `Pin the hips`, `Control one side before moving`, `Pressure + angle`, `Anticipate frames`],
    details:[`Head position prevents collar ties`, `Use knee cut to split line`, `Staple a leg to limit movement`, `Win underhook then pass`, `Switch directions on resistance`],
    mistakes:[`Driving straight into frames`, `Hips too high`, `Leaving arms deep`, `Ignoring crossface`, `Passing without controlling hips`]
  };
  const topControl = {
    concepts:[`Chest-to-chest pressure`, `Head-hands-hips tripod`, `Block hip line`, `Climb to more dominant`, `Anticipate bridge`],
    details:[`Crossface to turn head`, `Underhook far arm`, `Knees pinch to control`, `Weight transfer for balance`, `Switch sides to follow frames`],
    mistakes:[`Too much space at hips`, `Knees too wide`, `Chasing submissions before control`, `Forgetting near-side underhook`, `Leaving elbow space`]
  };
  const bottomControl = {
    concepts:[`Frame first, then hip escape`, `Bridge with direction`, `Protect elbows and neck`, `Create wedges before movement`, `Recover knee line`],
    details:[`Trap post before upa`, `Elbow-knee connection to re-guard`, `Diagonal bridge then shrimp`, `Anchor before rolling`, `Foot pummel to clear hooks`],
    mistakes:[`Pushing straight with arms`, `Bridging vertically`, `Turning away and giving back`, `Letting arms get isolated`, `Waiting flat`]
  };
  const turtle = {
    concepts:[`Elbows tight, chin tucked`, `Win hand fight first`, `Build to base safely`, `Peek-out only with control`, `Protect hooks`],
    details:[`Inside hand first`, `Shoulder roll when framed`, `Knee-elbow connection`, `Head position to hide neck`, `Clear one hook at a time`],
    mistakes:[`Standing without grips`, `Rolling into chokes`, `Leaving elbow wide`, `Accepting hooks`, `No plan for base`]
  };

  const byFoundation = {
    guard_bottom: guardBottom,
    guard_top: guardTop,
    full_mount_top: topControl,
    side_control_top: topControl,
    knee_on_belly_top: topControl,
    rear_mount_top: topControl,
    full_mount_bottom: bottomControl,
    side_control_bottom: bottomControl,
    knee_on_belly_bottom: bottomControl,
    rear_mount_bottom: bottomControl,
    turtle_top: topControl,
    turtle_bottom: turtle,
    neutral: generic
  };
  return byFoundation[foundation] || generic;
}

function main(){
  const write = process.argv.includes('--write');
  const db = load(dbPath);
  const mapping = load(mapPath);
  const foundations = mapping.foundations || {};

  let updated = 0;

  for (const [pid, pos] of Object.entries(db.positions || {})){
    const foundation = foundations[pid]?.foundation || 'neutral';
    const display = pos?.learning?.display_name || pid;
    const tmpl = baseTemplatesFor(foundation, display);

    for (const belt of BELTS){
      const block = pos.belt_levels?.[belt];
      if (!block) continue;
      const need = progressiveCounts(belt);

      if (!Array.isArray(block.concepts) || block.concepts.length === 0){
        block.concepts = pick(tmpl.concepts, need);
        updated++;
      }
      if (!Array.isArray(block.key_details) || block.key_details.length === 0){
        block.key_details = pick(tmpl.details, need);
        updated++;
      }
      if (!Array.isArray(block.common_mistakes) || block.common_mistakes.length === 0){
        block.common_mistakes = pick(tmpl.mistakes, need);
        updated++;
      }
      if (!Array.isArray(block.transitions_available) || block.transitions_available.length === 0){
        const leads = Array.isArray(pos.system?.leads_to_position_ids) ? pos.system.leads_to_position_ids : [];
        block.transitions_available = pick(leads, need);
        updated++;
      }
      if (!Array.isArray(block.techniques)){
        block.techniques = [];
      }
    }
  }

  console.log('=== Fill Belt Content Gaps ===');
  console.log(`Blocks updated: ${updated}`);
  if (write){
    const dbBackup = backupPath(dbPath);
    save(dbBackup, load(dbPath));
    save(dbPath, db);
    console.log(`Backup saved: ${dbBackup}`);
    console.log('Database updated.');
  } else {
    console.log('Dry-run complete. Re-run with --write to persist changes.');
  }
}

main();
