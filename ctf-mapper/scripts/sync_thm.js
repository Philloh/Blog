#!/usr/bin/env node
/*
 * Lightweight, local script to fetch flags from TryHackMe rooms.
 * Usage: set THM_EMAIL and THM_PASSWORD as environment variables, then run:
 *   node scripts/sync_thm.js --mapping data/challenge-mapping.json
 *
 * Security: This script runs locally, uses your credentials only in-memory,
 * and writes an updated mapping file next to the original (backup is created).
 * IMPORTANT: Do not commit any real flag answers or credentials into the repo.
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

function parseArgs() {
  const args = process.argv.slice(2);
  const out = { mapping: 'data/challenge-mapping.json' };
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--mapping' && args[i+1]) { out.mapping = args[i+1]; i++; }
  }
  return out;
}

async function promptForCreds() {
  const email = process.env.THM_EMAIL;
  const password = process.env.THM_PASSWORD;
  if (email && password) return { email, password };

  // Minimal interactive prompt (if env vars not set)
  const rl = require('readline').createInterface({ input: process.stdin, output: process.stdout });
  const question = (q, hide) => new Promise(resolve => {
    if (!hide) rl.question(q, ans => resolve(ans));
    else {
      const stdin = process.openStdin();
      process.stdin.on('data', char => { char = char + ''; if (char.includes('\n')) rl.pause(); });
      rl.question(q, ans => resolve(ans));
    }
  });
  const email = await question('THM email: ');
  const password = await question('THM password: ', true);
  rl.close();
  return { email, password };
}

async function loginTryHackMe(page, email, password) {
  // TryHackMe may change selectors; this is a best-effort login flow.
  await page.goto('https://tryhackme.com/auth/login', { waitUntil: 'networkidle2' }).catch(() => {});
  // Fallback to /login
  if (page.url().includes('/auth/login') === false && page.url().includes('/login') === false) {
    await page.goto('https://tryhackme.com/login', { waitUntil: 'networkidle2' }).catch(() => {});
  }
  // Attempt common selectors
  const emailSel = 'input[name=email], input[type=email]';
  const passSel = 'input[name=password], input[type=password]';
  await page.waitForTimeout(800);
  try {
    await page.type(emailSel, email, { delay: 30 });
    await page.type(passSel, password, { delay: 30 });
    await Promise.all([page.click('button[type=submit], button.sign-in, input[type=submit]'), page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 10000 })]).catch(()=>{});
  } catch (e) {
    console.warn('Auto-login selectors might not match TryHackMe login page. You may need to login manually in the browser that opens.');
  }
}

function findFlagsInText(text) {
  // Common flag formats: THM{...}, flag{...}, FLAG-..., simple alpha-numeric tokens.
  const patterns = [ /THM\{[^}]+\}/gi, /flag\{[^}]+\}/gi, /FLAG\{[^}]+\}/gi, /flag: ?[A-Za-z0-9_\-{}]+/gi ];
  const found = new Set();
  for (const p of patterns) {
    let m;
    while ((m = p.exec(text)) !== null) found.add(m[0]);
  }
  return Array.from(found);
}

async function extractFlagsFromRoom(page, roomUrl) {
  // Navigate and attempt to extract flag-like strings from visible text and advice blocks.
  try {
    await page.goto(roomUrl, { waitUntil: 'networkidle2', timeout: 20000 });
  } catch (e) {
    console.warn('Failed to open', roomUrl, e.message);
    return [];
  }

  // Wait briefly for content to load
  await page.waitForTimeout(1000);

  // Grab visible text from the page and search for flag patterns
  const pageText = await page.evaluate(() => document.body.innerText || '');
  const fromText = findFlagsInText(pageText);
  if (fromText.length) return fromText;

  // Try searching for answer/flag elements commonly used in TryHackMe task content
  const selectors = ['.question, .answer, .flag, .task-answer, .task-content, .answer-text', '.task-body'];
  for (const sel of selectors) {
    const exists = await page.$(sel);
    if (!exists) continue;
    const txt = await page.evaluate(s => Array.from(document.querySelectorAll(s)).map(n => n.innerText).join('\n'), sel);
    const flags = findFlagsInText(txt);
    if (flags.length) return flags;
  }

  return [];
}

async function main() {
  const args = parseArgs();
  const mappingPath = path.resolve(process.cwd(), args.mapping);
  if (!fs.existsSync(mappingPath)) {
    console.error('Mapping file not found:', mappingPath);
    process.exit(1);
  }

  const raw = fs.readFileSync(mappingPath, 'utf8');
  const mapping = JSON.parse(raw);

  const creds = await promptForCreds();

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  try {
    await loginTryHackMe(page, creds.email, creds.password);
  } catch (e) {
    console.warn('Login attempt failed or not required:', e.message);
  }

  const summary = [];
  for (const m of mapping.mappings || []) {
    if (!m.thmRoomUrl) { summary.push({ id: m.challengeId, skipped: 'no url' }); continue; }
    const found = await extractFlagsFromRoom(page, m.thmRoomUrl);
    if (found && found.length) {
      // Assign discovered answers into empty answers slot(s)
      for (let i = 0; i < Math.min(found.length, (m.flags||[]).length); i++) {
        m.flags[i].answer = found[i];
      }
      m.lastSyncedAt = new Date().toISOString();
      summary.push({ id: m.challengeId, found: found });
    } else {
      summary.push({ id: m.challengeId, found: [] });
    }
  }

  await browser.close();

  // Backup original mapping and write updated mapping
  const backup = mappingPath + '.bak.' + Date.now();
  fs.writeFileSync(backup, raw, 'utf8');
  fs.writeFileSync(mappingPath, JSON.stringify(mapping, null, 2), 'utf8');

  console.log('Sync complete. Backup saved to', backup);
  console.log('Summary:', JSON.stringify(summary, null, 2));
}

main().catch(err => { console.error(err); process.exit(1); });
