const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './app-v.2.x/index.tsx'
  },
  output: {
    filename: '[name].js',
    path: '/'
  },

  devtool: 'source-map',

  resolve: {
    extensions: [ '.ts', '.tsx', '.js', '.json' ]
  },

  module: {
    rules: [
      {
        test: /\.tsx|ts?$/,
        loader: [ 'awesome-typescript-loader' ]
      },
      {
        test: /\.css?$/,
        loader: [ 'style-loader', 'css-loader' ]
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      }
    ]
  },

  devServer: {
    historyApiFallback: true,
    contentBase: './app-v.2.x',
    noInfo: true,
    hot: true,
    inline: true,
    port: '3338',
    stats: { colors: true }
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
                            filename: 'index.html',
                            title: 'DevTools Template',
                            chunks: [ 'app' ]
                          }),
  ]
};
