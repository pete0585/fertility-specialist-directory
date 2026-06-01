import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Fertility Specialist Directory — Find IVF Doctors & REI Specialists Near You',
    template: '%s | Fertility Specialist Directory',
  },
  description:
    'Find a board-certified fertility specialist, reproductive endocrinologist (REI), or IVF doctor near you. 1,000+ specialists. Searchable by city, specialty, and insurance.',
  keywords: [
    'fertility specialist',
    'reproductive endocrinologist',
    'IVF doctor',
    'fertility clinic near me',
    'fertility specialist near me',
    'REI specialist',
  ],
  openGraph: {
    title: 'Fertility Specialist Directory — Find IVF Doctors & REI Specialists Near You',
    description:
      'Find a board-certified fertility specialist near you. Thousands of reproductive endocrinologists, fertility clinics, and fertility-adjacent providers.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Fertility Specialist Directory',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fertility Specialist Directory',
    description:
      'Find IVF doctors and fertility specialists near you. Free to search, free to find.',
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fertilityspecialistdirectory.com'
  ),
  alternates: {
    canonical: '/',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-cream-50">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
