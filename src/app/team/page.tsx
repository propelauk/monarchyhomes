import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { User, Mail, Phone } from 'lucide-react'
import Link from 'next/link'

const team = [
  {
    name: 'Property Management Team',
    role: 'Day-to-day Operations',
    description: 'Our dedicated team handles all aspects of property management, tenant relations, and maintenance coordination.',
  },
  {
    name: 'Compliance Specialists',
    role: 'Licensing & Safety',
    description: 'Experts in HMO licensing, fire safety compliance, and council regulations across Gloucestershire.',
  },
  {
    name: 'Tenant Services',
    role: 'Sourcing & Support',
    description: 'Professional tenant sourcing, vetting, and ongoing tenant support to ensure smooth tenancies.',
  },
]

export default function TeamPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-navy-900 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                Our Team
              </h1>
              <p className="text-xl text-gray-300">
                Meet the dedicated professionals behind Monarchy Homes.
              </p>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div key={index} className="bg-accent rounded-2xl p-8 text-center">
                  <div className="w-24 h-24 bg-navy-900/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <User className="w-12 h-12 text-navy-900/40" />
                  </div>
                  <h3 className="text-xl font-semibold text-navy-900 mb-1">{member.name}</h3>
                  <p className="text-gold-600 font-medium mb-4">{member.role}</p>
                  <p className="text-charcoal-600">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 bg-accent">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-serif font-bold text-navy-900 mb-6">
              Get in Touch
            </h2>
            <p className="text-charcoal-600 mb-8">
              Our team is here to help with all your property management needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary">
                <Mail className="w-5 h-5 mr-2" /> Contact Us
              </Link>
              <a href="tel:01452452308" className="btn-secondary">
                <Phone className="w-5 h-5 mr-2" /> 01452 452308
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
