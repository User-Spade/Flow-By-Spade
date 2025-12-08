#!/usr/bin/env node
/*
  Flow By Spade - Transition Symmetry Fixer
  - Ensures system.leads_to_position_ids and entry_from_position_ids are symmetric
  - Validates references and removes invalid refs (optional; currently only warns)
  - Writes a timestamped backup before saving changes

  Usage: node scripts/fix-transition-symmetry.js [--write]
  Without --write, runs in dry-run mode and prints a summary only.
*/

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const dbPath = path.join(root, 'data', 'bjj-database.json');

function loadJson(p) { return JSON.parse(fs.readFileSync(p, 'utf8')); }
function uniq(arr) { return Array.from(new Set(arr)); }

function main() {
  const write = process.argv.includes('--write');
  const db = loadJson(dbPath);
  const positions = db.positions || {};
  const ids = Object.keys(positions);
  const has = new Set(ids);

  let addedToEntry = 0;
  let addedToLeads = 0;
  const warnings = [];

  for (const pid of ids) {
    const pos = positions[pid];
    pos.system = pos.system || {};
    const leads = Array.isArray(pos.system.leads_to_position_ids) ? pos.system.leads_to_position_ids : [];
    const entry = Array.isArray(pos.system.entry_from_position_ids) ? pos.system.entry_from_position_ids : [];

    // Ensure targets exist, warn otherwise
    for (const to of leads) {
      if (!has.has(to)) {
        warnings.push(`WARN: ${pid}.leads_to -> ${to} does not exist`);
        continue;
      }
      const target = positions[to];
      const tEntry = Array.isArray(target.system.entry_from_position_ids) ? target.system.entry_from_position_ids : [];
      if (!tEntry.includes(pid)) {
        tEntry.push(pid);
        target.system.entry_from_position_ids = uniq(tEntry);
        addedToEntry++;
      }
    }

    for (const from of entry) {
      if (!has.has(from)) {
        warnings.push(`WARN: ${pid}.entry_from <- ${from} does not exist`);
        continue;
      }
      const source = positions[from];
      const sLeads = Array.isArray(source.system.leads_to_position_ids) ? source.system.leads_to_position_ids : [];
      if (!sLeads.includes(pid)) {
        sLeads.push(pid);
        source.system.leads_to_position_ids = uniq(sLeads);
        addedToLeads++;
      }
    }
  }

  console.log('=== Transition Symmetry Fix (dry-run unless --write) ===');
  console.log(`Positions: ${ids.length}`);
  console.log(`Would add ${addedToEntry} missing entry_from links`);
  console.log(`Would add ${addedToLeads} missing leads_to links`);
  if (warnings.length) {
    console.log(`Warnings (${warnings.length}):`);
    for (const w of warnings.slice(0, 20)) console.log('  ' + w);
    if (warnings.length > 20) console.log(`  ...and ${warnings.length - 20} more`);
  }

  if (write) {
    const backupPath = path.join(root, 'data', `bjj-database.backup.${new Date().toISOString().replace(/[:.]/g, '-')}.json`);
    fs.writeFileSync(backupPath, JSON.stringify(db, null, 2));
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    console.log(`Wrote backup to ${backupPath}`);
    console.log(`Updated ${dbPath}`);
  } else {
    console.log('Dry-run complete. Re-run with --write to persist changes.');
  }
}

main();
