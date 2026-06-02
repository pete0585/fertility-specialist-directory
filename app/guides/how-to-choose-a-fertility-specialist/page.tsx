import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'How to Choose a Fertility Specialist — What to Look For',
  description:
    'What makes a good fertility specialist? Learn how to evaluate SART data, credentials, lab quality, and patient experience — and what red flags to avoid when choosing an IVF doctor.',
  openGraph: {
    url: 'https://fertilityspecialistdirectory.com/guides/how-to-choose-a-fertility-specialist',
  },
  alternates: {
    canonical: '/guides/how-to-choose-a-fertility-specialist',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I evaluate an IVF clinic\'s success rates?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use SART (sartcorsonline.com) to view clinic-reported IVF success rates by patient age group and diagnosis. Always compare rates for your specific age group — national averages are meaningless for your individual case. Look for clinics that clearly report live birth rates per transfer, not just clinical pregnancy rates. Be cautious of clinics that won\'t share their data or cherry-pick young, good-prognosis patients.',
      },
    },
    {
      '@type': 'Question',
      name: 'What questions should I ask when choosing a fertility specialist?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Key questions: (1) What is your live birth rate for patients my age and diagnosis? (2) Are you SART-affiliated? (3) Who performs my egg retrieval — you or a colleague? (4) What is your clinic\'s cancellation rate for IVF cycles? (5) Do you recommend fresh or frozen embryo transfers, and why? (6) How do you communicate during the cycle — am I calling a general line or can I reach your team directly?',
      },
    },
    {
      '@type': 'Question',
      name: 'Is SART membership important when choosing a fertility clinic?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SART membership is a significant quality signal. SART-member clinics agree to follow standardized laboratory protocols and report their outcomes to a national database. The data is audited and publicly available. Non-SART clinics are not necessarily worse, but you cannot independently verify their outcomes.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I choose the fertility clinic with the best success rates?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Not automatically. Success rates can be gamed by being highly selective about patient intake — clinics that only accept good-prognosis patients will always show better rates. Look for clinics that publish rates stratified by diagnosis and age, not just overall rates. Also consider: how far is it, do they accept your insurance, and do you like the doctor you would be working with?',
      },
    },
  ],
}

export default function HowToChooseFertilitySpecialistPage() {
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
          <span className="text-gray-900 font-medium">How to Choose a Fertility Specialist</span>
        </nav>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          How to Choose a Fertility Specialist
        </h1>
        <p className="text-gray-500 text-sm mb-8">Published by Fertility Specialist Directory</p>

        <div className="prose prose-gray max-w-none">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Choosing a fertility specialist is one of the most consequential medical decisions you will make. The right doctor won&rsquo;t guarantee success — no one can — but the wrong one can waste months and tens of thousands of dollars. Here is how to evaluate your options clearly.
          </p>

          <h2 className="font-serif text-2xl font-bold text-gray-900 mt-8 mb-4">Start with SART Data</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            SART (Society for Assisted Reproductive Technology) is the national registry for IVF outcomes in the United States. Member clinics are required to report their success rates by patient age, diagnosis, and procedure type — and the data is publicly available at sartcorsonline.com.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            When reading SART data:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
            <li>Look at <strong>live birth rate per transfer</strong> — not just &ldquo;clinical pregnancy rate,&rdquo; which counts pregnancies that may end in early loss</li>
            <li>Compare rates <strong>for your specific age group</strong> (under 35, 35–37, 38–40, 41–42, over 42) — national averages are useless for your situation</li>
            <li>Check <strong>cycle cancellation rate</strong> — if a clinic cancels a high percentage of cycles before retrieval, it may indicate overly aggressive stimulation protocols or a poorly screened patient population</li>
            <li>Compare against the national average for your age group — a clinic significantly above average is meaningfully better; one significantly below deserves scrutiny</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-6">
            <strong>Important caveat:</strong> Success rates can be gamed. A clinic that only accepts young, good-prognosis patients will have great numbers. If you have a challenging diagnosis, look for a clinic with strong outcomes specifically for your situation, not just overall.
          </p>

          <h2 className="font-serif text-2xl font-bold text-gray-900 mt-8 mb-4">Board Certification and Credentials</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Your fertility specialist should be board-certified in Reproductive Endocrinology and Infertility (REI) by the American Board of Obstetrics and Gynecology (ABOG). This means they passed a written and oral examination in the subspecialty, on top of completing an accredited fellowship.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            You can verify a physician&rsquo;s board certification at the American Board of Medical Specialties (abms.org). ASRM (American Society for Reproductive Medicine) membership is also a good signal — members have access to the latest research and guidelines.
          </p>

          <h2 className="font-serif text-2xl font-bold text-gray-900 mt-8 mb-4">The Lab Matters as Much as the Doctor</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            IVF outcomes are heavily dependent on the embryology lab — specifically the embryologist team, lab equipment, incubators, and culture media protocols. Two equally skilled REIs at different clinics can have significantly different outcomes because of lab quality differences.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Questions to ask about the lab:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
            <li>How many embryologists are on staff, and who will handle my case?</li>
            <li>Do you use time-lapse imaging (EmbryoScope or similar)?</li>
            <li>What is your fertilization rate? What is your blastocyst development rate?</li>
            <li>Do you have an in-house genetics lab for PGT-A, or do you send out?</li>
          </ul>

          <h2 className="font-serif text-2xl font-bold text-gray-900 mt-8 mb-4">Access and Communication</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            An IVF cycle requires 10–14 days of daily monitoring: morning ultrasounds, bloodwork, and real-time dosing adjustments. How a clinic handles this monitoring will significantly affect your experience and outcomes.
          </p>
          <div className="space-y-3 mb-6">
            {[
              'Can I reach my nurse or care coordinator directly when I have a dosing question?',
              'Will my doctor perform my egg retrieval, or will it be whoever is on call?',
              'Are monitoring appointments available on weekends and holidays?',
              'How quickly do I receive my bloodwork results, and who interprets them?',
            ].map((q, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-teal-50 rounded-xl">
                <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" aria-label="" />
                <p className="text-gray-700 text-sm">{q}</p>
              </div>
            ))}
          </div>

          <h2 className="font-serif text-2xl font-bold text-gray-900 mt-8 mb-4">Red Flags to Avoid</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
            <li><strong>Won&rsquo;t share SART data</strong> — any clinic unwilling to share their outcomes data should raise questions</li>
            <li><strong>Guarantees outcomes</strong> — no ethical clinic guarantees pregnancy; anyone who does is misleading you</li>
            <li><strong>Pushes aggressive or expensive protocols without explanation</strong> — you should understand why you are being recommended a specific protocol</li>
            <li><strong>You never meet your doctor</strong> — at busy volume practices, some patients see a different doctor at every monitoring appointment; make sure you know who your attending physician is</li>
            <li><strong>Dismisses your research</strong> — a good fertility doctor welcomes informed patients and can explain why their recommended approach differs from what you read</li>
          </ul>

          <h2 className="font-serif text-2xl font-bold text-gray-900 mt-8 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5 mb-8">
            <div className="border-l-4 border-teal-200 pl-4">
              <h3 className="font-semibold text-gray-800 mb-1">How do I evaluate an IVF clinic&rsquo;s success rates?</h3>
              <p className="text-gray-600 text-sm">Use SART (sartcorsonline.com) to view live birth rates per transfer for your specific age group and diagnosis. Compare the clinic against the national average. Be skeptical of unusually high numbers without scrutinizing who they accept as patients.</p>
            </div>
            <div className="border-l-4 border-teal-200 pl-4">
              <h3 className="font-semibold text-gray-800 mb-1">Is SART membership important?</h3>
              <p className="text-gray-600 text-sm">SART membership is a meaningful quality signal — members must follow standardized protocols and report outcomes to an audited national database. Non-SART clinics are not automatically worse, but you cannot independently verify their numbers.</p>
            </div>
            <div className="border-l-4 border-teal-200 pl-4">
              <h3 className="font-semibold text-gray-800 mb-1">Should I choose the clinic with the best success rates?</h3>
              <p className="text-gray-600 text-sm">Not automatically. High rates may reflect patient selection, not superior care. Choose a clinic with strong outcomes for your specific age group and diagnosis, good lab infrastructure, and a communication style that works for you.</p>
            </div>
          </div>
        </div>

        <div className="bg-teal-500 text-white rounded-2xl p-6 text-center mt-8">
          <h2 className="font-serif text-xl font-bold mb-2">Ready to Find a Fertility Specialist?</h2>
          <p className="text-teal-100 text-sm mb-4">Browse board-certified REI specialists by city, insurance, and credentials.</p>
          <Link href="/listings" className="inline-block bg-gold-400 hover:bg-gold-500 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm">
            Browse Fertility Specialists →
          </Link>
        </div>
      </div>
    </>
  )
}
