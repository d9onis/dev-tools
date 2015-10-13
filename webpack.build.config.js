'use strict';
var path = require('path');
var Webpack = require('webpack');

module.exports = {
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'index.js'
  },

  cache: false,
  debug: false,
  entry: [
    './app/app.jsx'
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  resolveLoader: {
    fallback: path.join(__dirname, './node_modules')
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loaders: ['babel']
      },
      {
        test: /\.scss$/,
        exclude: /(node_modules)/,
        loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded!autoprefixer?{browsers:["last 2 version"]}'
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline'
      }
    ]
  },
  plugins: [
    new Webpack.optimize.DedupePlugin(),
    new Webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        sequences: true,
        dead_code: true,
        conditionals: true,
        booleans: true,
        unused: true,
        if_return: true,
        join_vars: true,
        drop_console: true
      },
      output: {comments: false}
    })
  ]
};


