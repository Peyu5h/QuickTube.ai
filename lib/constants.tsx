import { BarChartIcon } from "@radix-ui/react-icons"

export type Model = {
  value: string
  label: string
  content?: string
  icon?: any
}

export type Prompt = {
  value: string
  label: string
  content: string
}

export const models: Model[] = [
  {
    value: "first",
    label: "Gemini 1.5 Flash (Latest)",
    content: "gemini-1.5-flash-latest",
    icon: <BarChartIcon className="h-4 w-4 opacity-70" />
  },
  {
    value: "GPT-3.5",
    label: "GPT-3.5",
    content: "gpt-3.5",
    icon: <BarChartIcon className="h-4 w-4 opacity-70" />
  }
]

export const prompts: Prompt[] = [
  {
    value: "default",
    label: "prompt",
    content: `Here is the prompt:

    "Your output should use the following template:
    
    ## Summary
    
    ## Analogy
    
    ## Notes
    
    - [Emoji] Bulletpoint
    
    ### Keywords
    
    - Explanation
    
    You have been tasked with creating a concise summary of a YouTube video using its transcription to supply college student notes to use himself. You are to act like an expert in the subject the transcription is written about.
    
    Make a summary of the transcript. Use keywords from the transcript. Don't explain them. Keywords will be explained later.
    
    Additionally make a short complex analogy to give context and/or analogy from day-to-day life from the transcript.
    
    Create 10 bullet points (each with an appropriate emoji) that summarize the key points or important moments from the video's transcription.
    
    You are also a transcription AI and you have been provided with a text that may contain mentions of sponsorships or brand names. Your task write what you have been said to do while avoiding any mention of sponsorships or brand names.
    
    Please ensure that the summary, bullet points, and explanations fit within the 500-word limit, while still offering a comprehensive and clear understanding of the video's content. Make summary comparatively longer. Use the text above: "`
  }
]

export type Transcript = {
  text: string
  startTime: number
  endTime: number
}

export type Message = {
  role: string
  content: string
}
