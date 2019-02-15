const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const entries = resolve('src/pages');
const entryFiles = fs.readdirSync(entries);
const node_env = process.env.NODE_ENV.trim();

function resolve (dir) {
  return path.join(__dirname, '..', dir);
}

function getHtmlPlugins () {
  const htmlPlugins = [];
  entryFiles.forEach(dir => {
    const template = resolve(`src/pages/${dir}/${dir}.html`);
    const prodParm = node_env === 'prod' ? {
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    } : {};

    const htmlPlugin = new HtmlWebpackPlugin({
      filename:`${dir}.html`,
      template: 'html-withimg-loader!' + template,
      chunks:[dir, 'vendor', 'manifest', 'commons'],
      ...prodParm
    });
    htmlPlugins.push(htmlPlugin);
  })
  return htmlPlugins;
}

module.exports = {
  entries,
  entryFiles,
  node_env,
  resolve,
  getHtmlPlugins
}
