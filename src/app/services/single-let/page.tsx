import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CheckCircle, Home, Users, Shield, BarChart3, ArrowRight, Key } from 'lucide-react'
import Link from 'next/link'

export default function SingleLetPage() {
  const features = [
    {
      icon: Home,
      title: 'Full Property Management',
      description: 'Complete hands-off management for your single let property, from tenant finding to maintenance.',
    },
    {
      icon: Users,
      title: 'Quality Tenant Sourcing',
      description: 'Thorough vetting process including credit checks, references, and employment verification.',
    },
    {
      icon: Key,
      title: 'Hassle-Free Lettings',
      description: 'We handle viewings, contracts, deposits, and move-ins so you don&apos;t have to.',
    },
    {
      icon: BarChart3,
      title: 'Rental Optimisation',
      description: 'Market analysis to ensure you achieve the best possible rental price for your property.',
    },
  ]

  const included = [
    'Professional property marketing',
    'Tenant sourcing & vetting',
    'Tenancy agreement preparation',
    'Deposit registration & protection',
    'Rent collection & arrears chasing',
    'Regular property inspections',
    'Maintenance coordination',
    'Monthly financial statements',
    'End of tenancy management',
    'Legal compliance guidance',
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
                Single Let Property Management
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Professional management for your single let property in Gloucestershire. We find quality tenants and handle everything else.
              </p>
              <Link href="/#assessment" className="btn-primary">
                Get Free Property Assessment
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-serif font-bold text-navy-900 mb-12 text-center">
              Why Choose Our Single Let Management
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-accent rounded-2xl p-8">
                  <div className="w-14 h-14 bg-gold-500/20 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="w-7 h-7 text-gold-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-navy-900 mb-2">{feature.title}</h3>
                  <p className="text-charcoal-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-20 bg-accent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-serif font-bold text-navy-900 mb-12 text-center">
              What&apos;s Included
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {included.map((item, index) => (
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
              Let Us Manage Your Property
            </h2>
            <p className="text-gray-400 mb-8">
              Get a free property assessment and discover how we can make your rental income truly passive.
            </p>
            <Link href="/#assessment" className="btn-primary">
              Get Free Assessment <ArrowRight className="w-5 h-5 ml-2 inline" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
