import { ApplyOptions } from '@sapphire/decorators'
import { Precondition, PreconditionOptions, Result, UserError } from '@sapphire/framework'
import { Message } from 'discord.js'
import cfg from '../config'

@ApplyOptions<PreconditionOptions>({
	name: 'ownerOnly'
})
export class ownerOnly extends Precondition {
	public async run (message: Message): Promise<Result<unknown, UserError>> {
		return cfg.owners.includes(message.author.id) ? await this.ok() : await this.error({ message: 'This command can only be used by the owner.' })
	}
}
