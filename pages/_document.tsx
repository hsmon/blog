import Document, { Head, Main, NextScript, Html } from "next/document"
import { existsGaId, GA_TRACKING_ID } from "../lib/gtag"

import { getSiteMetaData } from "../functions/getSiteMetaData"

export default class MyDocument extends Document {
  render() {
    const siteMetadata = getSiteMetaData()

    return (
      <Html lang={siteMetadata.language}>
        <Head>
          {existsGaId && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_TRACKING_ID}', {
                    page_path: window.location.pathname,
                  });`,
                }}
              />
            </>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
