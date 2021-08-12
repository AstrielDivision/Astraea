import { CommandDeniedPayload, Events, Listener, ListenerOptions, UserError } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'
import { Message } from 'discord.js'

@ApplyOptions<ListenerOptions>({
  event: Events.CommandDenied
})
export default class UserEvent extends Listener {
  public async run({ context, message: content }: UserError, { message }: CommandDeniedPayload): Promise<Message> {
    // `context: { silent: true }` should make UserError silent:
    // Use cases for this are for example permissions error when running the `eval` command.
    if (Reflect.get(Object(context), 'silent')) return

    return await message.channel.send(content, {
      allowedMentions: { users: [message.author.id], roles: [] }
    })
  }
}
