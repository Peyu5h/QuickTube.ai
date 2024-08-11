import { useSummary } from "@/contexts/summaryContext"
import { CheckIcon, ClipboardCopyIcon, ReloadIcon } from "@radix-ui/react-icons"
import { useState } from "react"

import { Button } from "../ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "../ui/tooltip"

export default function SummaryActions() {
  const {
    summaryPrompt,
    summaryIsGenerating,
    summaryContent,
    setSummaryPrompt,
    generateSummary
  } = useSummary()

  const [isCopied, setIsCopied] = useState<boolean>(false)
  const copyToClipboard = (value: string) => {
    if (typeof window === "undefined" || !navigator.clipboard?.writeText) {
      return
    }

    if (!value) {
      return
    }

    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true)

      setTimeout(() => {
        setIsCopied(false)
      }, 2000)
    })
  }

  function CopySummary() {
    if (isCopied || !summaryContent || summaryIsGenerating) return
    copyToClipboard(summaryContent)
  }

  return (
    <div className="flex flex-row w-full justify-end items-center sticky top-0 z-20 dark:bg-[#0f0f0f] dark:text-white pt-3.5 pb-2 px-3">
      <div className="flex flex-row space-x-2 ">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                className="bg-white dark:bg-[#0f0f0f]"
                variant="outline"
                size="icon"
                onClick={generateSummary}
                disabled={summaryIsGenerating}>
                <ReloadIcon className="h-4 w-4 opacity-60" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Regenerate summary</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                className="bg-white dark:bg-[#0f0f0f]"
                variant="outline"
                size="icon"
                onClick={CopySummary}
                disabled={summaryIsGenerating}>
                {isCopied ? (
                  <CheckIcon className="h-4.5 w-4.5 opacity-60" />
                ) : (
                  <ClipboardCopyIcon className="h-4.5 w-4.5 opacity-60" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy Summary</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}
