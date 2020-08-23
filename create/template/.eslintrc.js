const format = require('prettier-eslint');
module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier', //eslint-config-prettier，将与代码格式化相关的规则忽略，将使用prettier-eslint与prettier结合
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'import',
    '@typescript-eslint',
    'eslint-plugin-prettier', // 使.prettierc.js整合到eslint，prettier-eslint可以把prettier的format整合到 eslint --fix中
  ],
  rules: {
    'jsx-a11y/alt-text': 'off',
    'func-names': 'off',
    'import/extensions': [
      'error',
      {
        jsx: 'never',
        js: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'prettier/prettier': 'error', // 设置提醒类型
    'react/prop-types': 'off', // 有ts了，不需要react prop
    '@typescript-eslint/no-explicit-any': 'off',
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.common.js',
      },
    },
  },
};
