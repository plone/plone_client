var webpack = require('webpack');


module.exports = {
  resolve: {
    extensions: ['', '.ts', '.js'],
  },
  module: {
    preLoaders: [{
      test: /\.(html|css)$/,
      loader: "plonetheme-preloader?themepath=src/customtheme"
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