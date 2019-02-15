const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config');
const utils = require('./utils');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(baseConfig, {
  mode: 'production',
  plugins: [
    ...utils.getHtmlPlugins(),
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../'),
      verbose:  true,
    }),
    new OptimizeCssAssetsPlugin({
      autoprefixer: { disable: true },
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
      canPrint: true
    }),
  ],
  optimization: {
    runtimeChunk: {
      name: 'manifest',
    },
    splitChunks: {
      minSize: 20000, // 超过20k才会被打包
      cacheGroups: {
        vendor: {
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          minChunks: 1
        },
        commons: {
          name: "commons",
          chunks: "all",
          minChunks: 2
        },
      }
    }
  }
})
