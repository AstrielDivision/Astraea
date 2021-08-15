import { Events, Listener, ListenerOptions } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'
import type { Guild } from 'discord.js'

@ApplyOptions<ListenerOptions>({
  event: Events.GuildCreate
})
export default class GuildCreate extends Listener {
  public run(guild: Guild): void {
    void guild.members.fetch()
    return this.container.logger.info(`Joined ${guild.name} (${guild.id})`)
  }
}
