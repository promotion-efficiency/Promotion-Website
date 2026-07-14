import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { HeroExpandedModeProvider } from '@/components/home/HeroExpandedMode'
import { WorkListModeProvider } from '@/components/home/WorkListMode'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <WorkListModeProvider>
      <HeroExpandedModeProvider>
        <Header />
        <div className="relative">
          <main className="relative z-10 bg-pe-black">{children}</main>
          <Footer />
        </div>
      </HeroExpandedModeProvider>
    </WorkListModeProvider>
  )
}
