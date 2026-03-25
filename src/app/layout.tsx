import type { Metadata } from 'next'
import './globals.css'
import { createClient, repositoryName } from '@/prismicio'
import Header from '@/components/layout/Header/Header'
import { cn } from '@/lib/utils'
import Footer from '@/components/layout/Footer/Footer'
import { Outfit, Inter } from 'next/font/google'
import { PrismicPreview } from '@prismicio/next'
import { ThemeProvider } from '@/components/ThemeProvider'
import Analytics from '@/components/Analytics'
import { Toaster } from '@/components/ui/sonner'
import PrivacyToast from '@/components/PrivacyToast'

const inter = Inter({subsets:['latin'],variable:'--font-sans'})

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID
  // const fbId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID
  const isProd = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
  const siteUrl = isProd ? 'https://www.celestebuckelew.com' : ''
  const client = createClient()
  const settings = await client.getSingle('settings')
  return (
    <html
      lang="en"
      className={cn( 'scroll-smooth', "font-sans", inter.variable)}
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
          <PrivacyToast message={settings.data.privacy_toast_message} />
          <Toaster richColors closeButton />
          <PrismicPreview repositoryName={repositoryName} />
        </ThemeProvider>
        {isProd && <Analytics gaId={gaId} clarityId={clarityId} />}
      </body>
    </html>
  )
}
