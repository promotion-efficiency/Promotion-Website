import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="relative">
        <main className="relative z-10 bg-pe-black">{children}</main>
        <Footer />
      </div>
    </>
  )
}
