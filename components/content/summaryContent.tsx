import { useSummary } from "@/contexts/summaryContext"

import Markdown from "../Markdown"
import SummarySkeleton from "../skeleton/summarySkeleton"
import { Button } from "../ui/button"

export default function SummaryContent() {
  const {
    summaryIsGenerating,
    summaryContent,
    generateSummary,
    summaryIsError
  } = useSummary()

  if (summaryIsGenerating) {
    return (
      <div className="flex justify-center items-center w-full p-3 bg-white dark:bg-[#0f0f0f] overflow-y-hidden h-[300px]">
        <SummarySkeleton />
      </div>
    )
  }

  if (summaryIsError) {
    return (
      <div className="p-3 bg-white dark:bg-[#0f0f0f] text-red-500">
        {summaryContent}
      </div>
    )
  }

  if (!summaryContent) {
    return (
      <div className="flex justify-center items-center w-full p-3 bg-white dark:bg-[#0f0f0f]">
        <Button
          variant="outline"
          className="w-full h-12"
          onClick={generateSummary}>
          <span className="text-sm">Generate Summary</span>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center w-full p-3 bg-white dark:bg-[#0f0f0f]">
      <div className="h-[600px] w-full px-3 opacity-80">
        <Markdown markdown={summaryContent} className="pb-6" />
      </div>
    </div>
  )
}
