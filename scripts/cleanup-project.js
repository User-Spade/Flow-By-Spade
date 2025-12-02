/**
 * Cleanup Utility - Maintains Project Organization
 * 
 * This script enforces file organization rules by:
 * - Removing old backup files (keeps max 3 recent per file)
 * - Cleaning temporary files
 * - Reporting organization violations
 * 
 * Run this periodically or before commits.
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.resolve(__dirname, '../data');
const ROOT_DIR = path.resolve(__dirname, '..');
const MAX_BACKUPS = 3;

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Find all backup files matching pattern: *.backup.YYYY-MM-DD*.json
 */
function findBackupFiles(directory) {
  const backupPattern = /\.backup\.\d{4}-\d{2}-\d{2}T[\d-]+Z\.json$/;
  const files = fs.readdirSync(directory);
  
  return files
    .filter(file => backupPattern.test(file))
    .map(file => ({
      name: file,
      path: path.join(directory, file),
      // Extract original filename and timestamp
      original: file.replace(backupPattern, '.json'),
      timestamp: file.match(/\.backup\.(.+)\.json$/)?.[1] || '',
      stats: fs.statSync(path.join(directory, file)),
    }));
}

/**
 * Group backups by original filename
 */
function groupBackups(backups) {
  const grouped = {};
  
  backups.forEach(backup => {
    if (!grouped[backup.original]) {
      grouped[backup.original] = [];
    }
    grouped[backup.original].push(backup);
  });
  
  // Sort each group by timestamp (newest first)
  Object.keys(grouped).forEach(key => {
    grouped[key].sort((a, b) => b.timestamp.localeCompare(a.timestamp));
  });
  
  return grouped;
}

/**
 * Clean old backups, keeping only the N most recent
 */
function cleanBackups(directory, maxKeep = MAX_BACKUPS) {
  log(`\n🧹 Cleaning backups in ${path.relative(ROOT_DIR, directory)}...`, 'cyan');
  
  const backups = findBackupFiles(directory);
  
  if (backups.length === 0) {
    log('  ✓ No backups found', 'green');
    return { kept: 0, removed: 0 };
  }
  
  const grouped = groupBackups(backups);
  let kept = 0;
  let removed = 0;
  
  Object.keys(grouped).forEach(original => {
    const backupGroup = grouped[original];
    log(`\n  📄 ${original}`, 'blue');
    
    backupGroup.forEach((backup, index) => {
      if (index < maxKeep) {
        log(`    ✓ Keep: ${backup.name}`, 'green');
        kept++;
      } else {
        log(`    ✗ Remove: ${backup.name}`, 'red');
        try {
          fs.unlinkSync(backup.path);
          removed++;
        } catch (err) {
          log(`    ⚠ Failed to remove: ${err.message}`, 'yellow');
        }
      }
    });
  });
  
  return { kept, removed };
}

/**
 * Find temporary files that should be cleaned
 */
function cleanTempFiles() {
  log(`\n🧹 Cleaning temporary files in root...`, 'cyan');
  
  const tempPatterns = [
    /^tmp_.*\.json$/,
    /^temp_.*\.json$/,
    /^test_.*\.json$/,
  ];
  
  const files = fs.readdirSync(ROOT_DIR);
  let removed = 0;
  
  files.forEach(file => {
    const isTemp = tempPatterns.some(pattern => pattern.test(file));
    
    if (isTemp) {
      const filePath = path.join(ROOT_DIR, file);
      log(`  ✗ Remove: ${file}`, 'red');
      try {
        fs.unlinkSync(filePath);
        removed++;
      } catch (err) {
        log(`  ⚠ Failed to remove: ${err.message}`, 'yellow');
      }
    }
  });
  
  if (removed === 0) {
    log('  ✓ No temporary files found', 'green');
  }
  
  return removed;
}

/**
 * Check for organization violations
 */
function checkViolations() {
  log(`\n🔍 Checking for organization violations...`, 'cyan');
  
  const violations = [];
  const rootFiles = fs.readdirSync(ROOT_DIR);
  
  // Allowed root files
  const allowedRoot = [
    'package.json',
    'package-lock.json',
    'tsconfig.json',
    'app.json',
    'app.config.ts',
    'App.tsx',
    'index.ts',
    '.gitignore',
    '.env',
    '.env.example',
    '.env.local',
    'README.md',
    'PROJECT_INFO.md',
    'FILE_ORGANIZATION_RULES.md',
  ];
  
  const allowedRootDirs = [
    'node_modules',
    '.expo',
    '.git',
    'app',
    'assets',
    'components',
    'constants',
    'contexts',
    'data',
    'scripts',
    'services',
    'hooks',
    'utils',
    'types',
    'tmp',
  ];
  
  rootFiles.forEach(file => {
    const filePath = path.join(ROOT_DIR, file);
    const stats = fs.statSync(filePath);
    
    if (stats.isFile() && !allowedRoot.includes(file)) {
      violations.push(`❌ Orphan file in root: ${file}`);
    }
    
    if (stats.isDirectory() && !allowedRootDirs.includes(file)) {
      violations.push(`❌ Unexpected directory in root: ${file}/`);
    }
  });
  
  if (violations.length === 0) {
    log('  ✓ No violations found!', 'green');
  } else {
    violations.forEach(v => log(`  ${v}`, 'yellow'));
    log(`\n  ⚠ Found ${violations.length} violation(s)`, 'yellow');
    log('  📖 Review FILE_ORGANIZATION_RULES.md for proper locations', 'cyan');
  }
  
  return violations;
}

/**
 * Main execution
 */
function main() {
  log('\n╔════════════════════════════════════════╗', 'cyan');
  log('║   Project Organization Cleanup Tool   ║', 'cyan');
  log('╚════════════════════════════════════════╝', 'cyan');
  
  // Clean backups in /data/
  const dataResults = cleanBackups(DATA_DIR);
  
  // Clean temp files in root
  const tempRemoved = cleanTempFiles();
  
  // Check for violations
  const violations = checkViolations();
  
  // Summary
  log('\n' + '═'.repeat(42), 'cyan');
  log('📊 Summary:', 'cyan');
  log(`  • Backups kept: ${dataResults.kept}`, 'blue');
  log(`  • Backups removed: ${dataResults.removed}`, 'blue');
  log(`  • Temp files removed: ${tempRemoved}`, 'blue');
  log(`  • Organization violations: ${violations.length}`, violations.length > 0 ? 'yellow' : 'blue');
  log('═'.repeat(42) + '\n', 'cyan');
  
  if (violations.length === 0 && dataResults.removed === 0 && tempRemoved === 0) {
    log('✨ Project is clean and organized!', 'green');
  } else if (violations.length > 0) {
    log('⚠️  Manual review needed for violations', 'yellow');
  } else {
    log('✅ Cleanup complete!', 'green');
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { cleanBackups, cleanTempFiles, checkViolations };
