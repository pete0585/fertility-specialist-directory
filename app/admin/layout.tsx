import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const adminToken = cookieStore.get('admin_token')

  if (adminToken?.value !== process.env.ADMIN_SECRET) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="bg-teal-700 text-white px-6 py-4 flex items-center justify-between">
        <span className="font-serif font-bold text-lg">
          Fertility Specialist Directory — Admin
        </span>
        <a
          href="/api/admin/logout"
          className="text-xs text-teal-200 hover:text-white font-medium"
        >
          Sign out
        </a>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</div>
    </div>
  )
}
