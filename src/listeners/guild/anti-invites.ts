import { Events, Listener, ListenerOptions } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'
import type { Message } from 'discord.js'
import db from '#database'
import type { GuildSettings } from '#types'

@ApplyOptions<ListenerOptions>({
  event: Events.MessageCreate
})
export default class AntiInvites extends Listener {
  private readonly regex: RegExp =
  /(https?:\/\/)?(.*?@)?(www\.)?((discord|invite)\.(gg|li|me|io)|discord(app)?\.com\/invite)\/(\s)?.+/iu

  public async run(message: Message): Promise<Message> {
    if (message.channel.type === 'DM') return null

    if (!this.regex.test(message.content)) return null

    const settings = await db.load<GuildSettings>(message.guild.id)

    if (!settings.anti.invites) return null

    return await message.delete()
  }
}
