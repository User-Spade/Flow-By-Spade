#!/usr/bin/env node
/*
  Flow By Spade - Consolidate Position Data
  Merges foundation-mapping.json and position-copy.json into bjj-database.json
  as top-level properties for single-file organization.
*/

const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');
const dbPath = path.join(dataDir, 'bjj-database.json');
const mapPath = path.join(dataDir, 'foundation-mapping.json');
const copyPath = path.join(dataDir, 'position-copy.json');

console.log('Loading data files...');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
const foundation = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
const copy = JSON.parse(fs.readFileSync(copyPath, 'utf8'));

console.log('Merging foundation_mapping and position_copy into bjj-database.json...');
db.foundation_mapping = foundation;
db.position_copy = copy;
db.last_updated = new Date().toISOString().slice(0, 10);

console.log('Writing consolidated database...');
fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

console.log('✓ Successfully merged data into bjj-database.json');
console.log('  - foundation_mapping: added');
console.log('  - position_copy: added');
console.log('\nYou can now delete foundation-mapping.json and position-copy.json if desired.');
