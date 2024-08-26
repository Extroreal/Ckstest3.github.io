const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'dist/bundle.[chunkhash].js',
    path: path.resolve(__dirname, './public'),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.m?(js|jsx|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/typescript', '@babel/preset-react'],
          },
        },
        resolve: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              import: {
                filter: (url) => !url.startsWith('/') && !url.startsWith('http'),
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  ['autoprefixer', {}],
                  ['cssnano', {}],
                ],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'dist/bundle.[chunkhash].css',
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: false,
    }),
  ],
};
