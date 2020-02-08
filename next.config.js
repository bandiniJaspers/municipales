//const { parsed: localEnv } = require('dotenv').config();
const webpack = require('webpack');
const dotenv = require("dotenv");
const withSass = require('@zeit/next-sass');
const withFonts = require('nextjs-fonts');
const withImages = require('next-images')

dotenv.config();

module.exports = {
    experimental: { publicDirectory: true },
    publicRuntimeConfig: { // Will be available on both server and client
        staticFolder: '/static',
        API_URL: `http://${process.env.API_URL}:${process.env.PORT}`
    }
}

module.exports = withSass(withFonts({
  cssModule: true,
    cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: "[local]___[hash:base64:5]",
    },
  webpack(config, options) {
    return config;
  }
  }
));
