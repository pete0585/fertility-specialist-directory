import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
  title: '20 Questions to Ask Your Fertility Doctor Before Starting Treatment',
  description:
    'Before you start IVF or any fertility treatment, ask your doctor these questions. From success rates to lab protocols to what happens if a cycle fails — be an informed patient.',
  openGraph: {
    url: 'https://fertilityspecialistdirectory.com/guides/questions-to-ask-fertility-doctor',
  },
  alternates: {
    canonical: '/guides/questions-to-ask-fertility-doctor',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the most important question to ask a fertility specialist at the first appointment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "The most important question is: 'Based on my specific diagnosis, test results, and age — what is your estimated probability that I will achieve a live birth?' This forces the doctor to give you a personalized answer rather than a generic success rate. If a doctor cannot or will not answer this question specifically, that tells you something important about their communication style.",
      },
    },
    {
      '@type': 'Question',
      name: 'Should I ask about IVF success rates at my first appointment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes, but ask the right question. Don't ask 'What is your success rate?' — ask 'What is your live birth rate per transfer for patients my age with my diagnosis?' The second question forces specificity. Clinics are required to report this data to SART, so any clinic that refuses to share this is a red flag.",
      },
    },
    {
      '@type': 'Question',
      name: 'What should I bring to my first fertility consultation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Bring all prior medical records, including previous bloodwork (FSH, AMH, antral follicle counts), any imaging (HSG, pelvic ultrasounds), prior semen analyses, and records of any previous fertility treatments or surgeries. If you have a diagnosis like PCOS or endometriosis, bring documentation. The more context your doctor has, the faster you can get to a treatment plan.",
      },
    },
    {
      '@type': 'Question',
      name: 'What happens if an IVF cycle fails?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Ask this directly at your consultation: 'If this cycle fails, what do we learn from it, and what would you recommend doing differently?' A good fertility doctor has a clear answer. You should understand the plan for cycle 1, but also what a failed cycle tells you diagnostically and what cycle 2 would look like.",
      },
    },
  ],
}

const QUESTIONS = [
  {
    category: 'About Your Specific Case',
    items: [
      "Based on my test results and age, what is your estimated probability that I'll achieve a live birth?",
      'What is the most likely cause of our infertility, and how does that affect treatment?',
      'Are there any additional tests you recommend before starting treatment?',
      "Is there anything I should do in the next 1–3 months to improve my chances (supplements, lifestyle, timing)?",
    ],
  },
  {
    category: 'About the Clinic and Lab',
    items: [
      "What is your live birth rate per transfer for patients my age and diagnosis?",
      'Are you a SART member, and can I view your published success rate data?',
      'Who will perform my egg retrieval — you personally, or whoever is on call?',
      "What is your clinic's cancellation rate for IVF cycles?",
      'Do you use time-lapse imaging (EmbryoScope) in your lab?',
    ],
  },
  {
    category: 'About the Treatment Plan',
    items: [
      "What protocol are you recommending for me, and why?",
      'Do you recommend a fresh or frozen embryo transfer, and why?',
      'Do you recommend genetic testing of embryos (PGT-A), and why or why not?',
      "What is the monitoring schedule during stimulation — how many appointments, and at what times?",
      'How will my medication doses be adjusted, and who will I hear from with those instructions?',
    ],
  },
  {
    category: 'About Cost and Coverage',
    items: [
      'What is the total estimated cost for one complete IVF cycle, including medications?',
      'Do you accept my insurance, and what does it cover?',
      'Do you offer multi-cycle packages or refund programs?',
      'What financing options are available if I need them?',
    ],
  },
  {
    category: 'About Next Steps',
    items: [
      "If this cycle fails, what do we learn from it and what would you do differently next time?",
      "When would you recommend we consider other options (donor eggs, surrogacy, or stopping treatment)?",
    ],
  },
]

export default function QuestionsToAskFertilityDoctorPage() {
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
          <span className="text-gray-900 font-medium">Questions to Ask Your Fertility Doctor</span>
        </nav>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          20 Questions to Ask Your Fertility Doctor Before Starting Treatment
        </h1>
        <p className="text-gray-500 text-sm mb-8">Published by Fertility Specialist Directory</p>

        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          A first fertility consultation is a lot of information delivered quickly. Most patients leave with unanswered questions and wish they had asked more. Bring this list. The quality of a doctor&rsquo;s answers — not just their credentials or success rates — will tell you a lot about whether this is the right fit.
        </p>

        <div className="space-y-8">
          {QUESTIONS.map((group, gi) => (
            <div key={gi}>
              <h2 className="font-serif text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                {group.category}
              </h2>
              <div className="space-y-3">
                {group.items.map((q, qi) => (
                  <div key={qi} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 text-teal-600 text-xs font-bold flex items-center justify-center mt-0.5">
                      {gi * 5 + qi + 1 > QUESTIONS.flat().length
                        ? gi * 4 + qi + 1
                        : QUESTIONS.slice(0, gi).reduce((acc, g) => acc + g.items.length, 0) + qi + 1}
                    </span>
                    <p className="text-gray-700 text-sm leading-relaxed">&ldquo;{q}&rdquo;</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-cream-100 rounded-2xl p-6 border border-cream-200">
          <h2 className="font-serif text-xl font-bold text-gray-900 mb-3">How to Use This List</h2>
          <p className="text-gray-700 text-sm leading-relaxed mb-3">
            You won&rsquo;t get through all 20 questions in a single consultation. That&rsquo;s fine. Prioritize the questions about your specific case and the treatment plan — those answers matter most for your decision. The cost and logistics questions can often be answered by the clinic&rsquo;s financial coordinator or patient coordinator separately.
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            Pay attention to <em>how</em> your doctor answers, not just what they say. A good fertility doctor takes your questions seriously, answers with specifics, and doesn&rsquo;t rush you. If you feel dismissed, that&rsquo;s important information — you will be working closely with this team during one of the most stressful experiences of your life.
          </p>
        </div>

        <div className="mt-8 space-y-5">
          <h2 className="font-serif text-xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-teal-200 pl-4">
              <h3 className="font-semibold text-gray-800 mb-1">What is the most important question to ask?</h3>
              <p className="text-gray-600 text-sm">&ldquo;Based on my test results and age, what is your estimated probability that I will achieve a live birth?&rdquo; This forces a personalized answer rather than a generic success rate.</p>
            </div>
            <div className="border-l-4 border-teal-200 pl-4">
              <h3 className="font-semibold text-gray-800 mb-1">What should I bring to my first appointment?</h3>
              <p className="text-gray-600 text-sm">All prior records: bloodwork (FSH, AMH, AFC), imaging (HSG, ultrasounds), prior semen analyses, and records of any prior fertility treatments or surgeries. The more your doctor knows upfront, the faster you reach a treatment plan.</p>
            </div>
            <div className="border-l-4 border-teal-200 pl-4">
              <h3 className="font-semibold text-gray-800 mb-1">What if I forget to ask something?</h3>
              <p className="text-gray-600 text-sm">Call or message the clinic after. Most fertility practices have a patient care coordinator or nurse who fields these questions. Don&rsquo;t leave an important question unanswered because you didn&rsquo;t ask it during the appointment.</p>
            </div>
          </div>
        </div>

        <div className="bg-teal-500 text-white rounded-2xl p-6 text-center mt-8">
          <h2 className="font-serif text-xl font-bold mb-2">Find a Fertility Specialist Near You</h2>
          <p className="text-teal-100 text-sm mb-4">Browse 1,200+ REI specialists and IVF clinics by city, specialty, and insurance accepted.</p>
          <Link href="/listings" className="inline-block bg-gold-400 hover:bg-gold-500 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm">
            Browse Fertility Specialists →
          </Link>
        </div>
      </div>
    </>
  )
}
