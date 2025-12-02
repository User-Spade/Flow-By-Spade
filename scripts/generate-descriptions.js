const fs = require('fs');
const path = require('path');

const DB_PATH = path.resolve(__dirname, '../data/bjj-database.json');
const COPY_PATH = path.resolve(__dirname, '../data/position-copy.json');

function loadJson(p) { return JSON.parse(fs.readFileSync(p, 'utf8')); }
function saveJson(p, obj) { fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n', 'utf8'); }

function hashId(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
  }
  return Math.abs(h);
}

function pick(arr, seed) {
  if (!arr.length) return '';
  return arr[seed % arr.length];
}

function tone(positionName, category, idSeed) {
  const name = positionName;
  const seed = hashId(idSeed + ':' + category);

  const closers = {
    finish: [
      'It turns control into clean finishes.',
      'It’s built to end exchanges on your terms.',
      'When done well, the finish feels inevitable.',
      'Strong fundamentals here create high‑percentage submissions.',
    ],
    advance: [
      'You use it to advance, isolate, and finish.',
      'It opens pathways to stronger control and decisive offense.',
      'From here, you dictate the next dominant position.',
      'It converts pressure into progress without giving space.',
    ],
    escape: [
      'Your aim is simple: break attachment and rebuild guard.',
      'Done right, you turn defense into a fresh fight.',
      'You don’t win here — you exit intelligently and reset.',
      'The win condition is safe exits back to playable guards.',
    ],
  };

  switch (category) {
    case 'rear_mount_top':
    case 'top_control': {
      const end = pick(closers.finish, seed);
      return `${name} is a control platform that turns pressure into progress. With gravity, balance, and leverage on your side, you can isolate limbs, climb to chokes, or transition to even stronger control. ${end}`;
    }
    case 'full_mount_top': {
      const end = pick(closers.finish, seed + 1);
      return `Full mount is one of the most dominant positions in jiu‑jitsu. With your hips heavy and posture stable, you can isolate arms, set up chokes, and force reactions that lead to stronger control. ${end}`;
    }
    case 'guard_bottom': {
      const end = pick(closers.advance, seed + 2);
      return `${name} is a dynamic framework: you manage distance, win inside position, and off‑balance before entering attacks. When you control the knee line and hand fight well, sweeps and submissions open up. ${end}`;
    }
    case 'guard_top': {
      const end = pick(closers.advance, seed + 3);
      return `${name} is about posture, pressure, and patience. You deny grips, break frames, and move hips to hips before you pass. Good top guard isn’t a race — it’s steady pressure that turns defense into mistakes and mistakes into passes. ${end}`;
    }
    case 'side_control_top': {
      const end = pick(closers.advance, seed + 4);
      return `${name} converts chest‑to‑chest pressure into progress. Turn the head with a crossface, pin the far hip, and switch bases to isolate arms. ${end}`;
    }
    case 'knee_on_belly_top': {
      const end = pick(closers.advance, seed + 5);
      return `${name} is mobile pressure. You float between hips and ribs, forcing reactions that expose arms and neck. Done well, it breaks posture without giving space and sets up fast transitions to dominant control and submissions. ${end}`;
    }
    case 'turtle_top': {
      const end = pick(closers.advance, seed + 6);
      return `${name} leverages angles and hooks to turn defense into back takes. You manage the hip line, win hand fights, and climb to rear control. ${end}`;
    }
    case 'turtle_bottom': {
      const end = pick(closers.escape, seed + 7);
      return `${name} is a survival shell with smart exits. Frame, protect your neck, and use angles to re‑guard or stand up. ${end}`;
    }
    case 'side_control_bottom': {
      const end = pick(closers.escape, seed + 8);
      return `${name} is about structure before movement. Remove head control, frame the hip, and connect escapes to re‑guard or get‑ups. ${end}`;
    }
    case 'rear_mount_bottom': {
      const end = pick(closers.escape, seed + 9);
      return `${name} is pure defense and smart timing. Protect the choking hand, slide to the safe side, and put your back to the mat to shed hooks. ${end}`;
    }
    case 'leg_entanglement': {
      const end = pick(closers.advance, seed + 10);
      return `${name} controls the knee line and hips to force sweeps and submissions. It’s about angles and attachment: when the knee line is yours, the rest follows. ${end}`;
    }
    case 'transition_state': {
      const end = pick(closers.advance, seed + 11);
      return `${name} is a bridge — a moment where smart pressure and angles turn one control into another. You don’t rush; you exploit reactions. ${end}`;
    }
    default: {
      const end = pick(closers.advance, seed + 12);
      return `${name} is a position where control, posture, and angles decide the match. Understand what it offers, deny their best counters, and use it to advance or finish. ${end}`;
    }
  }
}

function run(write = false) {
  const db = loadJson(DB_PATH);
  let copy;
  try { copy = loadJson(COPY_PATH); } catch { copy = { generated_at: new Date().toISOString(), positions: {} }; }

  const out = copy.positions || {};
  let updated = 0;

  for (const [id, pos] of Object.entries(db.positions)) {
    const display = pos.learning?.display_name || id;
    const foundation = pos.system?.category || 'top_control';
    if (!out[id]) out[id] = {};
    // Only set description if not already authored to avoid overwriting curated text
    if (!out[id].description) {
      out[id].description = tone(display, foundation, id);
      updated++;
    }
  }

  const result = { ...copy, positions: out };
  if (write) {
    saveJson(COPY_PATH, result);
    console.log(`Generated descriptions for ${updated} positions and wrote to position-copy.json`);
  } else {
    const preview = path.resolve(__dirname, '../tmp_position_copy_descriptions_preview.json');
    saveJson(preview, result);
    console.log(`Preview written to ${preview}`);
  }
}

const write = process.argv.includes('--write');
run(write);
