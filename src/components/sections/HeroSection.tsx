'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Phone, CheckCircle } from 'lucide-react'
import { Button } from '@/components/Button'
import { trackEvent } from '@/components/Analytics'

export function HeroSection() {
  const handleAssessmentClick = () => {
    trackEvent('cta_click', { location: 'hero', cta: 'free_assessment' })
  }

  const handleSpecialistClick = () => {
    trackEvent('cta_click', { location: 'hero', cta: 'speak_specialist' })
  }

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Modern HMO interior"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/95 via-navy-900/80 to-navy-900/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="max-w-3xl">
          {/* Local Area Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap gap-2 mb-4"
          >
            {['Gloucester', 'Cheltenham', 'Stroud', 'Tewkesbury'].map((area) => (
              <span key={area} className="text-xs font-medium text-gray-400 bg-white/10 px-3 py-1 rounded-full">
                {area}
              </span>
            ))}
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="inline-flex items-center space-x-2 bg-gold-500/20 border border-gold-500/30 rounded-full px-4 py-2 mb-6"
          >
            <CheckCircle className="w-4 h-4 text-gold-500" />
            <span className="text-gold-500 text-sm font-medium">Gloucestershire&apos;s Trusted HMO & Single Let Specialists</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-6"
          >
            Gloucestershire Landlords,{' '}
            <span className="text-gold-500">Increase Yield.</span>{' '}
            <span className="text-gold-400">Eliminate Risk.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed"
          >
            Expert property management for HMOs and single lets. Full compliance, maximum occupancy, and stable monthly income — we handle everything so you can grow your portfolio.
          </motion.p>

          {/* Key Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4 mb-10"
          >
            {['HMO & Single Let', 'Full Compliance', 'Maximum Occupancy', 'Guaranteed Rent'].map((benefit) => (
              <div key={benefit} className="flex items-center space-x-2 text-gray-300">
                <CheckCircle className="w-5 h-5 text-gold-500" />
                <span>{benefit}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              href="#assessment"
              variant="primary"
              size="lg"
              onClick={handleAssessmentClick}
              icon={<ArrowRight className="w-5 h-5" />}
            >
              Get Free Property Assessment
            </Button>
            <Button
              href="#contact"
              variant="outline"
              size="lg"
              onClick={handleSpecialistClick}
              icon={<Phone className="w-5 h-5" />}
              className="border-white text-white hover:bg-white hover:text-navy-900"
            >
              Speak To A Specialist
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 pt-8 border-t border-white/20"
          >
            <p className="text-sm text-gray-400 mb-4">Trusted by landlords across Gloucestershire</p>
            <div className="flex items-center space-x-8">
              <div>
                <p className="text-3xl font-bold text-white">320+</p>
                <p className="text-sm text-gray-400">Rooms Managed</p>
              </div>
              <div className="h-10 w-px bg-white/20" />
              <div>
                <p className="text-3xl font-bold text-white">97%</p>
                <p className="text-sm text-gray-400">Occupancy Rate</p>
              </div>
              <div className="h-10 w-px bg-white/20" />
              <div>
                <p className="text-3xl font-bold text-white">99.2%</p>
                <p className="text-sm text-gray-400">Rent Collected</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1"
        >
          <div className="w-1.5 h-3 bg-gold-500 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
