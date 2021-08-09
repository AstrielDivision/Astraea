import { AstraeaOverlayCommand, AstraeaCommandOptions } from '../../lib/Structures/Command'
import { PieceContext } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'

@ApplyOptions<AstraeaCommandOptions>({
	name: 'triggered',
	aliases: ['trigger'],
	description: 'Add a triggered overlay to your or someone elses profile picture',
	usage: 'triggered [@user]'
})
export default class Triggered extends AstraeaOverlayCommand {
	constructor (Context: PieceContext, options: AstraeaCommandOptions) {
		super({ overlay: 'triggered' }, Context, options)
	}
}
