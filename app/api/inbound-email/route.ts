import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

function parseFromHeader(raw: string): { email: string; name: string | null } {
  const match = raw.match(/<([^>]+)>/)
  if (match) {
    const email = match[1].toLowerCase().trim()
    const name = raw.replace(/<[^>]+>/, '').replace(/"/g, '').trim() || null
    return { email, name }
  }
  return { email: raw.toLowerCase().trim(), name: null }
}

export async function POST(req: NextRequest) {
  let payload: Record<string, unknown>
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  // Resend delivers inbound webhooks via Svix envelope format:
  // { type: "email.received", data: { from, to, subject, text, html, headers } }
  const emailData: Record<string, unknown> =
    payload.type === 'email.received' && payload.data && typeof payload.data === 'object'
      ? (payload.data as Record<string, unknown>)
      : payload

  const fromRaw = String(emailData.from ?? '')
  if (!fromRaw) {
    return NextResponse.json({ received: true })
  }

  const { email: fromEmail } = parseFromHeader(fromRaw)
  const subject = String(emailData.subject ?? '')

  // Body extraction — try multiple field names Resend may use
  const bodyText = String(
    emailData.text ??
    emailData.textBody ??
    emailData.text_body ??
    emailData.body_text ??
    (typeof emailData.body === 'string' ? emailData.body : null) ??
    ''
  )
  const bodyHtml = String(
    emailData.html ??
    emailData.htmlBody ??
    emailData.html_body ??
    emailData.body_html ??
    ''
  )

  try {
    const supabase = await createServiceClient()
    await supabase.from('fertility_specialist_inbound_emails').insert({
      from_email: fromEmail,
      subject: subject.slice(0, 500),
      body_text: bodyText.slice(0, 10000),
      body_html: bodyHtml.slice(0, 50000),
      received_at: new Date().toISOString(),
      processed: false,
    })
  } catch (err) {
    console.error('[inbound-email] Failed to store:', err)
  }

  return NextResponse.json({ received: true })
}
