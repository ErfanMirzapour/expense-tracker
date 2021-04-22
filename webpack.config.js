const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

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
            use: ['style-loader', 'css-loader', 'sass-loader'],
         },
      ],
   },

   plugins: [
      new HTMLWebpackPlugin({
         template: './src/index.html',
      }),
   ],

   devServer: {
      contentBase: buildPath,
      compress: true,
      port: 3001,
   },
};
