import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337', // Importante para Strapi local
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: '**.railway.app', // Cobre produção
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Necessário para a página 'Sobre'
      }
    ],
  },
  poweredByHeader: false, 
};

export default nextConfig;
