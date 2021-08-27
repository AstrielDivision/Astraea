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
    const settings = await db.load<GuildSettings>(message.guild.id)

    if (!settings?.prefix || !settings) {
      await db.store({
        id: message.guild.id,
        registeredAt: Date.now().toString(),
        guild_id: message.guild.id,
        prefix: cfg.prefix,
        anti: {
          unmentionable: false,
          invites: false,
          gifts: false
        }
      })
    }

    return settings.prefix
  }
})

void client.start()
