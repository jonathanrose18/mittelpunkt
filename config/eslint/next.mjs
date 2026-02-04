import nextPlugin from '@next/eslint-plugin-next';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';

import { createBaseConfig } from './base.mjs';

export const createNextConfig = (options = {}) => {
  return [
    ...createBaseConfig(options),
    {
      files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      plugins: {
        '@next/next': nextPlugin,
        react: reactPlugin,
        'react-hooks': reactHooksPlugin,
      },
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
        globals: {
          ...globals.browser,
          ...globals.node,
        },
      },
      settings: {
        react: {
          version: 'detect',
        },
      },
      rules: {
        ...reactPlugin.configs.recommended.rules,
        ...reactPlugin.configs['jsx-runtime'].rules,
        ...reactHooksPlugin.configs.recommended.rules,
        ...nextPlugin.configs['core-web-vitals'].rules,
        'react/prop-types': 'off',
      },
    },
  ];
};
