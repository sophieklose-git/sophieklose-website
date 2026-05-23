import '../css/main.css';

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <Component {...pageProps} />
            {/* Hidden form scaffold so Netlify's build-time scanner detects "contact-form".
                The real form is rendered dynamically by FormBlock on /contact.
                Keep field names in sync with content/pages/contact.md. */}
            <form name="contact-form" data-netlify="true" netlify-honeypot="bot-field" hidden>
                <input type="text" name="name" />
                <input type="email" name="email" />
                <input type="text" name="language" />
                <input type="text" name="format" />
                <textarea name="message"></textarea>
                <input name="bot-field" />
            </form>
        </>
    );
}
