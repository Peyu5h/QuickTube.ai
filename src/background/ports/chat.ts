import { GoogleGenerativeAI } from "@google/generative-ai"

import type { PlasmoMessaging } from "@plasmohq/messaging"

const genAI = new GoogleGenerativeAI(
  process.env.PLASMO_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY
)

const SYSTEM = `
You are a helpful assistant. Given the metadata and transcript of a YouTube video, your primary task is to provide accurate and relevant answers to any questions based on this information. Use the available details effectively to assist users with their inquiries about the video's content, context, or any other related aspects.
START OF METADATA
Video Title: {title}
END OF METADATA
START OF TRANSCRIPT
{transcript}
END OF TRANSCRIPT
`

async function createChatCompletion(
  model: string,
  messages: any[],
  context: any
) {
  const parsed = context.transcript.events
    .filter((x: { segs: any }) => x.segs)
    .map((x: { segs: any[] }) =>
      x.segs.map((y: { utf8: any }) => y.utf8).join(" ")
    )
    .join(" ")
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/\s+/g, " ")

  const SYSTEM_WITH_CONTEXT = SYSTEM.replace(
    "{title}",
    context.metadata.title
  ).replace("{transcript}", parsed)

  const formattedMessages = [
    { role: "user", parts: [{ text: SYSTEM_WITH_CONTEXT }] },
    ...messages.map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user", // Map 'assistant' to 'model'
      parts: [{ text: msg.content }]
    }))
  ]

  console.log("Formatted Messages:", JSON.stringify(formattedMessages, null, 2)) // Debug log

  const Model = genAI.getGenerativeModel({ model })

  return Model.generateContentStream({
    contents: formattedMessages
  })
}

const handler: PlasmoMessaging.PortHandler = async (req, res) => {
  let cumulativeData = ""
  const messages = req.body.messages
  const model = "gemini-1.5-pro"
  const context = req.body.context

  try {
    const completion = await createChatCompletion(model, messages, context)

    for await (const chunk of completion.stream) {
      const chunkText = chunk.text()
      cumulativeData += chunkText
      res.send({ message: cumulativeData, error: null, isEnd: false })
    }

    res.send({ message: "END", error: null, isEnd: true })
  } catch (error) {
    console.error("Error in handler:", error)
    res.send({
      error: "Something went wrong",
      details: (error as Error).message
    })
  }
}

export default handler
