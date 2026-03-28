import { FC } from 'react'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { PrismicRichText } from '@/components/typography/PrismicRichText'
import Heading from '@/components/typography/Heading'

/**
 * Props for `Experience`.
 */
export type ExperienceProps = SliceComponentProps<Content.ExperienceSlice>

/**
 * Component for "Experience" Slices.
 */
const Experience: FC<ExperienceProps> = ({ slice }) => {
  const { heading } = slice.primary

  const animation = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="container mx-auto max-w-5xl px-6 py-4"
    >
      <div className="pb-6 lg:pb-12">
        <PrismicRichText field={heading} />
      </div>

      <div className="timeline">
        {slice.primary.experiences.map((item, index) => (
          <div
            key={index}
            className="timeline-item group rounded-md p-4 ring-primary/50 transition duration-300 ease-in-out hover:ring-2"
          >
            <div className="mb-4 flex flex-col items-center justify-center gap-4 lg:flex-row lg:justify-between">
              <Heading as="h3" size="3xl">
                {item.title}
              </Heading>
              <div className="shrink-0 text-muted-foreground">{item.years}</div>
            </div>
            <p className="mb-4 text-center text-lg font-semibold lg:text-left">
              {item.organization}
            </p>
            <div className="prose dark:prose-invert">
              <PrismicRichText field={item.description} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Experience
