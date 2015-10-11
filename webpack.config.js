'use strict';
var path = require('path');
var webpack = require('webpack');

module.exports = {
  output: {
    filename: 'index.js',
    publicPath: '/assets/'
  },

  cache: false,
  debug: true,
  devtool: 'sourcemap',
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
        loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline'
      }
    ]
  },
  plugins: [ ],
  devServer: {
    contentBase: "./app",
    noInfo: true,
    hot: false,
    inline: true,
    port: '3331',
    stats: { colors: true }
  }
};


