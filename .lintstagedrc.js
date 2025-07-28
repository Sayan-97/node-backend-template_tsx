import path from 'path';

const buildEslintCommand = (filenames) =>
  `eslint --fix ${filenames
    .filter(
      (f) =>
        f.endsWith('.js') ||
        f.endsWith('.ts') ||
        f.endsWith('.mjs') ||
        f.endsWith('.cjs'),
    )
    .map((f) => path.relative(process.cwd(), f))
    .join(' ')}`;

export default {
  '*.{js,mjs,cjs,ts}': [buildEslintCommand, 'prettier --write'],
  '*.{json,md,yml,yaml}': 'prettier --write',
};
