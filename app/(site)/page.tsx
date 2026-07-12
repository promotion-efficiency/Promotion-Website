import Hero from '@/components/home/Hero'
import Manifesto from '@/components/home/Manifesto'
import ManifestoReel from '@/components/home/ManifestoReel'
import LatestWork from '@/components/home/LatestWork'
import StudioNews from '@/components/home/StudioNews'
import ServicesOverview from '@/components/home/ServicesOverview'
import StatsSection from '@/components/home/StatsSection'
import ClientMarquee from '@/components/shared/ClientMarquee'
import TestimonialCarousel from '@/components/home/TestimonialCarousel'
import QuoteCTA from '@/components/shared/QuoteCTA'

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <ManifestoReel />
      <LatestWork />
      <StudioNews />
      <ServicesOverview />
      <StatsSection />
      <ClientMarquee />
      <TestimonialCarousel />
      <QuoteCTA />
    </>
  )
}
