import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { SITE_CONFIG } from '@/lib/constants'
import { FileText, Building2, Globe, Home, Link2, AlertTriangle, Lock, RefreshCw, Mail } from 'lucide-react'

const sections = [
  {
    icon: FileText,
    title: 'Welcome',
    content: 'These Terms and Conditions govern your use of our website and services. By accessing Monarchy Homes Limited\'s website at www.monarchyhomes.com, you agree to the terms set out below.',
    highlight: true,
  },
  {
    icon: Building2,
    title: 'About Us',
    content: 'Monarchy Homes is a property management company providing services including property management, lettings support, and property-related services.',
  },
  {
    icon: Globe,
    title: 'Use of This Website',
    content: 'You agree to use this website only for lawful purposes and in a way that does not:',
    items: [
      'Violate any applicable laws or regulations',
      'Infringe the rights of others',
      'Restrict or inhibit anyone else\'s use of the website',
      'Introduce viruses, malware, or harmful material',
    ],
    note: 'You must not attempt to gain unauthorised access to the website, server, or any connected systems.',
  },
  {
    icon: FileText,
    title: 'Information on the Website',
    content: 'The information provided on this website is for general informational purposes only. While Monarchy Homes makes reasonable efforts to ensure the information is accurate and up to date, we make no guarantees, representations, or warranties regarding the completeness, reliability, or accuracy of any content.',
    note: 'Property information, availability, rental prices, and services may change without notice.',
  },
  {
    icon: Home,
    title: 'Property Listings',
    items: [
      'Any property listings displayed on the website are subject to availability and may be withdrawn or amended at any time',
      'Property descriptions, images, and floorplans are provided as a guide only and should not be relied upon as statements of fact',
      'Prospective tenants or landlords should verify all details before entering into any agreement',
    ],
  },
  {
    icon: Link2,
    title: 'Links to Third-Party Websites',
    content: 'This website may contain links to third-party websites for convenience. Monarchy Homes does not control and is not responsible for the content, policies, or practices of any third-party websites.',
  },
  {
    icon: AlertTriangle,
    title: 'Limitation of Liability',
    content: 'To the fullest extent permitted by law, Monarchy Homes shall not be liable for any:',
    items: [
      'Direct loss',
      'Indirect loss',
      'Consequential loss',
      'Loss of income or business',
      'Loss arising from reliance on information provided on this website',
    ],
    note: 'Nothing in these terms excludes liability where it would be unlawful to do so under UK law.',
  },
  {
    icon: Lock,
    title: 'Privacy',
    content: 'Your use of this website is also governed by our Privacy Policy, which explains how we collect and process personal data.',
    link: { text: 'View Privacy Policy', href: '/privacy' },
  },
  {
    icon: RefreshCw,
    title: 'Changes to These Terms',
    content: 'Monarchy Homes may update or modify these Terms and Conditions at any time without prior notice. Any changes will be effective immediately upon posting on this website.',
  },
]

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold-500/20 mb-6">
              <FileText className="w-8 h-8 text-gold-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Terms & Conditions</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Please read these terms carefully before using our website and services.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">
              {sections.map((section, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-2xl shadow-sm border ${
                    section.highlight ? 'border-gold-500/30 bg-gradient-to-r from-gold-50 to-white' : 'border-gray-100'
                  } overflow-hidden`}
                >
                  <div className="p-6 md:p-8">
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                        section.highlight ? 'bg-gold-500 text-white' : 'bg-navy-100 text-navy-700'
                      }`}>
                        <section.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h2 className="text-xl font-semibold text-navy-900 mb-3">{section.title}</h2>
                        
                        {section.content && (
                          <p className="text-gray-600 leading-relaxed">{section.content}</p>
                        )}

                        {section.items && (
                          <ul className="mt-4 space-y-2">
                            {section.items.map((item, itemIndex) => (
                              <li key={itemIndex} className="text-gray-600 flex items-start gap-3">
                                <span className="w-2 h-2 rounded-full bg-gold-500 flex-shrink-0 mt-2" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {section.note && (
                          <p className="mt-4 text-sm text-gold-700 bg-gold-50 rounded-lg px-4 py-2 border border-gold-200">
                            {section.note}
                          </p>
                        )}

                        {section.link && (
                          <a
                            href={section.link.href}
                            className="mt-4 inline-flex items-center gap-2 text-gold-600 hover:text-gold-700 font-medium transition-colors"
                          >
                            {section.link.text}
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Contact Card */}
              <div className="bg-navy-900 rounded-2xl p-8 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gold-500/20 mb-4">
                  <Mail className="w-7 h-7 text-gold-500" />
                </div>
                <h2 className="text-2xl font-semibold text-white mb-2">Questions?</h2>
                <p className="text-gray-400 mb-4">
                  If you have any questions regarding these Terms and Conditions, please contact:
                </p>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="inline-flex items-center gap-2 text-gold-500 hover:text-gold-400 font-medium text-lg transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  {SITE_CONFIG.email}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
