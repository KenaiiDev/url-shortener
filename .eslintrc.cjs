module.exports = {
  root: true,
  env: {
    browser: false,
    commonjs: true,
    es2021: true,
  },
  plugins: ["prettier", "@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
    "standard-with-typescript",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/return-await": "off",
    "prettier/prettier": "off",
    "@typescript-eslint/no-floating-promises": "off",
  },
  ignorePatterns: ["node_modules", "dist"],
};
