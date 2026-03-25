import { FC } from 'react'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import Section from '@/components/layout/Section'
import { PrismicRichText } from '@/components/typography/PrismicRichText'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/**
 * Props for `StickyImage`.
 */
export type StickyImageProps = SliceComponentProps<Content.StickyImageSlice>

/**
 * Component for "StickyImage" Slices.
 */
const StickyImage: FC<StickyImageProps> = ({ slice }) => {
  const { heading, image, content, link } = slice.primary
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      width="xl"
      className="py-6 lg:py-8"
    >
      <div className="relative grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        <div className="order-last grid grid-cols-1 gap-y-8 lg:order-0 lg:col-span-8">
          <div className="text-center lg:text-left">
            <PrismicRichText field={heading} />
          </div>
          <div className="mx-auto prose lg:prose-lg xl:prose-xl 2xl:prose-2xl dark:prose-invert">
            <PrismicRichText field={content} />
          </div>
        </div>

        <div className="order-first grid grid-cols-1 gap-8 lg:sticky lg:top-32 lg:order-0 lg:col-span-4">
          <div className="flex justify-center">
            <PrismicNextImage
              field={image}
              className={cn('max-w-76 rounded-xl object-cover', {
                'scale-x-[-1]': slice.primary.flip_horizontal,
              })}
              fetchPriority="high"
              height={304}
              width={304}
              loading="eager"
              sizes="304px"
              preload={true}
              imgixParams={{
                ar: '1:1',
                fit: 'crop',
                ...(slice.primary.make_black_and_white && { sat: -100 }),
              }}
            />
          </div>
          <div className="flex justify-center">
            <Button asChild variant={link.variant}>
              <PrismicNextLink field={link}>
                {link.text || 'Link Text Needed: Please Add It'}
              </PrismicNextLink>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default StickyImage
