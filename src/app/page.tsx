import { Metadata } from 'next'
import { SliceZone } from '@prismicio/react'

import { createClient } from '@/prismicio'
import { components } from '@/slices'
import { Graph } from 'schema-dts'
import { asLink } from '@prismicio/client'
import Script from 'next/script'

export default async function Page() {
  const client = createClient()
  const page = await client.getSingle('homepage')
  const settings = await client.getSingle('settings')
  const skillsArray: string[] =
    settings.data.skills_list
      ?.map((item: any) => item.skill_name)
      .filter((skill: any): skill is string => !!skill) || []
  const sameAsLinks = [asLink(settings.data.linkedin_url)].filter(
    (l): l is string => Boolean(l),
  )
  const jsonLd: Graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `https://${settings.data.domain}/#author`,
        name: settings.data.site_title || 'Celeste Buckelew',
        jobTitle: settings.data.job_title || 'Professional',
        knowsAbout: skillsArray,
        sameAs: [(sameAsLinks.length > 0 ? sameAsLinks : undefined) as any],
      },
    ],
  }

  return (
    <>
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SliceZone slices={page.data.slices} components={components} />
    </>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient()
  const page = await client.getSingle('homepage')
  const settings = await client.getSingle('settings')

  return {
    title: page.data.meta_title || settings.data.site_title,
    description:
      page.data.meta_description || settings.data.site_meta_description,
    openGraph: {
      images: [
        page.data.meta_image.url || settings.data.site_meta_image.url || '',
      ],
    },
  }
}
