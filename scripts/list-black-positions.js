const fs = require('fs');
const db = JSON.parse(fs.readFileSync('data/bjj-database.json', 'utf8'));

console.log('Black Belt Positions:\n');

const blackBeltPositions = Object.entries(db.positions)
  .filter(([id, p]) => p.system.min_belt === 'black')
  .map(([id, p]) => ({ id, name: p.learning.display_name, category: p.system.category }));

// Group by category
const byCategory = {};
blackBeltPositions.forEach(pos => {
  if (!byCategory[pos.category]) byCategory[pos.category] = [];
  byCategory[pos.category].push(pos);
});

Object.entries(byCategory).forEach(([category, positions]) => {
  console.log(`\n${category.toUpperCase()}:`);
  positions.forEach(p => console.log(`  ${p.id} - ${p.name}`));
});

console.log(`\n\nTotal Black Belt Positions: ${blackBeltPositions.length}`);
