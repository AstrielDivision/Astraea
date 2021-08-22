import Client from './lib/Structures/client'
import Logger from './lib/Structures/Logger'
import GuildSettings from '#lib/Models/GuildSettings'
import type { Message } from 'discord.js'
import cfg from './config'

const client = new Client({
  defaultPrefix: cfg.prefix,
  fetchPrefix: async (message: Message) => {
    const { settings } = await GuildSettings.findOne({ guild_id: message.guild.id })

    if (!settings) await new GuildSettings({ guild_id: message.guild.id }).save()

    return settings?.prefix ?? cfg.prefix
  },
  caseInsensitivePrefixes: true,
  caseInsensitiveCommands: true,
  logger: { instance: new Logger('Astraea') },
  intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_BANS', 'GUILD_WEBHOOKS', 'GUILD_MEMBERS', 'GUILD_MESSAGE_REACTIONS']
})

void client.start()
