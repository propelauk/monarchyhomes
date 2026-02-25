import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { SITE_CONFIG } from '@/lib/constants'

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-navy-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-serif font-bold text-white">Terms of Service</h1>
            <p className="text-gray-400 mt-2">Last updated: February 2026</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <h2>1. Agreement to Terms</h2>
              <p>
                By accessing or using the Monarchy Homes website, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our website or use our services.
              </p>

              <h2>2. Services</h2>
              <p>
                Monarchy Homes provides property management services including but not limited to:
              </p>
              <ul>
                <li>HMO property management</li>
                <li>Single let property management</li>
                <li>Tenant sourcing and vetting</li>
                <li>Compliance management</li>
                <li>Licensing support</li>
                <li>Maintenance coordination</li>
              </ul>
              <p>
                Specific services and fees are outlined in individual management agreements between Monarchy Homes and property owners.
              </p>

              <h2>3. Website Use</h2>
              <p>You agree to use our website only for lawful purposes and in a way that does not:</p>
              <ul>
                <li>Infringe the rights of others</li>
                <li>Restrict or inhibit anyone else&apos;s use of the website</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Transmit harmful code or attempt to gain unauthorised access</li>
              </ul>

              <h2>4. Intellectual Property</h2>
              <p>
                All content on this website, including text, graphics, logos, images, and software, is the property of Monarchy Homes or its content suppliers and is protected by UK and international copyright laws.
              </p>
              <p>
                You may not reproduce, distribute, modify, or create derivative works from any content without our express written permission.
              </p>

              <h2>5. Information Accuracy</h2>
              <p>
                While we strive to provide accurate and up-to-date information, we make no warranties about the completeness, reliability, or accuracy of the information on our website.
              </p>
              <p>
                Information about property regulations, licensing requirements, and compliance standards is provided for general guidance only and should not be relied upon as professional legal or regulatory advice.
              </p>

              <h2>6. Lead Submissions</h2>
              <p>
                When you submit information through our website forms, you:
              </p>
              <ul>
                <li>Confirm the information provided is accurate</li>
                <li>Consent to being contacted by our team regarding your enquiry</li>
                <li>Understand that submission does not constitute a binding agreement</li>
              </ul>

              <h2>7. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, Monarchy Homes shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or services.
              </p>
              <p>
                Our total liability for any claims arising from your use of the website shall not exceed the amount you paid to us, if any, in the 12 months preceding the claim.
              </p>

              <h2>8. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites. We have no control over the content or practices of these sites and accept no responsibility for them.
              </p>

              <h2>9. Termination</h2>
              <p>
                We reserve the right to terminate or suspend access to our website immediately, without prior notice, for any reason whatsoever.
              </p>

              <h2>10. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of England and Wales, without regard to its conflict of law provisions.
              </p>

              <h2>11. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Changes take effect immediately upon posting. Your continued use of the website after changes constitutes acceptance of the new terms.
              </p>

              <h2>12. Contact Information</h2>
              <p>For questions about these Terms of Service, please contact us:</p>
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
