import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, Clock, AlertCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'When Should You See a Fertility Specialist? — Signs and Timing Guide',
  description:
    'Not sure when to stop trying on your own and see a fertility doctor? Learn the evidence-based guidelines by age, common diagnoses that warrant early referral, and why waiting costs time you may not have.',
  openGraph: {
    url: 'https://fertilityspecialistdirectory.com/guides/when-to-see-a-fertility-specialist',
  },
  alternates: {
    canonical: '/guides/when-to-see-a-fertility-specialist',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'When should I see a fertility specialist?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Standard guidelines recommend seeing a fertility specialist after 12 months of trying if you are under 35, or after 6 months if you are 35–39. If you are 40 or older, see a specialist immediately — do not wait. These timelines also shorten or disappear entirely with known diagnoses like PCOS, endometriosis, prior miscarriages, or male factor infertility.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I see a fertility specialist after one miscarriage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "One miscarriage alone typically does not warrant immediate REI referral — approximately 15–20% of confirmed pregnancies end in miscarriage, often due to random chromosomal abnormalities. Two or more miscarriages (recurrent pregnancy loss) is a different situation and warrants a full workup by a reproductive endocrinologist. If you have had two or more losses, do not wait for a third — see an REI.",
      },
    },
    {
      '@type': 'Question',
      name: 'How long should I try to get pregnant before seeing a doctor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "The standard guideline is: 12 months of unprotected sex if you are under 35, 6 months if you are 35–39. If you are 40 or older, see a specialist immediately — do not wait 6 months. These timelines assume no known diagnoses. If you have PCOS, endometriosis, known tubal disease, or a prior infertility diagnosis, skip the waiting period entirely and see an REI now.",
      },
    },
    {
      '@type': 'Question',
      name: 'Can I see a fertility specialist even if I have not been trying to get pregnant?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Absolutely. You do not need to have been 'trying' to see a fertility specialist. People see REIs for fertility preservation (egg freezing), LGBTQ+ family building, single parenting, or to understand their reproductive timeline before starting to try. An REI can assess your ovarian reserve and give you personalized information about your fertility outlook.",
      },
    },
  ],
}

export default function WhenToSeeFertilitySpecialistPage() {
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
          <span className="text-gray-900 font-medium">When to See a Fertility Specialist</span>
        </nav>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          When Should You See a Fertility Specialist?
        </h1>
        <p className="text-gray-500 text-sm mb-8">Published by Fertility Specialist Directory</p>

        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          One of the most common regrets among fertility patients is waiting too long to see a specialist. The guidelines exist for a reason, but they also have important exceptions — especially for women over 35, people with known diagnoses, and those who have experienced pregnancy loss.
        </p>

        <h2 className="font-serif text-2xl font-bold text-gray-900 mt-8 mb-4">The Standard Guidelines by Age</h2>

        <div className="space-y-4 mb-8">
          {[
            {
              age: 'Under 35',
              icon: <Clock className="w-5 h-5 text-teal-500" aria-label="" />,
              timing: '12 months',
              detail: 'If you have been having regular unprotected sex for 12 months without conceiving, see a fertility specialist. Most women under 35 who are going to conceive naturally will do so within 12 cycles.',
              color: 'border-teal-200 bg-teal-50',
            },
            {
              age: '35–39',
              icon: <Clock className="w-5 h-5 text-gold-400" aria-label="" />,
              timing: '6 months',
              detail: "Ovarian reserve begins declining more noticeably after 35. Don't wait a full year. At 6 months without conception, see an REI. Earlier is fine too — if you are 37 and have concerns, there is no reason to wait.",
              color: 'border-gold-200 bg-gold-50',
            },
            {
              age: '40 or older',
              icon: <AlertCircle className="w-5 h-5 text-coral-500" aria-label="" />,
              timing: 'See an REI now',
              detail: "Don't wait at all. At 40, ovarian reserve and egg quality are declining rapidly. Every month matters. See a reproductive endocrinologist immediately — before you start trying, if possible.",
              color: 'border-coral-200 bg-coral-50',
            },
          ].map((item, i) => (
            <div key={i} className={`rounded-xl border p-5 ${item.color}`}>
              <div className="flex items-center gap-3 mb-2">
                {item.icon}
                <div>
                  <span className="font-bold text-gray-900">{item.age}</span>
                  <span className="text-gray-500 text-sm ml-3">→ See an REI after: <strong>{item.timing}</strong></span>
                </div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>

        <h2 className="font-serif text-2xl font-bold text-gray-900 mt-8 mb-4">
          Skip the Waiting Period Entirely — When to Go Now
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          The age-based timelines above assume you have no known diagnoses and a normal baseline. If any of the following apply, do not wait — see a reproductive endocrinologist now regardless of how long you have been trying:
        </p>
        <div className="space-y-3 mb-8">
          {[
            { condition: 'You have PCOS (polycystic ovary syndrome)', detail: 'PCOS is the most common hormonal disorder in women of reproductive age and a top cause of infertility. An REI can optimize your hormones and cycle to maximize your chances of conceiving.' },
            { condition: 'You have endometriosis', detail: 'Endometriosis can damage tubes and ovaries silently. An REI will assess the extent and discuss whether surgical or medical management is appropriate before or alongside fertility treatment.' },
            { condition: "Your AMH is low for your age", detail: 'Low anti-Müllerian hormone (AMH) indicates diminished ovarian reserve. Waiting is directly harmful — your reserve will not improve, and any eggs you freeze or retrieve are more valuable now than they will be next year.' },
            { condition: 'Your partner has a known sperm issue', detail: 'Severe sperm abnormalities (very low count, zero motility, azoospermia) are unlikely to resolve with lifestyle changes alone. An REI can evaluate and recommend IUI or IVF with ICSI without wasting time on unlikely natural conception.' },
            { condition: 'You have had 2 or more miscarriages', detail: 'Recurrent pregnancy loss has identifiable causes in 50% of cases: chromosomal, uterine, hormonal, or immune. An REI will do a full workup. Do not wait for a third loss.' },
            { condition: 'You have had pelvic surgery, STDs, or pelvic inflammatory disease', detail: 'These can cause tubal damage and adhesions that prevent natural conception. An REI can evaluate tubal patency and discuss options.' },
            { condition: "You are LGBTQ+ or building a family without a partner's sperm or eggs", detail: 'Your reproductive path requires assisted reproduction from the start. An REI is your first and primary contact.' },
          ].map((item, i) => (
            <div key={i} className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
              <p className="font-semibold text-gray-800 text-sm mb-1">{item.condition}</p>
              <p className="text-gray-600 text-sm">{item.detail}</p>
            </div>
          ))}
        </div>

        <h2 className="font-serif text-2xl font-bold text-gray-900 mt-8 mb-4">You Can See an REI Before You Start Trying</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          You don&rsquo;t have to be in crisis to see a fertility specialist. Many people proactively consult an REI to:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
          <li>Freeze eggs before age 35 while egg quality is highest</li>
          <li>Understand their current ovarian reserve before deciding when to start trying</li>
          <li>Get a realistic picture of their fertility before pausing birth control</li>
          <li>Begin the family-building planning process as an LGBTQ+ individual or couple</li>
        </ul>
        <p className="text-gray-700 leading-relaxed mb-8">
          A fertility consultation is information — it does not obligate you to any treatment. Many patients leave their first REI appointment with nothing more than a baseline assessment and a plan for when (or whether) to return.
        </p>

        <div className="space-y-5 mb-8">
          <h2 className="font-serif text-xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-teal-200 pl-4">
              <h3 className="font-semibold text-gray-800 mb-1">Should I see a fertility specialist after one miscarriage?</h3>
              <p className="text-gray-600 text-sm">One miscarriage alone typically does not require immediate REI referral — about 15–20% of confirmed pregnancies miscarry, usually from chromosomal abnormalities. After two miscarriages, however, see an REI for a full recurrent pregnancy loss workup.</p>
            </div>
            <div className="border-l-4 border-teal-200 pl-4">
              <h3 className="font-semibold text-gray-800 mb-1">Can I see a fertility specialist without trying to get pregnant yet?</h3>
              <p className="text-gray-600 text-sm">Yes. REIs see patients for egg freezing consultations, fertility preservation, proactive ovarian reserve assessments, and LGBTQ+ family planning — all before any active trying has begun.</p>
            </div>
            <div className="border-l-4 border-teal-200 pl-4">
              <h3 className="font-semibold text-gray-800 mb-1">My OB-GYN says to keep trying. Should I push for a referral?</h3>
              <p className="text-gray-600 text-sm">If you are over 35 or have been trying for the age-appropriate window, you are completely within your rights to request a referral. You can also self-refer to most fertility specialists without a referral from your OB-GYN.</p>
            </div>
          </div>
        </div>

        <div className="bg-teal-500 text-white rounded-2xl p-6 text-center mt-8">
          <h2 className="font-serif text-xl font-bold mb-2">Find a Fertility Specialist Near You</h2>
          <p className="text-teal-100 text-sm mb-4">Browse 1,200+ reproductive endocrinologists by city, specialty, and insurance accepted.</p>
          <Link href="/listings" className="inline-block bg-gold-400 hover:bg-gold-500 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm">
            Browse Fertility Specialists →
          </Link>
        </div>
      </div>
    </>
  )
}
