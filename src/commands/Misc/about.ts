import { AstraeaCommand, AstraeaCommandOptions } from '../../lib/Structures/Command'
import { Message, MessageEmbed } from 'discord.js'
import { ApplyOptions } from '@sapphire/decorators'
import { pkg } from '../../config'

@ApplyOptions<AstraeaCommandOptions>({
	name: 'about',
	description: 'Discord bot about'
})
export default class About extends AstraeaCommand {
	public async run (message: Message): Promise<Message> {
		const embed = new MessageEmbed()
			.setTitle(`${this.container.client.user.username} - About`)
			.setDescription(`Hello! I'm ${this.container.client.user.username}.\nI am a Image discord bot with some other things too.\n Need images? I'm the bot you need! :)`)
			.addFields(
				{ name: 'Developed by', value: 'ArtieFuzzz#8298 @ [Astraea Studios](https://github.com/AstraeaStudios/Astraea)' },
				{ name: 'Contributors', value: pkg.contributors.join(', ') },
				{ name: 'Built With', value: '[Discord.js](https://github.com/discordjs/discord.js)\n [Sapphire/Framework](https://github.com/sapphiredev/framework)' }
			)

			.setFooter(`v${pkg.version} - Written in TypeScript, powered by Node.js`)
			.setTimestamp()
			.setThumbnail(this.container.client.user.avatarURL())

		return await message.channel.send(embed)
	}
}
