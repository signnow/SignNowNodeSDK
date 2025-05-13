const config = {
    testEnvironment: 'node',
    testMatch: ['<rootDir>/tests/**/*.test.[jt]s?(x)'],
    setupFiles: ['dotenv/config'],
    preset: 'ts-jest/presets/default-esm', // or other ESM presets
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    transform: {
        '^.+.tsx?$': ['ts-jest', {}],
    },
};

export default config;
