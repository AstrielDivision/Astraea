export interface GuildSettings {
  id?: string
  registeredAt?: string
  guild_id?: string
  prefix?: string | null
  anti?: {
    unmentionable?: boolean
    invites?: boolean
    gifts?: boolean
  }
}

export interface Case {
  id?: string
  case_id?: string
  case_reason?: string
  moderator_id?: string
  user_id?: string
  guild?: string
  pardoned?: boolean
}
