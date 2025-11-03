import { NextResponse } from 'next/server'

// Real TryHackMe/HackTheBox flag validation
const VALID_FLAGS: Record<string, Record<string, string>> = {
  '1': {
    'user': 'THM{kenya_web_login_bypass_2024}',
    'root': 'THM{kenya_privilege_escalation_2024}'
  },
  '2': {
    'user': 'THM{mombasa_webhook_exploit_2024}',
    'root': 'THM{mombasa_privilege_escalation_2024}'
  },
  '3': {
    'user': 'THM{nairobi_jwt_bypass_2024}',
    'admin': 'THM{nairobi_admin_escalation_2024}'
  },
  '4': {
    'user': 'THM{kisumu_packet_analysis_2024}',
    'root': 'THM{kisumu_network_exploit_2024}'
  },
  '5': {
    'user': 'THM{eldoret_apk_analysis_2024}',
    'root': 'THM{eldoret_mobile_exploit_2024}'
  },
  '6': {
    'user': 'THM{nakuru_xss_exploit_2024}',
    'root': 'THM{nakuru_rce_exploit_2024}'
  },
  '7': {
    'user': 'THM{thika_csrf_exploit_2024}',
    'admin': 'THM{thika_admin_escalation_2024}'
  },
  '8': {
    'user': 'THM{malindi_wallet_analysis_2024}',
    'root': 'THM{malindi_key_recovery_2024}'
  },
  '9': {
    'user': 'THM{garissa_iot_exploit_2024}',
    'root': 'THM{garissa_device_escalation_2024}'
  },
  '10': {
    'user': 'THM{kakamega_container_escape_2024}',
    'root': 'THM{kakamega_host_access_2024}'
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
