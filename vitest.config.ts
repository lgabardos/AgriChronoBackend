import { mergeConfig, defineConfig } from 'vitest/config';

export default mergeConfig(
  defineConfig({
    test: {
      include: ['tests/**/*.test.ts'],
      coverage: {
        provider: 'istanbul',
        reporter: ['cobertura', 'lcov', 'text-summary'],
        include: ['src/**/*.ts'],
        exclude: ['src/index.ts', 'src/util/Constants.ts'],
      },
    },
  }),
  {}
);
