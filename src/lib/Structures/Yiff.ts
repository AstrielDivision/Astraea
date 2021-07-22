import Yiff from 'yiff'
import pkg from '../../config'

const yiff = new Yiff({
	useragent: `North/${pkg.version} (https://github.com/ArtieFuzzz/north)`,
	killswitch: {
		enabled: true
	}
})

export default yiff
