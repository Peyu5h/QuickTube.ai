import { useExtension } from "@/contexts/extensionContext"
import { models, type Model } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { PlusIcon } from "@radix-ui/react-icons"

import { useChat } from "../../contexts/chatContext"
import { Button } from "../ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "../ui/tooltip"

interface ChatActionProps {
  className?: string
}

export default function ChatAction({ className }: ChatActionProps) {
  const {
    chatModel,
    chatIsGenerating,
    setChatMessages,
    setChatIsGenerating,
    setChatIsError,
    setChatModel
  } = useChat()

  const { extensionLoading } = useExtension()

  function resetChat() {
    setChatMessages([])
    setChatIsGenerating(false)
    setChatIsError(false)
  }

  return (
    <div
      className={cn(
        "flex flex-row w-full justify-end items-center sticky top-0 z-20 pt-3.5 pb-2 px-3 ",
        className
      )}>
      <div className="flex flex-row space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                className="flex flex-row space-x-2"
                variant="outline"
                onClick={resetChat}
                disabled={chatIsGenerating || extensionLoading}>
                <PlusIcon className="h-4 w-4 opacity-60" />
                <span>New Chat</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Start a new Chat</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}
