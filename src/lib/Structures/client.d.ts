import { KSoftClient } from '@aero/ksoft'
import Manager from '../Music/Manager'

declare module '@sapphire/framework' {
	interface SapphireClient {
		ksoft: KSoftClient
		music: Manager
	}
}
