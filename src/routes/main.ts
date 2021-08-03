import { ApplyOptions } from '@sapphire/decorators'
import { ApiRequest, ApiResponse, methods, Route, RouteOptions } from '@sapphire/plugin-api'

@ApplyOptions<RouteOptions>({
	route: ''
})
export default class MainRoute extends Route {
	public [methods.GET] (_req: ApiRequest, res: ApiResponse): void {
		return res.json({ success: true })
	}
}
