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
const cssDev = ['style-loader', 'css-loader', 'sass-loader',]
const cssProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: ['css-loader', 'sass-loader',],
  publicPath: '../',
})


module.exports = (env={}) => {
  console.info(`webpack env: ${JSON.stringify(env)}`)
  
  return {
    context: path.join(__dirname, './'),
    entry: {
      app: './src/App.jsx',
    },
    output: {
      path: path.resolve(__dirname, 'public'),
      publicPath: '/',
      filename: '[name].bundle.js',
    },
    resolve: {
      extensions: ['.js', '.jsx',],
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          include: path.join(__dirname, 'src'),
          options: {
            presets: ['react', 'env',],
            plugins: [
              ["transform-object-rest-spread", { "useBuiltIns": true, },],
            ],
          },
        },
        {
          test: /\.s?css$/,
          use: env.production ? cssProd : cssDev,
        },
        {
          test: /\.(png|ico|jpe?g|gif)$/i,
          use: [
            'file-loader?name=images/[name].[ext]',
            'image-webpack-loader',
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        title: 'Votery | Main',
        style: 'styles.css',
        inject: 'body',
        // favicon: '/images/favicon.ico',
      }),
      new ExtractTextPlugin({
        filename: './styles/styles.css',
        disable: !env.production,
        allChunks: true,
      }),
    ],
  }
}