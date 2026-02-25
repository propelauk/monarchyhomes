'use client'

import { motion } from 'framer-motion'
import { Phone, Clock } from 'lucide-react'

export function TrustBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.5, duration: 0.5 }}
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
    >
      <div className="bg-navy-900 text-white rounded-l-2xl shadow-2xl p-4 border-l-4 border-gold-500">
        <div className="flex items-center space-x-2 mb-2">
          <Clock className="w-5 h-5 text-gold-500" />
          <span className="text-sm font-bold">24/7</span>
        </div>
        <p className="text-xs text-gray-400 leading-tight">
          Emergency<br />Support
        </p>
        <div className="mt-3 pt-3 border-t border-white/20">
          <a 
            href="tel:01452452308" 
            className="flex items-center space-x-2 text-gold-500 hover:text-gold-400 transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span className="text-xs font-medium">Call Now</span>
          </a>
        </div>
      </div>
    </motion.div>
  )
}
