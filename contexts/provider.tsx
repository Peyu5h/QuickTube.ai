import { ExtensionProvider } from "./extensionContext"
import { SummaryProvider } from "./summaryContext"

export default function Providers({ children }) {
  return (
    <ExtensionProvider>
      <SummaryProvider>{children}</SummaryProvider>
    </ExtensionProvider>
  )
}
