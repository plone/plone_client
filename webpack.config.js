var webpack = require('webpack');
var path = require('path');

const BACKEND_URL = "http://castanyera.iskra.cat:8070";

var commonConfig = {
  resolve: {
    extensions: ['', '.ts', '.js'],
  },
  module: {
    preLoaders: [{
      test: /\.(html|css)$/,
      // loader: "plonetheme-preloader?themepath=src/customtheme" // LOAD FROM LOCAL
      // loader: "plonetheme-preloader?backend=" + BACKEND_URL // LOAD FROM PLONE
      loader: "plonetheme-preloader" // DOES NOTHING
    }],
    loaders: [
      // TypeScript
      { test: /\.ts$/, loader: 'ts-loader' },
      { test: /\.css$/, loader: 'raw-loader' },
      { test: /\.html$/, loader: 'raw-loader', exclude: './app/index.html' }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(true)
  ]
};


var clientConfig = {
  target: 'web',
  entry: './src/client',
  output: {
    path: path.join(__dirname, 'dist', 'client')
  },
  node: {
    global: true,
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: false
  }
};


var serverConfig = {
  target: 'node',
  entry: './src/server',
  output: {
    path: path.join(__dirname, 'dist', 'server')
  },
  externals: checkNodeImport,
  node: {
    global: true,
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: true
  }
};



// Default config
var defaultConfig = {
  module: {
    noParse: [
      path.join(__dirname, 'zone.js', 'dist'),
      path.join(__dirname, 'angular2', 'bundles')
    ]
  },
  context: __dirname,
  resolve: {
    root: path.join(__dirname, '/src')
  },
  output: {
    publicPath: path.resolve(__dirname),
    filename: 'bundle.js'
  }
}



var webpackMerge = require('webpack-merge');
module.exports = [
  // Client
  webpackMerge({}, defaultConfig, commonConfig, clientConfig),

  // Server
  webpackMerge({}, defaultConfig, commonConfig, serverConfig)
]

// Helpers
function checkNodeImport(context, request, cb) {
  if (!path.isAbsolute(request) && request.charAt(0) !== '.') {
    cb(null, 'commonjs ' + request); return;
  }
  cb();
}
