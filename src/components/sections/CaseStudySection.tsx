'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Quote, Star } from 'lucide-react'

const caseStudies = [
  {
    title: '6-Bed HMO in Cheltenham',
    location: 'Cheltenham, GL50',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    before: {
      occupancy: '67%',
      issues: ['2 rooms vacant', 'Irregular rent payments', 'Multiple compliance issues'],
    },
    after: {
      occupancy: '100%',
      improvements: ['Full occupancy achieved', 'Rent collected on time', 'HMO license secured'],
    },
    monthlyIncrease: '£1,200',
    timeframe: '3 months',
  },
  {
    title: '4-Bed Professional HMO',
    location: 'Gloucester, GL1',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    before: {
      occupancy: '75%',
      issues: ['High tenant turnover', 'Fire safety concerns', 'Poor tenant quality'],
    },
    after: {
      occupancy: '100%',
      improvements: ['6+ month average tenancy', 'Full compliance achieved', 'Professional tenants only'],
    },
    monthlyIncrease: '£800',
    timeframe: '2 months',
  },
]

const testimonials = [
  {
    quote: "Monarchy Homes transformed my HMO. I went from constant stress to completely hands-off income. The team handles everything professionally.",
    name: 'James Thompson',
    role: 'HMO Landlord, Cheltenham',
    rating: 5,
  },
  {
    quote: "The compliance support alone was worth it. They sorted my licensing, fire safety, and now I have peace of mind that everything is council-approved.",
    name: 'Sarah Mitchell',
    role: 'Property Investor, Gloucester',
    rating: 5,
  },
]

export function CaseStudySection() {
  return (
    <section id="case-studies" className="py-20 md:py-28 bg-accent">
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
            Success Stories From <span className="text-gold-600">HMO Landlords</span>
          </h2>
          <p className="section-subheading mx-auto">
            Real results from real landlords who trusted us with their HMO properties.
          </p>
        </motion.div>

        {/* Case Studies */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              {/* Image */}
              <div 
                className="h-48 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${study.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6">
                  <h3 className="text-xl font-semibold text-white">{study.title}</h3>
                  <p className="text-gray-300 text-sm">{study.location}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Before/After Comparison */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {/* Before */}
                  <div className="bg-red-50 rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <TrendingDown className="w-5 h-5 text-red-500" />
                      <span className="font-semibold text-red-700">Before</span>
                    </div>
                    <p className="text-2xl font-bold text-red-600 mb-2">{study.before.occupancy}</p>
                    <ul className="space-y-1">
                      {study.before.issues.map((issue, i) => (
                        <li key={i} className="text-xs text-red-600">• {issue}</li>
                      ))}
                    </ul>
                  </div>

                  {/* After */}
                  <div className="bg-green-50 rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                      <span className="font-semibold text-green-700">After</span>
                    </div>
                    <p className="text-2xl font-bold text-green-600 mb-2">{study.after.occupancy}</p>
                    <ul className="space-y-1">
                      {study.after.improvements.map((improvement, i) => (
                        <li key={i} className="text-xs text-green-600">✓ {improvement}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Results */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-sm text-charcoal-600">Monthly Income Increase</p>
                    <p className="text-xl font-bold text-gold-600">{study.monthlyIncrease}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-charcoal-600">Achieved In</p>
                    <p className="text-xl font-bold text-navy-900">{study.timeframe}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-md border border-gray-100"
            >
              <Quote className="w-10 h-10 text-gold-500 mb-4" />
              <p className="text-charcoal-700 mb-6 leading-relaxed italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-navy-900">{testimonial.name}</p>
                  <p className="text-sm text-charcoal-500">{testimonial.role}</p>
                </div>
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-gold-500 fill-gold-500" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
