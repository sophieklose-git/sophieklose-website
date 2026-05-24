import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Cormorant_Garamond, Jost } from 'next/font/google';
import '../css/main.css';

// Self-hosted fonts via next/font. Replaces the render-blocking Google Fonts
// @import in main.css (saved ~760ms first paint per Lighthouse).
// CSS variables are referenced from tailwind.config.js fontFamily.
const cormorant = Cormorant_Garamond({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600'],
    style: ['normal', 'italic'],
    variable: '--font-serif',
    display: 'swap'
});

const jost = Jost({
    subsets: ['latin'],
    weight: ['300', '400', '500'],
    variable: '--font-sans',
    display: 'swap'
});

export default function MyApp({ Component, pageProps }) {
    const router = useRouter();

    // Scroll to top on every client-side route change. Without this, browser scroll
    // restoration can leave the new page scrolled to the position the previous page
    // was at — most visible when clicking footer nav links (footer is at the bottom,
    // so the new page opens scrolled to its bottom).
    useEffect(() => {
        const handleRouteChange = () => window.scrollTo(0, 0);
        router.events.on('routeChangeComplete', handleRouteChange);
        return () => router.events.off('routeChangeComplete', handleRouteChange);
    }, [router.events]);

    // Fade-in-on-scroll: PageLayout wraps non-hero sections in <div class="fade-in">.
    // We watch them with IntersectionObserver and add .visible once they enter the viewport.
    // Re-runs on every client-side route change so newly mounted sections are observed.
    useEffect(() => {
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add('visible');
                        obs.unobserve(e.target);
                    }
                });
            },
            { threshold: 0.12 }
        );
        document.querySelectorAll('.fade-in:not(.visible)').forEach((el) => obs.observe(el));
        return () => obs.disconnect();
    }, [router.asPath]);

    return (
        <div className={`${cormorant.variable} ${jost.variable}`}>
            <Component {...pageProps} />
        </div>
    );
}
