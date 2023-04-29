module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb", "prettier"],
  overrides: [],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    babelOptions: {
      presets: ["@babel/preset-react"],
    },
    ecmaVersion: "latest",
    sourceType: "module",
    requireConfigFile: false,
  },
  plugins: ["prettier"],
  rules: {
    "no-param-reassign": 0,
    "no-unused-vars": 0,
    "react/prop-types": 0,
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "jsx-a11y/label-has-associated-control": 0,
    "react/no-this-in-sfc": 0,
    "no-underscore-dangle": 0
  },
  parser: "@babel/eslint-parser",
};
