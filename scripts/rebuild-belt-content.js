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

const belts = ['white', 'blue', 'purple', 'brown', 'black'];

// Slice sizes per belt, assuming lists are ordered from fundamentals → advanced
// Per-belt counts (tier-exclusive). Black gets the remainder.
const COUNTS = {
  concepts: { white: 4, blue: 3, purple: 3, brown: 3 },
  objectives: { white: 3, blue: 3, purple: 3, brown: 3 },
  common_mistakes: { white: 3, blue: 2, purple: 2, brown: 2 },
  transitions: { white: 3, blue: 2, purple: 2, brown: 2 },
};

function uniq(arr) { return Array.from(new Set((arr || []).filter(Boolean))); }

function cumulativeSlice(list, belt, counts) {
  // Build cumulative content: white gets first N, blue gets white + next M, etc.
  if (!Array.isArray(list)) return [];
  const order = ['white', 'blue', 'purple', 'brown', 'black'];
  const idx = order.indexOf(belt);
  if (idx < 0) return [];
  
  // Calculate total items up to and including this belt
  let total = 0;
  for (let i = 0; i <= idx; i++) {
    if (order[i] === 'black') {
      // Black gets everything remaining
      return list;
    }
    total += counts[order[i]] || 0;
  }
  
  // Return everything from start up to this belt's total
  return list.slice(0, total);
}

function buildUnified(dbPos, copyPos) {
  const learningConcepts = Array.isArray(dbPos.learning?.key_concepts) ? dbPos.learning.key_concepts : [];
  const copyConcepts = Array.isArray(copyPos?.key_concepts) ? copyPos.key_concepts : [];
  const copyDetails = Array.isArray(copyPos?.key_details) ? copyPos.key_details : [];
  // Merge details into concepts per the new model
  const conceptsUnified = uniq([...copyConcepts, ...copyDetails, ...learningConcepts]);

  const objectivesUnified = uniq(Array.isArray(copyPos?.key_objectives) ? copyPos.key_objectives : []);

  const learningMistakes = Array.isArray(dbPos.learning?.common_mistakes) ? dbPos.learning.common_mistakes : [];
  const copyMistakes = Array.isArray(copyPos?.common_mistakes) ? copyPos.common_mistakes : [];
  const mistakesUnified = uniq([...copyMistakes, ...learningMistakes]);

  // Transitions: prefer system list; fallback to belt-level union
  const systemTransitions = Array.isArray(dbPos.system?.leads_to_position_ids) ? dbPos.system.leads_to_position_ids : [];
  const beltTransitions = dbPos.belt_levels
    ? Object.values(dbPos.belt_levels).flatMap(b => Array.isArray(b.transitions_available) ? b.transitions_available : [])
    : [];
  const transitionsUnified = uniq([...(systemTransitions || []), ...beltTransitions]);

  return { conceptsUnified, objectivesUnified, mistakesUnified, transitionsUnified };
}

function applyCuratedToBelts(dbPos, unified) {
  if (!dbPos.belt_levels) dbPos.belt_levels = {};
  for (const belt of belts) {
    if (!dbPos.belt_levels[belt]) dbPos.belt_levels[belt] = { concepts: [], key_details: [], common_mistakes: [], transitions_available: [] };
    dbPos.belt_levels[belt].concepts = cumulativeSlice(unified.conceptsUnified, belt, COUNTS.concepts);
    dbPos.belt_levels[belt].key_objectives = cumulativeSlice(unified.objectivesUnified, belt, COUNTS.objectives);
    // keep key_details for backward compatibility but empty (we're merging into concepts)
    dbPos.belt_levels[belt].key_details = [];
    dbPos.belt_levels[belt].common_mistakes = cumulativeSlice(unified.mistakesUnified, belt, COUNTS.common_mistakes);
    dbPos.belt_levels[belt].transitions_available = cumulativeSlice(unified.transitionsUnified, belt, COUNTS.transitions);
  }
}

function run({ write = false } = {}) {
  const db = loadJson(DB_PATH);
  const copy = loadJson(COPY_PATH);
  const copyPositions = copy.positions || {};

  const updated = [];
  for (const [posId, dbPos] of Object.entries(db.positions)) {
    const copyPos = copyPositions[posId] || null;
    // We only curate for positions we have copy for, leaving others untouched
    if (!copyPos) continue;
    const unified = buildUnified(dbPos, copyPos);
    applyCuratedToBelts(dbPos, unified);
    updated.push(posId);
  }

  console.log(`Curated belt-level content for ${updated.length} positions.`);
  if (!write) {
    const preview = path.resolve(__dirname, '../tmp_belt_curated_preview.json');
    saveJson(preview, db);
    console.log(`Preview written to ${preview}. Run with --write to persist.`);
    return;
  }
  saveJson(DB_PATH, db);
  console.log(`Saved updates to ${DB_PATH}`);
}

const args = process.argv.slice(2);
run({ write: args.includes('--write') });
