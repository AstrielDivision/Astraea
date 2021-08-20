import { CommandErrorPayload, Events, Listener, ListenerOptions, UserError } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'
import type { AstraeaCommand } from '#lib/Structures/BaseCommand'
import Sentry from '@sentry/minimal'

@ApplyOptions<ListenerOptions>({
  event: Events.CommandError
})
export default class CommandError extends Listener {
  public async run(error: Error, { message, piece }: CommandErrorPayload): Promise<unknown> {
    if (typeof error === 'string') return await message.channel.send(error)
    if (error instanceof UserError) return await message.channel.send(error.message)

    const command = piece as AstraeaCommand

    this.container.logger.fatal(`[COMMAND] ${command.path}\n${error.stack || error.message}`)

    Sentry.captureException(error, { tags: { name: piece.name } })

    return undefined
  }
}
