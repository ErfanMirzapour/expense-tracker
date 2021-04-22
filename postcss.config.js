const PresetEnv = require('postcss-preset-env');

module.exports = {
   plugins: [
      PresetEnv({
         stage: 2,
      }),
   ],
};
