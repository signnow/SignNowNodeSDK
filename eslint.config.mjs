import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylisticTs from '@stylistic/eslint-plugin-ts';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.strict,
  {
    plugins: {
      '@stylistic/ts': stylisticTs,
    },
    rules: {
      '@stylistic/ts/semi': 'error',
      '@stylistic/ts/member-delimiter-style': 'error',
      '@stylistic/ts/quotes': ['error', 'single'],
      '@stylistic/ts/object-curly-spacing': ['error', 'always'],
      '@stylistic/ts/key-spacing': ['error', { mode: 'strict' }],
      '@stylistic/ts/comma-spacing': 'error',
      '@stylistic/ts/space-infix-ops': 'error',
      '@stylistic/ts/quote-props': ['error', 'as-needed', { keywords: false, unnecessary: true, numbers: false }],
      '@stylistic/ts/lines-between-class-members': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-member-accessibility': ['error', { overrides: { constructors: 'no-public' } }],
      '@typescript-eslint/no-empty-object-type': 'off',
      '@stylistic/ts/indent': ['error', 2],
      'eol-last': ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'array-element-newline': ['error', 'consistent'],
      'array-bracket-newline': ['error', 'consistent'],
      'array-bracket-spacing': ['error', 'never'],
      'array-callback-return': 'error',
      'object-curly-newline': ['error', { consistent: true }],
      'object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
      'function-paren-newline': ['error', 'consistent'],
      'function-call-argument-newline': ['error', 'consistent'],
      'arrow-spacing': 'error',
      'space-before-function-paren': ['error', { anonymous: 'always', named: 'never', asyncArrow: 'always' }],
      'prefer-const': 'error',
      'no-var': 'error',
      'no-debugger': 'error',
      'no-duplicate-imports': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/naming-convention': [
        'error',
        { selector: 'interface', format: ['PascalCase'] },
        { selector: 'typeAlias', format: ['PascalCase'] },
        { selector: 'enum', format: ['PascalCase'] },
        { selector: 'class', format: ['PascalCase'] },
      ],
    },
  },
];
