// next.config.js
module.exports = {
    images: {
        domains: [
            "img.clerk.com",
            "images.unsplash.com",
            "images.pexels.com", // For Pexels
        ],
        // Alternatively, you can use the newer remotePatterns format:
        // remotePatterns: [
        //   {
        //     protocol: 'https',
        //     hostname: 'img.clerk.com',
        //   },
        // ],
    },
};
