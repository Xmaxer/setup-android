module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['plugin:@typescript-eslint/recommended'],
  rules: {
    'prettier/prettier': 0,
    '@typescript-eslint/no-explicit-any': 2,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'no-shadow': 0,
    '@typescript-eslint/no-shadow': 2,
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/no-unused-vars': 0,
  },
};
