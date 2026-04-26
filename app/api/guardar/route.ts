import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  "https://xifishemedtpibapalmb.supabase.co",
  "sb_publishable_KtifAyY_NTTvt2WoBOS9ag_CWGEylxX"
)

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // 🔥 AGREGAR FECHA AUTOMÁTICA
    body.fecha = new Date().toISOString()

    console.log("BODY:", body)

    const { data, error } = await supabase
      .from("Predicco")
      .insert(body)

    console.log("DATA:", data)
    console.log("ERROR:", error)

    if (error) {
      return new Response(JSON.stringify({ error }), { status: 500 })
    }

    return new Response(JSON.stringify({ ok: true, data }), { status: 200 })

  } catch (err) {
    console.error("SERVER ERROR:", err)
    return new Response(JSON.stringify({ error: err }), { status: 500 })
  }
}