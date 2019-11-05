module.exports = {
  entry: './src/block.js',
  output: {
      path: __dirname + '/build',
      filename: 'block.js',
  },
  module: {
      loaders: [{
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      }, ],
  }
};