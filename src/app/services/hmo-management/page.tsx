import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CheckCircle, Building2, Users, Shield, BarChart3, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function HMOManagementPage() {
  const features = [
    {
      icon: Users,
      title: 'Room by Room Letting',
      description: 'Maximise rental income by letting each room individually with professional tenant matching.',
    },
    {
      icon: Shield,
      title: 'Full Compliance Management',
      description: 'We handle all HMO licensing, fire safety, and council requirements so you stay protected.',
    },
    {
      icon: BarChart3,
      title: 'Occupancy Optimisation',
      description: 'Our tenant sourcing keeps void periods minimal with average 97% occupancy rates.',
    },
    {
      icon: Building2,
      title: 'Property Maintenance',
      description: '24/7 maintenance coordination with trusted local contractors and regular inspections.',
    },
  ]

  const included = [
    'Tenant sourcing & professional vetting',
    'Room by room tenancy management',
    'Rent collection & arrears management',
    'HMO licensing applications & renewals',
    'Fire safety compliance coordination',
    'Regular property inspections',
    'Maintenance & repairs management',
    'Monthly income statements',
    'Council liaison & inspections',
    'Tenant dispute resolution',
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
                HMO Property Management
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Specialist HMO management across Gloucestershire. We maximise your rental income while handling all compliance, tenants, and maintenance.
              </p>
              <Link href="#contact" className="btn-primary">
                Get Free HMO Assessment
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-serif font-bold text-navy-900 mb-12 text-center">
              Why Choose Our HMO Management
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
              Ready to Maximise Your HMO Income?
            </h2>
            <p className="text-gray-400 mb-8">
              Book a free assessment and discover how we can increase your rental yield while eliminating the management headache.
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
