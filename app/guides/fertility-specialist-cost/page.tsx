import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'How Much Does a Fertility Specialist Cost? | Fertility Specialist Directory',
  description: 'Fertility specialist consultations cost $200–$500. IVF cycles cost $12,000–$25,000 all-in. Here is what affects cost and how to get treatment covered by insurance.',
  alternates: { canonical: '/guides/fertility-specialist-cost' },
}

export const revalidate = 86400

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does a fertility consultation cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An initial fertility consultation with a reproductive endocrinologist (RE) typically costs $200–$500. This usually includes a review of your medical history, discussion of your situation, and a plan for diagnostic testing. Diagnostic testing (bloodwork, semen analysis, hysterosalpingogram, ultrasound) adds $500–$2,000 before any treatment begins. Many fertility clinics offer new patient consultations at a flat rate — ask when scheduling.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does IUI cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Intrauterine insemination (IUI) costs $300–$900 per cycle for the procedure itself. With ovulation stimulation medications (Clomid, Letrozole, or injectable gonadotropins), total per-cycle costs range from $500 to $2,500. Multiple IUI cycles are often attempted before moving to IVF — three cycles is typical. Total IUI costs before escalating to IVF: $1,500–$7,500.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does insurance cover fertility treatments?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '21 states plus DC currently have fertility insurance mandate laws, requiring varying levels of coverage for diagnosis and treatment of infertility. States with strong coverage include Massachusetts, New Jersey, New York, Illinois, and Maryland. Even in mandate states, coverage varies by employer plan type (self-insured employers are exempt from state mandates). Call your insurance and ask specifically: "What fertility benefits do I have? Is IVF covered? Is there a lifetime maximum?"',
      },
    },
    {
      '@type': 'Question',
      name: 'Why do fertility treatment costs vary so much between clinics?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fertility clinic pricing varies based on: geographic market (urban coastal clinics charge significantly more), laboratory quality and certification, embryologist expertise and lab outcomes, whether the clinic uses fresh or frozen egg banks, and what is included in the "base" IVF price (monitoring ultrasounds, anesthesia, embryo freezing, and genetic testing are often separate line items). Always ask for an itemized cost breakdown — not just the headline IVF price.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the cheapest way to get fertility treatment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The most affordable paths to fertility treatment: (1) Start with OB-GYN-managed Clomid cycles before seeing an RE — may cost $100–$300 per cycle. (2) If IVF is needed, look at clinics in lower-cost markets — a $12,000 IVF cycle in the midwest vs. $18,000 in NYC. (3) Shared risk or mini-IVF programs may reduce cost for appropriate candidates. (4) Employer fertility benefits (RESOLVE estimates 40% of Fortune 500 companies now offer fertility benefits). (5) Financing through Prosper Healthcare Lending or similar at 0% promotional periods.',
      },
    },
  ],
}

export default function FertilitySpecialistCostPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="max-w-3xl mx-auto px-4 py-10 sm:px-6">
        <nav className="text-sm text-gray-500 mb-6 flex items-center gap-1">
          <Link href="/" className="hover:text-purple-700">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/listings" className="hover:text-purple-700">Find a Specialist</Link>
          <ChevronRight className="h-3 w-3" />
          <span>Fertility Specialist Cost</span>
        </nav>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-tight">
          How Much Does a Fertility Specialist Cost?
        </h1>
        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
          Initial consultations cost $200–$500. Full IVF cycles run $12,000–$25,000 all-in. Here
          is a complete breakdown of what you will pay at each step of fertility treatment.
        </p>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
            <thead><tr className="bg-purple-700 text-white">
              <th className="text-left px-4 py-3">Service</th>
              <th className="text-left px-4 py-3">Typical Cost Range</th>
            </tr></thead>
            <tbody>
              {[
                ['Initial consultation', '$200–$500'],
                ['Diagnostic workup (blood, imaging, semen analysis)', '$500–$2,000'],
                ['IUI (per cycle)', '$500–$2,500 with medications'],
                ['IVF (base cycle)', '$12,000–$15,000'],
                ['IVF medications', '$3,000–$6,000'],
                ['Frozen embryo transfer', '$3,000–$5,000'],
                ['PGT-A (genetic testing per embryo)', '$300–$500/embryo'],
                ['Egg freezing (per cycle)', '$8,000–$12,000'],
              ].map(([svc, cost], i) => (
                <tr key={svc} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3 font-medium text-gray-800">{svc}</td>
                  <td className="px-4 py-3 text-gray-600">{cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="space-y-4 mb-8">
          {faqSchema.mainEntity.map((item) => (
            <div key={item.name} className="rounded-xl border border-gray-200 bg-white p-5">
              <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>
        <div className="bg-purple-700 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Find a Fertility Specialist Near You</h2>
          <p className="text-purple-100 mb-6">Browse reproductive endocrinologists and fertility clinics by location, insurance, and treatment type.</p>
          <Link href="/listings" className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 font-semibold text-purple-700 hover:bg-purple-50 transition-colors">
            Browse Fertility Specialists →
          </Link>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-3">Related Guides</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/guides/ivf-cost-guide" className="text-sm text-purple-700 font-medium">IVF Cost Guide →</Link>
            <Link href="/guides/iui-vs-ivf" className="text-sm text-purple-700 font-medium">IUI vs IVF →</Link>
            <Link href="/guides/when-to-see-a-fertility-specialist" className="text-sm text-purple-700 font-medium">When to See a Fertility Specialist →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
