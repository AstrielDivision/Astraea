import { ApplyOptions } from '@sapphire/decorators'
import { PieceContext } from '@sapphire/framework'
import { AstraeaCommandOptions } from '../../lib/Structures/Command'
import { AstraeaOverlayCommand } from '../../lib/Structures/commands/CanvasCommand'

@ApplyOptions<AstraeaCommandOptions>({
	name: 'triggered',
	aliases: ['trigger'],
	description: 'Add a triggered overlay to your or someone elses profile picture',
	usage: '[@user]'
})
export default class Triggered extends AstraeaOverlayCommand {
	constructor (Context: PieceContext, options: AstraeaCommandOptions) {
		super({ overlay: 'triggered' }, Context, options)
	}
}
