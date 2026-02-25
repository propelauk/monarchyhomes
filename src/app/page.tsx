import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { HeroSection } from '@/components/sections/HeroSection'
import { PainSection } from '@/components/sections/PainSection'
import { AuthoritySection } from '@/components/sections/AuthoritySection'
import { StatsSection } from '@/components/sections/StatsSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { RentCalculator } from '@/components/sections/RentCalculator'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { CaseStudySection } from '@/components/sections/CaseStudySection'
import { CTASection } from '@/components/sections/CTASection'
import { LeadMagnetSection } from '@/components/sections/LeadMagnetSection'
import { AssessmentForm } from '@/components/sections/AssessmentForm'
import { TrustBadge } from '@/components/TrustBadge'

export default function HomePage() {
  return (
    <>
      <Header />
      <TrustBadge />
      
      <main>
        {/* 1. Hero Section */}
        <HeroSection />
        
        {/* 2. Pain Section */}
        <PainSection />
        
        {/* 3. Authority / Expertise Section */}
        <AuthoritySection />
        
        {/* 4. Stats Section */}
        <StatsSection />
        
        {/* 5. 4-Step Management Process */}
        <ProcessSection />
        
        {/* 6. Rent Calculator */}
        <RentCalculator />
        
        {/* 7. Testimonials Carousel */}
        <TestimonialsSection />
        
        {/* 8. Case Study */}
        <CaseStudySection />
        
        {/* 9. Call-to-Action Section */}
        <CTASection />
        
        {/* 10. Assessment Form */}
        <AssessmentForm />
        
        {/* 11. Lead Magnet / Compliance Resource Section */}
        <LeadMagnetSection />
      </main>
      
      <Footer />
    </>
  )
}
