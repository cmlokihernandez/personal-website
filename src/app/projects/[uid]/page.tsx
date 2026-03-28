import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SliceZone } from '@prismicio/react'

import { createClient } from '@/prismicio'
import { components } from '@/slices'
import { asLink, asText } from '@prismicio/client'
import Heading from '@/components/typography/Heading'
import { Graph } from 'schema-dts'
import Script from 'next/script'
import { slugifyHeading } from '@/lib/utils'

type Params = { uid: string }
type SearchParams = {
  [key: string]: string | string[] | undefined
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<Params>
  searchParams: Promise<SearchParams>
}) {
  const client = createClient()
  const { uid } = await params
  const { searchPage } = await searchParams
  const page = await client.getByUID('project', uid).catch(() => notFound())
  const settings = await client.getSingle('settings')
  const pageNumber = { page: searchPage }
  const authorName = settings.data.site_title || 'Christina Hernandez'
  const domain = settings.data.domain || 'example.com'
  const baseUrl = `https://${domain}`
  const sameAsLinks = [asLink(settings.data.linkedin_url)].filter(
    (l): l is string => Boolean(l),
  )
  const jsonLd: Graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#site`,
        name: authorName,
        url: `${baseUrl}`,
        publisher: { '@id': `${baseUrl}/#author` },
      },
      {
        '@type': 'Person',
        '@id': `${baseUrl}/#author`,
        name: authorName,
        url: baseUrl,
        image: settings.data.profile_image?.url || undefined,
        jobTitle: settings.data.job_title || 'Professional Title', // Add this to your Prismic Settings
        // This is huge for SEO regarding skills:
        knowsAbout:
          settings.data.skills_list?.map((s: any) => s.skill_name) || [],
        sameAs: [(sameAsLinks.length > 0 ? sameAsLinks : undefined) as any],
      },
      {
        '@type': 'BlogPosting',
        '@id': `${baseUrl}${page.url}/#post`,
        headline: asText(page.data.title),
        description:
          asText(page.data.excerpt) || page.data.meta_description || undefined,
        mainEntityOfPage: `${baseUrl}${page.url}`,
        datePublished: page.first_publication_date || undefined,
        dateModified: page.last_publication_date || undefined,
        author: {
          '@id': `${baseUrl}/#author`,
        },
        publisher: {
          '@id': `${baseUrl}/#author`,
        },
        image: page.data.meta_image.url || undefined,
        inLanguage: settings.lang,
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
      <Heading
        as="h1"
        size="6xl"
        className="mx-auto my-8 max-w-(--breakpoint-lg) px-2 md:px-6 lg:my-12 lg:text-center"
        id={slugifyHeading({ text: asText(page.data.title) })}
      >
        {asText(page.data.title)}
      </Heading>
      <SliceZone
        slices={page.data.slices}
        components={components}
        context={pageNumber}
      />
    </>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const client = createClient()
  const { uid } = await params
  const page = await client.getByUID('project', uid).catch(() => notFound())
  const settings = await client.getSingle('settings')

  return {
    title: `${asText(page.data.title) || page.data.meta_title} • ${
      settings.data.site_title
    }`,
    description:
      page.data.meta_description || settings.data.site_meta_description,
    openGraph: {
      images: [
        page.data.meta_image.url || settings.data.site_meta_image.url || '',
      ],
    },
    alternates: {
      canonical: `https://${settings.data.domain || `example.com`}${page.url}`,
    },
  }
}

export async function generateStaticParams() {
  const client = createClient()
  const pages = await client.getAllByType('project')

  return pages.map(page => {
    return { uid: page.uid }
  })
}
