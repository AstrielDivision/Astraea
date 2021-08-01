/* eslint-disable @typescript-eslint/no-explicit-any */
import request from './request'

export default class {
	public async e621 (tags: string, limit?: number): Promise<any> {
		const res = await request({
			site: 'e621',
			limit,
			tags
		}).catch(err => process.stdout.write(err))

		return res
	}

	public async floofy (): Promise<any> {
		const res = await request({
			site: 'floofy'
		}).catch(err => process.stdout.write(err))

		return res
	}
}
