import { models } from "@/lib/constants"
import { GoogleGenerativeAI } from "@google/generative-ai"

import type { PlasmoMessaging } from "@plasmohq/messaging"

const genAI = new GoogleGenerativeAI(
  process.env.PLASMO_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY
)

async function createCompletion(model: string, prompt: string, context: any) {
  const parsed = context.transcript.events
    .filter((x: { segs: any }) => x.segs)
    .map((x: { segs: any[] }) =>
      x.segs.map((y: { utf8: any }) => y.utf8).join(" ")
    )
    .join(" ")
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/\s+/g, " ")

  const USER = `${prompt}\n\nVideo Title: ${context.metadata.title}\nVideo Transcript: ${parsed}`

  const Model = genAI.getGenerativeModel({
    model: models[0].content
  })

  const result = await Model.generateContentStream({
    contents: [{ role: "user", parts: [{ text: USER }] }]
  })

  return result
}

const handler: PlasmoMessaging.PortHandler = async (req, res) => {
  let cumulativeData = ""

  const prompt = req.body.prompt
  const model = req.body.model
  const context = req.body.context

  try {
    const completion = await createCompletion(model, prompt, context)

    for await (const chunk of completion.stream) {
      const chunkText = chunk.text()
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
