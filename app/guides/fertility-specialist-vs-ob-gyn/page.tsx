import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Fertility Specialist vs OB-GYN: What Is the Difference? — Guide',
  description:
    'Should you see a fertility specialist (REI) or your OB-GYN for infertility? Learn the difference, what each can treat, and when to skip ahead to a reproductive endocrinologist.',
  openGraph: {
    url: 'https://fertilityspecialistdirectory.com/guides/fertility-specialist-vs-ob-gyn',
  },
  alternates: {
    canonical: '/guides/fertility-specialist-vs-ob-gyn',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can my OB-GYN treat infertility?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An OB-GYN can begin a fertility evaluation and treat simple cases — including clomiphene-induced ovulation, basic hormone testing, and IUI (intrauterine insemination). However, most OB-GYNs do not perform IVF, egg freezing, or complex ART procedures. For anything beyond basic evaluation and simple treatments, you need a reproductive endocrinologist.',
      },
    },
    {
      '@type': 'Question',
      name: 'When should I skip my OB-GYN and go straight to a fertility specialist?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Go directly to an REI if you are 40 or older, have a known diagnosis (PCOS, endometriosis, diminished ovarian reserve, male factor), have had 2+ miscarriages, or are LGBTQ+ or single and building a family with donor gametes or a surrogate. For everyone else, your OB-GYN is a reasonable first step.',
      },
    },
    {
      '@type': 'Question',
      name: 'What can a fertility specialist do that an OB-GYN cannot?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A reproductive endocrinologist can perform IVF (in vitro fertilization), egg retrieval and embryo transfer, preimplantation genetic testing (PGT), controlled ovarian hyperstimulation (COH), egg freezing, and donor egg or sperm cycles. These are procedures that require specialized fellowship training and an embryology lab — which general OB-GYNs do not have.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is it more expensive to see a fertility specialist than an OB-GYN?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "A fertility specialist consultation is similar in cost to any specialist visit — typically $200–500 out of pocket, often covered by insurance as a specialist co-pay. The expensive part is treatment (IVF cycles), not the consultation itself. Many patients' first REI consultation costs the same as a gynecology specialist visit.",
      },
    },
  ],
}

export default function FertilitySpecialistVsOBGYNPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex items-center gap-1 text-sm text-gray-500 mb-6 flex-wrap" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-teal-500 transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" aria-label="" />
          <Link href="/listings" className="hover:text-teal-500 transition-colors">Find a Specialist</Link>
          <ChevronRight className="w-4 h-4" aria-label="" />
          <span className="text-gray-900 font-medium">Fertility Specialist vs OB-GYN</span>
        </nav>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Fertility Specialist vs OB-GYN: What Is the Difference?
        </h1>
        <p className="text-gray-500 text-sm mb-8">Published by Fertility Specialist Directory</p>

        <div className="prose prose-gray max-w-none">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            When you start trying to conceive and things aren&rsquo;t going as expected, the first question is usually: do I call my OB-GYN, or should I go straight to a fertility specialist? The answer depends on your situation, your age, and what your initial bloodwork shows.
          </p>

          <h2 className="font-serif text-2xl font-bold text-gray-900 mt-8 mb-4">What an OB-GYN Can Do for Fertility</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Your OB-GYN is trained in obstetrics and gynecology — a broad specialty that covers pregnancy, labor and delivery, and general reproductive health. Many OB-GYNs have experience with basic infertility evaluation and simple treatments:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
            <li>Basic hormone testing (FSH, LH, estradiol, progesterone, AMH, TSH)</li>
            <li>Semen analysis referral for the male partner</li>
            <li>Hysterosalpingogram (HSG) to check tubal patency</li>
            <li>Clomiphene (Clomid) or letrozole for ovulation induction</li>
            <li>IUI (intrauterine insemination) — particularly for unexplained infertility or mild male factor</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-6">
            If you are under 35, have no known diagnosis, and have been trying for less than a year, your OB-GYN is a perfectly reasonable starting point. They can rule out the most common causes and may resolve your issue without a specialist referral.
          </p>

          <h2 className="font-serif text-2xl font-bold text-gray-900 mt-8 mb-4">What a Fertility Specialist (REI) Can Do That an OB-GYN Cannot</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            A reproductive endocrinologist (REI) is an OB-GYN who completed 3 additional years of subspecialty fellowship training. They have capabilities that general OB-GYNs simply do not:
          </p>

          {/* Comparison table */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-teal-50">
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-800">Procedure / Service</th>
                  <th className="text-center p-3 border border-gray-200 font-semibold text-gray-800">OB-GYN</th>
                  <th className="text-center p-3 border border-gray-200 font-semibold text-gray-800">REI Specialist</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Fertility evaluation (bloodwork, ultrasound)', '✓', '✓'],
                  ['Clomid / letrozole for ovulation', '✓', '✓'],
                  ['IUI (intrauterine insemination)', '✓ (some)', '✓'],
                  ['IVF (in vitro fertilization)', '✗', '✓'],
                  ['Egg freezing (elective or medical)', '✗', '✓'],
                  ['Egg retrieval and embryo transfer', '✗', '✓'],
                  ['Preimplantation genetic testing (PGT)', '✗', '✓'],
                  ['Donor egg or donor sperm cycles', '✗', '✓'],
                  ['Recurrent pregnancy loss workup', '✗ (basic only)', '✓'],
                  ['Complex hormonal disorders (severe PCOS, DOR)', '✗', '✓'],
                ].map(([procedure, obgyn, rei], i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-3 border border-gray-200 text-gray-700">{procedure}</td>
                    <td className="p-3 border border-gray-200 text-center">{obgyn}</td>
                    <td className="p-3 border border-gray-200 text-center">{rei}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="font-serif text-2xl font-bold text-gray-900 mt-8 mb-4">When to Skip Your OB-GYN and Go Straight to an REI</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            There are situations where going to your OB-GYN first adds months of delay without benefit. Go directly to a reproductive endocrinologist if:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
            <li><strong>You are 40 or older.</strong> Ovarian reserve declines sharply after 40. Every month matters — don&rsquo;t spend 6 months at your OB-GYN doing basic workups.</li>
            <li><strong>You have a confirmed diagnosis.</strong> PCOS, endometriosis, diminished ovarian reserve, fibroids, or any uterine abnormality — these need specialist-level management from the start.</li>
            <li><strong>Your partner has a known sperm issue.</strong> Low count, poor motility, or prior semen analysis showing severe abnormality usually means IVF with ICSI is inevitable — start with the REI.</li>
            <li><strong>You have had 2+ miscarriages.</strong> Recurrent pregnancy loss has identifiable causes in about 50% of cases — genetic testing, uterine abnormalities, clotting disorders. An REI will do the full workup your OB-GYN likely won&rsquo;t.</li>
            <li><strong>You are LGBTQ+ or single.</strong> Your OB-GYN can&rsquo;t help you build a family with donor sperm, donor eggs, or a surrogate. The REI is your starting point.</li>
          </ul>

          <h2 className="font-serif text-2xl font-bold text-gray-900 mt-8 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5 mb-8">
            <div className="border-l-4 border-teal-200 pl-4">
              <h3 className="font-semibold text-gray-800 mb-1">Can my OB-GYN treat infertility?</h3>
              <p className="text-gray-600 text-sm">Yes, for simple cases. OB-GYNs can prescribe ovulation-inducing medications and perform IUI. For IVF, egg freezing, or anything requiring an embryology lab, you need an REI.</p>
            </div>
            <div className="border-l-4 border-teal-200 pl-4">
              <h3 className="font-semibold text-gray-800 mb-1">Is a fertility specialist consultation expensive?</h3>
              <p className="text-gray-600 text-sm">The consultation itself is comparable to any specialist visit — $200–500 out of pocket, often covered as a specialist co-pay. The expensive part is treatment, not the initial visit.</p>
            </div>
            <div className="border-l-4 border-teal-200 pl-4">
              <h3 className="font-semibold text-gray-800 mb-1">Do I need a referral to see an REI?</h3>
              <p className="text-gray-600 text-sm">Most fertility specialists accept self-referrals. Some insurance plans require a referral from a primary care physician or OB-GYN, but many do not. Call the clinic directly or check your plan&rsquo;s provider directory.</p>
            </div>
            <div className="border-l-4 border-teal-200 pl-4">
              <h3 className="font-semibold text-gray-800 mb-1">What if my OB-GYN says I should wait and keep trying?</h3>
              <p className="text-gray-600 text-sm">Standard guidelines say to wait 12 months if under 35, 6 months if 35–39. But if you are 40 or older, or have a known diagnosis, waiting is not the right call. You can always request a referral to an REI or self-refer at any point.</p>
            </div>
          </div>
        </div>

        <div className="bg-teal-500 text-white rounded-2xl p-6 text-center mt-8">
          <h2 className="font-serif text-xl font-bold mb-2">Ready to Find a Fertility Specialist?</h2>
          <p className="text-teal-100 text-sm mb-4">Browse board-certified reproductive endocrinologists by city, specialty, and insurance.</p>
          <Link href="/listings" className="inline-block bg-gold-400 hover:bg-gold-500 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm">
            Find a Fertility Specialist Near You →
          </Link>
        </div>
      </div>
    </>
  )
}
