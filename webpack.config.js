const path = require('path')

module.exports = {
  entry: [
    '@babel/polyfill',
    require.resolve('./polyfill'),
    './src/index.js'
  ],

  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },

  devServer: {
    inline: true,
    port: 8000,
    contentBase: path.resolve(__dirname, 'public')
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react'],
          plugins: [
            'transform-es2015-destructuring',
            'transform-object-rest-spread',
            'transform-class-properties'
          ]
        }
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'style-loader!css-loader!sass-loader'
      }
    ]
  }
};