# ctf-mapper — README

This small workspace helps you map blog CTF challenges to TryHackMe (THM) rooms and (optionally) fetch flags locally in a secure way.

High level
- data/challenge-mapping.json — mapping template (challengeId, title, thmRoomUrl, flags[]).
- scripts/sync_thm.js — puppeteer script to fetch flags from THM rooms. Runs locally and accepts credentials via environment variables or an interactive prompt. Creates a timestamped backup of the mapping file before writing.
- scripts/apply_mapping.js — dry-run by default, prints what would be applied; --apply writes ctf-applied-mapping.json in the repository root.

Security & privacy
- Never commit passwords, API tokens, or real flag answers into your repository. Keep them local.
- The sync script uses environment variables THM_EMAIL and THM_PASSWORD when provided. If not set, it prompts interactively.
- The sync script does not store credentials to disk; it writes an updated mapping JSON and a timestamped backup (mapping.json.bak.TIMESTAMP).

Quick start (local)
1. Install dependencies inside the `ctf-mapper` folder:

```bash
cd ctf-mapper
npm install
```

2. Populate `data/challenge-mapping.json` with the rooms you want to sync. Use the template entries as examples.

3. Run sync (interactive or via env vars):

```bash
# interactive prompt
node scripts/sync_thm.js --mapping data/challenge-mapping.json

# or using env vars (preferred for non-interactive runs, do NOT commit these vars):
THM_EMAIL="you@example.com" THM_PASSWORD="hunter2" node scripts/sync_thm.js --mapping data/challenge-mapping.json
```

4. Inspect the mapping file (a backup is created automatically). When happy, apply the mapping (dry-run first):

```bash
node scripts/apply_mapping.js --mapping data/challenge-mapping.json
# to actually write ctf-applied-mapping.json
node scripts/apply_mapping.js --mapping data/challenge-mapping.json --apply
```

Notes & troubleshooting
- THM may change page layouts; the sync script heuristically looks for flag-like strings. If it fails to find answers you expect, open the room in a browser and confirm how the flag is presented.
- If login fails automatically, consider running with headful Puppeteer (edit script to launch with headless: false) so you can log in manually in the opened browser session.
- The sync script is intentionally conservative — it will only populate answers it heuristically finds and will back up your mapping before overwriting.

Next steps I can take for you
- Refine selectors/logic in `scripts/sync_thm.js` to match specific THM room structures you plan to target.
- After you run the sync locally and confirm the mapping file, I can run `apply_mapping.js --apply` to update blog challenge metadata (or implement targeted in-place edits for specific files).
