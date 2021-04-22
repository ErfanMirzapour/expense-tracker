const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');

const envs = { prod: 'production', dev: 'development' };
const isProd = process.env.NODE_ENV === envs.prod;
const isDevServer = process.env.NODE_ENV === envs.dev;

const buildPath = path.resolve(__dirname, 'build');
const include = [path.resolve(__dirname, 'src')];
const hash = isProd ? '[contenthash:8]' : '';
const cssModuleLocalIdentName = '[local]___[hash:base64:5]';

module.exports = {
   mode: envs[isDevServer ? 'dev' : 'prod'],
   // High quality source maps for production and faster ones for development
   devtool: isProd
      ? 'source-map'
      : isDevServer && 'inline-cheap-module-source-map',
   resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      // Guide webpack for resolving absolute imports
      modules: ['src', 'node_modules'],
   },

   entry: './src/index.ts',
   output: {
      path: buildPath,
      filename: `[name].${hash}.js`,
      clean: !isDevServer,
   },
   optimization: {
      minimize: isProd,
      minimizer: ['...', new CssMinimizerWebpackPlugin()],
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
               !isDevServer ? MiniCssExtractPlugin.loader : 'style-loader',
               {
                  loader: 'css-loader',
                  options: {
                     importLoaders: 1,
                     modules: {
                        // CSS modules class names structure
                        localIdentName: cssModuleLocalIdentName,
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
         minify: isProd && {
            removeAttributeQuotes: true,
            removeComments: true,
            collapseWhitespace: true,
         },
      }),
      !isDevServer &&
         new MiniCssExtractPlugin({
            filename: `[name].${hash}.css`,
         }),
   ].filter(Boolean),

   devServer: {
      contentBase: buildPath,
      compress: true,
      port: 3001,
   },
};
