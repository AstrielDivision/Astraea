import { NorthCommand, NorthCommandOptions } from '../../lib/Structures/Command'
import { Message, MessageEmbed } from 'discord.js'
import { ApplyOptions } from '@sapphire/decorators'
import config from '../../config'
import { Args } from '@sapphire/framework'
import { inspect } from 'util'

@ApplyOptions<NorthCommandOptions>({
	name: 'eval',
	description: 'Evaluate javascript on the bot process',
	hidden: true
})
export default class Eval extends NorthCommand {
	public async run (message: Message, args: Args): Promise<Message> {
		if (!this.isOwner(message.author.id)) return await message.channel.send('You\'re not allowed to execute this command.')

		let silent: boolean, depth: string, exp: string

		exp = await args.rest('string')
		silent = args.getFlags('silent', 's')
		depth = args.getOption('depth')

		/**
		 * Original Author: Raven0
		 * https://github.com/ArtieFuzzz/Raven0/blob/main/src/commands/Owner/eval.ts
		 */
		const embed = new MessageEmbed()
			.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }))
		const { success, output, Type }: { success: boolean, output: string, Type: string} = await this.eval(message, exp, depth)

		if (silent) return null

		/* if (output.length > 1000) {
			const { key }: { key: string } = await c('https://hastebin.com', 'POST')
				.path('documents')
				.body(output)
				.json()

			return await message.channel.send(`The output was longer than 2000 characters: https://hastebin.com/${key}`)
		} */

		if (success) {
			embed.setTitle('Success! | Result')
			embed.setColor('GREEN')
			embed.addField('Output:', `\`\`\`js\n${output}\`\`\``)
			embed.addField('Type:', `\`\`\`ts\n${Type}\`\`\``)

			return await message.channel.send(embed)
		}
		if (!success) {
			embed.setTitle('Error! | Result')
			embed.setColor('RED')
			embed.addField('Output:', `\`\`\`js\n${output}\`\`\``)
			embed.addField('Type:', `\`\`\`ts\n${Type}\`\`\``)
			return await message.channel.send(embed)
		}
	}

	private async eval (message: Message, expression: string, depthOption?: string, asyncFlag?: boolean): Promise<{ success: boolean, output: string, Type: string }> {
		let success: boolean, output: string, Type: string
		try {
			if (asyncFlag) expression = `(async () => {\n${expression}\n})()`
			// eslint-disable-next-line no-eval
			output = eval(expression)
			Type = typeof output

			success = true
		} catch (err) {
			if (!Type) Type = typeof err
			// eslint-disable-next-line @typescript-eslint/prefer-optional-chain
			if (err && err.stack) this.container.logger.error('[Eval] ERROR!:', err.stack)
			output = err
			success = false
		}
		if (typeof output !== 'string') {
			output = inspect(output, {
				depth: depthOption ? parseInt(depthOption) || 0 : 0
			})
		}
		return { success, output, Type }
	}

	private isOwner (id: string): boolean {
		if (config.owners.includes(id)) return true
	}
}
