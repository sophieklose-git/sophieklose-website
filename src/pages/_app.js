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
        const reveal = (el) => el.classList.add('visible');
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        reveal(e.target);
                        obs.unobserve(e.target);
                    }
                });
            },
            { threshold: 0, rootMargin: '0px 0px -5% 0px' }
        );
        const els = document.querySelectorAll('.fade-in:not(.visible)');
        els.forEach((el) => obs.observe(el));
        // Safety net: if for any reason the observer never fires (e.g. zero-height parent,
        // display:contents ancestor, browser quirk), reveal any laggards after 1.5s.
        const fallback = window.setTimeout(() => {
            document.querySelectorAll('.fade-in:not(.visible)').forEach(reveal);
        }, 1500);
        return () => {
            obs.disconnect();
            window.clearTimeout(fallback);
        };
    }, [router.asPath]);

    return (
        <div className={`${cormorant.variable} ${jost.variable}`}>
            <Component {...pageProps} />
        </div>
    );
}
