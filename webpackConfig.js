//
// webpackConfig.js
//

module.exports = {
  entry: [
    `${__dirname}/client/src/Tourn.jsx`,
  ],
  output: { path: '/', filename: 'app-bundle.js' },
  module: {
    loaders: [{
      test: /\.js|x$/,
      exclude: /node_modules/,
      loader: 'babel',
    },
    { test: /\.css$/,
      loader: 'style-loader!css-loader',
    }],
  },
};
