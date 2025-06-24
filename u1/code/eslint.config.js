module.exports = {
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'eqeqeq': 'error',
    'camelcase': 'error',
    'no-unused-vars': 'error',
    'quotes': ['error', 'single'],
    'semi': ['error', 'always']
  }
};
