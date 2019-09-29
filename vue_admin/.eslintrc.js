module.exports = {
  root: true,
  env: {
    browser: true,
    // node: true,
    jquery: true
  },
  "globals": {
    "baseConfig": true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-undef': 'off',
    'no-unused-vars': 'off',
    // allow paren-less arrow functions
    'arrow-parens': 'off',
    // allow async-await
    'generator-star-spacing': 'off',
    "no-irregular-whitespace":"off",
    'indent': 'off',
    'vue/script-indent': ['error', 2, { 'baseIndent': 1 }
]

},
  parserOptions: {
    parser: 'babel-eslint'
  }
}
