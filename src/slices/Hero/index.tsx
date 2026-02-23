import Section from '@/components/layout/Section'
import Heading from '@/components/typography/Heading'
import { PrismicRichText } from '@/components/typography/PrismicRichText'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Content, isFilled } from '@prismicio/client'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import { SliceComponentProps } from '@prismicio/react'
import React from 'react'

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>

/**
 * Component for "Hero" Slices.
 */

const Hero = ({ slice }: HeroProps): React.JSX.Element => {
  const image = slice.variation !== 'default' && slice.primary.image

  // Variation mapping
  const variation = slice.variation

  const showImage = image && isFilled.image(image)
  const fullHeight = variation !== 'contentHeight'
  const contentCentered = variation === 'default'
  const useFadeOverlay = variation !== 'default'
  const contentBg =
    variation !== 'default'
      ? 'bg-linear-to-tr from-primary/90 to-secondary-foreground/40 backdrop-blur'
      : ''

  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={variation}
      className={cn(
        'relative overflow-hidden',
        fullHeight && 'lg:h-[calc(100vh-64px)] lg:min-h-187.5',
        contentCentered && 'bg-primary',
      )}
    >
      {showImage && (
        <div className="absolute inset-0 -z-10">
          <PrismicNextImage
            field={image}
            fill
            sizes="100vw"
            className={cn(
              'hidden object-cover lg:block',
              // anchor left for portfolio-style crop
              'object-left',
            )}
            fetchPriority="high"
          />

          {useFadeOverlay && (
            <div className="absolute inset-0 bg-linear-to-r from-primary/0 via-primary/40 to-primary" />
          )}
        </div>
      )}

      <div
        className={cn(
          'relative flex h-full justify-center px-6 py-16 lg:justify-end lg:px-12',
          contentCentered
            ? 'flex-col items-center justify-center text-center'
            : 'items-center',
        )}
      >
        <div
          className={cn(
            'w-full rounded-lg p-6 text-left lg:p-12 lg:text-left',
            contentBg,
            contentCentered ? 'mx-auto' : 'text-center lg:text-center',
            {
              'text-center lg:max-w-xl lg:text-center xl:max-w-2xl 2xl:max-w-5xl':
                slice.variation !== 'contentHeight',
            },
          )}
        >
          {isFilled.richText(slice.primary.heading) && (
            <PrismicRichText
              field={slice.primary.heading}
              components={{
                heading2: ({ children }) => (
                  <Heading
                    as="h2"
                    size="6xl"
                    className={cn('text-primary-foreground', {
                      'text-center lg:text-center':
                        slice.variation !== 'withImage',
                    })}
                  >
                    {children}
                  </Heading>
                ),
              }}
            />
          )}

          {isFilled.richText(slice.primary.description) && (
            <PrismicRichText
              field={slice.primary.description}
              components={{
                paragraph: ({ children }) => (
                  <p
                    className={cn(
                      'mt-4 text-left text-lg text-primary-foreground lg:text-left',
                      {
                        'text-center lg:text-center':
                          slice.variation !== 'withImage',
                      },
                    )}
                  >
                    {children}
                  </p>
                ),
              }}
            />
          )}

          {isFilled.link(slice.primary.button_link) && (
            <Button
              variant={slice.primary.button_style || 'default'}
              size="lg"
              className="mt-8"
              asChild
            >
              <PrismicNextLink
                field={slice.primary.button_link}
                className="p-3"
              >
                {slice.primary.button_label}
              </PrismicNextLink>
            </Button>
          )}
        </div>
      </div>
    </Section>
  )
}
export default Hero
