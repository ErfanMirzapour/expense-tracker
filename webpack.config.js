const path = require('path');

const buildPath = path.resolve(__dirname, 'build');

module.exports = {
   entry: './src/index.ts',
   output: {
      filename: 'main.js',
      path: buildPath,
   },
   resolve: {
      extensions: ['.ts', '.tsx', '.js'],
   },

   module: {
      rules: [
         {
            test: /\.tsx?/,
            include: [path.resolve(__dirname, 'src')],
            use: {
               loader: 'babel-loader',
               options: {
                  cacheDirectory: true,
               },
            },
         },
      ],
   },

   devServer: {
      contentBase: buildPath,
      compress: true,
      port: 3001,
   },
};
