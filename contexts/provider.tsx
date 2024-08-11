import { ExtensionProvider } from "./extensionContext"
import { SummaryProvider } from "./summaryContext"
import { TranscriptProvider } from "./transcriptContext"

export default function Providers({ children }) {
  return (
    <ExtensionProvider>
      <SummaryProvider>
        <TranscriptProvider>{children}</TranscriptProvider>
      </SummaryProvider>
    </ExtensionProvider>
  )
}
