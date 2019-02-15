const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config');
const utils = require('./utils');

module.exports = merge(baseConfig, {
  mode: 'development',
  plugins: [
    ...utils.getHtmlPlugins()
  ]
})
