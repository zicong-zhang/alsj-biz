// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: ['plugin:vue/essential', 'airbnb-base'],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  rules: {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never'
    }],
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state', // for vuex state
        'acc', // for reduce accumulators
        'e' // for e.returnvalue
      ]
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "no-tabs": 2,
    'no-console': 0,
    "no-restricted-modules": 0,// 如果禁用了指定模块，使用就会报错
    "no-unused-vars": 0, // 不能有声明后未被使用的变量或参数
    'max-len': 0,
    'linebreak-style': 0,
    'no-useless-escape': 0, // 禁用不必要的转义字符
    
    "arrow-body-style": 0, // 要求箭头函数体使用大括号
    "arrow-parens": 0, // 要求箭头函数的参数使用圆括号
    "arrow-spacing": 0,
    'no-undef': 1,
    'semi': 0, // 花括号后的分号
    'import/first': 0 // 相对import 在绝对的import之前
  }
}
