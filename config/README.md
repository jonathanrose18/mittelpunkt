# Shared Configuration

This folder contains reusable workspace config packages:

- `@mittelpunkt/tsconfig`: strict TypeScript baselines for node apps, node libraries, and Next.js apps.
- `@mittelpunkt/eslint-config`: shared ESLint flat-config presets for TypeScript and Next.js.
- `@mittelpunkt/prettier-config`: shared Prettier options.

## Usage

### TypeScript

```json
{
  "extends": "@mittelpunkt/tsconfig/node-library"
}
```

### ESLint (base)

```js
import { createBaseConfig } from '@mittelpunkt/eslint-config/base';

export default createBaseConfig();
```

### ESLint (Next.js)

```js
import { createNextConfig } from '@mittelpunkt/eslint-config/next';

export default createNextConfig();
```

### Prettier

```js
module.exports = require('@mittelpunkt/prettier-config');
```
