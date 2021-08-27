import { Events, Listener, ListenerOptions } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'
import type { Guild } from 'discord.js'
import db from '#database'

@ApplyOptions<ListenerOptions>({
  event: Events.GuildCreate
})
export default class GuildCreate extends Listener {
  public async run(guild: Guild): Promise<void> {
    await db.store({
      id: guild.id,
      registeredAt: Date.now().toString(),
      guild_id: guild.id,
      prefix: null,
      anti: {
        unmentionable: false,
        invites: false,
        gifts: false
      }
    })
    await guild.members.fetch()
    return this.container.logger.info(`Joined ${guild.name} (${guild.id})`)
  }
}
