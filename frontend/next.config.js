/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'cdn.jsdelivr.net',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
            {
                protocol: 'https',
                hostname: 'revueo.ai',
            },
            {
                protocol: 'https',
                hostname: 'shobhit-connect.vercel.app',
            },
            {
                protocol: 'https',
                hostname: 'beryl.esieve.in',
            },
            {
                protocol: 'https',
                hostname: 'fullstack-ak-portfolio.vercel.app',
            },
        ],
    },
    // Suppress source map warnings in development
    webpack: (config, { dev }) => {
        if (dev) {
            config.devtool = 'cheap-module-source-map'
        }
        return config
    },
    // Reduce compilation time
    experimental: {
        optimizePackageImports: ['react-icons'],
    },
}

module.exports = nextConfig