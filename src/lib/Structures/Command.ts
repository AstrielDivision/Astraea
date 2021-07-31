import { Command, CommandOptions, PieceContext } from '@sapphire/framework'
import { sep } from 'path'

export abstract class AstraeaCommand extends Command {
	visible?: boolean
	constructor (Context: PieceContext, options: CommandOptions) {
		super(Context, options)

		this.visible = false
	}

	public get category (): string {
		const path = this.path

		const splittedPath = path.split(sep)
		const finalPath = splittedPath.slice(splittedPath.indexOf('commands') + 1, -1)

		return finalPath[0]
	}
}

export interface AstraeaCommandOptions extends CommandOptions {
}
