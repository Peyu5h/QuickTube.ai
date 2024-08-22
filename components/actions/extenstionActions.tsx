import { useExtension } from "@/contexts/extensionContext"
import {
  ActivityLogIcon,
  CaretSortIcon,
  ChatBubbleIcon,
  CheckIcon,
  Link2Icon,
  Pencil2Icon
} from "@radix-ui/react-icons"
import { useState } from "react"
import { GoStar } from "react-icons/go"

import { Button } from "../ui/button"
import { CollapsibleTrigger } from "../ui/collapsible"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "../ui/tooltip"

export default function ExtensionActions() {
  const { setExtensionPanel, extensionIsOpen, setExtensionIsOpen } =
    useExtension()

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

  return (
    <div className="rounded flex items-center justify-between p-2.5 px-3 bg-background border">
      <div className="flex items-center space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                variant="outline"
                size="icon"
                className="rounded-lg"
                onClick={() => CopyVideoURL()}>
                {isCopied ? (
                  <CheckIcon className="h-4.5 w-4.5 opacity-60" />
                ) : (
                  <Link2Icon className="h-4.5 w-4.5 opacity-60" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy video url</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                variant="outline"
                size="icon"
                className="rounded-lg"
                onClick={() =>
                  window.open("https://github.com/Peyu5h/quickTube", "_blank")
                }>
                <GoStar className="h-4.5 w-4.5 opacity-60" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Star on GitHub</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex justify-center items-center w-full space-x-2">
        <div className="flex -space-x-px">
          <Button
            variant="outline"
            onClick={() => {
              setExtensionPanel("Summary")
              if (!extensionIsOpen) setExtensionIsOpen(true)
            }}
            className="
          rounded-none w-full focus:z-10 bg-transparent space-x-2 items-center  border-r-2">
            <Pencil2Icon className="h-4 w-4 opacity-60" />
            <span className="opacity-90">Summary</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setExtensionPanel("Transcript")
              if (!extensionIsOpen) setExtensionIsOpen(true)
            }}
            className="
          rounded-r-none rounded-l-none border-x-0  bg-transparent space-x-2 items-center">
            <ActivityLogIcon className="h-4 w-4 opacity-60" />
            <span className="opacity-90">Transcript</span>
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              setExtensionPanel("Chat")
              if (!extensionIsOpen) setExtensionIsOpen(true)
            }}
            className="w-full 
          rounded-l-none focus:z-10 bg-transparent space-x-2 items-center">
            <ChatBubbleIcon className="h-4 w-4 opacity-60" />
            <span className="opacity-90">Chat</span>
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="h-4.5 w-4.5 bg-transparent"></div>

        <CollapsibleTrigger asChild>
          <Button variant="outline" size="icon">
            <CaretSortIcon className="h-4.5 w-4.5 opacity-60" />
          </Button>
        </CollapsibleTrigger>
      </div>
    </div>
  )
}
