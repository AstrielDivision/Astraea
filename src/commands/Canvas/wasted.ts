import { ApplyOptions } from '@sapphire/decorators'
import { PieceContext } from '@sapphire/framework'
import { AstraeaCommandOptions } from '../../lib/Structures/Command'
import { AstraeaOverlayCommand } from './Base'

@ApplyOptions<AstraeaCommandOptions>({
	name: 'wasted',
	description: 'Add a GTA 5 wasted overlay to your or someone elses profile picture',
	usage: '[@user]'
})
export default class Wasted extends AstraeaOverlayCommand {
	constructor (Context: PieceContext, options: AstraeaCommandOptions) {
		super({ overlay: 'wasted' }, Context, options)
	}
}
