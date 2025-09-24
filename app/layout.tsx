import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        <main className="overflow-y-auto h-screen pt-16 pb-20 bg-yellow-50">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}