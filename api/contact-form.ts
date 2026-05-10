/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createClient } from "@supabase/supabase-js"
import type { VercelRequest, VercelResponse } from "@vercel/node"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  // Solo permitimos peticiones POST
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed" })
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body = request.body

    const { error } = await supabase
      .from("Form_BOA")
      .insert([
        { 
          nombre_formulario: "form-contact", 
          datos: body 
        }
      ])

    if (error) throw error

    return response.status(200).json({ success: true, message: "Saved Data" })
  } catch (error: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return response.status(500).json({ success: false, error: error.message })
  }
}