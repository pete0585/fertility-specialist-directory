import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Does Insurance Cover IVF? State Mandates and Coverage Guide | Fertility Specialist Directory',
  description: '21 states mandate fertility insurance coverage — but the specifics vary widely. Here is what your state requires and how to maximize your fertility benefits.',
  alternates: { canonical: '/guides/does-insurance-cover-ivf' },
}

export const revalidate = 86400

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Which states require insurance to cover IVF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'As of 2026, the following states have IVF mandate laws: Arkansas, California, Colorado, Connecticut, Delaware, Hawaii, Illinois, Kentucky, Louisiana, Maine, Maryland, Massachusetts, Michigan, Minnesota, Montana, New Hampshire, New Jersey, New York, Ohio, Rhode Island, Texas, Utah, Vermont, and Washington. Mandate scope varies significantly — some states require full IVF coverage, others require only diagnosis or limited treatment cycles. Employer self-insured plans (regulated by federal ERISA, not state law) are generally exempt from state mandates.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between an infertility diagnosis benefit and IVF coverage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Some states mandate coverage for infertility diagnosis but not treatment. This means your bloodwork, semen analysis, and imaging may be covered — but IVF may not be. Other states mandate coverage for infertility treatment, which may or may not include IVF specifically. When reviewing your benefits, ask: "Is IVF explicitly covered? Is there a cycle limit? Is there a lifetime dollar maximum?" These specifics vary enormously between plans.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do self-insured employer plans cover IVF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Self-insured employer plans (which cover about 60% of Americans with employer-sponsored insurance) are regulated by federal ERISA, not state law — meaning they are exempt from state fertility mandates. However, large employers often voluntarily offer fertility benefits as a recruitment and retention tool. RESOLVE estimates that about 40% of Fortune 500 companies now offer some fertility benefit. Check your Summary Plan Description or call your HR benefits team for details.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a fertility insurance benefit through an employer like Progyny?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Progyny, WINFertility, and similar companies operate as fertility benefit managers — employers pay them to administer comprehensive fertility benefits for employees, including IVF with no cycle limits (Progyny offers "Smart Cycles") and access to a curated network of high-quality fertility clinics. If your employer uses Progyny, check the app or portal to understand your Smart Cycle allowance. Progyny members often have significantly better fertility outcomes than average because the benefit incentivizes quality care over volume.',
      },
    },
    {
      '@type': 'Question',
      name: 'What if I have no fertility insurance coverage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Options without coverage: (1) "Shared risk" IVF programs — you pay a flat fee ($20,000–$35,000) and get multiple IVF attempts guaranteed; if you do not take home a baby, most or all is refunded. (2) Mini-IVF or minimal stimulation IVF — lower medication doses, lower cost ($5,000–$7,000), lower success rates per cycle. (3) Financing through Prosper Healthcare Lending or Future Family, often with 0% promotional periods. (4) Clinical trial participation — some trials provide IVF at reduced or no cost. (5) Moving to a fertility-mandate state temporarily — legally complex but some couples explore this.',
      },
    },
  ],
}

export default function InsuranceCoverIvfPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="max-w-3xl mx-auto px-4 py-10 sm:px-6">
        <nav className="text-sm text-gray-500 mb-6 flex items-center gap-1">
          <Link href="/" className="hover:text-purple-700">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/listings" className="hover:text-purple-700">Find a Specialist</Link>
          <ChevronRight className="h-3 w-3" />
          <span>IVF Insurance Coverage</span>
        </nav>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-tight">
          Does Insurance Cover IVF? State Mandates and Coverage Guide
        </h1>
        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
          21 states have some form of fertility insurance mandate — but the specifics vary widely.
          Here is what your state requires and how to get the most out of your fertility benefits.
        </p>
        <div className="space-y-4 mb-8">
          {faqSchema.mainEntity.map((item) => (
            <div key={item.name} className="rounded-xl border border-gray-200 bg-white p-5">
              <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>
        <div className="bg-purple-700 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Find a Fertility Specialist Who Accepts Your Insurance</h2>
          <p className="text-purple-100 mb-6">Search our directory and filter by insurance acceptance to find an in-network fertility clinic.</p>
          <Link href="/listings" className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 font-semibold text-purple-700">Browse Fertility Specialists →</Link>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-3">Related Guides</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/guides/ivf-cost-guide" className="text-sm text-purple-700 font-medium">IVF Cost Guide →</Link>
            <Link href="/guides/fertility-specialist-cost" className="text-sm text-purple-700 font-medium">Fertility Specialist Cost →</Link>
            <Link href="/guides/how-to-choose-a-fertility-specialist" className="text-sm text-purple-700 font-medium">How to Choose a Fertility Specialist →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
