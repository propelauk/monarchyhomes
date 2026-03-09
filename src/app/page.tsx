import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { HeroSection } from '@/components/sections/HeroSection'
import { PainSection } from '@/components/sections/PainSection'
import { AuthoritySection } from '@/components/sections/AuthoritySection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { CTASection } from '@/components/sections/CTASection'
import { LeadMagnetSection } from '@/components/sections/LeadMagnetSection'
import { AssessmentForm } from '@/components/sections/AssessmentFormSimple'

export default function HomePage() {
  return (
    <>
      <Header />
      
      <main>
        {/* 1. Hero Section */}
        <HeroSection />
        
        {/* 2. Pain Section */}
        <PainSection />
        
        {/* 3. Why Choose Us Section */}
        <AuthoritySection />
        
        {/* 4. Our Process */}
        <ProcessSection />
        
        {/* 5. Assessment Form */}
        <AssessmentForm />
        
        {/* 6. Call-to-Action Section */}
        <CTASection />
        
        {/* 7. Free Resource Download */}
        <LeadMagnetSection />
      </main>
      
      <Footer />
    </>
  )
}
