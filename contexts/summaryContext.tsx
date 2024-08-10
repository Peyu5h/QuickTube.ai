import { models, prompts, type Model, type Prompt } from "@/lib/constants"
import { createContext, useContext, useEffect, useState } from "react"

import { usePort } from "@plasmohq/messaging/hook"

import { useExtension } from "./extensionContext"

interface SummaryContext {
  summaryModel: Model
  setSummaryModel: (model: Model) => void
  summaryPrompt: Prompt
  setSummaryPrompt: (prompt: Prompt) => void
  summaryContent: string | null
  setSummaryContent: (content: string | null) => void
  summaryIsError: boolean
  setSummaryIsError: (isError: boolean) => void
  summaryIsGenerating: boolean
  setSummaryIsGenerating: (isGenerating: boolean) => void
  generateSummary: (e: any) => void
}

const SummaryContext = createContext<SummaryContext | undefined>(undefined)

export function useSummary() {
  const context = useContext(SummaryContext)
  if (!context) {
    throw new Error("useSummary must be used within a SummaryProvider")
  }
  return context
}

interface SummaryProviderProps {
  children: React.ReactNode
}

export function SummaryProvider({ children }: SummaryProviderProps) {
  const [summaryIsGenerating, setSummaryIsGenerating] = useState<boolean>(false)
  const [summaryModel, setSummaryModel] = useState<Model>(models[0])
  const [summaryPrompt, setSummaryPrompt] = useState<Prompt>(prompts[0])
  const [summaryIsError, setSummaryIsError] = useState<boolean>(false)
  const [summaryContent, setSummaryContent] = useState<string | null>(null)

  const port = usePort("completion")
  const { extensionData, extensionLoading } = useExtension()

  const generateSummary = async (e: any) => {
    e.preventDefault()

    if (summaryContent != null) {
      setSummaryContent(null)
    }

    setSummaryIsGenerating(true)
    setSummaryIsError(false)

    port.send({
      model: summaryModel.content,
      prompt: summaryPrompt.content,
      context: extensionData
    })
  }

  useEffect(() => {
    setSummaryContent(null)
    setSummaryIsGenerating(false)
    setSummaryIsError(false)
  }, [extensionLoading])

  const value = {
    summaryModel,
    setSummaryContent,
    setSummaryModel,
    summaryContent,
    summaryPrompt,
    setSummaryPrompt,
    summaryIsError,
    setSummaryIsError,
    summaryIsGenerating,
    setSummaryIsGenerating,
    generateSummary
  }

  return (
    <SummaryContext.Provider value={value}>{children}</SummaryContext.Provider>
  )
}
