import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  "https://xifishemedtpibapalmb.supabase.co",
  "sb_publishable_KtifAyY_NTTvt2WoBOS9ag_CWGEylxX"
)

export async function GET() {
  const { data, error } = await supabase
    .from("Predicco")
    .select("*")

  return new Response(
    JSON.stringify({ data, error }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}