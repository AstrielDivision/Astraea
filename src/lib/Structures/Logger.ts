import type { ILogger, LogLevel } from '@sapphire/framework'
import { MessageAttachment, WebhookClient, WebhookMessageOptions, MessageEmbed } from 'discord.js'
import { EOL } from 'os'
import cfg from '../../config'

type RGB = [number, number, number]

export default class AstraeaLogger implements ILogger {
  private readonly loglevel: LogLevel
  constructor(private readonly namespace: string) {}

  private formatRGB([r, g, b]: RGB, ...str): string {
    return `\x1b[38;2;${r};${g};${b}m${str.join(' ')}\x1b[0m`
  }

  protected get processTag(): string {
    if (process.env.SHARDS) return `SHARD ${process.env.SHARDS}`
    if (process.env.SHARDING_MANAGER) return 'MANAGER'
    return 'GLOBAL'
  }

  private readonly colours: {
    info: RGB
    debug: RGB
    error: RGB
    warn: RGB
    foreground: RGB
  } = {
    info: [204, 249, 207],
    debug: [137, 161, 188],
    error: [220, 50, 48],
    warn: [229, 136, 36],
    foreground: [89, 74, 80]
  }

  has(level: LogLevel): boolean {
    return level >= this.loglevel
  }

  trace(...message: unknown[]): void {
    this._write(this.colours.info, 'TRACE', message)
  }

  info(...message: unknown[]): void {
    this._write(this.colours.info, 'INFO', message)
  }

  debug(...message: unknown[]): void {
    this._write(this.colours.debug, 'DEBUG', message)
  }

  warn(...message: unknown[]): void {
    this._write(this.colours.warn, 'WARN', message)
  }

  error(...message: unknown[]): void {
    this._write(this.colours.error, 'ERROR', message)
  }

  fatal(...message: unknown[]): void {
    this._write(this.colours.error, 'FATAL', message)
  }

  write(...message: unknown[]): void {
    this._write(this.colours.info, 'WRITE', message)
  }

  /**
   * Will not be sent through the Webhook
   * @param message Message to log
   */
  console(...message: unknown[]): void {
    this._write(this.colours.info, 'CONSOLE', message)
  }

  protected _write(colour: RGB, level: string, ...message: unknown[]): void {
    process.stdout.write(
      `[${this.formatRGB(this.colours.foreground, this.processTag)} | ${this.formatRGB(
        this.colours.foreground,
        new Date().toLocaleString()
      )} | ${this.formatRGB(this.colours.foreground, this.namespace)} ${this.formatRGB(
        this.colours.foreground,
        'Logger'
      )} | ${this.formatRGB(colour, level)}]: ${this.formatRGB(colour, message)}${EOL}`
    )

    if (level === 'CONSOLE') return

    const hook = new WebhookClient({ url: cfg.webhook })

    const embed: MessageEmbed = new MessageEmbed()
      .setTimestamp()
      .setColor('YELLOW')
      .setFooter(this.processTag)
      .setTitle('Log')
    const options: WebhookMessageOptions = {
      embeds: [embed],
      username: this.namespace + ' Logger',
      avatarURL: 'https://lazy.devswhofuckdevs.xyz/55vQ3rlwU.png'
    }

    if (message.length < 2048) {
      embed.setDescription(message.join(' '))
    } else {
      embed.setDescription('Message too long.')
      options.files = [new MessageAttachment(Buffer.from(message.join(' ')), 'message.txt')]
    }
    void hook.send(options).catch(() => null)
  }
}
