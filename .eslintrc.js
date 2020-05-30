module.exports = {
  // eslint解析器 默认是espree
  parser: "@typescript-eslint/parser",
  // parser解析时的参数
  parserOptions: {},
  // 数组中的每个配置项继承它前面的配置
  /**
   * eslint：recommended，该配置项启用一系列核心规则
   * 一个可以输出配置对象的可共享配置包，如eslint-config-standard
   * 可共享配置包是一个导出配置对象的简单的npm包，包名称以eslint-config-开头，使用前要安装
   * 一个输出配置规则的插件包，如eslint-plugin-react 插件的一个主要作用是补充规则
   */
  extends: [
    "standard",
    "prettier", // 省略了eslint-plugin-前缀
    "prettier/@typescript-eslint",
  ],
  // 指定环境，主要是指定某个环境的全局变量，可以指定多个
  env: { node: true },
  plugins: [],
  rules: {
    "@typescript-eslint/ban-ts-ignore": 0,
    "@typescript-eslint/no-var-requires": 0,
  },
};
