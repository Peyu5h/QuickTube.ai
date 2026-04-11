import Groq from "groq-sdk"

import type { PlasmoMessaging } from "@plasmohq/messaging"

const groq = new Groq({
  apiKey: process.env.PLASMO_PUBLIC_GROQ_API_KEY
})

async function createCompletion(model: string, prompt: string, context: any) {
  if (!context.transcript || !context.transcript.events) {
    throw new Error("No transcript available for this video")
  }

  const parsed = context.transcript.events
    .filter((x: { segs: any }) => x.segs)
    .map((x: { segs: any[] }) =>
      x.segs.map((y: { utf8: any }) => y.utf8).join(" ")
    )
    .join(" ")
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/\s+/g, " ")

  const USER = `${prompt}\n\nVideo Title: ${context.metadata.title}\nVideo Transcript: ${parsed}`

  return groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: USER }],
    stream: true
  })
}

const handler: PlasmoMessaging.PortHandler = async (req, res) => {
  let cumulativeData = ""

  const prompt = req.body.prompt
  const model = req.body.model
  const context = req.body.context

  try {
    const completion = await createCompletion(model, prompt, context)

    for await (const chunk of completion) {
      const chunkText = chunk.choices[0]?.delta?.content || ""
      cumulativeData += chunkText
      res.send({ message: cumulativeData, error: "", isEnd: false })
    }

    res.send({ message: "END", error: "", isEnd: true })
  } catch (error) {
    console.error("Error in handler:", error)
    res.send({
      error: "Something went wrong",
      details: (error as Error).message
    })
  }
}

export default handler
