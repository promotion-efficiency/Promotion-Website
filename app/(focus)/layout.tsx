import ContactChrome from '@/components/contact/ContactChrome'

export default function FocusLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ContactChrome />
      <main className="min-h-screen">{children}</main>
    </>
  )
}
