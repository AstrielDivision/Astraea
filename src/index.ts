import Client from './lib/Structures/client'
import cfg from './config'

const client = new Client({
	defaultPrefix: cfg.prefix,
	caseInsensitivePrefixes: true,
	caseInsensitiveCommands: true
})

void client.start()
