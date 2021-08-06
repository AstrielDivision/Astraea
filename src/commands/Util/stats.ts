import { AstraeaCommand, AstraeaCommandOptions } from '../../lib/Structures/Command'
import { Message, MessageEmbed, version as djs } from 'discord.js'
import { ApplyOptions } from '@sapphire/decorators'
import { version } from '@sapphire/framework'
import { version as ts } from 'typescript'
import { pkg } from '../../config'

@ApplyOptions<AstraeaCommandOptions>({
	name: 'stats',
	description: 'Get the discord bot\'s statistics',
	aliases: ['statistics']
})
export default class Stats extends AstraeaCommand {
	public async run (message: Message): Promise<Message> {
		const embed = new MessageEmbed()
			.setTitle(`${this.container.client.user.username} | ${pkg.version}`)
			.setThumbnail(this.container.client.user.avatarURL())
			.setDescription(
				`\n **Node.js:** ${process.version}` +
			`\n **TypeScript:** v${ts}` +
			`\n **Discord.js:** ${djs}` +
			`\n **Framework:** ${version} \n` +
			`\n **Memory Usage:** ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB` +
			`\n **User Count:** ${this.container.client.users.cache.size}` +
			`\n **Guild Count:** ${this.container.client.guilds.cache.size}` +
			`\n **Channel Count:** ${this.container.client.channels.cache.size}`
			)
			.setColor('YELLOW')

		return await message.channel.send(embed)
	}
}
