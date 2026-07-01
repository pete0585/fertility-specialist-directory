import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'IVF Cost in 2026: What to Expect and How to Pay | Fertility Specialist Directory',
  description:
    'How much does IVF cost in 2026? Average IVF cycle costs $12,000–$15,000 before medications. Learn what\'s included, what\'s extra, which states mandate insurance coverage, and how to finance fertility treatment.',
  openGraph: {
    url: 'https://fertilityspecialistdirectory.com/guides/ivf-cost-guide',
  },
  alternates: {
    canonical: '/guides/ivf-cost-guide',
  },
}

export const revalidate = 86400

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does one IVF cycle cost in 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The national average for one IVF cycle (egg retrieval plus fresh embryo transfer) ranges from $12,000 to $15,000 before medications. Fertility medications add $3,000–$6,000 per cycle. A frozen embryo transfer (FET) in a subsequent cycle typically costs $3,000–$5,000 additional. Total out-of-pocket cost for a complete IVF cycle with one FET often runs $18,000–$25,000.',
      },
    },
    {
      '@type': 'Question',
      name: 'What states require insurance to cover IVF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'As of 2026, states with IVF insurance mandates include Illinois, Massachusetts, New Jersey, New York, Maryland, Rhode Island, Connecticut, Hawaii, California (SB 600, 2025), Colorado (SB22-128, 3 cycles), Montana, and Arkansas. Coverage details vary significantly by state — some require specific diagnoses, others cover donor cycles, and ERISA self-insured employer plans are exempt from all state mandates.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a Shared Risk IVF program?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A Shared Risk (also called multi-cycle or refund guarantee) program bundles multiple IVF cycles — typically 2 to 4 — into a single upfront payment of $20,000–$35,000. If you complete all included cycles without achieving a live birth, the clinic refunds a portion (often 70–100%) of the program fee. These programs are most cost-effective for patients expected to need multiple cycles, such as those with diminished ovarian reserve or older egg quality.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is mini-IVF significantly cheaper than conventional IVF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Mini-IVF (minimal stimulation IVF) uses lower doses of fertility medications, which reduces medication costs by $1,500–$3,000 per cycle. Total cycle costs are often $5,000–$8,000, making it appear significantly cheaper. However, mini-IVF typically retrieves fewer eggs (2–5 vs. 10–15 in conventional IVF), which means fewer embryos and potentially more cycles needed to achieve a live birth. For patients with normal ovarian reserve, conventional IVF is often more cost-effective per live birth.',
      },
    },
  ],
}

export default function IVFCostGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-sm text-gray-500 mb-6 flex-wrap" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-teal-500 transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" aria-label="" />
          <Link href="/listings" className="hover:text-teal-500 transition-colors">Find a Specialist</Link>
          <ChevronRight className="w-4 h-4" aria-label="" />
          <span className="text-gray-900 font-medium">IVF Cost Guide</span>
        </nav>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          IVF Cost in 2026: What to Expect and How to Pay
        </h1>
        <p className="text-gray-500 text-sm mb-8">Published by Fertility Specialist Directory</p>

        <div className="prose prose-gray max-w-none">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            IVF is the most effective assisted reproductive technology available — and also one of the most significant medical expenses most families will ever face. Understanding what you&rsquo;ll actually pay, what&rsquo;s included, and what insurance may cover is essential before you start treatment.
          </p>

          <h2 className="font-serif text-2xl font-bold text-gray-900 mt-8 mb-4">What Does One IVF Cycle Cost?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The national average for a single IVF cycle in 2026 — egg retrieval plus a fresh embryo transfer — is <strong>$12,000 to $15,000</strong> for the procedure itself, before adding medications or optional add-ons.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            That base price covers the clinic&rsquo;s professional and facility fees for the egg retrieval procedure, embryology lab time (fertilizing eggs, monitoring embryo development for 5–6 days), and one fresh embryo transfer. It does not typically cover anesthesia, fertility medications, or genetic testing.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            Costs vary significantly by geography. New York City and San Francisco clinics often price above $18,000 for the base cycle, while clinics in the South and Midwest may start closer to $10,000. Always request an itemized estimate before signing any financial consent.
          </p>

          <h2 className="font-serif text-2xl font-bold text-gray-900 mt-8 mb-4">What&rsquo;s Included — and What&rsquo;s Extra</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Most clinics quote a &ldquo;base IVF cycle price&rdquo; that does not include the following:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
            <li><strong>Anesthesia:</strong> $500–$1,500, billed by an independent anesthesiology group</li>
            <li><strong>Fertility medications (gonadotropins):</strong> $3,000–$6,000 per cycle — the single largest variable cost; prices depend on your protocol and medication brand</li>
            <li><strong>PGT-A (preimplantation genetic testing):</strong> $3,000–$5,000 for the embryo biopsy session + $150–$300 per embryo tested; adds significant cost but can improve transfer success rates for patients over 37 or with prior failed cycles</li>
            <li><strong>Embryo cryopreservation (freezing):</strong> $1,000–$2,000 one-time fee to freeze remaining embryos</li>
            <li><strong>Embryo storage:</strong> $500–$1,000 per year while embryos remain frozen</li>
            <li><strong>Frozen embryo transfer (FET):</strong> $3,000–$5,000 additional cycle for transferring a frozen embryo in a subsequent month</li>
            <li><strong>Monitoring visits:</strong> Some clinics include ultrasound and bloodwork monitoring in the base price; others charge $150–$400 per monitoring visit</li>
          </ul>

          <h2 className="font-serif text-2xl font-bold text-gray-900 mt-8 mb-4">Does Insurance Cover IVF?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Coverage depends almost entirely on your state and your employer&rsquo;s specific plan. As of 2026, states with IVF insurance mandates include:
          </p>
          <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4 ml-4">
            <li><strong>Illinois</strong> — 4 egg retrievals per lifetime</li>
            <li><strong>Massachusetts</strong> — broad mandate, one of the oldest in the US</li>
            <li><strong>New Jersey, New York, Maryland</strong> — strong coverage requirements</li>
            <li><strong>California</strong> — SB 600 (effective 2025) requires large group plans to cover IVF</li>
            <li><strong>Colorado</strong> — SB22-128 requires coverage of 3 IVF cycles (effective 2023)</li>
            <li><strong>Connecticut, Rhode Island, Hawaii</strong> — various mandate structures</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-6">
            <strong>Critical caveat:</strong> All state mandates apply only to &ldquo;fully insured&rdquo; plans regulated by that state. If your employer self-insures its health plan (very common at large companies), it is governed by federal ERISA law and is exempt from all state mandates. Your HR benefits team can confirm whether your plan is fully insured or self-insured. Many large employers voluntarily offer fertility benefits regardless of state law.
          </p>

          <h2 className="font-serif text-2xl font-bold text-gray-900 mt-8 mb-4">IVF Financing Options</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            For patients without insurance coverage, several financing paths are available:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
            <li><strong>Shared Risk programs:</strong> Bundle 2–4 IVF cycles for $20,000–$35,000 with a partial refund if treatment doesn&rsquo;t result in a live birth. Best for patients who expect to need multiple cycles.</li>
            <li><strong>Medical financing:</strong> Lenders like CapexMD, Prosper Healthcare Lending, and LightStream offer fertility-specific loans at 7–15% APR. Terms range from 24 to 84 months.</li>
            <li><strong>HSA and FSA accounts:</strong> IVF, fertility medications, and most fertility procedures qualify as IRS-recognized medical expenses and can be paid tax-free from a Health Savings Account or Flexible Spending Account.</li>
            <li><strong>Employer fertility benefits:</strong> Companies like Starbucks, Microsoft, Salesforce, Nike, and hundreds of others offer fertility benefits ranging from $5,000 to $50,000 in lifetime coverage. Check your benefits portal even if your plan doesn&rsquo;t have a formal IVF mandate.</li>
            <li><strong>Grants:</strong> Organizations including Baby Quest Foundation, Resolve, and various fertility clinic foundations offer financial assistance grants for qualified patients.</li>
          </ul>

          <h2 className="font-serif text-2xl font-bold text-gray-900 mt-8 mb-4">Mini-IVF vs. Conventional IVF</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Mini-IVF (minimal stimulation IVF) uses significantly lower doses of fertility medications — sometimes just oral Clomid rather than injectable gonadotropins. This reduces medication costs by $1,500–$3,000 per cycle, and some mini-IVF clinics advertise cycle costs as low as $5,000–$8,000.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The trade-off is egg yield. Conventional IVF aims to retrieve 8–15 eggs per cycle; mini-IVF typically retrieves 2–5. Fewer eggs mean fewer embryos, fewer opportunities for successful transfer, and potentially more cycles needed to achieve a live birth.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            For patients with normal ovarian reserve (typical AMH, antral follicle count), conventional IVF often produces better cost-per-live-birth outcomes despite the higher upfront price. Mini-IVF may be appropriate for poor responders, older patients with limited ovarian reserve, or those with medical contraindications to high-dose stimulation.
          </p>

          <h2 className="font-serif text-2xl font-bold text-gray-900 mt-8 mb-4">Frequently Asked Questions</h2>

          <div className="space-y-5 mb-8">
            {faqSchema.mainEntity.map((item) => (
              <div key={item.name} className="border-l-4 border-teal-200 pl-4">
                <h3 className="font-semibold text-gray-800 mb-1">{item.name}</h3>
                <p className="text-gray-600 text-sm">{item.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-teal-500 text-white rounded-2xl p-6 text-center mt-8">
          <h2 className="font-serif text-xl font-bold mb-2">Find a Fertility Specialist Near You</h2>
          <p className="text-teal-100 text-sm mb-4">Browse board-certified reproductive endocrinologists by city and insurance accepted.</p>
          <Link href="/listings" className="inline-block bg-white text-teal-600 font-semibold px-6 py-2.5 rounded-xl hover:bg-teal-50 transition-colors text-sm">
            Search the Directory →
          </Link>
        </div>

        {/* Related guides */}
        <div className="mt-8 space-y-2 text-sm">
          <Link href="/guides/iui-vs-ivf" className="block text-teal-600 hover:text-teal-800 font-medium">IUI vs. IVF: Which Should You Try First? →</Link>
          <Link href="/guides/when-to-see-a-fertility-specialist" className="block text-teal-600 hover:text-teal-800 font-medium">When to See a Fertility Specialist →</Link>
          <Link href="/guides/questions-to-ask-fertility-doctor" className="block text-teal-600 hover:text-teal-800 font-medium">Questions to Ask Your Fertility Doctor →</Link>
        </div>
      </div>
    </>
  )
}
