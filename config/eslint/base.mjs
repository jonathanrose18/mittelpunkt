import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const BASE_IGNORES = [
  '**/node_modules/**',
  '**/.next/**',
  '**/.turbo/**',
  '**/dist/**',
  '**/build/**',
  '**/coverage/**',
  '**/*.d.ts',
];

const createTypeAwareConfigs = (tsconfigRootDir) => [
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir,
      },
    },
    rules: {
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: {
            arguments: false,
          },
        },
      ],
      '@typescript-eslint/no-unnecessary-condition': 'error',
    },
  },
];

const createNonTypeAwareConfigs = () => [
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
];

export const createBaseConfig = (options = {}) => {
  const {
    ignores = BASE_IGNORES,
    typeAware = true,
    tsconfigRootDir = process.cwd(),
  } = options;

  return tseslint.config(
    {
      ignores,
    },
    js.configs.recommended,
    ...(typeAware
      ? createTypeAwareConfigs(tsconfigRootDir)
      : createNonTypeAwareConfigs()),
    {
      files: ['**/*.{ts,tsx,mts,cts}'],
      languageOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        globals: {
          ...globals.es2024,
          ...globals.node,
        },
      },
      rules: {
        '@typescript-eslint/consistent-type-imports': [
          'error',
          {
            prefer: 'type-imports',
            fixStyle: 'inline-type-imports',
          },
        ],
        '@typescript-eslint/explicit-function-return-type': [
          'error',
          {
            allowExpressions: true,
            allowTypedFunctionExpressions: true,
          },
        ],
      },
    },
    {
      files: ['**/*.{js,mjs,cjs}'],
      languageOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        globals: {
          ...globals.es2024,
          ...globals.node,
        },
      },
    },
    {
      files: ['**/*.test.{ts,tsx,mts,cts}', '**/*.spec.{ts,tsx,mts,cts}'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
    eslintConfigPrettier,
  );
};
