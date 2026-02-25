'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ChevronDown, ChevronUp } from 'lucide-react'
import Link from 'next/link'

const faqs = [
  {
    category: 'HMO Management',
    questions: [
      {
        q: 'What areas do you cover?',
        a: 'We provide property management services across Gloucestershire, including Gloucester, Cheltenham, Stroud, Tewkesbury, and surrounding areas.',
      },
      {
        q: 'What is your management fee?',
        a: 'Our fees depend on the type of service and property. We offer competitive rates and provide a full breakdown during your free assessment. Contact us for a personalised quote.',
      },
      {
        q: 'Do you handle both HMOs and single lets?',
        a: 'Yes, we manage both HMO properties and traditional single let rentals. Our services are tailored to each property type.',
      },
      {
        q: 'How quickly can you find tenants?',
        a: 'We typically fill rooms within 2-4 weeks, depending on the property and market conditions. Our multi-platform marketing ensures maximum exposure.',
      },
    ],
  },
  {
    category: 'Compliance & Licensing',
    questions: [
      {
        q: 'Do I need an HMO license?',
        a: 'If your property has 5 or more tenants from 2 or more households sharing facilities, you need a mandatory HMO license. Some areas also require additional or selective licensing for smaller properties.',
      },
      {
        q: 'Can you help with my HMO license application?',
        a: 'Yes, we handle the entire licensing process including applications, renewals, and ensuring your property meets all requirements before inspection.',
      },
      {
        q: 'What fire safety requirements do HMOs need?',
        a: 'HMOs require fire alarms, fire doors, emergency lighting, fire extinguishers, and clear escape routes. Requirements vary based on property size and layout.',
      },
      {
        q: 'How often do certificates need renewing?',
        a: 'Gas safety certificates are annual, EICRs are every 5 years (or less if stated), and fire alarm testing should be regular. We track all renewals for you.',
      },
    ],
  },
  {
    category: 'Tenants & Rent',
    questions: [
      {
        q: 'How do you vet tenants?',
        a: 'We conduct comprehensive checks including credit history, employment verification, previous landlord references, right to rent documentation, and affordability assessments.',
      },
      {
        q: 'What happens if a tenant doesn&apos;t pay rent?',
        a: 'We have a robust arrears process including reminders, formal notices, and if necessary, support through legal proceedings. We aim to resolve issues before they escalate.',
      },
      {
        q: 'Do you offer rent guarantee?',
        a: 'Yes, we offer rent guarantee options for qualifying properties. This provides protection against tenant non-payment.',
      },
      {
        q: 'How do you handle tenant disputes?',
        a: 'We act as intermediaries to resolve disputes fairly and professionally, following all legal requirements and maintaining property harmony.',
      },
    ],
  },
  {
    category: 'Getting Started',
    questions: [
      {
        q: 'How do I get started?',
        a: 'Simply book a free assessment through our website or call us. We&apos;ll review your property, discuss your goals, and provide a tailored management proposal.',
      },
      {
        q: 'Do you take on properties with existing tenants?',
        a: 'Yes, we can take over management of properties with existing tenants. We&apos;ll review current tenancies and ensure a smooth transition.',
      },
      {
        q: 'What if I&apos;m not happy with the service?',
        a: 'We work hard to exceed expectations, but if you&apos;re not satisfied, we have fair notice periods and will ensure a professional handover.',
      },
      {
        q: 'Can you help convert a property to an HMO?',
        a: 'We can advise on HMO conversions including planning requirements, licensing, and property standards needed to operate legally.',
      },
    ],
  },
]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left"
      >
        <span className="font-medium text-navy-900">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gold-500 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-charcoal-400 flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="pb-5">
          <p className="text-charcoal-600">{answer}</p>
        </div>
      )}
    </div>
  )
}

export default function FAQsPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-navy-900 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-gray-300">
                Find answers to common questions about our property management services.
              </p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {faqs.map((category, index) => (
              <div key={index} className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-navy-900 mb-6">
                  {category.category}
                </h2>
                <div className="bg-accent rounded-2xl px-6">
                  {category.questions.map((faq, i) => (
                    <FAQItem key={i} question={faq.q} answer={faq.a} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-accent">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-serif font-bold text-navy-900 mb-6">
              Still Have Questions?
            </h2>
            <p className="text-charcoal-600 mb-8">
              Get in touch with our team for personalised advice about your property.
            </p>
            <Link href="/contact" className="btn-primary">
              Contact Us
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
