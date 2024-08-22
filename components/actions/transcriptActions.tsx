import { useExtension } from "@/contexts/extensionContext"
import { useTranscript } from "@/contexts/transcriptContext"
import { cleanTextTranscript } from "@/utils/functions"
import { Crosshair1Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons"

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "../ui/tooltip"

interface TranscriptActionsProps {
  jumpCurrentTime: () => void
}

export default function TranscriptActions({
  jumpCurrentTime
}: TranscriptActionsProps) {
  const { transcriptSearch, setTranscriptSearch, transcriptJson } =
    useTranscript()

  const { extensionLoading, extensionData } = useExtension()

  return (
    <div className="flex flex-row w-full  justify-between items-center sticky top-0 z-10  pt-3.5 pb-3 px-3 space-x-4 bg-background">
      <div className="relative w-full">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 opacity-60 " />
        <Input
          type="text"
          placeholder="Search Transcript"
          className="pl-8 border border-border"
          onChange={(e) => {
            e.preventDefault()
            setTranscriptSearch(e.currentTarget.value)
          }}
          disabled={extensionLoading || transcriptJson.length === 0}
        />
      </div>

      <div className="flex flex-row space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                variant="outline"
                size="icon"
                onClick={jumpCurrentTime}
                disabled={extensionLoading || transcriptJson.length === 0}>
                <Crosshair1Icon className="h-4 w-4 opacity-60" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Jump to Current Time</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}
