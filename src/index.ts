import Client from './lib/Structures/client'
import Logger from './lib/Structures/Logger'
import cfg from './config'

const client = new Client({
  defaultPrefix: cfg.prefix,
  caseInsensitivePrefixes: true,
  caseInsensitiveCommands: true,
  logger: { instance: new Logger('Astraea') },
  intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_BANS', 'GUILD_WEBHOOKS', 'GUILD_MEMBERS']
})

void client.start()
