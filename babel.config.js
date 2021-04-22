const isProd = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
   presets: [
      [
         '@babel/preset-env',
         {
            useBuiltIns: 'usage',
            corejs: '3.10',
         },
      ],
      [
         '@babel/preset-react',
         {
            runtime: 'automatic',
         },
      ],
      '@babel/preset-typescript',
   ],
   plugins: [
      isDev && 'react-refresh/babel',
      isProd && 'babel-plugin-jsx-remove-data-test-id',
   ].filter(Boolean),
};
