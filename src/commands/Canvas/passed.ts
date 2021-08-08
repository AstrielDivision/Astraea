import { AstraeaOverlayCommand, AstraeaCommandOptions } from '../../lib/Structures/Command'
import { PieceContext } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'

@ApplyOptions<AstraeaCommandOptions>({
	name: 'passed',
	description: 'Add a GTA + Respect overlay to your or someone elses profile picture'
})
export default class Passed extends AstraeaOverlayCommand {
	constructor (Context: PieceContext, options: AstraeaCommandOptions) {
		super({ overlay: 'passed' }, Context, options)
	}
}
