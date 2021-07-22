import { Command, CommandOptions, PieceContext } from '@sapphire/framework'
import { sep } from 'path'

export abstract class NorthCommand extends Command {
	hidden?: boolean
	constructor (Context: PieceContext, options: NorthCommandOptions) {
		super(Context, options)

		this.hidden = false
	}

	public get category (): string {
		const path = this.path

		const splittedPath = path.split(sep)
		const finalPath = splittedPath.slice(splittedPath.indexOf('commands') + 1, -1)

		return finalPath[0]
	}
}

export interface NorthCommandOptions extends CommandOptions {
	hidden?: boolean
}
