import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Calendar, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const posts = [
  {
    title: 'HMO Licensing Changes for 2026: What Gloucestershire Landlords Need to Know',
    excerpt: 'New regulations are coming into effect this year. Here&apos;s what you need to prepare for.',
    date: '2026-02-20',
    category: 'Compliance',
    slug: '#',
  },
  {
    title: '5 Common Mistakes HMO Landlords Make (And How to Avoid Them)',
    excerpt: 'Learn from the most frequent errors we see and protect your investment.',
    date: '2026-02-15',
    category: 'Tips',
    slug: '#',
  },
  {
    title: 'Fire Safety Regulations: A Complete Guide for HMO Properties',
    excerpt: 'Everything you need to know about keeping your HMO fire-safe and compliant.',
    date: '2026-02-10',
    category: 'Safety',
    slug: '#',
  },
  {
    title: 'How to Reduce Void Periods in Your Rental Property',
    excerpt: 'Practical strategies to keep your property occupied and your income flowing.',
    date: '2026-02-05',
    category: 'Management',
    slug: '#',
  },
  {
    title: 'Understanding Your Obligations Under the Renters Reform Bill',
    excerpt: 'Key changes landlords need to be aware of as new legislation takes effect.',
    date: '2026-01-28',
    category: 'Legal',
    slug: '#',
  },
  {
    title: 'Energy Efficiency Requirements for Rental Properties in 2026',
    excerpt: 'EPC requirements and how to improve your property&apos;s energy rating cost-effectively.',
    date: '2026-01-20',
    category: 'Compliance',
    slug: '#',
  },
]

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-navy-900 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                Landlord Blog & News
              </h1>
              <p className="text-xl text-gray-300">
                Expert insights, compliance updates, and practical tips for Gloucestershire landlords.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <article key={index} className="bg-accent rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-navy-900/10" />
                  <div className="p-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-xs font-medium text-gold-600 bg-gold-100 px-2 py-1 rounded">
                        {post.category}
                      </span>
                      <span className="flex items-center text-xs text-charcoal-500">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(post.date).toLocaleDateString('en-GB', { 
                          day: 'numeric', 
                          month: 'short', 
                          year: 'numeric' 
                        })}
                      </span>
                    </div>
                    <h2 className="text-lg font-semibold text-navy-900 mb-2 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-charcoal-600 text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <Link 
                      href={post.slug} 
                      className="text-gold-600 font-medium text-sm flex items-center hover:text-gold-700"
                    >
                      Read More <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-20 bg-navy-900">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-serif font-bold text-white mb-6">
              Stay Updated
            </h2>
            <p className="text-gray-400 mb-8">
              Get the latest landlord news and compliance updates delivered to your inbox.
            </p>
            <Link href="/#resources" className="btn-primary">
              Subscribe to Updates
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
