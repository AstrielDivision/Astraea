import { Events, Listener, ListenerOptions } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'
import type { Message } from 'discord.js'

@ApplyOptions<ListenerOptions>({
  event: Events.MessageUpdate
})
export default class Example extends Listener {
  public run(oldMsg: Message, newMsg: Message): void {
    if (oldMsg.content === newMsg.content) return null

    this.container.client.emit('message', newMsg)
  }
}
