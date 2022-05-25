module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'airbnb-typescript',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  ignorePatterns: ['.eslintrc.js', '.eslintrc.js', 'webpack.*.js'],
  rules: {
    'react/jsx-filename-extension': [0],
    '@typescript-eslint/lines-between-class-members': [
      'error',
      'always',
      { exceptAfterSingleLine: true },
    ],
    '@typescript-eslint/explicit-function-return-type': ['error'],
    '@typescript-eslint/type-annotation-spacing': ['error'],
    'no-multi-spaces': ['error'],
    'space-in-parens': ['error'],
    'semi-spacing': ['error'],
    'space-before-blocks': ['error'],
    'key-spacing': ['error', { afterColon: true }],
    'max-len': ['error', { code: 80 }],
  },
};
