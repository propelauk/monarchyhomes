'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, ChevronDown, PhoneCall } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '#services' },
  { name: 'About', href: '#about' },
  { name: 'Case Studies', href: '#case-studies' },
  { name: 'Resources', href: '#resources' },
  { name: 'Contact', href: '#contact' },
]

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-navy-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-gold-500 font-serif font-bold text-lg sm:text-xl">M</span>
              </div>
              <div>
                <span className="text-base sm:text-xl font-serif font-bold text-navy-900">Monarchy Homes</span>
                <p className="text-[10px] sm:text-xs text-charcoal-500 -mt-0.5">HMO Specialists</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-charcoal-700 hover:text-navy-900 font-medium transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="flex items-center space-x-2 text-charcoal-700 hover:text-navy-900 font-medium transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>{SITE_CONFIG.phone}</span>
              </a>
              <Link
                href="#assessment"
                className="btn-primary text-sm px-5 py-2.5"
              >
                Free Assessment
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-charcoal-700 hover:text-navy-900"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-gray-100"
            >
              <div className="px-4 py-4 space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 text-charcoal-700 hover:bg-gray-50 rounded-lg font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
              <div className="pt-4 border-t border-gray-100 space-y-3">
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="flex items-center justify-center space-x-2 px-4 py-3 text-navy-900 font-semibold"
                >
                  <Phone className="w-5 h-5" />
                  <span>{SITE_CONFIG.phone}</span>
                </a>
                <Link
                  href="#assessment"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block btn-primary text-center"
                >
                  Free Assessment
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>

    {/* Mobile Sticky Callback Bar - appears after scrolling */}
    <AnimatePresence>
      {hasScrolled && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-16 left-0 right-0 z-30 lg:hidden bg-gold-500 shadow-md"
        >
          <a
            href={`tel:${SITE_CONFIG.phone}`}
            className="flex items-center justify-center space-x-2 py-2.5 text-navy-900 font-semibold"
          >
            <PhoneCall className="w-4 h-4 animate-pulse" />
            <span className="text-sm">Request a Callback - {SITE_CONFIG.phone}</span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  )
}
