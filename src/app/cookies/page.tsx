import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { SITE_CONFIG } from '@/lib/constants'

export default function CookiesPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-navy-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-serif font-bold text-white">Cookie Policy</h1>
            <p className="text-gray-400 mt-2">Last updated: February 2026</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              
              <div>
                <h2 className="text-2xl font-semibold text-navy-900 mb-4">1. What Are Cookies?</h2>
                <p className="text-charcoal-600 leading-relaxed">
                  Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to website owners.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-navy-900 mb-4">2. How We Use Cookies</h2>
                <p className="text-charcoal-600 mb-4">The Monarchy Homes website uses cookies to:</p>
                <ul className="list-disc list-inside text-charcoal-600 space-y-2">
                  <li>Remember your preferences and settings</li>
                  <li>Understand how you use our website</li>
                  <li>Improve your browsing experience</li>
                  <li>Analyse website traffic and performance</li>
                  <li>Deliver relevant marketing content</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-navy-900 mb-4">3. Types of Cookies We Use</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-navy-800 mb-2">Essential Cookies</h3>
                    <p className="text-charcoal-600">
                      These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas. The website cannot function properly without these cookies.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-navy-800 mb-2">Analytics Cookies</h3>
                    <p className="text-charcoal-600">
                      These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-navy-800 mb-2">Marketing Cookies</h3>
                    <p className="text-charcoal-600">
                      These cookies are used to track visitors across websites to allow us to display ads that are relevant and engaging.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-navy-900 mb-4">4. Managing Cookies</h2>
                <p className="text-charcoal-600 mb-4">
                  You can control and manage cookies in several ways. Most web browsers allow you to control cookies through their settings. You can set your browser to:
                </p>
                <ul className="list-disc list-inside text-charcoal-600 space-y-2 mb-4">
                  <li>Block all cookies</li>
                  <li>Accept only first-party cookies</li>
                  <li>Delete cookies when you close your browser</li>
                  <li>Alert you when websites set cookies</li>
                </ul>
                <p className="text-charcoal-600 mb-4">
                  Note: Blocking all cookies may affect your experience on our website.
                </p>
                <p className="text-charcoal-600 mb-2 font-medium">Opt-Out Links:</p>
                <ul className="list-disc list-inside text-charcoal-600 space-y-2">
                  <li><a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-gold-600 hover:underline">Google Analytics Opt-Out</a></li>
                  <li><a href="https://www.facebook.com/settings/?tab=ads" target="_blank" rel="noopener noreferrer" className="text-gold-600 hover:underline">Facebook Ad Preferences</a></li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-navy-900 mb-4">5. Third-Party Cookies</h2>
                <p className="text-charcoal-600">
                  Some cookies are placed by third-party services that appear on our pages. We do not control these cookies. For information about these cookies, please visit the relevant third-party websites.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-navy-900 mb-4">6. Updates to This Policy</h2>
                <p className="text-charcoal-600">
                  We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated date.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-navy-900 mb-4">7. Contact Us</h2>
                <p className="text-charcoal-600 mb-2">If you have questions about our use of cookies, please contact us:</p>
                <p className="text-charcoal-600">
                  Email: <a href={`mailto:${SITE_CONFIG.email}`} className="text-gold-600 hover:underline">{SITE_CONFIG.email}</a>
                </p>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
