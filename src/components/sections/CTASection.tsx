'use client'

import { motion } from 'framer-motion'
import { Phone, Calendar, ArrowRight } from 'lucide-react'
import { Button } from '@/components/Button'
import { trackEvent } from '@/components/Analytics'

export function CTASection() {
  const handleBookReview = () => {
    trackEvent('cta_click', { location: 'cta_section', cta: 'book_review' })
  }

  const handleCallback = () => {
    trackEvent('cta_click', { location: 'cta_section', cta: 'request_callback' })
  }

  return (
    <section id="contact" className="py-20 md:py-28 bg-navy-900 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Icon */}
          <div className="w-16 h-16 bg-gold-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Calendar className="w-8 h-8 text-navy-900" />
          </div>

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-6">
            Let&apos;s Review Your Property.
          </h2>

          {/* Description */}
          <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
            Book a free, no-obligation consultation. We&apos;ll assess your HMO or single let, identify opportunities to maximise income, and ensure full compliance.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href="#assessment"
              variant="primary"
              size="lg"
              onClick={handleBookReview}
              icon={<ArrowRight className="w-5 h-5" />}
            >
              Book Your Free Income & Compliance Review
            </Button>
            <Button
              href="tel:01452452308"
              variant="outline"
              size="lg"
              onClick={handleCallback}
              icon={<Phone className="w-5 h-5" />}
              className="border-white text-white hover:bg-white hover:text-navy-900"
            >
              Call Me Back
            </Button>
          </div>

          {/* Trust Text */}
          <p className="mt-8 text-sm text-gray-500">
            No commitment required • Response within 24 hours • Local Gloucestershire experts
          </p>
        </motion.div>
      </div>
    </section>
  )
}
