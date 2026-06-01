import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { randomBytes } from 'crypto'

const RESEND_FROM = process.env.RESEND_FROM_EMAIL ?? 'hello@mail.fertilityspecialistdirectory.com'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fertilityspecialistdirectory.com'

export async function POST(req: NextRequest) {
  let body: { listingId?: string; email?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const { listingId, email } = body
  if (!listingId || !email) {
    return NextResponse.json({ error: 'Missing listingId or email' }, { status: 400 })
  }

  const supabase = await createServiceClient()

  const { data: listing } = await supabase
    .from('fertility_specialist_listings')
    .select('id, full_name')
    .eq('id', listingId)
    .single()

  if (!listing) {
    return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
  }

  const token = randomBytes(32).toString('hex')
  const expiresAt = new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString() // 72 hours

  await supabase.from('fertility_specialist_claims').insert({
    listing_id: listingId,
    email,
    token,
    verified: false,
    expires_at: expiresAt,
  })

  const verifyUrl = `${SITE_URL}/api/claim/verify?token=${token}&listing_id=${listingId}`

  const resendKey = process.env.RESEND_API_KEY
  if (resendKey) {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
        'User-Agent': 'curl/8.5.0',
      },
      body: JSON.stringify({
        from: `Fertility Specialist Directory <${RESEND_FROM}>`,
        to: [email],
        subject: `Verify your listing claim — ${listing.full_name}`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
            <h1 style="color: #1A6B6B; font-size: 24px; margin-bottom: 16px;">
              Claim Your Listing
            </h1>
            <p style="color: #4a4a4a; line-height: 1.6; margin-bottom: 24px;">
              Click the button below to verify and claim your listing for <strong>${listing.full_name}</strong>
              on the Fertility Specialist Directory.
            </p>
            <a href="${verifyUrl}" style="
              display: inline-block;
              background: #1A6B6B;
              color: white;
              text-decoration: none;
              padding: 14px 28px;
              border-radius: 10px;
              font-family: Inter, sans-serif;
              font-weight: 600;
              font-size: 15px;
              margin-bottom: 24px;
            ">
              Verify My Claim
            </a>
            <p style="color: #888; font-size: 13px; line-height: 1.5;">
              This link expires in 72 hours. If you didn't request this, you can safely ignore this email.
            </p>
          </div>
        `,
      }),
    })
  }

  return NextResponse.json({ success: true })
}
