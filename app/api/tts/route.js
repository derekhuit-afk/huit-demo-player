export const runtime = 'edge'

export async function POST(req) {
  const { text, voice_id = 'EXAVITQu4vr4xnSDxMaL' } = await req.json()

  const apiKey = process.env.ELEVENLABS_API_KEY
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'ELEVENLABS_API_KEY not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice_id}`, {
    method: 'POST',
    headers: {
      'xi-api-key': apiKey,
      'Content-Type': 'application/json',
      'Accept': 'audio/mpeg',
    },
    body: JSON.stringify({
      text,
      model_id: 'eleven_turbo_v2_5',
      voice_settings: {
        stability: 0.48,
        similarity_boost: 0.78,
        style: 0.12,
        use_speaker_boost: true,
      },
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    return new Response(JSON.stringify({ error: err }), {
      status: res.status,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const buffer = await res.arrayBuffer()
  return new Response(buffer, {
    headers: {
      'Content-Type': 'audio/mpeg',
      'Cache-Control': 'no-store',
    }
  })
}
