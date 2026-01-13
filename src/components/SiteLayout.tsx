import type { ReactNode } from 'react'
import { Header } from './site/Header'
import { Footer } from './site/Footer'

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

