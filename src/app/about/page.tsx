import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CheckCircle, Award, Users, Building2 } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  const values = [
    {
      icon: Award,
      title: 'Excellence',
      description: 'We maintain the highest standards in property management, compliance, and tenant relations.',
    },
    {
      icon: Users,
      title: 'Trust',
      description: 'Transparent communication and honest advice are the foundation of our landlord relationships.',
    },
    {
      icon: Building2,
      title: 'Local Expertise',
      description: 'Deep knowledge of Gloucestershire&apos;s property market and council requirements.',
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
                About Monarchy Homes
              </h1>
              <p className="text-xl text-gray-300">
                Gloucestershire&apos;s trusted property management specialists. We help landlords maximise returns while eliminating the hassle.
              </p>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-serif font-bold text-navy-900 mb-6">Our Story</h2>
              <div className="prose prose-lg text-charcoal-600">
                <p className="mb-4">
                  Monarchy Homes was founded with a simple mission: to provide Gloucestershire landlords with property management they can truly rely on.
                </p>
                <p className="mb-4">
                  We noticed too many landlords struggling with the complexities of HMO compliance, tenant issues, and the ever-changing regulatory landscape. Many were working with agents who treated property management as a sideline, not a specialism.
                </p>
                <p className="mb-4">
                  We built Monarchy Homes to be different. Our focus is entirely on delivering results for landlords – maximum occupancy, full compliance, and hassle-free income. Whether you have a single let or a portfolio of HMOs, we treat your property as if it were our own.
                </p>
                <p>
                  Today, we manage properties across Gloucester, Cheltenham, Stroud, Tewkesbury, and the wider county, helping landlords achieve consistent returns while staying fully compliant with all regulations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-accent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-serif font-bold text-navy-900 mb-12 text-center">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 bg-gold-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-gold-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-navy-900 mb-2">{value.title}</h3>
                  <p className="text-charcoal-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 bg-navy-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold text-gold-500 mb-2">45+</p>
                <p className="text-gray-400">Properties Managed</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-gold-500 mb-2">320+</p>
                <p className="text-gray-400">Rooms Under Management</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-gold-500 mb-2">97%</p>
                <p className="text-gray-400">Occupancy Rate</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-gold-500 mb-2">99%</p>
                <p className="text-gray-400">Rent Collected</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-serif font-bold text-navy-900 mb-6">
              Ready to Work With Us?
            </h2>
            <p className="text-charcoal-600 mb-8">
              Discover how Monarchy Homes can transform your property investment.
            </p>
            <Link href="/#assessment" className="btn-primary">
              Get Free Property Assessment
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
