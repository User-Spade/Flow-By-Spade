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
const SIZES = {
  concepts: { white: 4, blue: 6, purple: 8, brown: 10, black: Infinity },
  key_details: { white: 3, blue: 5, purple: 7, brown: 9, black: Infinity },
  common_mistakes: { white: 3, blue: 4, purple: 5, brown: 6, black: Infinity },
  transitions: { white: 3, blue: 4, purple: 6, brown: 8, black: Infinity },
};

function uniq(arr) { return Array.from(new Set((arr || []).filter(Boolean))); }

function curateByBelt(list, belt, maxSizes) {
  const size = maxSizes[belt] ?? Infinity;
  if (!Array.isArray(list)) return [];
  return list.slice(0, size);
}

function buildUnified(dbPos, copyPos) {
  const learningConcepts = Array.isArray(dbPos.learning?.key_concepts) ? dbPos.learning.key_concepts : [];
  const copyConcepts = Array.isArray(copyPos?.key_concepts) ? copyPos.key_concepts : [];
  const conceptsUnified = uniq([...copyConcepts, ...learningConcepts]);

  const copyDetails = Array.isArray(copyPos?.key_details) ? copyPos.key_details : [];
  const detailsUnified = uniq(copyDetails);

  const learningMistakes = Array.isArray(dbPos.learning?.common_mistakes) ? dbPos.learning.common_mistakes : [];
  const copyMistakes = Array.isArray(copyPos?.common_mistakes) ? copyPos.common_mistakes : [];
  const mistakesUnified = uniq([...copyMistakes, ...learningMistakes]);

  // Transitions: prefer system list; fallback to belt-level union
  const systemTransitions = Array.isArray(dbPos.system?.leads_to_position_ids) ? dbPos.system.leads_to_position_ids : [];
  const beltTransitions = dbPos.belt_levels
    ? Object.values(dbPos.belt_levels).flatMap(b => Array.isArray(b.transitions_available) ? b.transitions_available : [])
    : [];
  const transitionsUnified = uniq([...(systemTransitions || []), ...beltTransitions]);

  return { conceptsUnified, detailsUnified, mistakesUnified, transitionsUnified };
}

function applyCuratedToBelts(dbPos, unified) {
  if (!dbPos.belt_levels) dbPos.belt_levels = {};
  for (const belt of belts) {
    if (!dbPos.belt_levels[belt]) dbPos.belt_levels[belt] = { concepts: [], key_details: [], common_mistakes: [], transitions_available: [] };
    dbPos.belt_levels[belt].concepts = curateByBelt(unified.conceptsUnified, belt, SIZES.concepts);
    dbPos.belt_levels[belt].key_details = curateByBelt(unified.detailsUnified, belt, SIZES.key_details);
    dbPos.belt_levels[belt].common_mistakes = curateByBelt(unified.mistakesUnified, belt, SIZES.common_mistakes);
    dbPos.belt_levels[belt].transitions_available = curateByBelt(unified.transitionsUnified, belt, SIZES.transitions);
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
