module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-shadow': 'off',
        'no-undef': 'off',
        '@typescript-eslint/no-shadow': ['warn'],
        '@typescript-eslint/no-unused-vars': ['warn'],
        'react-native/no-inline-styles': ['off'],
      },
    },
  ],
};
