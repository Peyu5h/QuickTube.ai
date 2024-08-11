import { useRef } from "react"

import TranscriptActions from "../actions/transcriptActions"
import TranscriptContent from "../content/transcriptContent"

export default function Transcript() {
  const player = document.querySelector("video")
  const transcriptListRef = useRef(null)

  function jumpCurrentTime(): void {
    if (!player || !transcriptListRef.current) return
    const time = Math.round(player.currentTime * 1000)

    const itemsContainer = transcriptListRef.current
      .firstElementChild as HTMLElement

    if (itemsContainer) {
      const children = Array.from(itemsContainer.children) as HTMLElement[]
      const targetElement = children.find((child: HTMLElement) => {
        const startTime = parseInt(
          child.getAttribute("data-start-time") || "0",
          10
        )
        const endTime = parseInt(child.getAttribute("data-end-time") || "0", 10)
        return startTime <= time && endTime >= time
      })

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "center"
        })

        targetElement.classList.add("bg-zinc-100")
        targetElement.classList.add("dark:bg-zinc-800")
        targetElement.classList.add("transition-all")

        setTimeout(() => {
          targetElement.classList.add("bg-zinc-100")
          targetElement.classList.add("dark:bg-zinc-800")
          targetElement.classList.add("transition-all")
        }, 3000)
      }
    }
  }

  return (
    <div className="flex flex-col justify-center items-center w-full h-full  bg-white dark:bg-[#0f0f0f] ">
      <div className="h-[600px] w-full px-6  opacity-80 border-none bg-white dark:bg-[#0f0f0f] overflow-y-auto ">
        <TranscriptActions jumpCurrentTime={jumpCurrentTime} />
        <TranscriptContent ref={transcriptListRef} />
      </div>
    </div>
  )
}
