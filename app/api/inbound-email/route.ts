import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  const secret = process.env.INBOUND_WEBHOOK_SECRET
  if (secret) {
    const svixId = req.headers.get('svix-id')
    const svixTimestamp = req.headers.get('svix-timestamp')
    const svixSignature = req.headers.get('svix-signature')
    if (!svixId || !svixTimestamp || !svixSignature) {
      console.warn('[inbound-email] Missing svix headers — rejecting')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    // Signature verification would go here if svix SDK is installed
    // For now, checking presence of all three headers is a basic guard
  } else {
    console.warn('[inbound-email] INBOUND_WEBHOOK_SECRET not set — accepting without verification')
  }

  let payload: Record<string, unknown>
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const fromEmail = (payload.from as string | undefined) ?? ''
  const subject = (payload.subject as string | undefined) ?? ''
  const bodyText =
    (payload.text as string | undefined) ??
    (payload.body_text as string | undefined) ??
    ''

  try {
    const supabase = await createServiceClient()
    await supabase.from('fertility_specialist_inbound_emails').upsert({
      from_email: fromEmail,
      subject: subject.slice(0, 500),
      body_text: bodyText.slice(0, 10000),
      received_at: new Date().toISOString(),
      processed: false,
    })
  } catch (err) {
    console.error('[inbound-email] Failed to store:', err)
  }

  return NextResponse.json({ received: true })
}
