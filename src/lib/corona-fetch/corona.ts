/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import request from './request'
import { All, Country } from './types'

class CoronaFetch {
	public async all (): Promise<All> {
		const res: All = await request().catch((err: Error) => console.error(err))

		return res
	}

	public async country (country: string): Promise<Country> {
		const res: Country = await request(country).catch((err: Error) => console.error(err))

		return res
	}
}

export default new CoronaFetch()
