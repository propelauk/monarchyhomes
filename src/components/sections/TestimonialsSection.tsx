'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Quote, MapPin } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'James Harrison',
    role: 'HMO Portfolio Owner',
    location: 'Gloucester',
    image: null,
    rating: 5,
    quote: "Monarchy Homes transformed my 3 HMOs from constant headaches into passive income. Occupancy went from 78% to 97% in the first quarter. Their compliance expertise saved me thousands in potential fines.",
    properties: '3 HMOs, 18 Rooms',
    beforeAfter: { before: '78% Occupancy', after: '97% Occupancy' },
  },
  {
    id: 2,
    name: 'Sarah Mitchell',
    role: 'First-Time HMO Landlord',
    location: 'Cheltenham',
    image: null,
    rating: 5,
    quote: "I was terrified of HMO regulations when I converted my property. Monarchy Homes handled everything — licensing, fire safety, tenant sourcing. Now I earn £800 more per month than if I'd done a single let.",
    properties: '1 HMO, 5 Rooms',
    beforeAfter: { before: 'Unlicensed', after: 'Fully Licensed' },
  },
  {
    id: 3,
    name: 'Robert Chen',
    role: 'Property Investor',
    location: 'Stroud',
    image: null,
    rating: 5,
    quote: "After 2 terrible experiences with other agents, I switched to Monarchy Homes. Night and day difference. They actually understand HMO management. My rent collection went from 85% to 99.5%.",
    properties: '5 Properties Mixed Portfolio',
    beforeAfter: { before: '85% Rent Collection', after: '99.5% Rent Collection' },
  },
  {
    id: 4,
    name: 'Emma Thompson',
    role: 'Accidental Landlord',
    location: 'Tewkesbury',
    image: null,
    rating: 5,
    quote: "I inherited a property and had no idea what to do. Monarchy Homes assessed it, helped with licensing, found great tenants, and now I receive income reports every month. Completely hands-off for me.",
    properties: '1 Single Let',
    beforeAfter: { before: 'Vacant Property', after: '100% Occupied' },
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const current = testimonials[currentIndex]

  return (
    <section className="py-20 md:py-28 bg-accent overflow-hidden">
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
            Landlord Success Stories
          </span>
          <h2 className="section-heading">
            Real Results From{' '}
            <span className="text-gold-600">Gloucestershire Landlords</span>
          </h2>
          <p className="section-subheading mx-auto">
            See how property owners across the county have transformed their investments with our management.
          </p>
        </motion.div>

        {/* Testimonial Card */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
            >
              {/* Quote Icon */}
              <Quote className="w-12 h-12 text-gold-500/30 mb-6" />

              {/* Stars */}
              <div className="flex space-x-1 mb-6">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gold-500 text-gold-500" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-xl md:text-2xl text-navy-900 font-medium leading-relaxed mb-8">
                "{current.quote}"
              </blockquote>

              {/* Before/After */}
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="bg-red-50 text-red-700 px-4 py-2 rounded-full text-sm font-medium">
                  Before: {current.beforeAfter.before}
                </div>
                <div className="bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                  After: {current.beforeAfter.after}
                </div>
              </div>

              {/* Author */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-navy-900 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {current.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-navy-900">{current.name}</p>
                    <p className="text-sm text-charcoal-500">{current.role}</p>
                    <p className="flex items-center text-sm text-charcoal-400">
                      <MapPin className="w-3 h-3 mr-1" />
                      {current.location}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-charcoal-500">Portfolio</p>
                  <p className="font-semibold text-navy-900">{current.properties}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-navy-900 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Dots */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex ? 'bg-gold-500 w-8' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-navy-900 hover:text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
