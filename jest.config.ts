import type { Config } from '@jest/types'

export default async (): Promise<Config.InitialOptions> => {
	return {
		displayName: 'Unit Tests',
		preset: 'ts-jest',
		testEnvironment: 'node',
		testMatch: ['<rootDir>/tests/**/*.test.ts'],
		globals: {
			'ts-jest': {
				tsconfig: '<rootDir>/tsconfig.json'
			},
			jest: {
				setupFilesAfterEnv: ['jest-extended']
			}
		},
		testPathIgnorePatterns: ['/node_modules/']
	}
}
