const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const buildPath = path.resolve(__dirname, 'build');
const include = [path.resolve(__dirname, 'src')];

module.exports = {
   entry: './src/index.ts',
   output: {
      filename: 'main.js',
      path: buildPath,
   },
   resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      modules: ['src', 'node_modules'],
   },

   module: {
      rules: [
         {
            test: /\.tsx?/,
            include,
            use: {
               loader: 'babel-loader',
               options: {
                  cacheDirectory: true,
               },
            },
         },
         {
            test: /\.scss?/,
            include,
            use: [
               MiniCssExtractPlugin.loader,
               {
                  loader: 'css-loader',
                  options: {
                     importLoaders: 1,
                     modules: {
                        // CSS modules class names structure
                        localIdentName: '[local]_[hash:base64:4]',
                     },
                  },
               },
               'postcss-loader',
               'sass-loader',
            ],
         },
      ],
   },

   plugins: [
      new HTMLWebpackPlugin({
         template: './src/index.html',
      }),
      new MiniCssExtractPlugin({
         filename: `[name].css`,
      }),
   ],

   devServer: {
      contentBase: buildPath,
      compress: true,
      port: 3001,
   },
};
