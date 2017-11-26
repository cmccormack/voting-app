////////////////////////////////////
//  Import modules
////////////////////////////////////
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

////////////////////////////////////
// Configure environment settings
////////////////////////////////////

// CSS/SCSS
const cssDev = ['style-loader', 'css-loader', 'sass-loader']
const cssProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: ['css-loader', 'sass-loader'],
  publicPath: '../'
})


module.exports = (env={}) => {
  
  return {
    context: path.join(__dirname, './'),
    entry: {
      app: './src/app.jsx'
    },
    output: {
      path: path.resolve(__dirname, 'static'),
      filename: '[name].bundle.js',
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          include: path.join(__dirname, 'src'),
          options: {
            presets: ['react', 'env']
          }
        },
        {
          test: /\.s?css$/,
          use: env.production ? cssProd : cssDev
        }
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        title: 'Voting App - Christopher McCormack',
        style: 'styles.css',
        inject: 'body'
      }),
      new ExtractTextPlugin({
        filename: './styles/[name].css',
        disable: !env.production,
        allChunks: true
      }),
    ]
  }
}