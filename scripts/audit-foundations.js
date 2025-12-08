#!/usr/bin/env node
/*
  Flow By Spade - Foundation Coverage Audit
  - Counts how many distinct positions exist per foundation
  - Computes how many positions unlock at or below each belt (white..black)
  - Highlights foundations missing minimum counts per belt tier (1-5 ramp)
*/

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const dbPath = path.join(root, 'data', 'bjj-database.json');
const mapPath = path.join(root, 'data', 'foundation-mapping.json');

const BELTS = ['white','blue','purple','brown','black'];
const REQUIRED = { white:1, blue:2, purple:3, brown:4, black:5 };
const BELT_ORDER = { white:0, blue:1, purple:2, brown:3, black:4 };

function load(p){ return JSON.parse(fs.readFileSync(p,'utf8')); }

const db = load(dbPath);
const mapping = load(mapPath);
const foundations = mapping.foundations || {};

const perFoundation = {};
for (const [pid, meta] of Object.entries(foundations)) {
  const pos = db.positions?.[pid];
  if (!pos) continue;
  const foundation = meta.foundation;
  const minBelt = pos.system?.min_belt || 'white';
  const idx = BELT_ORDER[minBelt] ?? 0;
  if (!perFoundation[foundation]) {
    perFoundation[foundation] = {
      positions: [],
      beltUnlocks: BELTS.reduce((acc,b)=>{ acc[b]=0; return acc; },{}),
      unlockedSets: BELTS.reduce((acc,b)=>{ acc[b]=new Set(); return acc; },{}),
    };
  }
  perFoundation[foundation].positions.push({ id: pid, min_belt: minBelt, display: pos.learning?.display_name || pid });
  // Position becomes available for belt >= minBelt
  BELTS.forEach((belt)=>{
    if ((BELT_ORDER[belt] ?? 0) >= idx) {
      perFoundation[foundation].beltUnlocks[belt]++;
      perFoundation[foundation].unlockedSets[belt].add(pid);
    }
  });
}

// Report
console.log('=== Foundation Coverage Audit ===');
const rows = [];
for (const foundation of Object.keys(perFoundation).sort()) {
  const data = perFoundation[foundation];
  const row = { foundation };
  let status = 'ok';
  for (const belt of BELTS) {
    const count = data.beltUnlocks[belt];
    row[belt] = count;
    if (count < REQUIRED[belt]) status = 'needs-attention';
  }
  row.status = status;
  rows.push(row);
}
console.table(rows);

console.log('\nFoundations needing attention:');
rows.filter(r=>r.status!=='ok').forEach(r=>{
  console.log(`- ${r.foundation}: ${BELTS.map(b=>`${b}:${r[b]}/${REQUIRED[b]}`).join(', ')}`);
});

console.log('\nSample position listings (min belt)');
for (const foundation of Object.keys(perFoundation).sort()) {
  const list = perFoundation[foundation].positions
    .sort((a,b)=>BELT_ORDER[a.min_belt]-BELT_ORDER[b.min_belt] || a.id.localeCompare(b.id))
    .map(p=>`${p.id} (${p.min_belt})`);
  console.log(`${foundation}: ${list.join(', ')}`);
}
