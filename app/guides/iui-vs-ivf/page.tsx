import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'IUI vs. IVF: Which Should You Try First? | Fertility Specialist Directory',
  description:
    'IUI costs $300–$900/cycle with ~15% success. IVF costs $12,000–$15,000 with ~40–50% success per transfer under 35. Learn when to start with IUI and when to go straight to IVF.',
  openGraph: {
    url: 'https://fertilityspecialistdirectory.com/guides/iui-vs-ivf',
  },
  alternates: {
    canonical: '/guides/iui-vs-ivf',
  },
}

export const revalidate = 86400

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is IUI or IVF more likely to result in pregnancy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'IVF has significantly higher per-cycle success rates than IUI. For patients under 35, IVF achieves 40–50% live birth rate per embryo transfer, compared to 10–20% per IUI cycle for unexplained infertility. However, IVF costs 15–40x more per cycle, which is why doctors typically recommend trying IUI first when clinical criteria are met.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many IUI cycles should I try before moving to IVF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most reproductive endocrinologists recommend 3 IUI cycles before moving to IVF for patients with unexplained infertility under 35. If you are 35–37, 3 cycles is still reasonable. If you are 38 or older, most REIs recommend proceeding to IVF after 1–2 failed IUI cycles — or going directly to IVF — because time is a critical variable at advanced reproductive age.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can same-sex couples or single parents use IUI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. IUI is commonly used by single women and lesbian couples using donor sperm. The procedure is straightforward — donor sperm (fresh or frozen from a sperm bank) is placed directly into the uterus at the time of ovulation. Success rates are similar to those for heterosexual couples with male factor infertility using IUI: 10–20% per cycle for women under 35. IVF may be preferred when one partner wants to contribute eggs while the other carries (reciprocal IVF), or when egg quality or quantity is a concern.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does IUI hurt?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'IUI is generally well tolerated and takes about 5–10 minutes in the clinic. Most patients describe mild cramping similar to a Pap smear during the procedure, with light spotting possible for 1–2 days afterward. Anesthesia is not required. The main discomfort for patients on ovarian stimulation medications (like Clomid or injectable FSH) comes from the medication effects rather than the IUI procedure itself.',
      },
    },
  ],
}

export default function IUIvsIVFPage() {
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
          <span className="text-gray-900 font-medium">IUI vs. IVF</span>
        </nav>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          IUI vs. IVF: Which Should You Try First?
        </h1>
        <p className="text-gray-500 text-sm mb-8">Published by Fertility Specialist Directory</p>

        <div className="prose prose-gray max-w-none">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            IUI and IVF are the two most common fertility treatments, but they are not interchangeable. IUI is simpler, less invasive, and far less expensive — but IVF is significantly more effective per cycle. Which one is right for you depends on your diagnosis, age, and how much time you have.
          </p>

          <h2 className="font-serif text-2xl font-bold text-gray-900 mt-8 mb-4">What Is IUI?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Intrauterine insemination (IUI) is a procedure in which washed, concentrated sperm is placed directly into the uterus at the time of ovulation — bypassing the cervix and shortening the distance sperm must travel to reach the egg. The egg still needs to be fertilized naturally inside the fallopian tube.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            IUI is often combined with oral medications (Clomid, letrozole) or low-dose injectable hormones (FSH) to stimulate the ovaries to produce 1–2 mature eggs, improving the odds over natural-cycle IUI.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
            <li><strong>Cost per cycle:</strong> $300–$900 (procedure) + $0–$1,500 (medications)</li>
            <li><strong>Success rate per cycle:</strong> ~10–20% for unexplained infertility in women under 35</li>
            <li><strong>Procedure time:</strong> 5–10 minutes, no anesthesia</li>
            <li><strong>Recovery:</strong> Same day; mild cramping possible</li>
          </ul>

          <h2 className="font-serif text-2xl font-bold text-gray-900 mt-8 mb-4">What Is IVF?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            In vitro fertilization (IVF) retrieves multiple eggs from the ovaries after an intensive hormone stimulation protocol, fertilizes them in a laboratory, and transfers one or more resulting embryos into the uterus. The fertilization happens outside the body — &ldquo;in vitro&rdquo; — rather than inside the fallopian tube.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            IVF bypasses both the cervix and the fallopian tubes, making it effective even when tubes are blocked or absent. It also allows for embryo selection (via PGT-A testing) and embryo banking — retrieving eggs over multiple cycles and freezing embryos for future use.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
            <li><strong>Cost per cycle:</strong> $12,000–$15,000 (procedure) + $3,000–$6,000 (medications)</li>
            <li><strong>Success rate per transfer:</strong> ~40–50% live birth rate for patients under 35</li>
            <li><strong>Procedure:</strong> Egg retrieval under sedation; embryo transfer ~5 days later</li>
            <li><strong>Recovery:</strong> 1–2 days rest after retrieval; minimal after transfer</li>
          </ul>

          <h2 className="font-serif text-2xl font-bold text-gray-900 mt-8 mb-4">Cost Comparison</h2>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-4 py-2 text-left font-semibold">Factor</th>
                  <th className="border border-gray-200 px-4 py-2 text-left font-semibold">IUI</th>
                  <th className="border border-gray-200 px-4 py-2 text-left font-semibold">IVF</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr>
                  <td className="border border-gray-200 px-4 py-2">Procedure cost</td>
                  <td className="border border-gray-200 px-4 py-2">$300–$900</td>
                  <td className="border border-gray-200 px-4 py-2">$12,000–$15,000</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-2">Medications</td>
                  <td className="border border-gray-200 px-4 py-2">$0–$1,500</td>
                  <td className="border border-gray-200 px-4 py-2">$3,000–$6,000</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-2">Total per cycle</td>
                  <td className="border border-gray-200 px-4 py-2">~$1,000–$2,000</td>
                  <td className="border border-gray-200 px-4 py-2">~$15,000–$21,000</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="font-serif text-2xl font-bold text-gray-900 mt-8 mb-4">Success Rate Comparison</h2>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-4 py-2 text-left font-semibold">Age</th>
                  <th className="border border-gray-200 px-4 py-2 text-left font-semibold">IUI (per cycle)</th>
                  <th className="border border-gray-200 px-4 py-2 text-left font-semibold">IVF (per transfer)</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr>
                  <td className="border border-gray-200 px-4 py-2">Under 35</td>
                  <td className="border border-gray-200 px-4 py-2">15–20%</td>
                  <td className="border border-gray-200 px-4 py-2">40–50%</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-2">35–37</td>
                  <td className="border border-gray-200 px-4 py-2">10–15%</td>
                  <td className="border border-gray-200 px-4 py-2">30–40%</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-2">38–40</td>
                  <td className="border border-gray-200 px-4 py-2">7–10%</td>
                  <td className="border border-gray-200 px-4 py-2">20–30%</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-2">Over 40</td>
                  <td className="border border-gray-200 px-4 py-2">3–5%</td>
                  <td className="border border-gray-200 px-4 py-2">10–15%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-500 text-xs mb-6">Success rates are approximate averages. Individual outcomes vary by diagnosis, clinic, and protocol.</p>

          <h2 className="font-serif text-2xl font-bold text-gray-900 mt-8 mb-4">When to Start with IUI</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            IUI is the appropriate first-line treatment when:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
            <li><strong>You are under 35</strong> with unexplained infertility and have been trying for 12 months</li>
            <li><strong>You have cervical factor infertility</strong> — thickened cervical mucus, prior cervical procedures (LEEP), or hostile mucus that impedes sperm</li>
            <li><strong>Mild male factor:</strong> Low-normal sperm count or motility that responds to sperm washing and concentration</li>
            <li><strong>You are single or using donor sperm</strong> — IUI with donor sperm is cost-effective and appropriate when ovarian reserve is normal</li>
            <li><strong>Ovulation issues (PCOS):</strong> If you are not ovulating regularly, IUI combined with ovulation induction is an efficient starting point</li>
          </ul>

          <h2 className="font-serif text-2xl font-bold text-gray-900 mt-8 mb-4">When to Go Straight to IVF</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Skip IUI and proceed directly to IVF when:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
            <li><strong>You are 38 or older</strong> — time matters more than cost savings; each month spent on IUI is a month of declining egg quality</li>
            <li><strong>Blocked or absent fallopian tubes</strong> — IUI cannot succeed if sperm cannot reach the egg; IVF bypasses the tubes entirely</li>
            <li><strong>Severe male factor infertility</strong> — very low sperm count or zero motility requires ICSI (intracytoplasmic sperm injection), which is only possible with IVF</li>
            <li><strong>Recurrent pregnancy loss</strong> — IVF with PGT-A testing can identify chromosomally normal embryos, reducing miscarriage risk</li>
            <li><strong>Diminished ovarian reserve (low AMH or antral follicle count)</strong> — limited egg supply makes maximizing each cycle critical; IVF is more efficient per egg retrieved</li>
            <li><strong>LGBTQ+ patients needing eggs from both partners</strong> — reciprocal IVF (one partner provides eggs, the other carries) requires IVF</li>
            <li><strong>3 failed IUI cycles</strong> — cumulative success after 3–4 IUI cycles plateaus; IVF is the evidence-based next step</li>
          </ul>

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
          <p className="text-teal-100 text-sm mb-4">A board-certified reproductive endocrinologist can evaluate your specific situation and recommend whether IUI or IVF is the right starting point for you.</p>
          <Link href="/listings" className="inline-block bg-white text-teal-600 font-semibold px-6 py-2.5 rounded-xl hover:bg-teal-50 transition-colors text-sm">
            Search the Directory →
          </Link>
        </div>

        {/* Related guides */}
        <div className="mt-8 space-y-2 text-sm">
          <Link href="/guides/ivf-cost-guide" className="block text-teal-600 hover:text-teal-800 font-medium">IVF Cost in 2026: What to Expect and How to Pay →</Link>
          <Link href="/guides/when-to-see-a-fertility-specialist" className="block text-teal-600 hover:text-teal-800 font-medium">When to See a Fertility Specialist →</Link>
          <Link href="/guides/what-is-a-reproductive-endocrinologist" className="block text-teal-600 hover:text-teal-800 font-medium">What Is a Reproductive Endocrinologist? →</Link>
        </div>
      </div>
    </>
  )
}
