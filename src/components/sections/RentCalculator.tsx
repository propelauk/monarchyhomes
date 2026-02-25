'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calculator, TrendingUp, PoundSterling, Home, ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from '@/components/Button'
import { trackEvent } from '@/components/Analytics'

export function RentCalculator() {
  const [propertyType, setPropertyType] = useState<'hmo' | 'single'>('hmo')
  const [rooms, setRooms] = useState(5)
  const [currentRent, setCurrentRent] = useState(2000)
  const [calculated, setCalculated] = useState(false)

  // HMO average room rates in Gloucestershire
  const avgRoomRent = 550
  const occupancyBoost = 0.97 // 97% vs typical 85%
  const typicalOccupancy = 0.85
  const managementFeePercent = 0.12

  // Single let calculations
  const singleLetBoost = 1.08 // 8% above market average

  const calculatePotential = () => {
    if (propertyType === 'hmo') {
      const potentialGross = rooms * avgRoomRent * 12
      const withOurOccupancy = potentialGross * occupancyBoost
      const theirCurrentYearly = currentRent * 12 * typicalOccupancy
      const difference = withOurOccupancy - theirCurrentYearly
      const afterFees = withOurOccupancy * (1 - managementFeePercent)
      
      return {
        currentYearly: Math.round(theirCurrentYearly),
        potentialYearly: Math.round(withOurOccupancy),
        afterFees: Math.round(afterFees),
        increase: Math.round(difference),
        increasePercent: Math.round((difference / theirCurrentYearly) * 100),
      }
    } else {
      const potentialMonthly = currentRent * singleLetBoost
      const potentialYearly = potentialMonthly * 12
      const currentYearly = currentRent * 12 * typicalOccupancy
      const afterFees = potentialYearly * (1 - 0.10) // 10% for single lets
      
      return {
        currentYearly: Math.round(currentYearly),
        potentialYearly: Math.round(potentialYearly),
        afterFees: Math.round(afterFees),
        increase: Math.round(potentialYearly - currentYearly),
        increasePercent: Math.round(((potentialYearly - currentYearly) / currentYearly) * 100),
      }
    }
  }

  const results = calculatePotential()

  const handleCalculate = () => {
    setCalculated(true)
    trackEvent('calculator_used', { 
      propertyType, 
      rooms, 
      currentRent,
      potentialIncrease: results.increase 
    })
  }

  return (
    <section id="calculator" className="py-20 md:py-28 bg-navy-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Calculator */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gold-500/20 rounded-xl flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-gold-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-navy-900">Income Calculator</h3>
                  <p className="text-sm text-charcoal-500">See your potential earnings</p>
                </div>
              </div>

              {/* Property Type Toggle */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-charcoal-700 mb-2">
                  Property Type
                </label>
                <div className="flex rounded-lg border border-gray-200 p-1">
                  <button
                    onClick={() => setPropertyType('hmo')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                      propertyType === 'hmo'
                        ? 'bg-navy-900 text-white'
                        : 'text-charcoal-600 hover:bg-gray-50'
                    }`}
                  >
                    HMO
                  </button>
                  <button
                    onClick={() => setPropertyType('single')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                      propertyType === 'single'
                        ? 'bg-navy-900 text-white'
                        : 'text-charcoal-600 hover:bg-gray-50'
                    }`}
                  >
                    Single Let
                  </button>
                </div>
              </div>

              {/* Rooms Slider (HMO only) */}
              {propertyType === 'hmo' && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-charcoal-700 mb-2">
                    Number of Lettable Rooms: <span className="text-gold-600 font-bold">{rooms}</span>
                  </label>
                  <input
                    type="range"
                    min="3"
                    max="12"
                    value={rooms}
                    onChange={(e) => setRooms(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gold-500"
                  />
                  <div className="flex justify-between text-xs text-charcoal-400 mt-1">
                    <span>3 rooms</span>
                    <span>12 rooms</span>
                  </div>
                </div>
              )}

              {/* Current Monthly Rent */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-charcoal-700 mb-2">
                  Current Monthly {propertyType === 'hmo' ? 'Total' : ''} Rent (£)
                </label>
                <div className="relative">
                  <PoundSterling className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-400" />
                  <input
                    type="number"
                    value={currentRent}
                    onChange={(e) => setCurrentRent(parseInt(e.target.value) || 0)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    placeholder="2000"
                  />
                </div>
              </div>

              {/* Calculate Button */}
              <button
                onClick={handleCalculate}
                className="w-full btn-primary mb-4"
              >
                Calculate My Potential Income
              </button>

              {/* Results */}
              {calculated && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 pt-6 border-t border-gray-200"
                >
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-red-50 rounded-xl p-4 text-center">
                      <p className="text-xs text-red-600 mb-1">Current (Est.)</p>
                      <p className="text-xl font-bold text-red-700">
                        £{results.currentYearly.toLocaleString()}/yr
                      </p>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4 text-center">
                      <p className="text-xs text-green-600 mb-1">With Us</p>
                      <p className="text-xl font-bold text-green-700">
                        £{results.afterFees.toLocaleString()}/yr
                      </p>
                    </div>
                  </div>
                  <div className="bg-gold-50 rounded-xl p-4 text-center">
                    <p className="text-sm text-gold-700 mb-1">Potential Annual Increase</p>
                    <p className="text-3xl font-bold text-gold-600">
                      +£{(results.afterFees - results.currentYearly).toLocaleString()}
                    </p>
                    <p className="text-xs text-gold-600 mt-1">After management fees</p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="inline-block text-gold-500 font-semibold text-sm uppercase tracking-wider mb-4">
              Maximise Your Returns
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
              See What Your Property{' '}
              <span className="text-gold-500">Could Earn</span>
            </h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Our landlords typically see 15-25% higher returns through optimised occupancy, efficient rent collection, and professional tenant management.
            </p>

            <ul className="space-y-4 mb-8">
              {[
                '97% average occupancy rate vs 85% industry standard',
                '99.2% rent collection through robust processes',
                'Premium rents through quality property presentation',
                'Reduced void periods with rapid tenant matching',
              ].map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>

            <Button 
              href="#assessment" 
              variant="primary" 
              icon={<ArrowRight className="w-5 h-5" />}
            >
              Get Your Personalised Assessment
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
