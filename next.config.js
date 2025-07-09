module.exports = {
  trailingSlash: true,
  modularizeImports: {
    '@mui/material': {
      transform: '@mui/material/{{member}}',
    },
    '@mui/lab': {
      transform: '@mui/lab/{{member}}',
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    
    // Ignore problematic example components during build
    config.resolve.alias = {
      ...config.resolve.alias,
      'src/sections/examples': false,
    };
    
    return config;
  },
  // Exclude problematic routes from the build
  async rewrites() {
    return [
      {
        source: '/components/:path*',
        destination: '/components',
      },
    ];
  },
};
