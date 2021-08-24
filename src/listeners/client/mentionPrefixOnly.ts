import { Events, Listener, ListenerOptions } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'
import type { Message } from 'discord.js'
import db from '#database'
import type { GuildSettings } from '#types'
import cfg from '../../config'

@ApplyOptions<ListenerOptions>({
  event: Events.MentionPrefixOnly
})
export default class Example extends Listener {
  public async run(message: Message): Promise<Message> {
    const { data: settings } = await db.from<GuildSettings>('guilds').select().eq('guild_id', message.guild.id).single()

    return await message.channel.send(`This guilds current prefix is: ${settings.prefix ?? cfg.prefix}`)
  }
}
