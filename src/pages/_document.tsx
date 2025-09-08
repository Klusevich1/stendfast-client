import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  const isProduction = process.env.NODE_ENV === "production";

  return (
    <Html lang="ru">
      <Head>
        <link rel="preload" href="/styles/fonts.css" as="style" />
        <link rel="stylesheet" href="/styles/fonts.css" />
        {isProduction && (
          <>
            <meta name="yandex-verification" content="8a71da99f472c773" />
          </>
        )}

        {isProduction && (
          <>
            <meta
              name="google-site-verification"
              content="pixrXY-F4P5rROIojTM8avOQJLwfkHRsjbBG827jdSo"
            />
          </>
        )}
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
