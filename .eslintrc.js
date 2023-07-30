module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 'latest'
  },
  env: {
    es6: true,
    browser: true,
    node: true
  },
  extends: ['eslint:recommended', 'react-app', 'react-app/jest', 'plugin:prettier/recommended'],
  rules: {
    'no-undef': 0,
    'no-unused-vars': 0,
    'no-empty': 0,
    'no-script-url': 0,
    'react-hooks/exhaustive-deps': 0,
    'jsx-a11y/anchor-is-valid': 0
  }
};
