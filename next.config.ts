// next.config.js
module.exports = {
    images: {
        domains: ["img.clerk.com"],
        // Alternatively, you can use the newer remotePatterns format:
        // remotePatterns: [
        //   {
        //     protocol: 'https',
        //     hostname: 'img.clerk.com',
        //   },
        // ],
    },
};
