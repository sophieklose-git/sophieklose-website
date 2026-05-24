import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en" className="no-js">
            <Head>
                {/* Flip no-js → js before any paint so CSS gates can rely on `html.js`.
                    Used by the fade-in-on-scroll CSS so no-JS users see content immediately. */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(){var h=document.documentElement;h.classList.remove('no-js');h.classList.add('js');})();`
                    }}
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
