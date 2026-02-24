import type { Metadata } from 'next'
import './globals.css'
import { createClient, repositoryName } from '@/prismicio'
import Header from '@/components/layout/Header/Header'
import { cn } from '@/lib/utils'
import Footer from '@/components/layout/Footer/Footer'
import { Outfit } from 'next/font/google'
import { PrismicPreview } from '@prismicio/next'
import { ThemeProvider } from '@/components/ThemeProvider'

const outfit = Outfit({ subsets: ['latin'], variable: '--font-sans' })

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient()
  const settings = await client.getSingle('settings')
  return {
    metadataBase: new URL(`https://${settings.data.domain || `example.com`}`),
    title: settings.data.site_title || 'Prismic Foundation',
    description:
      settings.data.site_meta_description || `A NextJS + Prismic template`,
    openGraph: {
      images: [settings.data.site_meta_image.url || ''],
    },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn(outfit.variable, 'scroll-smooth')}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://images.prismic.io" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
      </head>
      <body
        className={cn(
          'flex min-h-screen flex-col justify-between bg-background font-sans antialiased',
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <PrismicPreview repositoryName={repositoryName} />
        </ThemeProvider>
      </body>
    </html>
  )
}
