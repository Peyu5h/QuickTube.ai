import { useExtension } from "@/contexts/extensionContext"

import Chat from "./Chat"
import Summary from "./Summary"
import Transcript from "./Transcript"

export default function Panels() {
  const { extensionPanel } = useExtension()

  return (
    <div className="">
      {extensionPanel === "Summary" && <Summary />}
      {extensionPanel === "ActivityLog" && <Transcript />}
      {extensionPanel === "Settings" && <Chat />}
    </div>
  )
}
