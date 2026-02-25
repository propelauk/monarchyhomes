import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CheckCircle, FileCheck, Building2, ClipboardList, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function LicensingPage() {
  const licenseTypes = [
    {
      title: 'Mandatory HMO License',
      description: 'Required for properties with 5+ tenants from 2+ households sharing facilities.',
      requirements: ['5+ occupants', '2+ households', '3+ storeys (some areas)', 'Shared kitchen/bathroom'],
    },
    {
      title: 'Additional HMO License',
      description: 'Required in designated areas for smaller HMOs that don&apos;t require mandatory licensing.',
      requirements: ['3+ occupants', '2+ households', 'Within designated area', 'Shared facilities'],
    },
    {
      title: 'Selective Licensing',
      description: 'Required for all private rented properties in designated selective licensing areas.',
      requirements: ['Any private rental', 'Within designated zone', 'Landlord registration', 'Property standards'],
    },
  ]

  const support = [
    'License application preparation',
    'Council fee guidance',
    'Property standards assessment',
    'Fire safety requirements',
    'Room size calculations',
    'Amenity requirements check',
    'Document compilation',
    'Council liaison',
    'Renewal management',
    'Compliance monitoring',
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
                Licensing Support
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Navigate HMO and selective licensing with confidence. We handle applications, renewals, and ongoing compliance for Gloucestershire landlords.
              </p>
              <Link href="/#assessment" className="btn-primary">
                Get Licensing Help
              </Link>
            </div>
          </div>
        </section>

        {/* License Types */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-serif font-bold text-navy-900 mb-12 text-center">
              Types of Licenses
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {licenseTypes.map((license, index) => (
                <div key={index} className="bg-accent rounded-2xl p-8">
                  <FileCheck className="w-10 h-10 text-gold-600 mb-4" />
                  <h3 className="text-xl font-semibold text-navy-900 mb-3">{license.title}</h3>
                  <p className="text-charcoal-600 mb-4">{license.description}</p>
                  <ul className="space-y-2">
                    {license.requirements.map((req, i) => (
                      <li key={i} className="flex items-center space-x-2 text-sm text-charcoal-700">
                        <CheckCircle className="w-4 h-4 text-gold-500" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Support */}
        <section className="py-20 bg-accent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-serif font-bold text-navy-900 mb-12 text-center">
              How We Help
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {support.map((item, index) => (
                <div key={index} className="flex items-center space-x-3 bg-white rounded-lg p-4">
                  <CheckCircle className="w-5 h-5 text-gold-500 flex-shrink-0" />
                  <span className="text-charcoal-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-navy-900">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-serif font-bold text-white mb-6">
              Need Help With Licensing?
            </h2>
            <p className="text-gray-400 mb-8">
              Don&apos;t risk fines or prosecution. Let us handle your HMO licensing requirements.
            </p>
            <Link href="/#assessment" className="btn-primary">
              Get Licensing Support <ArrowRight className="w-5 h-5 ml-2 inline" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
