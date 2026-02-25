import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { FileText, Download, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function LandlordGuidePage() {
  const guides = [
    {
      title: 'HMO Compliance Checklist',
      description: 'Complete checklist for Gloucestershire HMO landlords covering licensing, fire safety, and council requirements.',
      items: ['Licensing requirements', 'Fire safety standards', 'Room sizes', 'Amenities checklist'],
    },
    {
      title: 'Tenant Vetting Guide',
      description: 'How to properly vet tenants including credit checks, references, and right to rent verification.',
      items: ['Reference checking', 'Credit assessment', 'Documentation', 'Red flags to watch'],
    },
    {
      title: 'Maintenance Best Practices',
      description: 'Keep your property in top condition and avoid costly repairs with preventative maintenance.',
      items: ['Seasonal checks', 'Common issues', 'Contractor management', 'Emergency procedures'],
    },
    {
      title: 'Rent Collection Tips',
      description: 'Strategies for consistent rent collection and handling arrears professionally.',
      items: ['Payment methods', 'Arrears process', 'Legal considerations', 'Documentation'],
    },
  ]

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-navy-900 py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                Landlord Resource Guide
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Essential guides and resources for Gloucestershire landlords. Everything you need to manage your property successfully.
              </p>
            </div>
          </div>
        </section>

        {/* Guides */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {guides.map((guide, index) => (
                <div key={index} className="bg-accent rounded-2xl p-8">
                  <FileText className="w-10 h-10 text-gold-600 mb-4" />
                  <h3 className="text-xl font-semibold text-navy-900 mb-3">{guide.title}</h3>
                  <p className="text-charcoal-600 mb-4">{guide.description}</p>
                  <ul className="space-y-2 mb-6">
                    {guide.items.map((item, i) => (
                      <li key={i} className="flex items-center space-x-2 text-sm text-charcoal-700">
                        <CheckCircle className="w-4 h-4 text-gold-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Download CTA */}
        <section className="py-20 bg-accent">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Download className="w-16 h-16 text-gold-500 mx-auto mb-6" />
            <h2 className="text-3xl font-serif font-bold text-navy-900 mb-6">
              Download Our Free HMO Compliance Checklist
            </h2>
            <p className="text-charcoal-600 mb-8">
              Get our comprehensive compliance checklist and ensure your property meets all Gloucestershire requirements.
            </p>
            <Link href="/#resources" className="btn-primary">
              Download Free Checklist <ArrowRight className="w-5 h-5 ml-2 inline" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
