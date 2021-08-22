import { Events, Listener, ListenerOptions } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'
import type { Message } from 'discord.js'
import GuildSettings from '#lib/Models/GuildSettings'
import type { Settings } from '#lib/Models/types'

const cache = new Set()

@ApplyOptions<ListenerOptions>({
  event: Events.MessageCreate
})
export default class GuildCreate extends Listener {
  public async run(message: Message): Promise<Settings | unknown> {
    if (cache.has(message.guild.id)) return undefined

    const guildSettings = await GuildSettings.findOne({ guild_id: message.guild.id })

    if (!guildSettings) await new GuildSettings({ guild_id: message.guild.id }).save()

    return cache.add(message.guild.id)
  }
}
