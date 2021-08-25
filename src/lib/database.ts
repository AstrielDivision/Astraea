import cfg from '../config'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(cfg.supabase.url, cfg.supabase.key)

export default supabase
