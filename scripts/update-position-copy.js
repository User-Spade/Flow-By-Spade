const fs = require('fs');
const path = require('path');

const DB_PATH = path.resolve(__dirname, '../data/bjj-database.json');
const COPY_PATH = path.resolve(__dirname, '../data/position-copy.json');

function loadJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function saveJson(p, obj) {
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n', 'utf8');
}

function updateLearningForPosition(dbPos, copy) {
  if (!dbPos.learning) dbPos.learning = {};
  if (copy.description) dbPos.learning.description = copy.description;
  if (Array.isArray(copy.key_concepts)) dbPos.learning.key_concepts = copy.key_concepts;
  if (Array.isArray(copy.common_mistakes)) {
    // Ensure learning.common_mistakes exists; preserve if present unless overridden
    dbPos.learning.common_mistakes = copy.common_mistakes;
  }
}

function run({ write = false } = {}) {
  const db = loadJson(DB_PATH);
  const copy = loadJson(COPY_PATH);
  const positionsCopy = copy.positions || {};

  const changed = [];
  for (const [posId, posCopy] of Object.entries(positionsCopy)) {
    const dbPos = db.positions[posId];
    if (!dbPos) {
      console.warn(`[skip] position '${posId}' not found in database`);
      continue;
    }
    updateLearningForPosition(dbPos, posCopy);
    changed.push(posId);
  }

  if (changed.length === 0) {
    console.log('No positions updated.');
    return;
  }

  console.log(`Updated learning copy for ${changed.length} positions:`);
  for (const id of changed) console.log(` - ${id}`);

  if (write) {
    saveJson(DB_PATH, db);
    console.log(`Written updates to ${DB_PATH}`);
  } else {
    const previewPath = path.resolve(__dirname, '../tmp_position_copy_preview.json');
    saveJson(previewPath, db);
    console.log(`Preview written to ${previewPath}. Run with --write to persist.`);
  }
}

const args = process.argv.slice(2);
const write = args.includes('--write');
run({ write });
