import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import vueParser from 'vue-eslint-parser'
import tsParser from '@typescript-eslint/parser'
import tailwind from 'eslint-plugin-tailwindcss'
import autoImportConfig from './.eslintrc-auto-import.json' with { type: 'json' }
import globals from 'globals'

export default [
  ...pluginVue.configs['flat/essential'],
  ...pluginVue.configs['flat/recommended'],
  ...vueTsEslintConfig(),
  ...tailwind.configs['flat/recommended'],

  {
    files: ['**/*.vue', '**/*.ts', '**/*.js', '**/*.mjs'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        sourceType: 'module',
        ecmaVersion: 'latest',
        ecmaFeatures: {
          jsx: false
        }
      },
      globals: {
        ...globals.node,
        ...globals.browser,
        ...autoImportConfig.globals,

        UniApp: true,
        UniNamespace: true,
        uni: true,
        plus: true,
        UniHelper: true,
        getCurrentPages: true
      }
    },
    ignores: [
      'dist',
      'public',
      'src/assets',
      'src/uni_modules',
      'src/pages.d.ts'
    ],

    // https://github.com/vuejs/eslint-config-vue
    rules: {
      'tailwindcss/no-custom-classname': 0,
      'tailwindcss/classnames-order': [1, {
        classRegex: '\-?class$'
      }],

      '@typescript-eslint/no-explicit-any': 0,

      'vue/v-on-event-hyphenation': 0,
      'vue/multi-word-component-names': 'off',
      'vue/no-multiple-template-root': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/html-closing-bracket-newline': ['error', {
        'singleline': 'never',
        'multiline': 'always'
      }],
      'vue/no-v-html': 'off',
      'vue/no-v-for-template-key': 'off',

      'accessor-pairs': 2,
      'arrow-spacing': [2, {
        'before': true,
        'after': true
      }],
      'block-spacing': [2, 'always'],
      'brace-style': [2, '1tbs', {
        'allowSingleLine': true
      }],
      'camelcase': [0, {
        'properties': 'always'
      }],
      'comma-dangle': [2, 'never'],
      'comma-spacing': [2, {
        'before': false,
        'after': true
      }],
      'comma-style': [2, 'last'],
      'constructor-super': 2,
      'curly': [2, 'multi-line'],
      'dot-location': [2, 'property'],
      'eol-last': 2,
      'eqeqeq': ['error', 'always', { 'null': 'ignore' }],
      'generator-star-spacing': [2, {
        'before': true,
        'after': true
      }],
      'handle-callback-err': [2, '^(err|error)$'],
      'indent': [2, 2, {
        'SwitchCase': 1
      }],
      'jsx-quotes': [2, 'prefer-single'],
      'key-spacing': [2, {
        'beforeColon': false,
        'afterColon': true
      }],
      'keyword-spacing': [2, {
        'before': true,
        'after': true
      }],
      'new-cap': [2, {
        'newIsCap': true,
        'capIsNew': false
      }],
      'new-parens': 2,
      'no-array-constructor': 2,
      'no-caller': 2,
      'no-console': 'off',
      'no-class-assign': 2,
      'no-cond-assign': 2,
      'no-const-assign': 2,
      'no-control-regex': 0,
      'no-delete-var': 2,
      'no-dupe-args': 2,
      'no-dupe-class-members': 2,
      'no-dupe-keys': 2,
      'no-duplicate-case': 2,
      'no-empty-character-class': 2,
      'no-empty-pattern': 2,
      'no-eval': 2,
      'no-ex-assign': 2,
      'no-extend-native': 2,
      'no-extra-bind': 2,
      'no-extra-boolean-cast': 2,
      'no-extra-parens': [2, 'functions'],
      'no-fallthrough': 2,
      'no-floating-decimal': 2,
      'no-func-assign': 2,
      'no-implied-eval': 2,
      'no-inner-declarations': [2, 'functions'],
      'no-invalid-regexp': 2,
      'no-irregular-whitespace': 2,
      'no-iterator': 2,
      'no-label-var': 2,
      'no-unused-labels': 0,
      'no-lone-blocks': 2,
      'no-mixed-spaces-and-tabs': 2,
      'no-multi-spaces': 2,
      'no-multi-str': 2,
      'no-multiple-empty-lines': [2, {
        'max': 1
      }],
      'no-native-reassign': 2,
      'no-negated-in-lhs': 2,
      'no-new-object': 2,
      'no-new-require': 2,
      'no-new-symbol': 2,
      'no-new-wrappers': 2,
      'no-obj-calls': 2,
      'no-octal': 2,
      'no-octal-escape': 2,
      'no-path-concat': 2,
      'no-proto': 2,
      'no-redeclare': 2,
      'no-regex-spaces': 2,
      'no-return-assign': [2, 'except-parens'],
      'no-self-assign': 2,
      'no-self-compare': 2,
      'no-sequences': 2,
      'no-shadow-restricted-names': 2,
      'no-spaced-func': 0,
      'no-sparse-arrays': 2,
      'no-this-before-super': 2,
      'no-throw-literal': 2,
      'no-trailing-spaces': 2,
      'no-undef': 2,
      'no-undef-init': 2,
      'no-unexpected-multiline': 2,
      'no-unmodified-loop-condition': 2,
      'no-unneeded-ternary': [2, {
        'defaultAssignment': false
      }],
      'no-unreachable': 2,
      'no-unsafe-finally': 2,
      'no-unused-vars': [2, {
        'vars': 'all',
        'args': 'none'
      }],
      'no-useless-call': 2,
      'no-useless-computed-key': 2,
      'no-useless-constructor': 2,
      'no-useless-escape': 0,
      'no-whitespace-before-property': 2,
      'no-with': 2,
      'operator-linebreak': [2, 'after', {
        'overrides': {
          '?': 'before',
          ':': 'before'
        }
      }],
      'padded-blocks': [2, 'never'],
      'quotes': [2, 'single', {
        'avoidEscape': true,
        'allowTemplateLiterals': true
      }],
      'semi': [2, 'never'],
      'semi-spacing': [2, {
        'before': false,
        'after': true
      }],
      'space-before-blocks': [2, 'always'],
      'space-before-function-paren': [2, 'never'],
      'space-in-parens': [2, 'never'],
      'space-infix-ops': 2,
      'space-unary-ops': [2, {
        'words': true,
        'nonwords': false
      }],
      'spaced-comment': [2, 'always', {
        'markers': ['/', 'global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
      }],
      'template-curly-spacing': [2, 'never'],
      'use-isnan': 2,
      'valid-typeof': 2,
      'wrap-iife': [2, 'any'],
      'yield-star-spacing': [2, 'both'],
      'yoda': [2, 'never'],
      'prefer-const': 2,
      'object-curly-spacing': [2, 'always', {
        objectsInObjects: false
      }],
      'array-bracket-spacing': [2, 'never']
    }
  }
]
