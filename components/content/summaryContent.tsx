import { useSummary } from "@/contexts/summaryContext"

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
      <div className="flex justify-center items-center w-full p-3 bg-white dark:bg-[#0f0f0f]">
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
    <div className="p-3 bg-white dark:bg-[#0f0f0f]">
      <div className="">{summaryContent}</div>
    </div>
  )
}
