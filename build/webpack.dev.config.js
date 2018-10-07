const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.config.js')
const util = require('./util')
const resolve = util.resolve
module.exports = merge(webpackBaseConfig, {
  mode: 'none',
  output: {
    path: resolve('/dist'),
    publicPath: "/dist/",
    filename: 'jump-number.js',
    library: "jump-number",
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "css-loader","postcss-loader","sass-loader"
        ]
      },
    ],
  },
  plugins: [
  ]
})
