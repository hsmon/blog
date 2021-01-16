import Head from "next/head"

import { getSiteMetaData } from "../functions/getSiteMetaData"

export function SEO({
  title = "",
  description = "",
  image = "/favicon.svg",
  type = "website",
}) {
  const siteMetadata = getSiteMetaData()

  const metaDescription = description || siteMetadata.description

  return (
    <Head>
      <title>
        {title} | {siteMetadata.title}
      </title>
      <meta name="description" content={metaDescription} />
      <meta property="og:type" content={type} />
      <meta name="og:title" property="og:title" content={title} />
      <meta
        name="og:description"
        property="og:description"
        content={metaDescription}
      />
      <meta
        property="og:url"
        content={
          typeof location !== "undefined" ? location.href : siteMetadata.siteUrl
        }
      />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:creator" content={siteMetadata.social.twitter} />
      <link rel="icon" type="image/png" href="/favicon.svg" />
      <link rel="apple-touch-icon" href="/favicon.svg" />
    </Head>
  )
}
