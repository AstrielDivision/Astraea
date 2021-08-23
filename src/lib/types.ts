export interface GuildSettings {
  registeredAt: string
  guild_id: string
  prefix: string | null
  'anti-unmentionable': boolean
  'anti-invites': boolean
}

export interface Case {
  case_id: string
  case_reason: string
  moderator_id: string
  user_id: string
  guild: string
  pardoned: boolean
}
