module.exports = {
  extends: ['airbnb-base', 'prettier'],
  plugins: [],
  parserOptions: {
    ecmaVersion: 2022,
  },
  rules: {
    'import/prefer-default-export': ['off'],
    'prefer-object-spread': ['off'],
    'no-plusplus': ['off'],
    'arrow-body-style': ['off'],
    'new-cap': ['off'],
    'no-continue': ['off'],
  },
  env: { es2022: true, node: true },
};
