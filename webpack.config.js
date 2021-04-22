const path = require('path');

module.exports = {
   entry: './src/index.ts',
   output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'build')
   },
   resolve: {
      extensions: ['ts', 'tsx', 'js'],
   },
};
