import { useExtension } from "@/contexts/extensionContext"

import Chat from "./Chat"
import Summary from "./Summary"
import Transcript from "./Transcript"

export default function Panels() {
  const { extensionPanel } = useExtension()

  return (
    <div className="w-full dark:bg-[#0f0f0f] dark:text-white">
      {extensionPanel === "Summary" && <Summary />}
      {extensionPanel === "Transcript" && <Transcript />}
      {extensionPanel === "Chat" && <Chat />}
    </div>
  )
}
