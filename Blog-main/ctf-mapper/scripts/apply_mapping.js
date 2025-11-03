#!/usr/bin/env node
/*
 * Apply mapping to the blog codebase in a safe way.
 * By default this script runs in dry-run mode (prints what would change).
 * Use --apply to write the 'ctf-applied-mapping.json' file under the project root.
 */

const fs = require('fs');
const path = require('path');

function parseArgs() {
  const args = process.argv.slice(2);
  const out = { mapping: 'data/challenge-mapping.json', apply: false };
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--mapping' && args[i+1]) { out.mapping = args[i+1]; i++; }
    if (args[i] === '--apply') out.apply = true;
    if (args[i] === '--dry') out.apply = false;
  }
  return out;
}

function main() {
  const args = parseArgs();
  const mappingPath = path.resolve(process.cwd(), args.mapping);
  if (!fs.existsSync(mappingPath)) {
    console.error('Mapping file not found:', mappingPath);
    process.exit(1);
  }
  const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));

  // Build an 'applied' payload that is safe to commit (but we still recommend not committing answers)
  const applied = { appliedAt: new Date().toISOString(), mappings: [] };
  for (const m of mapping.mappings || []) {
    applied.mappings.push({ challengeId: m.challengeId, thmRoomUrl: m.thmRoomUrl, flags: m.flags.map(f => ({ id: f.id, answer: f.answer || null })) });
  }

  if (!args.apply) {
    console.log('DRY-RUN: the following would be written to ctf-applied-mapping.json in the repo root:');
    console.log(JSON.stringify(applied, null, 2));
    console.log('\nRun with --apply to write the file.');
    return;
  }

  const outPath = path.resolve(process.cwd(), 'ctf-applied-mapping.json');
  fs.writeFileSync(outPath + '.bak', fs.existsSync(outPath) ? fs.readFileSync(outPath) : '{}');
  fs.writeFileSync(outPath, JSON.stringify(applied, null, 2), 'utf8');
  console.log('Applied mapping written to', outPath);
}

main();
