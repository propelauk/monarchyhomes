'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Building2, DoorClosed, TrendingUp, Banknote, Shield, Award } from 'lucide-react'
import { STATS } from '@/lib/constants'

const stats = [
  {
    icon: Building2,
    value: STATS.hmosManaged,
    suffix: '+',
    label: 'HMOs Managed',
    description: 'Properties under our care',
  },
  {
    icon: DoorClosed,
    value: STATS.roomsUnderManagement,
    suffix: '+',
    label: 'Rooms Under Management',
    description: 'Individual tenancies managed',
  },
  {
    icon: TrendingUp,
    value: STATS.averageOccupancy,
    suffix: '%',
    label: 'Average Occupancy',
    description: 'Our rooms stay full',
  },
  {
    icon: Banknote,
    value: STATS.rentCollectionRate,
    suffix: '%',
    label: 'Rent Collection Rate',
    description: 'You get paid on time',
  },
]

const certifications = [
  { name: 'ARLA Propertymark', icon: Award },
  { name: 'Council Approved', icon: Shield },
  { name: 'PRS Accredited', icon: Award },
]

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const duration = 2000
      const steps = 60
      const increment = value / steps
      let current = 0
      const timer = setInterval(() => {
        current += increment
        if (current >= value) {
          setCount(value)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)
      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

export function StatsSection() {
  return (
    <section className="py-20 md:py-28 bg-navy-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-6">
            Trusted Property Management Across{' '}
            <span className="text-gold-500">Gloucestershire</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Our track record speaks for itself. We deliver consistent results for HMO and single let landlords.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-colors duration-300"
            >
              <div className="w-14 h-14 bg-gold-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-7 h-7 text-gold-500" />
              </div>
              <p className="text-4xl md:text-5xl font-bold text-white mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-lg font-semibold text-gold-500 mb-1">{stat.label}</p>
              <p className="text-sm text-gray-400">{stat.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-6"
        >
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-5 py-2"
            >
              <cert.icon className="w-5 h-5 text-gold-500" />
              <span className="text-white text-sm font-medium">{cert.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
