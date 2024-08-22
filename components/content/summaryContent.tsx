import { useSummary } from "@/contexts/summaryContext"

import SummaryActions from "../actions/summaryActions"
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
      <div className="flex justify-center items-center w-full p-3 bg-background overflow-y-hidden h-[300px]">
        <SummarySkeleton />
      </div>
    )
  }

  if (summaryIsError) {
    return (
      <div className="p-3 bg-background text-red-500">{summaryContent}</div>
    )
  }

  if (!summaryContent) {
    return (
      <div className="flex justify-center items-center w-full p-3 bg-background">
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
    <div className="flex flex-col w-full h-full bg-background">
      <SummaryActions />
      <div className="flex-grow overflow-y-auto">
        <div className="h-full w-full px-6 py-3 bg-background">
          <Markdown markdown={summaryContent} className="pb-6" />
        </div>
      </div>
    </div>
  )
}
