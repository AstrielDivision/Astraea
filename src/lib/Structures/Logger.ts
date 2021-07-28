import { Logger } from '@sapphire/framework'
import { EOL } from 'os'

type RGB = [number, number, number]

export default class NorthLogger extends Logger {
	constructor (private readonly _name: string) {
		super(null)
	}

	private formatRGB ([r, g, b]: RGB, ...str): string {
		return `\x1b[38;2;${r};${g};${b}m${str.join(' ')}\x1b[0m`
	}

	private readonly colours: {
		info: RGB
		debug: RGB
		error: RGB
		warn: RGB
		foreground: RGB
	} = {
		info: [143, 188, 187],
		debug: [161, 188, 138],
		error: [191, 97, 106],
		warn: [235, 203, 139],
		foreground: [139, 132, 121]
	}

	trace (...message: unknown[]): void {
		this._write(this.colours.info, 'TRACE', message)
	}

	info (...message: unknown[]): void {
		this._write(this.colours.info, 'INFO', message)
	}

	debug (...message: unknown[]): void {
		this._write(this.colours.debug, 'DEBUG', message)
	}

	warn (...message: unknown[]): void {
		this._write(this.colours.warn, 'WARN', message)
	}

	error (...message: unknown[]): void {
		this._write(this.colours.error, 'ERROR', message)
	}

	fatal (...message: unknown[]): void {
		this._write(this.colours.error, 'FATAL', message)
	}

	write (...message: unknown[]): void {
		this._write(this.colours.info, 'WRITE', message)
	}

	protected _write (colour: RGB, level: string, ...message: unknown[]): void {
		process.stdout.write(
			`[${this.formatRGB(this.colours.foreground, this._name)} ${this.formatRGB(this.colours.foreground, 'Logger')} | ${this.formatRGB(colour, level)}]: ${this.formatRGB(colour, message)}${EOL}`
		)
	}
}
