import Hero from '@/components/home/Hero'
import Manifesto from '@/components/home/Manifesto'
import ServicesOverview from '@/components/home/ServicesOverview'
import VideoChapter from '@/components/home/VideoChapter'
import StatsSection from '@/components/home/StatsSection'
import WorkRail from '@/components/home/WorkRail'
import ClientMarquee from '@/components/shared/ClientMarquee'
import TestimonialCarousel from '@/components/home/TestimonialCarousel'
import QuoteCTA from '@/components/shared/QuoteCTA'

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <ServicesOverview />
      <VideoChapter />
      <StatsSection />
      <WorkRail />
      <ClientMarquee />
      <TestimonialCarousel />
      <QuoteCTA />
    </>
  )
}
