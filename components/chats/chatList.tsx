import type { Message } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { useEffect, useRef } from "react"

import { useChat } from "../../contexts/chatContext"
import ChatItem from "./chatitems"
import EmptyScreen from "./emptyScreen"

interface ChatListProps {
  className?: string
}

export default function ChatList({ className }: ChatListProps) {
  const { chatMessages, setChatPrompt } = useChat()

  const scrollContainerRef = useRef(null)

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight
    }
  }, [chatMessages])
  return (
    <div className={cn("pb-12 pt-8", className)}>
      {!chatMessages || chatMessages.length === 0 ? (
        <EmptyScreen setPromptInput={setChatPrompt} />
      ) : (
        <div
          ref={scrollContainerRef}
          className="h-[375px] overflow-y-scroll no-scrollbar">
          {chatMessages.map((message: Message, index: number) => (
            <ChatItem key={index} message={message} />
          ))}
        </div>
      )}
    </div>
  )
}
