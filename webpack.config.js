const path = require('path');

module.exports = {
  entry: {
    components: './dist/index.js',
    icons: { import: './dist/icons.js', filename: './icons.js' },
    hooks: { import: './dist/hooks.js', filename: './hooks.js' },
    contexts: { import: './dist/contexts.js', filename: './contexts.js' },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'bundle'),
  },
};
