import { useEffect } from 'react';
import { useRouter } from 'next/router';
import '../css/main.css';

export default function MyApp({ Component, pageProps }) {
    const router = useRouter();

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

    return <Component {...pageProps} />;
}
