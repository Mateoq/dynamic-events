import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylisticJs from '@stylistic/eslint-plugin-js';
// import typescriptEslint from '@typescript-eslint';

export default tseslint.config(
  {
    ignores: ['src/**/*.spec.ts', 'test/app.e2e-spec.ts']
  },
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
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
  }
);
