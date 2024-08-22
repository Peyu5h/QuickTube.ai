import { ChatProvider } from "@/contexts/chatContext"

import { ExtensionProvider } from "./extensionContext"
import { SummaryProvider } from "./summaryContext"
import { TranscriptProvider } from "./transcriptContext"

export default function Providers({ children }) {
  return (
    <ExtensionProvider>
      <ChatProvider>
        <SummaryProvider>
          <TranscriptProvider>{children}</TranscriptProvider>
        </SummaryProvider>
      </ChatProvider>
    </ExtensionProvider>
  )
}
