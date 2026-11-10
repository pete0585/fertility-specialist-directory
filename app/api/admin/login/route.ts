import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  if (req.headers.get('origin') !== new URL(req.url).origin) return NextResponse.json({ error: 'Request origin is not allowed' }, { status: 403 })
  if (!process.env.ADMIN_SECRET) return NextResponse.json({ error: 'Administrator access is not configured' }, { status: 503 })
  let body: unknown
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }) }
  if (!body || typeof body !== 'object' || Array.isArray(body) || Object.keys(body).some(k => k !== 'password')) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  const { password } = body as { password?: unknown }
  if (typeof password !== 'string' || !password || password !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 })
  }

  const cookieStore = await cookies()
  cookieStore.set('admin_token', process.env.ADMIN_SECRET!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
  })

  return NextResponse.json({ success: true })
}
