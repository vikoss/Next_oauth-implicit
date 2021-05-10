const webpack = require('webpack');
const { parsed: env } = require('dotenv').config();

module.exports = {
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(env))
    return config;
  }
};