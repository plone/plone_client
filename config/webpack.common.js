var webpack = require('webpack');

const BACKEND_URL = "http://castanyera.iskra.cat:8070";

module.exports = {
  resolve: {
    extensions: ['', '.ts', '.js'],
  },
  module: {
    preLoaders: [{
      test: /\.(html|css)$/,
      // loader: "plonetheme-preloader?themepath=src/customtheme" // LOAD FROM LOCAL
      loader: "plonetheme-preloader?backend=" + BACKEND_URL // LOAD FROM PLONE
      // loader: "plonetheme-preloader" // DOES NOTHING
    }],
    loaders: [
      // TypeScript
      { test: /\.ts$/, loader: 'awesome-typescript-loader', exclude: [/\.(spec|e2e)\.ts$/] },
      { test: /\.css$/, loader: 'raw-loader' },
      { test: /\.html$/, loader: 'raw-loader', exclude: './app/index.html' }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(true)
  ]
};