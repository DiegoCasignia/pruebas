module.exports = {
    env: {
        node: true,
        es2021: true
    },
    extends: ['eslint:recommended'],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    rules: {
        'no-console': 'error',
        'eqeqeq': ['error', 'always'],
        'camelcase': 'error',
        'no-unused-vars': 'error',
        'quotes': ['error', 'single'],
        'semi': ['error', 'always']
    }
};
