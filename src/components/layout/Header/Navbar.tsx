'use client'
import { cn } from '@/lib/utils'
import {
  ImageField,
  isFilled,
  KeyTextField,
  LinkField,
} from '@prismicio/client'
import Section from '../Section'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import { buttonVariants } from '@/components/ui/button'
import DesktopMenu from './DesktopMenu'
import { LayoutDocumentDataNavigationItem } from '../../../../prismicio-types'
import MobileMenu from './MobileMenu'
import Heading from '@/components/typography/Heading'
import Link from 'next/link'
import { ThemeToggle } from '@/components/ThemeToggle'
import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useState } from 'react'

type NavbarProps = {
  navigation: Array<LayoutDocumentDataNavigationItem>
  cta_link: LinkField
  cta_label: KeyTextField
  logo: ImageField
  site_title: KeyTextField
}

const Navbar = ({
  logo,
  navigation,
  cta_link,
  cta_label = 'Take Action',
  site_title,
}: NavbarProps) => {
  const [hidden, setHidden] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', latest => {
    const previous = scrollY.getPrevious()
    if (previous && latest > previous && latest > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  })
  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: '-100%' },
      }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className={cn(
        'sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 shadow-sm backdrop-blur supports-backdrop-filter:bg-background/70',
      )}
    >
      <Section
        width="xl"
        padded={false}
        className="px-2 py-1 md:px-3 md:py-2 lg:py-3"
      >
        <div className="flex items-center justify-between">
          <Link href="/">
            {isFilled.image(logo) ? (
              <PrismicNextImage
                field={logo}
                imgixParams={{ ar: '1:1', fit: 'crop' }}
                height={60}
                width={60}
              />
            ) : (
              <Heading
                as="h1"
                size="xl"
                className="p-1.5 dark:text-sidebar-primary"
              >
                {site_title}
              </Heading>
            )}
          </Link>
          <div className="flex items-center gap-x-4 lg:gap-x-8">
            {navigation.length > 0 && (
              <>
                <DesktopMenu navigation={navigation} />
                <MobileMenu site_title={site_title} navigation={navigation} />
              </>
            )}

            {isFilled.link(cta_link) && (
              <PrismicNextLink
                field={cta_link}
                className={cn(
                  buttonVariants({ variant: 'default' }),
                  'hidden md:inline-flex',
                )}
              >
                {cta_label}
              </PrismicNextLink>
            )}
            <ThemeToggle />
          </div>
        </div>
      </Section>
    </motion.header>
  )
}

export default Navbar
