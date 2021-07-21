import { arrow as index } from '../src/index'

describe('Testing index function', () => {
	test('CERTAINLY should pass', () => {
		expect(index()).toBe('How did this not the first time?')
	})
})
