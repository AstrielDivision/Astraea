import Client from './lib/Structures/client'
import Logger from './lib/Structures/Logger'
import cfg from './config'
import type { Message } from 'discord.js'
import db from '#database'
import type { GuildSettings } from '#types'

const client = new Client({
  defaultPrefix: cfg.prefix,
  caseInsensitivePrefixes: true,
  caseInsensitiveCommands: true,
  logger: { instance: new Logger('Astraea') },
  intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_BANS', 'GUILD_WEBHOOKS', 'GUILD_MEMBERS', 'GUILD_MESSAGE_REACTIONS'],
  fetchPrefix: async (message: Message) => {
    const { data: settings } = await db.from<GuildSettings>('guilds').select().eq('guild_id', message.guild.id).single()

    return settings.prefix ?? cfg.prefix
  }
})

void client.start()
