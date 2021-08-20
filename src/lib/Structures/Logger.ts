import type { ILogger, LogLevel } from '@sapphire/framework'
import { MessageAttachment, WebhookClient, WebhookMessageOptions, MessageEmbed } from 'discord.js'
import { EOL } from 'os'
import cfg from '../../config'
import colorette from 'colorette'

export default class AstraeaLogger implements ILogger {
  private readonly loglevel: LogLevel
  constructor(private readonly namespace: string) {}

  has(level: LogLevel): boolean {
    return level >= this.loglevel
  }

  trace(...message: unknown[]): void {
    this._write('TRACE', message)
  }

  info(...message: unknown[]): void {
    this._write('INFO', message)
  }

  debug(...message: unknown[]): void {
    this._write('DEBUG', message)
  }

  warn(...message: unknown[]): void {
    this._write('WARN', message)
  }

  error(...message: unknown[]): void {
    this._write('ERROR', message)
  }

  fatal(...message: unknown[]): void {
    this._write('FATAL', message)
  }

  write(...message: unknown[]): void {
    this._write('WRITE', message)
  }

  /**
   * Will not be sent through the Webhook
   * @param message Message to log
   */
  console(...message: unknown[]): void {
    this._write('LOG', message)
  }

  protected _write(level: string, ...values: readonly unknown[]): void {
    process.stdout.write(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `[${levels.foreground(new Date().toLocaleString())} | ${levels.foreground(this.namespace + ' Logger')} | ${levels[
        level
      ](level)}]: ${values.join(' ')} ${EOL}`
    )

    if (level === 'LOG') return

    const hook = new WebhookClient({ url: cfg.webhook })

    const embed: MessageEmbed = new MessageEmbed().setTimestamp().setColor('YELLOW').setTitle('Log')
    const options: WebhookMessageOptions = {
      embeds: [embed],
      username: this.namespace + ' Logger',
      avatarURL: 'https://lazy.devswhofuckdevs.xyz/55vQ3rlwU.png'
    }

    if (values.length < 2048) {
      embed.setDescription(values.join(' '))
    } else {
      embed.setDescription('Message too long.')
      options.files = [new MessageAttachment(Buffer.from(values.join(' ')), 'message.txt')]
    }
    void hook.send(options).catch(() => null)
  }
}

const levels = {
  TRACE: colorette.gray,
  INFO: colorette.greenBright,
  DEBUG: colorette.cyan,
  WARN: colorette.yellow,
  ERROR: colorette.bgRedBright,
  FATAL: colorette.bgRed,
  CONSOLE: colorette.magenta,
  foreground: colorette.gray
}
