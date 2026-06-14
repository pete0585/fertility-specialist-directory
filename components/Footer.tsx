import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-teal-700 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="font-serif text-xl font-bold mb-2">
              Fertility<span className="text-gold-300">Specialist</span> Directory
            </div>
            <p className="text-teal-200 text-sm leading-relaxed">
              Find a board-certified fertility specialist or reproductive endocrinologist near you.
              Thousands of practitioners. One trusted directory.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-teal-200 mb-3">
              Find a Specialist
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/categories/reproductive-endocrinologists" className="text-teal-100 hover:text-white transition-colors">
                  Reproductive Endocrinologists
                </Link>
              </li>
              <li>
                <Link href="/categories/fertility-clinics" className="text-teal-100 hover:text-white transition-colors">
                  Fertility Clinics
                </Link>
              </li>
              <li>
                <Link href="/categories/fertility-acupuncturists" className="text-teal-100 hover:text-white transition-colors">
                  Fertility Acupuncturists
                </Link>
              </li>
              <li>
                <Link href="/categories/lgbtq-fertility" className="text-teal-100 hover:text-white transition-colors">
                  LGBTQ+ Fertility
                </Link>
              </li>
              <li>
                <Link href="/listings" className="text-teal-100 hover:text-white transition-colors">
                  Browse All
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-teal-200 mb-3">
              For Practitioners
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/submit" className="text-teal-100 hover:text-white transition-colors">
                  Add Your Listing
                </Link>
              </li>
              <li>
                <Link href="/listings" className="text-teal-100 hover:text-white transition-colors">
                  Find Your Listing
                </Link>
              </li>
              <li>
                <Link href="/submit" className="text-teal-100 hover:text-white transition-colors">
                  Pricing & Plans
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-teal-200 mb-3">
              Related Directories
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://menopausedirectory.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-100 hover:text-white transition-colors"
                >
                  Menopause Specialists
                </a>
              </li>
              <li>
                <a
                  href="https://lactationconsultantdirectory.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-100 hover:text-white transition-colors"
                >
                  Lactation Consultants
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-teal-600 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-teal-300">
          <p>&copy; {year} FertilitySpecialistDirectory.com. All rights reserved.</p>
          <p>
            For informational purposes only. Always consult a licensed medical professional.
          </p>
        </div>
      </div>
    </footer>
  )
}
