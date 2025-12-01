#!/usr/bin/env node
/*
  Flow By Spade - Database Validator
  - Reports content gaps (per-belt arrays empty), missing belt blocks
  - Validates techniques (ids, belts, start/end positions)
  - Validates transitions (leads_to / entry_from symmetry, ref integrity)
  - Validates foundation mapping coverage
  - Prints category and foundation distributions

  Usage: node scripts/validate-database.js [--json]
  If --json is provided, a machine-readable summary is printed as JSON at the end.
*/

const path = require('path');
const fs = require('fs');

const root = path.resolve(__dirname, '..');
const dbPath = path.join(root, 'data', 'bjj-database.json');
const mapPath = path.join(root, 'data', 'foundation-mapping.json');

const BELTS = ['white', 'blue', 'purple', 'brown', 'black'];

function loadJson(p) {
  try {
    const raw = fs.readFileSync(p, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    console.error(`Failed to read ${p}:`, e.message);
    process.exitCode = 1;
    return null;
  }
}

function arrayOrEmpty(v) { return Array.isArray(v) ? v : []; }

function main() {
  const asJson = process.argv.includes('--json');
  const db = loadJson(dbPath);
  const mapping = loadJson(mapPath);
  if (!db || !mapping) return;

  const positions = db.positions || {};
  const positionIds = Object.keys(positions);

  const summary = {
    meta: {
      version: db.version || null,
      last_updated: db.last_updated || null,
      total_positions: positionIds.length,
    },
    contentGaps: {
      beltBlocksMissing: [],
      emptyArrays: {
        concepts: [],
        techniques: [],
        common_mistakes: [],
        key_details: [],
        transitions_available: [],
      },
    },
    techniques: {
      total: 0,
      duplicateIds: [],
      invalidMinBelt: [],
      invalidStartPosition: [],
      invalidEndPosition: [],
      notListedInAllowedTechniqueIds: [],
    },
    transitions: {
      missingPositionRefs: [],
      symmetryMismatches: [],
      beltTransitionsMissingRefs: [],
    },
    mapping: {
      unmappedPositions: [],
      extraMappings: [],
      foundationDistribution: {},
    },
    categories: {
      distribution: {},
    },
  };

  // Build fast lookup for refs
  const hasPosition = new Set(positionIds);

  // Category distribution and belt content gaps
  for (const pid of positionIds) {
    const pos = positions[pid];
    const cat = pos?.system?.category || 'unknown';
    summary.categories.distribution[cat] = (summary.categories.distribution[cat] || 0) + 1;

    if (!pos.belt_levels) {
      summary.contentGaps.beltBlocksMissing.push(pid);
      continue;
    }

    for (const belt of BELTS) {
      const beltBlock = pos.belt_levels[belt];
      if (!beltBlock) {
        summary.contentGaps.beltBlocksMissing.push(`${pid}:${belt}`);
        continue;
      }
      const { concepts, techniques, common_mistakes, key_details, transitions_available } = beltBlock;
      if (!concepts || concepts.length === 0) summary.contentGaps.emptyArrays.concepts.push(`${pid}:${belt}`);
      if (!techniques || techniques.length === 0) summary.contentGaps.emptyArrays.techniques.push(`${pid}:${belt}`);
      if (!common_mistakes || common_mistakes.length === 0) summary.contentGaps.emptyArrays.common_mistakes.push(`${pid}:${belt}`);
      if (!key_details || key_details.length === 0) summary.contentGaps.emptyArrays.key_details.push(`${pid}:${belt}`);
      if (!transitions_available || transitions_available.length === 0) summary.contentGaps.emptyArrays.transitions_available.push(`${pid}:${belt}`);

      // Validate belt transitions_available refs
      for (const ref of arrayOrEmpty(transitions_available)) {
        if (!hasPosition.has(ref)) {
          summary.transitions.beltTransitionsMissingRefs.push(`${pid}:${belt} -> ${ref}`);
        }
      }
    }
  }

  // Techniques validation
  const seenTechniqueIds = new Set();
  for (const pid of positionIds) {
    const pos = positions[pid];
    const allowed = new Set(arrayOrEmpty(pos?.system?.allowed_technique_ids));

    for (const t of arrayOrEmpty(pos.techniques)) {
      summary.techniques.total++;
      if (seenTechniqueIds.has(t.id)) {
        summary.techniques.duplicateIds.push(t.id);
      } else {
        seenTechniqueIds.add(t.id);
      }
      if (!BELTS.includes(t.min_belt)) {
        summary.techniques.invalidMinBelt.push(`${t.id}:${t.min_belt}`);
      }
      if (t.start_position_id && t.start_position_id !== pid) {
        summary.techniques.invalidStartPosition.push(`${t.id}: start=${t.start_position_id} (expected ${pid})`);
      }
      if (t.end_position_id && !hasPosition.has(t.end_position_id)) {
        summary.techniques.invalidEndPosition.push(`${t.id}: end=${t.end_position_id}`);
      }
      if (t.id && allowed.size > 0 && !allowed.has(t.id)) {
        summary.techniques.notListedInAllowedTechniqueIds.push(`${pid}:${t.id}`);
      }
    }
  }

  // Transition validation and symmetry check
  for (const pid of positionIds) {
    const pos = positions[pid];
    const leads = arrayOrEmpty(pos?.system?.leads_to_position_ids);
    const entryFrom = new Set(arrayOrEmpty(pos?.system?.entry_from_position_ids));

    for (const to of leads) {
      if (!hasPosition.has(to)) {
        summary.transitions.missingPositionRefs.push(`${pid} -> ${to}`);
        continue;
      }
      const other = positions[to];
      const otherEntry = new Set(arrayOrEmpty(other?.system?.entry_from_position_ids));
      if (!otherEntry.has(pid)) {
        summary.transitions.symmetryMismatches.push(`${pid} -> ${to} (missing in ${to}.entry_from)`);
      }
    }

    // Check reverse symmetry too (entry_from should be present in other's leads)
    for (const from of entryFrom) {
      if (!hasPosition.has(from)) {
        summary.transitions.missingPositionRefs.push(`${from} -> ${pid} (entry_from ref missing)`);
        continue;
      }
      const other = positions[from];
      const otherLeads = new Set(arrayOrEmpty(other?.system?.leads_to_position_ids));
      if (!otherLeads.has(pid)) {
        summary.transitions.symmetryMismatches.push(`${from} -> ${pid} (missing in ${from}.leads_to)`);
      }
    }
  }

  // Foundation mapping coverage and distribution
  const mapped = mapping?.foundations || {};
  const mapIds = new Set(Object.keys(mapped));

  for (const pid of positionIds) {
    if (!mapIds.has(pid)) summary.mapping.unmappedPositions.push(pid);
  }
  for (const mid of mapIds) {
    if (!hasPosition.has(mid)) summary.mapping.extraMappings.push(mid);
    const f = mapped[mid]?.foundation || 'unknown';
    summary.mapping.foundationDistribution[f] = (summary.mapping.foundationDistribution[f] || 0) + 1;
  }

  // Print human-friendly report
  const s = summary;
  console.log('=== Flow By Spade Database Validation Report ===');
  console.log(`Version: ${s.meta.version}  Updated: ${s.meta.last_updated}`);
  console.log(`Positions: ${s.meta.total_positions}`);
  console.log('');

  const emptyCount = Object.fromEntries(
    Object.entries(s.contentGaps.emptyArrays).map(([k, arr]) => [k, arr.length])
  );
  console.log('Content Gaps (empty arrays across belts):');
  console.table(emptyCount);
  console.log(`Missing belt blocks: ${s.contentGaps.beltBlocksMissing.length}`);
  console.log('');

  console.log('Techniques:');
  console.log(`  Total techniques: ${s.techniques.total}`);
  console.log(`  Duplicate IDs: ${s.techniques.duplicateIds.length}`);
  console.log(`  Invalid min_belt: ${s.techniques.invalidMinBelt.length}`);
  console.log(`  Invalid start position: ${s.techniques.invalidStartPosition.length}`);
  console.log(`  Invalid end position: ${s.techniques.invalidEndPosition.length}`);
  console.log(`  Not in allowed_technique_ids: ${s.techniques.notListedInAllowedTechniqueIds.length}`);
  console.log('');

  console.log('Transitions:');
  console.log(`  Missing position refs: ${s.transitions.missingPositionRefs.length}`);
  console.log(`  Symmetry mismatches: ${s.transitions.symmetryMismatches.length}`);
  console.log(`  Belt transitions missing refs: ${s.transitions.beltTransitionsMissingRefs.length}`);
  console.log('');

  console.log('Foundations:');
  console.log(`  Unmapped positions: ${s.mapping.unmappedPositions.length}`);
  console.log(`  Extra mappings: ${s.mapping.extraMappings.length}`);
  console.log('  Distribution by foundation:');
  console.table(s.mapping.foundationDistribution);

  console.log('Categories:');
  console.table(s.categories.distribution);

  if (asJson) {
    console.log('\n--- JSON SUMMARY ---');
    console.log(JSON.stringify(summary, null, 2));
  }

  // Non-zero exit for hard errors (broken refs or duplicates)
  const hardErrors = s.techniques.duplicateIds.length + s.techniques.invalidEndPosition.length + s.transitions.missingPositionRefs.length;
  if (hardErrors > 0) {
    process.exitCode = 2;
  }
}

main();
