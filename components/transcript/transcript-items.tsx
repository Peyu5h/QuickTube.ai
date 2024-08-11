import { CheckIcon, ClipboardCopyIcon, ClockIcon } from "@radix-ui/react-icons"
import { memo, useState } from "react"

import { Button } from "../ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "../ui/tooltip"

type Transcript = {
  text: string
  startTime: number
  endTime: number
}

interface TranscriptItemProps {
  item: Transcript
  searchInput: string
}

function TranscriptItem({ item, searchInput }: TranscriptItemProps) {
  const player = document.querySelector("video")

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

  const CopyVideoURL = () => {
    if (isCopied) return
    copyToClipboard(window.location.href)
  }

  function JumpToTime() {
    player.currentTime = item.startTime / 1000
  }

  function CopySection() {
    if (isCopied) return
    copyToClipboard(item.text)
  }

  const highlightText = (text: string, search: string): JSX.Element => {
    if (!search) return <>{text}</>
    const parts = text.split(new RegExp(`(${search})`, "gi"))
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === search.toLowerCase() ? (
            <mark key={index} style={{ backgroundColor: "yellow" }}>
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    )
  }

  const startTime = new Date(item.startTime).toISOString().substr(14, 5)
  const endTime = new Date(item.endTime).toISOString().substr(14, 5)

  return (
    <div
      data-start-time={item.startTime}
      data-end-time={item.endTime}
      className="flex flex-col w-full justify-between items-center p-3 border-[0.5px] rounded-md dark:border-zinc-800 border-zinc-200 space-y-4 group">
      <div className="w-full flex flex-row items-center justify-between">
        <Button
          variant="outline"
          className="space-x-2  border-[0.5px]"
          onClick={JumpToTime}>
          <ClockIcon className="h-4 w-4 opacity-60" />
          <span className="text-blue-500 text-[11px] hover:cursor-pointer hover:underline">
            {startTime}: {endTime}
          </span>
        </Button>

        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button variant="outline" size="icon" onClick={CopySection}>
                  {isCopied ? (
                    <CheckIcon className="h-4 w-4 opacity-60" />
                  ) : (
                    <ClipboardCopyIcon className="h-4 w-4 opacity-60" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy Section</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <p className="text-[10.5px] capitalize leading-7">
        {highlightText(item.text, searchInput)}
      </p>
    </div>
  )
}

export default memo(TranscriptItem)
