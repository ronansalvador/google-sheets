import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'API Google Sheets',
  description: 'integração Nextjs e Google Sheets',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Header />
        <main className="flex flex-grow flex-col items-center justify-center p-4 md:p-24">
          {children}
        </main>
      </body>
    </html>
  )
}
