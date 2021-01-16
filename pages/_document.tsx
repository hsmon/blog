import Document, { Head, Main, NextScript, Html } from "next/document";

import { getSiteMetaData } from "../functions/getSiteMetaData";

export default class MyDocument extends Document {
  render() {
    const siteMetadata = getSiteMetaData();

    return (
      <Html lang={siteMetadata.language}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}