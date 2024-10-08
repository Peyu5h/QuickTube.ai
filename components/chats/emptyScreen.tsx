import { cn } from "@/lib/utils"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { HiSparkles } from "react-icons/hi2"

import { Button } from "../ui/button"

interface EmptyScreenProps {
  className?: string
  setPromptInput: (value: any) => void
}

const exampleMessages = [
  {
    heading: "What is the video about?",
    message: "Can you tell me about the video?"
  },
  {
    heading: "What are the key points?",
    message: "What are the key points of the video?"
  },
  {
    heading: "What are the main takeaways?",
    message: "What are the main takeaways of the video?"
  },
  {
    heading: "What are the main topics?",
    message: "What are the main topics discussed in the video?"
  }
]

export default function EmptyScreen({
  className,
  setPromptInput
}: EmptyScreenProps) {
  return (
    <div
      className={cn("mx-auto px-8 bg-background text-foreground", className)}>
      <div className="rounded-md  p-8 w-full justify-center flex flex-col items-center -mt-10">
        <span className="text-2xl flex items-center mb-8">
          QuickTube
          <HiSparkles className="inline mr-0 ml-0.5 w-4 sm:w-5 mb-1" />
          AI
        </span>
        <p className="text-center text-muted-foreground leading-normal mb-4 opacity-70">
          A conversational AI extension for YouTube videos that enables users to
          interact directly with the content. Ask specific questions or request
          detailed information about any segment of the video
        </p>

        <p className="leading-normal text-muted-foreground mb-8 opacity-70">
          Try an example:
        </p>

        <div className="flex flex-col items-start space-y-3 justify-start">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() => setPromptInput(message.message)}
              className="h-auto w-full justify-start border-[0.5px] p-3 opacity-80">
              <ArrowRightIcon className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
