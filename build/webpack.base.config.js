const VueLoaderPlugin = require('vue-loader/lib/plugin')
const util = require('./util')
const resolve = util.resolve
module.exports = {
  entry: {
    main: './src/index.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.js$/,
        use:[
          {
            loader: 'babel-loader',
            options: {
            },
          }
        ],
        exclude: /node_modules/,
      }
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
  ]
};
