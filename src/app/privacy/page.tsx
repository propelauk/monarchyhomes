import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { SITE_CONFIG } from '@/lib/constants'

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-navy-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-serif font-bold text-white">Privacy Policy</h1>
            <p className="text-gray-400 mt-2">Last updated: February 2026</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <h2>1. Introduction</h2>
              <p>
                Monarchy Homes (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>

              <h2>2. Information We Collect</h2>
              <h3>Personal Information</h3>
              <p>We may collect personal information that you voluntarily provide to us when you:</p>
              <ul>
                <li>Fill out a contact form or assessment request</li>
                <li>Subscribe to our newsletter</li>
                <li>Request a callback</li>
                <li>Download resources from our website</li>
              </ul>
              <p>This information may include:</p>
              <ul>
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Property address or postcode</li>
                <li>Property details (type, rooms, current setup)</li>
              </ul>

              <h3>Automatically Collected Information</h3>
              <p>
                When you visit our website, we may automatically collect certain information about your device, including your IP address, browser type, operating system, and browsing behaviour. This is collected through cookies and similar technologies.
              </p>

              <h2>3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Respond to your enquiries and provide property management services</li>
                <li>Send you marketing communications (with your consent)</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
                <li>Protect against fraud and misuse</li>
              </ul>

              <h2>4. Information Sharing</h2>
              <p>
                We do not sell your personal information. We may share your information with:
              </p>
              <ul>
                <li>Service providers who assist our operations (e.g., email services, analytics)</li>
                <li>Professional advisers (accountants, lawyers)</li>
                <li>Regulatory authorities when required by law</li>
                <li>Prospective tenants (limited property information only)</li>
              </ul>

              <h2>5. Data Security</h2>
              <p>
                We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction.
              </p>

              <h2>6. Your Rights</h2>
              <p>Under UK GDPR, you have the right to:</p>
              <ul>
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing</li>
                <li>Request data portability</li>
                <li>Withdraw consent at any time</li>
              </ul>

              <h2>7. Cookies</h2>
              <p>
                Our website uses cookies to enhance your experience. See our <a href="/cookies" className="text-gold-600 hover:underline">Cookie Policy</a> for more information.
              </p>

              <h2>8. Data Retention</h2>
              <p>
                We retain your personal information for as long as necessary to fulfil the purposes for which it was collected, or as required by law. Typically, we retain client data for 7 years after our business relationship ends.
              </p>

              <h2>9. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated date.
              </p>

              <h2>10. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
              </p>
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
