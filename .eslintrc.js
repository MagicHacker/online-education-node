module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["standard", "plugin:@typescript-eslint/recommended"],
  env: { node: true },
  rules: {
    "@typescript-eslint/ban-ts-ignore": 0,
    "@typescript-eslint/no-var-requires": 0
  }
};
