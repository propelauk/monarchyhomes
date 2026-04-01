import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { SITE_CONFIG } from '@/lib/constants'
import { Shield, User, Database, Share2, Lock, FileCheck, Clock, AlertCircle, Mail } from 'lucide-react'

const sections = [
  {
    icon: Shield,
    title: 'Our Commitment',
    content: 'Monarchy Homes is committed to protecting your personal data and respecting your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website, contact us about our services, or enquire about renting or managing a property.',
    highlight: true,
  },
  {
    icon: FileCheck,
    title: 'Legal Compliance',
    content: 'This policy complies with the requirements of the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.',
  },
  {
    icon: User,
    title: 'Information We Collect',
    subsections: [
      {
        subtitle: 'Personal Identification',
        items: ['Name', 'Email address', 'Phone number', 'Address'],
      },
      {
        subtitle: 'Property Enquiry Information',
        items: ['Details of rental enquiries', 'Property preferences', 'Landlord enquiries'],
      },
      {
        subtitle: 'Technical Information',
        items: ['IP address', 'Browser type', 'Device information', 'Website usage data'],
      },
    ],
  },
  {
    icon: Database,
    title: 'How We Use Your Information',
    items: [
      'To respond to enquiries',
      'To provide property management services',
      'To arrange property viewings',
      'To communicate with landlords or tenants',
      'To improve our website and services',
      'To comply with legal obligations',
    ],
    note: 'We will only process your personal data where we have a lawful basis to do so.',
  },
  {
    icon: Share2,
    title: 'Sharing Your Information',
    content: 'We may share your personal information with:',
    items: [
      'Landlords or property owners',
      'Contractors or maintenance providers',
      'Professional advisers',
      'IT and website service providers',
      'Government authorities where required by law',
    ],
    note: 'We will only share information where necessary and appropriate safeguards are in place.',
  },
  {
    icon: Clock,
    title: 'Data Retention',
    content: 'We will retain your personal data only for as long as necessary for the purposes it was collected. Where information is no longer required, it will be securely deleted.',
  },
  {
    icon: FileCheck,
    title: 'Your Data Protection Rights',
    content: 'Under the UK General Data Protection Regulation, you have the right to:',
    items: [
      'Request access to your personal data',
      'Request correction of inaccurate data',
      'Request erasure of your personal data',
      'Object to certain types of processing',
      'Request restriction of processing',
      'Request data portability',
    ],
  },
  {
    icon: Lock,
    title: 'Data Security',
    content: 'We implement appropriate technical and organisational measures to protect your personal data from loss, misuse, unauthorised access, and disclosure.',
    note: 'However, no internet transmission is completely secure.',
  },
  {
    icon: AlertCircle,
    title: 'Complaints',
    content: 'If you are unhappy with how we handle your personal data, you have the right to lodge a complaint with the Information Commissioner\'s Office (ICO).',
  },
]

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold-500/20 mb-6">
              <Shield className="w-8 h-8 text-gold-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Privacy Policy</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Your privacy matters to us. Here&apos;s how we protect and handle your personal information.
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

                        {section.subsections && (
                          <div className="mt-4 grid gap-4 md:grid-cols-3">
                            {section.subsections.map((sub, subIndex) => (
                              <div key={subIndex} className="bg-gray-50 rounded-xl p-4">
                                <h3 className="font-medium text-navy-800 text-sm mb-2">{sub.subtitle}</h3>
                                <ul className="space-y-1">
                                  {sub.items.map((item, itemIndex) => (
                                    <li key={itemIndex} className="text-gray-600 text-sm flex items-center gap-2">
                                      <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        )}

                        {section.items && !section.subsections && (
                          <ul className="mt-4 grid gap-2 md:grid-cols-2">
                            {section.items.map((item, itemIndex) => (
                              <li key={itemIndex} className="text-gray-600 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-gold-500 flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        )}

                        {section.note && (
                          <p className="mt-4 text-sm text-gold-700 bg-gold-50 rounded-lg px-4 py-2 border border-gold-200">
                            {section.note}
                          </p>
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
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="inline-flex items-center gap-2 text-gold-500 hover:text-gold-400 font-medium text-lg transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  {SITE_CONFIG.email}
                </a>
              </div>

              {/* Last Updated */}
              <p className="text-center text-gray-500 text-sm">
                This Privacy Policy may be updated periodically. Any changes will be posted on this page.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
