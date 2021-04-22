const isProd = process.env.NODE_ENV === 'production';

module.exports = {
   presets: [
      [
         '@babel/preset-env',
         {
            useBuiltIns: 'usage',
            corejs: '3.10',
         },
      ],
      '@babel/preset-typescript',
   ],
   plugins: [isProd && 'babel-plugin-jsx-remove-data-test-id'].filter(Boolean),
};
