import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link rel="icon" href="/music.png" />
                    <meta
                        name="description"
                        content="Discover the perfect tune with AI."
                    />
                    <meta property="og:site_name" content="sprucify.me" />
                    <meta
                        property="og:description"
                        content="Discover the perfect tune with AI."
                    />
                    <meta property="og:title" content="Djenie.vercel.app" />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content="Djenie.vercel.app" />
                    <meta
                        name="twitter:description"
                        content="Discover the perfect tune with AI."
                    />
                    <meta
                        property="og:image"
                        content="/sprucify-banner.png"
                    />
                    <meta
                        name="twitter:image"
                        content="/sprucify-banner.png"
                    />
                </Head>
                <body className="overscroll-none">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
