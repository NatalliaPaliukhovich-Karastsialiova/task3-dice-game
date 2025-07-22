module.exports = {
  root: true,
  env: {
    commonjs: true,
    es2024: true,
    node: true,
    mocha: true,
  },
  rules: {
    'no-underscore-dangle': [
      'error',
      {
        allowAfterThis: true,
        allowAfterSuper: true,
        enforceInMethodNames: false,
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'always',
      },
    ],
    'no-console': 'off',
    'class-methods-use-this': 'off',
    'no-continue': 'off',
    'no-await-in-loop': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js'],
      },
    },
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
  noInlineConfig: true,
};
