import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'

const footerLinks = {
  services: [
    { name: 'HMO Management', href: '/services/hmo-management' },
    { name: 'Single Let Management', href: '/services/single-let' },
    { name: 'Compliance Services', href: '/services/compliance' },
    { name: 'Tenant Sourcing', href: '/services/tenant-sourcing' },
    { name: 'Licensing Support', href: '/services/licensing' },
  ],
  resources: [
    { name: 'Compliance Checklist', href: '#resources' },
    { name: 'Landlord Guide', href: '/resources/landlord-guide' },
    { name: 'FAQs', href: '/faqs' },
    { name: 'Blog', href: '/blog' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Team', href: '/team' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
  ],
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-navy-900 text-white pb-20 lg:pb-0">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <Image
                src="/logo.png"
                alt="Monarchy Homes Logo"
                width={48}
                height={48}
                className="w-12 h-12"
              />
              <div>
                <span className="text-2xl font-serif font-bold text-white">Monarchy Homes</span>
                <p className="text-sm text-gray-400">Reliability & Trust</p>
              </div>
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm">
              HMO and single let property management across Gloucestershire. We help keep your property compliant and fully let.
            </p>
            <div className="space-y-3">
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="flex items-center space-x-3 text-gray-300 hover:text-gold-500 transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>{SITE_CONFIG.phone}</span>
              </a>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-center space-x-3 text-gray-300 hover:text-gold-500 transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>{SITE_CONFIG.email}</span>
              </a>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="w-5 h-5" />
                <span>{SITE_CONFIG.address}</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-gold-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-gold-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-gold-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              {currentYear} {SITE_CONFIG.name}. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-500 hover:text-gray-400 text-sm transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
