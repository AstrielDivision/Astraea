import { Command, CommandOptions, PieceContext } from '@sapphire/framework'
import { SubCommandPluginCommand, SubCommandPluginCommandOptions } from '@sapphire/plugin-subcommands'
import { sep } from 'path'

export class NorthSubCommand extends SubCommandPluginCommand {
	hidden?: boolean
	constructor (Context: PieceContext, options: SubCommandPluginCommandOptions) {
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

export interface NorthSubCommandOptions extends SubCommandPluginCommandOptions {
	hidden?: boolean
}
