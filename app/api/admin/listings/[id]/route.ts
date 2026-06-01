import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServiceClient } from '@/lib/supabase/server'

interface RouteContext {
  params: Promise<{ id: string }>
}

async function isAdmin(): Promise<boolean> {
  const cookieStore = await cookies()
  return cookieStore.get('admin_token')?.value === process.env.ADMIN_SECRET
}

export async function PATCH(req: NextRequest, { params }: RouteContext) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  let body: { action?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { action } = body
  if (action !== 'approve' && action !== 'reject') {
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  }

  const supabase = await createServiceClient()
  const { error } = await supabase
    .from('fertility_specialist_listings')
    .update({
      is_approved: action === 'approve',
      is_active: action === 'approve',
    })
    .eq('id', id)

  if (error) {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
