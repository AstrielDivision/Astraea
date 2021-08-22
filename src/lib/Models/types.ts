import type { Document } from 'mongoose'

export interface Settings extends Document {
  registeredAt: Date
  guild_id: string
  settings: {
    prefix: string | null
  }
}

export interface Case extends Document {
  case_id?: string
  case_reason: string
  moderator_id: string
  user_id: string
  guild: string
  pardoned: boolean
}
