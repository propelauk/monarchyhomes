import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CheckCircle, Shield, FileCheck, Flame, Zap, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function CompliancePage() {
  const services = [
    {
      icon: FileCheck,
      title: 'HMO Licensing',
      description: 'Full support with mandatory and additional licensing applications, renewals, and council liaison.',
    },
    {
      icon: Flame,
      title: 'Fire Safety',
      description: 'Fire risk assessments, alarm systems, fire doors, and escape route compliance.',
    },
    {
      icon: Zap,
      title: 'Electrical Safety',
      description: 'EICR certificates, PAT testing, and electrical compliance management.',
    },
    {
      icon: Shield,
      title: 'Gas Safety',
      description: 'Annual gas safety certificates and boiler maintenance coordination.',
    },
  ]

  const complianceItems = [
    'HMO license applications & renewals',
    'Fire risk assessments',
    'Fire alarm installation & testing',
    'Emergency lighting checks',
    'EICR electrical certificates',
    'Gas safety certificates',
    'Legionella risk assessments',
    'Room size compliance checks',
    'Kitchen & bathroom standards',
    'Council inspection preparation',
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
                Compliance Services
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Stay fully compliant with all HMO and rental property regulations. We handle licensing, safety certificates, and council requirements.
              </p>
              <Link href="/#assessment" className="btn-primary">
                Get Compliance Review
              </Link>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-serif font-bold text-navy-900 mb-12 text-center">
              Compliance Areas We Cover
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <div key={index} className="bg-accent rounded-2xl p-8">
                  <div className="w-14 h-14 bg-gold-500/20 rounded-xl flex items-center justify-center mb-4">
                    <service.icon className="w-7 h-7 text-gold-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-navy-900 mb-2">{service.title}</h3>
                  <p className="text-charcoal-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Checklist */}
        <section className="py-20 bg-accent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-serif font-bold text-navy-900 mb-12 text-center">
              Full Compliance Checklist
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {complianceItems.map((item, index) => (
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
              Worried About Compliance?
            </h2>
            <p className="text-gray-400 mb-8">
              Get a free compliance review and find out exactly what your property needs to stay fully legal and protected.
            </p>
            <Link href="/#assessment" className="btn-primary">
              Get Free Compliance Review <ArrowRight className="w-5 h-5 ml-2 inline" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
