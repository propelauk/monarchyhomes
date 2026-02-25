'use client'

import { motion } from 'framer-motion'
import { 
  FileWarning, 
  DoorOpen, 
  Users, 
  ClipboardCheck, 
  Flame, 
  Wrench,
  ArrowRight
} from 'lucide-react'
import { Button } from '@/components/Button'

const painPoints = [
  {
    icon: FileWarning,
    title: 'Licensing Stress',
    description: 'Complex HMO licensing requirements and council applications overwhelming you.',
  },
  {
    icon: DoorOpen,
    title: 'Room Voids',
    description: 'Empty rooms eating into your profits month after month.',
  },
  {
    icon: Users,
    title: 'Tenant Disputes',
    description: 'Managing conflicts between tenants taking up your time and energy.',
  },
  {
    icon: ClipboardCheck,
    title: 'Council Inspections',
    description: 'Anxiety about upcoming inspections and compliance requirements.',
  },
  {
    icon: Flame,
    title: 'Fire Safety Compliance',
    description: 'Keeping up with fire regulations and safety certificates.',
  },
  {
    icon: Wrench,
    title: 'Maintenance Calls',
    description: 'Never-ending repair requests disrupting your daily life.',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
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

export function PainSection() {
  return (
    <section className="py-20 md:py-28 bg-accent">
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
            Running an HMO Shouldn&apos;t Feel Like{' '}
            <span className="text-gold-600">Fighting Fires Daily.</span>
          </h2>
          <p className="section-subheading mx-auto">
            We understand the challenges HMO landlords face. These common issues drain your time, energy, and profits.
          </p>
        </motion.div>

        {/* Pain Points Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                  <point.icon className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-navy-900 mb-1">
                    {point.title}
                  </h3>
                  <p className="text-charcoal-600 text-sm leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Solution Teaser */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center space-x-3 px-6 py-3 bg-navy-900 rounded-full">
            <span className="text-gold-500 font-semibold text-lg">We Handle It All.</span>
            <ArrowRight className="w-5 h-5 text-gold-500" />
          </div>
          <div className="mt-8">
            <Button href="#process" variant="secondary" size="lg">
              See How We Help
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
