import { Events, Listener, ListenerOptions } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'
import type { Message } from 'discord.js'
import db from '#database'
import type { GuildSettings } from '#types'

@ApplyOptions<ListenerOptions>({
  event: Events.MessageCreate
})
export default class AntiInvites extends Listener {
  public async run(message: Message): Promise<Message> {
    if (message.channel.type === 'DM') return null

    const { data: guild } = await db.from<GuildSettings>('guilds').select().eq('guild_id', message.guild.id).single()

    if (!guild['anti-gifts']) return null

    const regex = /(https?:\/\/)?(www\.)?(discord\.gift|discord(app)?\.com\/gifts)\/(\s)?.+/iu

    if (regex.test(message.content)) return await message.delete()
  }
}
