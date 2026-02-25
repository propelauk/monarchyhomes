import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CheckCircle, Users, Search, FileCheck, Shield, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function TenantSourcingPage() {
  const process = [
    {
      step: '01',
      title: 'Property Marketing',
      description: 'Professional photography and listings across all major property portals and social media.',
    },
    {
      step: '02',
      title: 'Viewings & Enquiries',
      description: 'We handle all viewings, answer enquiries, and pre-qualify potential tenants.',
    },
    {
      step: '03',
      title: 'Comprehensive Vetting',
      description: 'Credit checks, employment verification, landlord references, and right to rent checks.',
    },
    {
      step: '04',
      title: 'Move-In Ready',
      description: 'Contract preparation, deposit protection, inventory, and smooth handover.',
    },
  ]

  const vettingChecks = [
    'Credit history check',
    'Employment verification',
    'Previous landlord references',
    'Right to rent documentation',
    'Affordability assessment',
    'Identity verification',
    'Address history check',
    'Guarantor assessment (if needed)',
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
                Tenant Sourcing & Vetting
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Find quality tenants fast. Our rigorous vetting process ensures you get reliable tenants who pay on time and look after your property.
              </p>
              <Link href="/#assessment" className="btn-primary">
                Find Tenants Now
              </Link>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-serif font-bold text-navy-900 mb-12 text-center">
              Our Tenant Finding Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {process.map((item, index) => (
                <div key={index} className="relative bg-accent rounded-2xl p-6">
                  <span className="text-5xl font-bold text-gold-500/20">{item.step}</span>
                  <h3 className="text-lg font-semibold text-navy-900 mt-2 mb-2">{item.title}</h3>
                  <p className="text-charcoal-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vetting */}
        <section className="py-20 bg-accent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-serif font-bold text-navy-900 mb-12 text-center">
              Comprehensive Vetting Checks
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {vettingChecks.map((item, index) => (
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
              Need Quality Tenants?
            </h2>
            <p className="text-gray-400 mb-8">
              Let us find and vet tenants for your property. Minimise voids and maximise peace of mind.
            </p>
            <Link href="/#assessment" className="btn-primary">
              Get Started <ArrowRight className="w-5 h-5 ml-2 inline" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
