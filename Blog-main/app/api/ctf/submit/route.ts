import { NextResponse } from 'next/server'

/**
 * TryHackMe / HackTheBox Room Flag Validation
 * 
 * IMPORTANT: These flags must match the actual flags from the linked TryHackMe rooms.
 * To get the correct flags:
 * 1. Complete the corresponding TryHackMe room
 * 2. Copy the flags you found in that room
 * 3. Update the flags below with the actual values
 * 
 * Challenge Mappings:
 * - Challenge 1: BasicPentesting (https://tryhackme.com/room/basicpentestingj3rks)
 * - Challenge 2: Postman (https://app.hackthebox.com/machines/Postman) - Payment API Security Audit
 * - Challenge 3: Vaccine (https://app.hackthebox.com/machines/Vaccine)
 * - Challenge 4: Snort Challenge - The Basics (https://tryhackme.com/room/snortchallenges1)
 * - Challenge 5: Android App (https://tryhackme.com/room/androidapp)
 * - Challenge 6: XSS (https://tryhackme.com/room/xss)
 * - Challenge 7: Web Fundamentals (https://tryhackme.com/room/webfundamentals)
 * - Challenge 8: Encryption - Crypto 101 (https://tryhackme.com/room/encryptioncrypto101)
 * 
 * NOTE: Flags in TryHackMe rooms are typically THM{...}; HackTheBox are typically HTB{...}.
 * Complete the rooms first, then update these flags with the actual values you found.
 */
const VALID_FLAGS: Record<string, Record<string, string>> = {
  '1': {
    // BasicPentesting (THM) — single flag
    'main': 'THM{FLAG_FROM_BASICPENTESTING}'
  },
  '2': {
    // HackTheBox Postman machine flags - UPDATE WITH ACTUAL FLAGS FROM THE MACHINE
    'user': 'HTB{FLAG_FROM_POSTMAN_USER}',
    'root': 'HTB{FLAG_FROM_POSTMAN_ROOT}'
  },
  '3': {
    // HackTheBox Vaccine machine flags - UPDATE WITH ACTUAL FLAGS FROM THE MACHINE
    'user': 'HTB{FLAG_FROM_VACCINE_USER}',
    'root': 'HTB{FLAG_FROM_VACCINE_ROOT}'
  },
  '4': {
    // Snort Challenge (THM) — single flag
    'main': 'THM{FLAG_FROM_SNORTCHALLENGE}'
  },
  '5': {
    // Android App (THM) — single flag
    'main': 'THM{FLAG_FROM_ANDROIDAPP}'
  },
  '6': {
    // XSS (THM) — single flag
    'main': 'THM{FLAG_FROM_XSS}'
  },
  '7': {
    // Web Fundamentals (THM) — single flag
    'main': 'THM{FLAG_FROM_WEBFUNDAMENTALS}'
  },
  '8': {
    // Encryption - Crypto 101 (THM) — single flag
    'main': 'THM{FLAG_FROM_CRYPTO101}'
  },
  '9': {
    // IoT Security (THM) — single flag
    'main': 'THM{FLAG_FROM_IOTSECURITY}'
  },
  '10': {
    // HackTheBox Registry — user/root flags
    'user': 'HTB{FLAG_FROM_REGISTRY_USER}',
    'root': 'HTB{FLAG_FROM_REGISTRY_ROOT}'
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { challengeId, flag, flagId = 'main' } = body || {}

    if (!challengeId || !flag) {
      return NextResponse.json({ ok: false, message: 'Missing challenge ID or flag' }, { status: 400 })
    }

    // Get the correct flag for this challenge and flag ID
    const challengeFlags = VALID_FLAGS[String(challengeId)]
    if (!challengeFlags) {
      return NextResponse.json({ ok: false, message: 'Invalid challenge ID' }, { status: 400 })
    }

    const correctFlag = challengeFlags[flagId]
    if (!correctFlag) {
      return NextResponse.json({ ok: false, message: 'Invalid flag ID' }, { status: 400 })
    }

    // Validate the flag exactly matches the expected flag
    const isValidFlag = String(flag).trim() === correctFlag

    if (isValidFlag) {
      return NextResponse.json({ 
        ok: true, 
        message: `Correct! ${flagId} flag accepted!`,
        flagId,
        points: flagId === 'user' ? 50 : 100 // Different points for different flags
      })
    } else {
      return NextResponse.json({ 
        ok: false, 
        message: `Incorrect ${flagId} flag. Try again!` 
      })
    }
  } catch (err) {
    return NextResponse.json({ ok: false, message: 'Server error' }, { status: 500 })
  }
}
