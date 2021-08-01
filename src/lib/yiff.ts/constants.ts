import { pkg } from '../../config'

export default {
	killswitch: {
		e621: '/e6',
		e926: '/e9',
		yiffrest: '/yiffrest',
		floofy: '/floofydev',
		shibe: '/shibe',
		fox: '/fox',
		sheri: '/sheri',
		gelbooru: '/gel',
		thaldrin: '/thaldrin'
	},
	defaults: {
		killswitch: 'https://killswitch-artiefuzzz.cloud.okteto.net',
		useragent: `Astraea/v${pkg.version} (github.com/AstraeaStudios/Astraea)`
	}
}
