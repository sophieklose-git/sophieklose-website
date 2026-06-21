/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    env: {
        stackbitPreview: process.env.STACKBIT_PREVIEW
    },
    // SSR via getServerSideProps in [[...slug]].js reads markdown/JSON from
    // ./content at request time. Without this, Netlify's serverless function
    // bundle excludes those files and the page 404s in production.
    outputFileTracingIncludes: {
        '/[[...slug]]': ['./content/**/*']
    },
    trailingSlash: true,
    reactStrictMode: true,
    allowedDevOrigins: [
        '192.168.1.84',
        // Netlify Visual Editor preview proxy host
        'devserver-preview--sophieklose-website.netlify.app',
        // Cover any future per-deploy preview subdomain on this project
        '*.netlify.app'
    ]
};

module.exports = nextConfig;
