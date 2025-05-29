module.exports = {
  env: {
    node: true,
    es2021: true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'eqeqeq': 'error',
    'camelcase': 'error',
    'no-unused-vars': 'error',
    'quotes': ['error', 'single'],
    'semi': ['error', 'always']
  }
};
