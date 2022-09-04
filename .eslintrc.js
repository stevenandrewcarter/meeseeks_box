module.exports = {
  root: true,
  env: {
    'browser': true,
    'es2021': true,
    'node': true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'google',
  ],
  parserOptions: {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'max-len': ['error', {'code': 120}],
    'new-cap': ['error', {'capIsNew': false}],
    'semi': ['error', 'always'],
    'indent': 'off',
    '@typescript-eslint/indent': ['error', 2],
  },
};
