const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  moduleNameMapper: {
    '^bullmq$': '<rootDir>/__mocks__/bullmq.ts',
    '^ ioredis$': '<rootDir>/ __mocks__ / ioredis.ts',
  },

  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
};
