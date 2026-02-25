'use client'

import { motion } from 'framer-motion'
import { 
  FileCheck, 
  Flame, 
  Zap, 
  Building2, 
  Shield, 
  Users,
  ArrowRight
} from 'lucide-react'
import { Button } from '@/components/Button'

const expertiseAreas = [
  {
    icon: FileCheck,
    title: 'HMO Licensing Expertise',
    description: 'We handle every aspect of HMO licensing — applications, renewals, and council correspondence. Stay fully compliant without the paperwork headache.',
    features: ['Mandatory & Additional Licensing', 'Application Management', 'Renewal Tracking'],
  },
  {
    icon: Flame,
    title: 'Fire Safety Compliance',
    description: 'Complete fire safety management including risk assessments, alarm systems, fire doors, and emergency lighting. Pass every inspection with confidence.',
    features: ['Fire Risk Assessments', 'Alarm & Detection Systems', 'Emergency Lighting'],
  },
  {
    icon: Zap,
    title: 'EICR & Gas Safety',
    description: 'We coordinate all electrical and gas safety inspections, ensuring certificates are always valid and landlord legal obligations are met.',
    features: ['Annual Gas Safety Checks', 'EICR Coordination', 'Certificate Management'],
  },
  {
    icon: Building2,
    title: 'Council Liaison',
    description: 'Direct communication with Gloucestershire councils on your behalf. We handle inspections, queries, and enforcement matters professionally.',
    features: ['Inspection Preparation', 'Direct Council Contact', 'Issue Resolution'],
  },
  {
    icon: Shield,
    title: 'Legal Compliance',
    description: 'Stay ahead of changing regulations including the Renters Reform Bill, deposit protection, and Right to Rent checks.',
    features: ['Deposit Protection', 'Right to Rent Checks', 'Regulatory Updates'],
  },
  {
    icon: Users,
    title: 'Single Let Management',
    description: 'Not just HMOs — we provide the same expert-level management for traditional single let properties across Gloucestershire.',
    features: ['Full Property Management', 'Tenant Sourcing', 'Rent Collection'],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export function AuthoritySection() {
  return (
    <section id="expertise" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-gold-600 font-semibold text-sm uppercase tracking-wider mb-4">
            Why Landlords Choose Us
          </span>
          <h2 className="section-heading">
            Complete Property Management{' '}
            <span className="text-gold-600">Expertise</span>
          </h2>
          <p className="section-subheading mx-auto">
            From HMO compliance to single let management, we handle every aspect of your property investment with specialist knowledge.
          </p>
        </motion.div>

        {/* Expertise Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {expertiseAreas.map((area, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative bg-accent rounded-2xl p-8 hover:bg-navy-900 transition-all duration-500"
            >
              {/* Icon */}
              <div className="w-14 h-14 bg-gold-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gold-500 transition-colors duration-500">
                <area.icon className="w-7 h-7 text-gold-600 group-hover:text-navy-900 transition-colors duration-500" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-navy-900 group-hover:text-white mb-3 transition-colors duration-500">
                {area.title}
              </h3>
              <p className="text-charcoal-600 group-hover:text-gray-300 mb-6 transition-colors duration-500 leading-relaxed">
                {area.description}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {area.features.map((feature, featureIndex) => (
                  <li 
                    key={featureIndex}
                    className="flex items-center space-x-2 text-sm text-charcoal-500 group-hover:text-gray-400 transition-colors duration-500"
                  >
                    <div className="w-1.5 h-1.5 bg-gold-500 rounded-full" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button href="#assessment" variant="primary" icon={<ArrowRight className="w-5 h-5" />}>
            Get Your Free Property Assessment
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
