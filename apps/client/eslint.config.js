import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylisticJs from '@stylistic/eslint-plugin-js';
import { FlatCompat } from '@eslint/eslintrc';
// import typescriptEslint from '@typescript-eslint';

const recommendedConfig = {
  ...eslint.configs.recommended,
  ...tseslint.configs.recommended
};

const allConfig = {
  ...eslint.configs.all,
  ...tseslint.configs.all,
};

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig,
  allConfig
})

export default tseslint.config(
  {
    ignores: ['src/**/*.spec.ts', 'test/app.e2e-spec.ts']
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    languageOptions: {
      parserOptions: {
        // projectService: true,
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname
      }
    },
    plugins: {
      '@stylistic/js': stylisticJs
    },
    rules: {
      '@stylistic/js/indent': ['error', 2],
      'no-unused-vars': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-unused-vars': ['error', {
        'varsIgnorePattern': '^_$'
      }],
      '@typescript-eslint/camelcase': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      'eol-last': 'error',
      'semi': 'error',
      'comma-dangle': ['error', 'never'],
      '@typescript-eslint/restrict-template-expressions': 'off',
      'no-case-declarations': 'off',
      '@typescript-eslint/non-nullable-type-assertion-style': 'off',
      '@typescript-eslint/no-unnecessary-type-parameters': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'quotes': ['error', 'single'],
      '@typescript-eslint/no-extraneous-class': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off'
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  },
  {
    ignores: ['.next/**/*']
  }
);
