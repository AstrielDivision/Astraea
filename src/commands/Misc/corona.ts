import { AstraeaCommand, AstraeaCommandOptions } from '../../lib/Structures/Command'
import { Message, MessageEmbed } from 'discord.js'
import { ApplyOptions } from '@sapphire/decorators'
import { Args } from '@sapphire/framework'
import CoronaFetch from '../../lib/corona-fetch/corona'

@ApplyOptions<AstraeaCommandOptions>({
	name: 'corona',
	description: 'Get COVID-19 statistics worldwide or by country'
})
export default class Corona extends AstraeaCommand {
	public async run (message: Message, args: Args): Promise<Message> {
		const country = (await args.pickResult('string')).value

		const embed = new MessageEmbed()

		if (country) {
			const res = await CoronaFetch.country(country)

			embed.setTitle(`${res.country} COVID-19 Stats`)
			embed.addFields([
				{ name: 'Active Cases', value: res.active },
				{ name: 'Today Cases', value: res.todayCases },
				{ name: 'Deaths', value: res.deaths },
				{ name: 'Today Deaths', value: res.todayDeaths },
				{ name: 'Critical Cases', value: res.critical }
			])
			embed.setThumbnail(res.countryInfo.flag)

			return await message.channel.send(embed)
		}
		const res = await CoronaFetch.all()

		embed.setTitle('Global COVID-19 Stats')
		embed.addFields([
			{ name: 'Active Cases', value: res.active },
			{ name: 'Today Cases', value: res.todayCases },
			{ name: 'Deaths', value: res.deaths },
			{ name: 'Today Deaths', value: res.todayDeaths },
			{ name: 'Critical Cases', value: res.critical },
			{ name: 'Affected Countries', value: res.affectedCountries }
		])

		return await message.channel.send(embed)
	}
}
