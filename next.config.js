//const { parsed: localEnv } = require('dotenv').config();
const webpack = require('webpack');
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
    experimental: { publicDirectory: true },
    publicRuntimeConfig: { // Will be available on both server and client
        staticFolder: '/static',
        API_URL: `http://${process.env.API_URL}:${process.env.PORT}`
    }
}
