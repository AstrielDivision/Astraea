import Client from './lib/Structures/client'
import Logger from './lib/Structures/Logger'
import cfg from './config'

const client = new Client({
	defaultPrefix: cfg.prefix,
	caseInsensitivePrefixes: true,
	caseInsensitiveCommands: true,
	logger: new Logger('North')
	/* auth: {
		id: '',
		secret: '',
		cookie: 'SAPPHIRE_AUTH',
		redirect: '',
		scopes: ['identify']
	},
	prefix: 'v1/',
	origin: '*',
	listenOptions: {
		port: 80
	} */
})

void client.start()
