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
            <div className="prose prose-lg max-w-none">
              <h2>1. What Are Cookies?</h2>
              <p>
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to website owners.
              </p>

              <h2>2. How We Use Cookies</h2>
              <p>The Monarchy Homes website uses cookies to:</p>
              <ul>
                <li>Remember your preferences and settings</li>
                <li>Understand how you use our website</li>
                <li>Improve your browsing experience</li>
                <li>Analyse website traffic and performance</li>
                <li>Deliver relevant marketing content</li>
              </ul>

              <h2>3. Types of Cookies We Use</h2>
              
              <h3>Essential Cookies</h3>
              <p>
                These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas. The website cannot function properly without these cookies.
              </p>
              <table>
                <thead>
                  <tr>
                    <th>Cookie</th>
                    <th>Purpose</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>session_id</td>
                    <td>Maintains user session</td>
                    <td>Session</td>
                  </tr>
                  <tr>
                    <td>cookie_consent</td>
                    <td>Records cookie preferences</td>
                    <td>1 year</td>
                  </tr>
                </tbody>
              </table>

              <h3>Analytics Cookies</h3>
              <p>
                These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
              </p>
              <table>
                <thead>
                  <tr>
                    <th>Cookie</th>
                    <th>Purpose</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>_ga</td>
                    <td>Google Analytics - distinguishes users</td>
                    <td>2 years</td>
                  </tr>
                  <tr>
                    <td>_ga_*</td>
                    <td>Google Analytics - maintains session state</td>
                    <td>2 years</td>
                  </tr>
                  <tr>
                    <td>_clsk</td>
                    <td>Microsoft Clarity - session tracking</td>
                    <td>1 day</td>
                  </tr>
                  <tr>
                    <td>_clid</td>
                    <td>Microsoft Clarity - user identification</td>
                    <td>1 year</td>
                  </tr>
                </tbody>
              </table>

              <h3>Marketing Cookies</h3>
              <p>
                These cookies are used to track visitors across websites to allow us to display ads that are relevant and engaging.
              </p>
              <table>
                <thead>
                  <tr>
                    <th>Cookie</th>
                    <th>Purpose</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>_fbp</td>
                    <td>Facebook Pixel - ad tracking</td>
                    <td>3 months</td>
                  </tr>
                  <tr>
                    <td>ph_*</td>
                    <td>PostHog - product analytics</td>
                    <td>1 year</td>
                  </tr>
                </tbody>
              </table>

              <h2>4. Managing Cookies</h2>
              <p>
                You can control and manage cookies in several ways:
              </p>
              <h3>Browser Settings</h3>
              <p>
                Most web browsers allow you to control cookies through their settings. You can set your browser to:
              </p>
              <ul>
                <li>Block all cookies</li>
                <li>Accept only first-party cookies</li>
                <li>Delete cookies when you close your browser</li>
                <li>Alert you when websites set cookies</li>
              </ul>
              <p>
                Note: Blocking all cookies may affect your experience on our website.
              </p>

              <h3>Opt-Out Links</h3>
              <ul>
                <li><a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-gold-600 hover:underline">Google Analytics Opt-Out</a></li>
                <li><a href="https://www.facebook.com/settings/?tab=ads" target="_blank" rel="noopener noreferrer" className="text-gold-600 hover:underline">Facebook Ad Preferences</a></li>
              </ul>

              <h2>5. Third-Party Cookies</h2>
              <p>
                Some cookies are placed by third-party services that appear on our pages. We do not control these cookies. For information about these cookies, please visit the relevant third-party websites.
              </p>

              <h2>6. Updates to This Policy</h2>
              <p>
                We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated date.
              </p>

              <h2>7. Contact Us</h2>
              <p>If you have questions about our use of cookies, please contact us:</p>
              <ul>
                <li>Email: {SITE_CONFIG.email}</li>
                <li>Phone: {SITE_CONFIG.phone}</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
