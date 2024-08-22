import type { Message } from "@/lib/constants"
import { BsStars } from "react-icons/bs"
import { FaUser } from "react-icons/fa"

import Markdown from "../Markdown"

interface ChatItemProps {
  message: Message
}

export default function ChatItem({ message }: ChatItemProps) {
  return (
    <div className="group relative flex items-start px-8 py-5 bg-background  ">
      <div
        className="
      flex h-10 w-10 shrink-0 select-none items-center justify-center rounded-md  bg-background border  -mt-1">
        {message.role === "user" ? <FaUser /> : <BsStars />}
      </div>
      <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
        {message.role === "assistant" && !message.content ? (
          <span>{spinner}</span>
        ) : (
          <div className={message.role === "assistant" ? "pb-8" : "pb-0"}>
            <Markdown markdown={message.content} />
          </div>
        )}
      </div>
    </div>
  )
}

export const spinner = (
  <svg
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 animate-spin stroke-zinc-400">
    <path d="M12 3v3m6.366-.366-2.12 2.12M21 12h-3m.366 6.366-2.12-2.12M12 21v-3m-6.366.366 2.12-2.12M3 12h3m-.366-6.366 2.12 2.12"></path>
  </svg>
)
