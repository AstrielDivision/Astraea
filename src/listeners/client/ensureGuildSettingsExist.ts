import { Events, Listener, ListenerOptions } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'
import type { Message } from 'discord.js'
import db from '#database'
import type { GuildSettings } from '#types'

@ApplyOptions<ListenerOptions>({
  event: Events.MessageCreate
})
export default class GuildCreate extends Listener {
  public async run(message: Message): Promise<unknown> {
    const settings = await db.load<GuildSettings>(message.guild.id)

    if (typeof settings === null) {
      await db.store({
        id: message.guild.id,
        registeredAt: Date.now().toString(),
        guild_id: message.guild.id,
        prefix: null,
        anti: {
          unmentionable: false,
          invites: false,
          gifts: false
        }
      })
    }

    return null
  }
}
