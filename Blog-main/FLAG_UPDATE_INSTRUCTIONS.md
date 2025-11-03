# Flag Update Instructions

## Overview
Your CTF challenges are now linked to real TryHackMe CTF rooms. To make flag validation work correctly, you need to complete each TryHackMe room and update the flags in the API route.

## How to Update Flags

### Step 1: Complete the TryHackMe Rooms
For each challenge, complete the corresponding TryHackMe room:

1. **Challenge #1 - Web Login Woes**
   - Room: [BasicPentesting](https://tryhackme.com/room/basicpentestingj3rks)
   - Flags needed: User flag, Root flag

2. **Challenge #2 - M-Pesa API Security Audit**
   - Room: [UltraTech](https://tryhackme.com/room/ultratech1)
   - Flags needed: User flag, Root flag

3. **Challenge #3 - Kenya Government Portal SQLi**
   - Room: [Pickle Rick](https://tryhackme.com/room/picklerick)
   - Flags needed: User flag, Root flag

4. **Challenge #4 - Safaricom Network Traffic Analysis**
   - Room: [Snort Challenge - The Basics](https://tryhackme.com/room/snortchallenges1)
   - Flags needed: User flag (check room for flag format)

5. **Challenge #5 - Kenyan Banking App Reverse Engineering**
   - Room: [Android App](https://tryhackme.com/room/androidapp)
   - Flags needed: User flag (check room for flag format)

6. **Challenge #6 - Kenya Airways Booking System XSS**
   - Room: [XSS](https://tryhackme.com/room/xss)
   - Flags needed: User flag (check room for flag format)

7. **Challenge #7 - KRA Tax Portal CSRF Attack**
   - Room: [Web Fundamentals](https://tryhackme.com/room/webfundamentals)
   - Flags needed: User flag (check room for flag format)

8. **Challenge #8 - M-Shwari Cryptocurrency Wallet Hacking**
   - Room: [Encryption - Crypto 101](https://tryhackme.com/room/encryptioncrypto101)
   - Flags needed: User flag (check room for flag format)

### Step 2: Extract the Flags
When you complete each room, TryHackMe will provide flags in one of these formats:
- `THM{...}` (most common)
- `HTB{...}` (if using HackTheBox)
- Or a specific format mentioned in the room

Copy the exact flags you found in each room.

### Step 3: Update the API Route
1. Open `Blog-main/app/api/ctf/submit/route.ts`
2. Find the `VALID_FLAGS` object
3. Replace the placeholder flags (e.g., `THM{FLAG_FROM_BASICPENTESTING_USER}`) with the actual flags you found
4. Save the file

Example:
```typescript
'1': {
  'user': 'THM{YOUR_ACTUAL_USER_FLAG_HERE}',
  'root': 'THM{YOUR_ACTUAL_ROOT_FLAG_HERE}'
},
```

### Step 4: Test Flag Submission
After updating the flags:
1. Complete a TryHackMe room
2. Copy the flag you found
3. Submit it in your CTF platform
4. Verify it accepts the flag correctly

## Important Notes

- **Flag Format**: Flags are case-sensitive. Make sure to copy them exactly as shown in TryHackMe.
- **Flag Locations**: Flags in TryHackMe rooms are typically found:
  - In user directories (`/home/username/user.txt`)
  - In root directories (`/root/root.txt`)
  - In files, databases, or as answers to questions
- **Testing**: Test each flag after updating to ensure validation works correctly.
- **Security**: Never commit real flags to public repositories. Consider using environment variables for production.

## Need Help?

If you're stuck on a room:
1. Check TryHackMe's official walkthroughs (if available)
2. Look for community writeups on GitHub or Medium
3. Join TryHackMe Discord for hints
4. Use the hints provided in each TryHackMe room

---

**Remember**: The flags in your platform must match the flags from the TryHackMe rooms exactly for the validation to work.

