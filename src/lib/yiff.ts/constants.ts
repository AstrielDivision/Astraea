import { pkg } from '../../config'

export default {
	killswitch: {
		e621: '/e6',
		floofy: '/floofydev'
	},
	defaults: {
		killswitch: 'https://killswitch-artiefuzzz.cloud.okteto.net',
		useragent: `Astraea/v${pkg.version} (github.com/AstraeaStudios/Astraea)`
	}
}
