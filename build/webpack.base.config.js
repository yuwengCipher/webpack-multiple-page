const webpack = require('webpack');
const utils = require('./utils');
const config = require('../webpack.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')


// 多页面入口
function getEntries () {
  const entry = {};
  utils.entryFiles.forEach( dir => {
    entry[dir] = `${utils.entries}/${dir}/${dir}.js`;
  });
  return entry;
}

module.exports = {
  entry: getEntries(),
  output: {
    path: config.build.assetsRoot,
    filename: 'js/[name].bundle.[hash].js',
    // 因为变量process.env.NODE_ENV带有空格，所以调用trim()去掉空格
    publicPath: utils.node_env === 'prod'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.json', '.vue'],
    alias: {
      '@': utils.resolve('src'),
      'vue': 'vue/dist/vue.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: ['img:src', 'img:data-src', 'audio:src', 'style'],
              minimize:true
            }
          },
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [utils.resolve('src'), utils.resolve('test'), utils.resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader',
          'postcss-loader'
        ],
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: 'images/[name].[hash:7].[ext]'
        }
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css'
    }),
    new VueLoaderPlugin(),
    new webpack.ProvidePlugin({
      $:"jquery",
      jQuery:"jquery",
      "window.jQuery":"jquery"
    }),
    new CopyWebpackPlugin([
      {
        from: './src/assets/copyImages',
        to: './images',
      },
      {
        from: './src/assets/copyJs',
        to: './js',
      }
    ])
  ]
}
