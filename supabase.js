import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://xifishemedtpibapalmb.supabase.co"
const supabaseKey = "sb_publishable_KtifAyY_NTTvt2WoBOS9ag_CWGEylxX"

export const supabase = createClient(supabaseUrl, supabaseKey)