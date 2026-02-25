'use client'

import { motion } from 'framer-motion'
import { ClipboardCheck, Users, Home, BarChart3, ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from '@/components/Button'

const steps = [
  {
    number: '01',
    icon: ClipboardCheck,
    title: 'HMO Compliance Review',
    description: 'We conduct a thorough assessment of your property, identifying any compliance gaps and licensing requirements. Our experts ensure your HMO meets all local council standards.',
    features: ['Full property inspection', 'Licensing assessment', 'Fire safety audit', 'Council standards check'],
    color: 'bg-blue-500',
  },
  {
    number: '02',
    icon: Users,
    title: 'Tenant Sourcing & Professional Vetting',
    description: 'Our rigorous vetting process ensures only quality tenants. We handle advertising, viewings, referencing, and contract management to minimise void periods.',
    features: ['Multi-platform advertising', 'Credit & reference checks', 'Employment verification', 'Contract preparation'],
    color: 'bg-green-500',
  },
  {
    number: '03',
    icon: Home,
    title: 'Room by Room Management',
    description: 'Each room is managed individually with dedicated attention. We handle all tenant communications, maintenance requests, and ensure harmonious co-living.',
    features: ['Individual tenancy management', '24/7 tenant support', 'Conflict resolution', 'Maintenance coordination'],
    color: 'bg-purple-500',
  },
  {
    number: '04',
    icon: BarChart3,
    title: 'Monthly Income Reporting & Protection',
    description: 'Receive detailed monthly statements with full transparency. We guarantee rent collection and protect your investment with proactive property care.',
    features: ['Detailed monthly reports', 'Rent guarantee options', 'Portfolio analytics', 'Investment protection'],
    color: 'bg-gold-500',
  },
]

export function ProcessSection() {
  return (
    <section id="process" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading">
            How We Put <span className="text-gold-600">More Money</span> in Your Pocket
          </h2>
          <p className="section-subheading mx-auto">
            Our proven 4-step process transforms your HMO from a headache into a hands-off investment.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              {/* Step Number */}
              <div className="absolute -top-4 left-8">
                <span className={`inline-flex items-center justify-center w-10 h-10 ${step.color} text-white font-bold rounded-full text-sm shadow-lg`}>
                  {step.number}
                </span>
              </div>

              <div className="pt-4">
                {/* Icon & Title */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-14 h-14 bg-navy-900/5 rounded-xl flex items-center justify-center">
                    <step.icon className="w-7 h-7 text-navy-900" />
                  </div>
                  <h3 className="text-xl font-semibold text-navy-900">
                    {step.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-charcoal-600 mb-6 leading-relaxed">
                  {step.description}
                </p>

                {/* Features */}
                <ul className="grid grid-cols-2 gap-2">
                  {step.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2 text-sm text-charcoal-700">
                      <CheckCircle className="w-4 h-4 text-gold-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Connector Arrow (for non-last items) */}
              {index < steps.length - 1 && index % 2 === 0 && (
                <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                  <div className="w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm">
                    <ArrowRight className="w-4 h-4 text-navy-900" />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Button href="#assessment" variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
            Start Your HMO Assessment
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
