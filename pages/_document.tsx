import { EmotionCache } from "@emotion/cache";
import createEmotionServer from "@emotion/server/create-instance";
import { AppType } from "next/app";
import Document, { Head, Html, Main, NextScript } from "next/document";
import type { DocumentContext, DocumentInitialProps } from "next/document";
import React from "react";

import { createEmotionCache } from "../utils";

type DocumentProps = {
  emotionStyleTags: JSX.Element[];
};

export default class MyDocument extends Document<DocumentProps> {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps & DocumentProps> {
    const originalRenderPage = ctx.renderPage;
    const cache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (
          App: AppType | React.ComponentType<{ emotionCache: EmotionCache }>
        ) =>
          function EnhanceApp(props) {
            return <App emotionCache={cache} {...props} />;
          }
      });

    const initialProps = await Document.getInitialProps(ctx);
    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map(
      (style: { key: string; ids: Array<string>; css: string }) => (
        <style
          data-emotion={`${style.key} ${style.ids.join(" ")}`}
          key={style.key}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: style.css }}
        />
      )
    );

    return {
      ...initialProps,
      emotionStyleTags
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <>
            <meta name="theme-color" content="#121212" />
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap"
            />
            {this.props.emotionStyleTags}
          </>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
