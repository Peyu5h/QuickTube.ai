import { ExtensionProvider } from "./extensionContext"

export default function Providers({ children }) {
  return <ExtensionProvider>{children}</ExtensionProvider>
}
