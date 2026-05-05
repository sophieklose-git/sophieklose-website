/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    env: {
        stackbitPreview: process.env.STACKBIT_PREVIEW
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
