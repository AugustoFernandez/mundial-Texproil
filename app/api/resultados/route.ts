import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  "https://xifishemedtpibapalmb.supabase.co",
  "sb_publishable_KtifAyY_NTTvt2WoBOS9ag_CWGEylxX"
)

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("Predicco")
      .select("*")

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500 }
      )
    }

    return new Response(
      JSON.stringify({ data }),
      { status: 200 }
    )

  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    )
  }
}