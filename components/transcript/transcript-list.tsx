import { memo, useMemo } from "react"

import TranscriptItems from "./transcript-items"

type Transcript = {
  text: string
  startTime: number
  endTime: number
}

interface TranscriptListProps {
  transcript: Transcript[]
  searchInput: string
}

function TranscriptList({ transcript, searchInput }: TranscriptListProps) {
  const filteredTranscripts = useMemo(() => {
    return searchInput
      ? transcript.filter((item) =>
          item.text.toLowerCase().includes(searchInput.toLowerCase())
        )
      : transcript
  }, [transcript, searchInput])

  if (filteredTranscripts.length === 0) {
    return (
      <div className="flex justify-center items-center w-full h-32">
        <span>No results found.</span>
      </div>
    )
  }

  return (
    <div className="space-y-4 mr-3 ml-3">
      {filteredTranscripts.map((item: Transcript) => (
        <TranscriptItems
          key={item.startTime}
          item={item}
          searchInput={searchInput}
        />
      ))}
    </div>
  )
}

export default memo(TranscriptList, (prevProps, nextProps) => {
  return (
    prevProps.transcript === nextProps.transcript &&
    prevProps.searchInput === nextProps.searchInput
  )
})
