import { ApplyOptions } from '@sapphire/decorators'
import { Args } from '@sapphire/framework'
import {
	AstraeaCommand,
	AstraeaCommandOptions
} from '../../lib/Structures/Command'
import { Type } from '@sapphire/type'
import { codeBlock, isThenable } from '@sapphire/utilities'
import type { Message } from 'discord.js'
import { inspect } from 'util'

@ApplyOptions<AstraeaCommandOptions>({
	name: 'eval',
	aliases: ['ev'],
	description: 'Evals any JavaScript code',
	quotes: [],
	flags: ['async', 'hidden', 'showHidden', 'silent', 's'],
	options: ['depth']
})
export default class extends AstraeaCommand {
	public async run (message: Message, args: Args): Promise<Message> {
		if (!this.container.client.util.isOwner(message.author.id)) {
			return await message.channel.send(
				'You are not permitted to execute this command'
			)
		}
		const code = await args.rest('string')

		const { result, success, type } = await this.eval(message, code, {
			async: args.getFlags('async'),
			depth: Number(args.getOption('depth')) ?? 0,
			showHidden: args.getFlags('hidden', 'showHidden')
		})

		const output = success
			? codeBlock('js', result)
			: `**ERROR**: ${codeBlock('bash', result)}`
		if (args.getFlags('silent', 's')) return null

		const typeFooter = `**Type**: ${codeBlock('typescript', type)}`

		if (output.length > 2000) {
			return await message.channel.send(
				`Output was too long... sent the result as a file.\n\n${typeFooter}`,
				{
					files: [{ attachment: Buffer.from(output), name: 'output.txt' }]
				}
			)
		}

		return await message.channel.send(`${output}\n${typeFooter}`)
	}

	private async eval (
		message: Message,
		code: string,
		flags: { async: boolean, depth: number, showHidden: boolean }
	): Promise<{ result: string, success: boolean, type: string }> {
		if (flags.async) code = `(async () => {\n${code}\n})();`
		// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
		const msg = message

		let success = true
		let result = null

		try {
			// eslint-disable-next-line no-eval
			result = eval(code)
		} catch (error) {
			// eslint-disable-next-line @typescript-eslint/prefer-optional-chain
			if (error && error.stack) {
				this.container.client.logger.error(error)
			}
			result = error
			success = false
		}

		const type = new Type(result).toString()
		if (isThenable(result)) result = await result

		if (typeof result !== 'string') {
			result = inspect(result, {
				depth: flags.depth,
				showHidden: flags.showHidden
			})
		}

		return { result, success, type }
	}
}
