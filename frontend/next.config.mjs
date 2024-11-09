/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // Ajouter output standalone pour Docker
    output: 'standalone',
    images: {
        domains: ['ucarecdn.com'],
    },
    // Ajouter la configuration pour les variables d'environnement
    env: {
        NEXT_PUBLIC_APOLLO_URI: process.env.NEXT_PUBLIC_APOLLO_URI,
    },
}

// Utiliser module.exports au lieu de export default
module.exports = nextConfig
