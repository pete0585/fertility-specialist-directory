import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'What Is a Reproductive Endocrinologist (REI)? — Fertility Specialist Directory',
  description:
    'A reproductive endocrinologist (REI) is a board-certified OB-GYN who completed 3 additional years of subspecialty training in infertility and reproductive medicine. Learn who needs one and how to find one.',
  openGraph: {
    url: 'https://fertilityspecialistdirectory.com/guides/what-is-a-reproductive-endocrinologist',
  },
  alternates: {
    canonical: '/guides/what-is-a-reproductive-endocrinologist',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does a reproductive endocrinologist do?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A reproductive endocrinologist (REI) diagnoses and treats infertility in both men and women, hormonal disorders affecting fertility, recurrent pregnancy loss, and conditions like PCOS, endometriosis, and uterine factor infertility. They perform or supervise ART procedures including IVF, IUI, egg freezing, embryo transfer, and preimplantation genetic testing (PGT).',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between an REI and an OB-GYN?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An OB-GYN is a generalist who can handle basic infertility evaluation and simple treatments like IUI and ovulation induction. A reproductive endocrinologist (REI) is an OB-GYN who completed an additional 3-year fellowship in reproductive endocrinology and infertility — they handle complex cases, run IVF labs, and are the only specialists who perform certain procedures like egg retrieval and embryo transfer.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I know if I need to see an REI versus my OB-GYN?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'See an REI if: you are under 35 and have been trying for 12 months without success; you are 35–39 and have been trying for 6 months; you are 40 or older (see an REI immediately); you have a known condition like PCOS, endometriosis, diminished ovarian reserve, or a uterine abnormality; or you have had 2 or more miscarriages. Your OB-GYN can begin a basic fertility evaluation, but complex treatment requires REI expertise.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many reproductive endocrinologists are in the United States?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'There are approximately 1,200–1,500 active board-certified reproductive endocrinologists in the United States. This is a relatively small subspecialty — only a limited number of REI fellowships are accredited each year. This scarcity is part of why finding the right REI can take effort, and why we built this directory.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does insurance cover a reproductive endocrinologist?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Coverage depends on your state and employer plan. States like Illinois, Massachusetts, New York, New Jersey, and California have fertility insurance mandates that require most employer plans to cover REI consultations and fertility treatments. In states without mandates (most of the US), coverage varies significantly. Always verify your benefits before your first appointment.',
      },
    },
  ],
}

export default function WhatIsREIPage() {
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
          <span className="text-gray-900 font-medium">What Is a Reproductive Endocrinologist?</span>
        </nav>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          What Is a Reproductive Endocrinologist (REI)?
        </h1>
        <p className="text-gray-500 text-sm mb-8">Published by Fertility Specialist Directory</p>

        <div className="prose prose-gray max-w-none">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            A reproductive endocrinologist — commonly called an REI — is a physician who specializes in infertility, hormonal disorders that affect fertility, and assisted reproductive technologies (ART) including IVF. They are the highest level of specialist in the fertility field, trained to handle cases that go beyond what a general OB-GYN can manage.
          </p>

          <h2 className="font-serif text-2xl font-bold text-gray-900 mt-8 mb-4">How an REI Becomes an REI</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The path to becoming a reproductive endocrinologist is long and demanding. After completing medical school (4 years), an REI goes through:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-6 ml-4">
            <li><strong>OB-GYN residency</strong> — 4 years of training in obstetrics and gynecology</li>
            <li><strong>REI fellowship</strong> — 3 additional years of subspecialty training specifically in reproductive endocrinology and infertility, including running IVF labs, performing egg retrievals and embryo transfers, and managing complex hormonal cases</li>
            <li><strong>Board certification</strong> — An exam administered by the American Board of Obstetrics and Gynecology (ABOG) in the REI subspecialty</li>
          </ol>
          <p className="text-gray-700 leading-relaxed mb-6">
            This adds up to at least 11–12 years of post-undergraduate medical training before an REI sees their first patient independently. It&rsquo;s a small specialty — fewer than 80 REI fellows graduate from accredited programs each year in the US, which is why there are only about 1,200–1,500 active REI specialists in the entire country.
          </p>

          <h2 className="font-serif text-2xl font-bold text-gray-900 mt-8 mb-4">What an REI Treats</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            REI specialists see patients across a wide range of diagnoses and situations:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
            <li><strong>Unexplained infertility</strong> — the most common diagnosis, affecting 1 in 4 infertile couples</li>
            <li><strong>PCOS (polycystic ovary syndrome)</strong> — the most common hormonal disorder in women of reproductive age</li>
            <li><strong>Diminished ovarian reserve (DOR)</strong> — fewer eggs than expected for age; often diagnosed by low AMH or high FSH</li>
            <li><strong>Endometriosis</strong> — lesions on reproductive organs that can impair implantation and egg quality</li>
            <li><strong>Male factor infertility</strong> — low sperm count, poor motility, or sperm DNA fragmentation</li>
            <li><strong>Recurrent pregnancy loss</strong> — two or more miscarriages; often has a diagnosable cause</li>
            <li><strong>Uterine factor infertility</strong> — fibroids, polyps, septum, or Asherman&rsquo;s syndrome</li>
            <li><strong>LGBTQ+ family building</strong> — donor sperm, reciprocal IVF, surrogacy coordination</li>
            <li><strong>Elective egg freezing</strong> — fertility preservation for medical reasons or personal choice</li>
          </ul>

          <h2 className="font-serif text-2xl font-bold text-gray-900 mt-8 mb-4">When to See an REI vs. Your OB-GYN</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Your OB-GYN is the right starting point for a basic fertility evaluation — they can order bloodwork, check hormone levels, and perform a basic semen analysis. But when treatment escalates beyond basic ovulation induction or IUI, you need an REI.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Go straight to an REI if any of these apply:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
            <li>You are under 35 and have been trying for 12+ months without conceiving</li>
            <li>You are 35–39 and have been trying for 6+ months</li>
            <li>You are 40 or older — don&rsquo;t wait, see an REI immediately</li>
            <li>You have a known diagnosis: PCOS, endometriosis, diminished ovarian reserve, or fibroids</li>
            <li>You have had 2 or more miscarriages</li>
            <li>Your partner has known sperm issues</li>
            <li>You are LGBTQ+ or single and building a family with donor sperm, eggs, or a surrogate</li>
          </ul>

          <h2 className="font-serif text-2xl font-bold text-gray-900 mt-8 mb-4">What to Expect at Your First REI Appointment</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            A first REI consultation typically lasts 45–60 minutes. The doctor will review your medical history, prior records, and any test results from your OB-GYN. They will likely order or repeat:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
            <li>Bloodwork: day-3 FSH, LH, estradiol, AMH, prolactin, thyroid panel</li>
            <li>Antral follicle count (AFC) via transvaginal ultrasound — estimates ovarian reserve</li>
            <li>Semen analysis for the male partner</li>
            <li>Saline infusion sonogram (SIS) or hysterosalpingogram (HSG) to evaluate uterus and tubes</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-6">
            By the end of the first visit or shortly after, the REI should be able to give you a working diagnosis and a proposed treatment plan.
          </p>

          <h2 className="font-serif text-2xl font-bold text-gray-900 mt-8 mb-4">Frequently Asked Questions</h2>

          <div className="space-y-5 mb-8">
            <div className="border-l-4 border-teal-200 pl-4">
              <h3 className="font-semibold text-gray-800 mb-1">What does a reproductive endocrinologist do day to day?</h3>
              <p className="text-gray-600 text-sm">REIs diagnose and treat infertility, perform egg retrievals and embryo transfers, interpret complex hormonal labs, and oversee IVF labs. Many also see patients for egg freezing consultations and LGBTQ+ family building.</p>
            </div>
            <div className="border-l-4 border-teal-200 pl-4">
              <h3 className="font-semibold text-gray-800 mb-1">How many reproductive endocrinologists are in the US?</h3>
              <p className="text-gray-600 text-sm">Approximately 1,200–1,500 board-certified REI specialists are in active practice in the US — a small number given the size of the patient population. This directory catalogs them all.</p>
            </div>
            <div className="border-l-4 border-teal-200 pl-4">
              <h3 className="font-semibold text-gray-800 mb-1">Does insurance cover a reproductive endocrinologist?</h3>
              <p className="text-gray-600 text-sm">Coverage depends on your state and employer. Illinois, Massachusetts, New York, New Jersey, and California have fertility insurance mandates. In mandate states, most employer plans must cover REI consultations and treatment.</p>
            </div>
            <div className="border-l-4 border-teal-200 pl-4">
              <h3 className="font-semibold text-gray-800 mb-1">How is an REI different from a fertility clinic?</h3>
              <p className="text-gray-600 text-sm">An REI is the physician; a fertility clinic is the facility where procedures happen. Many REIs work at fertility clinics, but some operate from hospital-based practices. A fertility clinic will always have at least one REI on staff.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-teal-500 text-white rounded-2xl p-6 text-center mt-8">
          <h2 className="font-serif text-xl font-bold mb-2">Ready to Find a Reproductive Endocrinologist?</h2>
          <p className="text-teal-100 text-sm mb-4">Browse over 1,200 REI specialists by city, specialty, and insurance accepted.</p>
          <Link href="/listings" className="inline-block bg-gold-400 hover:bg-gold-500 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm">
            Find a Fertility Specialist Near You →
          </Link>
        </div>
      </div>
    </>
  )
}
