import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Building2, Home, Shield, Users, FileCheck, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const services = [
  {
    icon: Building2,
    title: 'HMO Management',
    description: 'Specialist HMO property management with full compliance, tenant sourcing, and maintenance coordination.',
    href: '/services/hmo-management',
    features: ['Room by room letting', 'Full compliance management', '97% average occupancy', '24/7 maintenance'],
  },
  {
    icon: Home,
    title: 'Single Let Management',
    description: 'Complete hands-off management for your single let property, from tenant finding to maintenance.',
    href: '/services/single-let',
    features: ['Professional marketing', 'Quality tenant vetting', 'Rent collection', 'Regular inspections'],
  },
  {
    icon: Shield,
    title: 'Compliance Services',
    description: 'Stay fully compliant with all HMO and rental property regulations, licensing, and safety certificates.',
    href: '/services/compliance',
    features: ['HMO licensing', 'Fire safety', 'Electrical safety', 'Gas certificates'],
  },
  {
    icon: Users,
    title: 'Tenant Sourcing',
    description: 'Find quality tenants fast with our rigorous vetting process ensuring reliable, long-term tenancies.',
    href: '/services/tenant-sourcing',
    features: ['Professional marketing', 'Comprehensive vetting', 'Reference checks', 'Right to rent'],
  },
  {
    icon: FileCheck,
    title: 'Licensing Support',
    description: 'Navigate HMO and selective licensing with confidence. We handle applications, renewals, and compliance.',
    href: '/services/licensing',
    features: ['License applications', 'Renewal management', 'Council liaison', 'Ongoing compliance'],
  },
]

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-navy-900 py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                Our Services
              </h1>
              <p className="text-xl text-gray-300">
                Comprehensive property management services for HMO and single let landlords across Gloucestershire.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div key={index} className="bg-accent rounded-2xl p-8 flex flex-col">
                  <div className="w-14 h-14 bg-gold-500/20 rounded-xl flex items-center justify-center mb-4">
                    <service.icon className="w-7 h-7 text-gold-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-navy-900 mb-3">{service.title}</h3>
                  <p className="text-charcoal-600 mb-4 flex-grow">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="text-sm text-charcoal-700 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-gold-500 rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={service.href}
                    className="inline-flex items-center text-gold-600 font-semibold hover:text-gold-700 transition-colors"
                  >
                    Learn More <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-navy-900">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-serif font-bold text-white mb-6">
              Not Sure Which Service You Need?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Book a free assessment and we&apos;ll help you find the right solution for your property.
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
