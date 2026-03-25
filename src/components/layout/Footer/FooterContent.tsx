import { cn } from '@/lib/utils'
import {
  LayoutDocumentData,
  SettingsDocumentData,
} from '../../../../prismicio-types'
import Section from '../Section'
import { SliceZone } from '@prismicio/react'
import { components } from '@/slices'
// import Copyright from './Copyright'
import { PrismicNextLink } from '@prismicio/next'
import { CopyrightIcon } from 'lucide-react'
import Copyright from './Copyright'
import React from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  Facebook01FreeIcons,
  InstagramIcon,
  Linkedin01Icon,
  TiktokIcon,
  YoutubeIcon,
} from '@hugeicons/core-free-icons'
import { isFilled } from '@prismicio/client'
import { Button } from '@/components/ui/button'

type FooterContentProps = {
  data: LayoutDocumentData
  settings: SettingsDocumentData
}
const FooterContent = ({
  data,
  settings,
}: FooterContentProps): React.JSX.Element => {
  const { privacy_link, copyright, social_media } = data
  return (
    <Section as="footer" className="mt-auto bg-muted">
      <SliceZone components={components} slices={data.slices1} />
      {isFilled.group(social_media) && (
        <div className="flex justify-center gap-4">
          {social_media.map((platform, i) => {
            if (platform.platform === 'LinkedIn') {
              return (
                <Button asChild key={`platform-${platform.platform}-${i}`}>
                  <PrismicNextLink field={platform.link}>
                    <HugeiconsIcon icon={Linkedin01Icon} className="size-8" />
                    {platform.link.text && (
                      <span className="sr-only">{platform.link.text}</span>
                    )}
                  </PrismicNextLink>
                </Button>
              )
            } else if (platform.platform === 'Facebook') {
              return (
                <Button asChild key={`platform-${platform.platform}-${i}`}>
                  <PrismicNextLink field={platform.link}>
                    <HugeiconsIcon
                      icon={Facebook01FreeIcons}
                      className="size-8"
                    />
                    {platform.link.text && (
                      <span className="sr-only">{platform.link.text}</span>
                    )}
                  </PrismicNextLink>
                </Button>
              )
            } else if (platform.platform === 'Instagram') {
              return (
                <Button asChild key={`platform-${platform.platform}-${i}`}>
                  <PrismicNextLink field={platform.link}>
                    <HugeiconsIcon icon={InstagramIcon} className="size-8" />
                    {platform.link.text && (
                      <span className="sr-only">{platform.link.text}</span>
                    )}
                  </PrismicNextLink>
                </Button>
              )
            } else if (platform.platform === 'TikTok') {
              return (
                <Button asChild key={`platform-${platform.platform}-${i}`}>
                  <PrismicNextLink field={platform.link}>
                    <HugeiconsIcon icon={TiktokIcon} className="size-8" />
                    {platform.link.text && (
                      <span className="sr-only">{platform.link.text}</span>
                    )}
                  </PrismicNextLink>
                </Button>
              )
            } else {
              return (
                <Button asChild key={`platform-${platform.platform}-${i}`}>
                  <PrismicNextLink field={platform.link}>
                    <HugeiconsIcon icon={YoutubeIcon} className="size-8" />
                    {platform.link.text && (
                      <span className="sr-only">{platform.link.text}</span>
                    )}
                  </PrismicNextLink>
                </Button>
              )
            }
          })}
        </div>
      )}
      <div className="my-4 text-center lg:my-8">
        <PrismicNextLink field={privacy_link}>
          {privacy_link.text ? privacy_link.text : 'Missing Privacy Link Text'}
        </PrismicNextLink>
      </div>
      <div className="text-center text-xs lg:text-sm">
        {copyright} <CopyrightIcon className="inline w-3 pb-1" /> <Copyright />{' '}
        {settings.site_title}
      </div>
    </Section>
  )
}

export default FooterContent
