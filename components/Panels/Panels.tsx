import { useExtension } from "@/contexts/extensionContext"

import Chat from "./Chat"
import Summary from "./Summary"
import Transcript from "./Transcript"

export default function Panels() {
  const { extensionPanel } = useExtension()

  return (
    <div>
      {extensionPanel === "Summary" && <Summary />}
      {extensionPanel === "Transcript" && <Transcript />}
      {extensionPanel === "Chat" && <Chat />}
    </div>
  )
}
