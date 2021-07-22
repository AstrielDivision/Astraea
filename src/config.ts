/**
 * Original by: TMUniversal
 * Licensed under the MIT Licensed
 */
import * as appRootPath from 'app-root-path'
import * as convict from 'convict'
import { Snowflake } from 'discord.js'
import { existsSync, readFileSync } from 'fs'
import { join } from 'path'
interface Configuration {
	version?: string | number
	token: string
	ksoft: string
	prefix: string
	owners: Snowflake | Snowflake[]
}

export interface PackageJson {
	name: string
	version: string
	description: string
	main: string
	scripts: {
		[name: string]: string
	}
	authors: string[]
	contributors: string[]
	license: string
	devDependencies?: {
		[packageName: string]: string
	}
	dependencies?: {
		[packageName: string]: string
	}
	repository?: {
		type: string
		url: string
	}
	keywords?: string[]
	bugs?: {
		url: string
	}
	homepage?: string
}

const isWebhook = (v: unknown): boolean =>
/* eslint-disable @typescript-eslint/no-unsafe-return */
	typeof v === 'object' &&
  Object.prototype.hasOwnProperty.call(v, 'id') &&
  Object.prototype.hasOwnProperty.call(v, 'secret')

convict.addFormat({
	name: 'webhook',
	validate: isWebhook
})

const config = convict<Configuration>({
	version: {
		format: v => /(\d+\.\d+\.\d+)(-[\w\d-.]*)?/.test(v),
		default: '0'
	},
	token: {
		format: v => typeof v === 'string' && !!v && v.length < 30,
		arg: 'token',
		env: 'CLIENT_TOKEN',
		default: ''
	},
	prefix: {
		format: String,
		env: 'CLIENT_PREFIX',
		arg: 'prefix',
		default: '.'
	},
	owners: {
		format: Array,
		env: 'CLIENT_OWNERS',
		default: []
	},
	ksoft: {
		format: String,
		default: ''
	}
})

if (existsSync(join(appRootPath.path, 'config', 'main.json'))) {
	config.loadFile(join(appRootPath.path, 'config', 'main.json'))
}

export const pkg: PackageJson = JSON.parse(readFileSync(join(appRootPath.path, 'package.json'), { encoding: 'utf-8' }))

config.set('version', pkg.version)

config.validate({ allowed: 'strict' })

export default config.getProperties()
