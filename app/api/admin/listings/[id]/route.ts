import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServiceClient } from '@/lib/supabase/server'

interface RouteContext {
  params: Promise<{ id: string }>
}

async function isAdmin(): Promise<boolean> {
  const cookieStore = await cookies()
  const expected = process.env.ADMIN_SECRET
  const actual = cookieStore.get('admin_token')?.value
  return Boolean(expected && actual && actual === expected)
}

export async function PATCH(req: NextRequest, { params }: RouteContext) {
  if (req.headers.get('origin') !== new URL(req.url).origin) return NextResponse.json({ error: 'Request origin is not allowed' }, { status: 403 })
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  if (!/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(id)) return NextResponse.json({ error: 'Invalid listing' }, { status: 400 })
  let body: { action?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (!body || typeof body !== 'object' || Array.isArray(body) || Object.keys(body).some(key => key !== 'action')) return NextResponse.json({ error: 'Only an explicit review action is allowed' }, { status: 400 })
  const { action } = body
  if (action !== 'approve' && action !== 'reject') {
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  }

  const supabase = await createServiceClient()
  const { data, error } = await supabase
    .from('fertility_specialist_listings')
    .update({
      is_approved: action === 'approve',
      is_active: action === 'approve',
    })
    .eq('id', id)
    .select('id,is_approved,is_active')
    .maybeSingle()

  if (error) {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }

  if (!data) return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
  if (data.id !== id || data.is_approved !== (action === 'approve') || data.is_active !== (action === 'approve')) return NextResponse.json({ error: 'Review result was not confirmed' }, { status: 409 })
  return NextResponse.json({ success: true })
}
