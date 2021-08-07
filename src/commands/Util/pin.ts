import { AstraeaCommand, AstraeaCommandOptions } from '../../lib/Structures/Command'
import { Message } from 'discord.js'
import { ApplyOptions, RequiresPermissions } from '@sapphire/decorators'
import { Args } from '@sapphire/framework'

@ApplyOptions<AstraeaCommandOptions>({
	name: 'pin',
	description: 'Pin a message via ID',
	requiredClientPermissions: ['MANAGE_MESSAGES'],
	preconditions: ['GuildTextOnly']
})
export default class example extends AstraeaCommand {
	@RequiresPermissions('MANAGE_MESSAGES')
	public async run (message: Message, args: Args): Promise<Message> {
		const messageID = (await args.pickResult('string')).value

		if (!messageID) return await message.channel.send('No message ID provided')

		const msg = await message.channel.messages.fetch(messageID)

		if (!msg) return await message.channel.send('Message not found')
		if (msg.pinned) {
			void msg.unpin()
			return await message.channel.send('Unpinned message!')
		}

		void msg.pin()
		return await message.channel.send('Successfully pinned message!')
	}
}
