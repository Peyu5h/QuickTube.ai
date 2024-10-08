import { getVideoData } from "@/utils/functions"
import React, { useEffect } from "react"

import { useExtension } from "../contexts/extensionContext"
import ExtensionActions from "./actions/extenstionActions"
import Panels from "./Panels/Panels"
import { Collapsible, CollapsibleContent } from "./ui/collapsible"

export default function Extension() {
  const {
    setExtensionContainer,
    setExtensionData,
    setExtensionIsOpen,
    setExtensionLoading,
    setExtensionPanel,
    setExtensionTheme,
    setExtensionVideoId,
    extensionTheme,
    extensionIsOpen,
    extensionVideoId
  } = useExtension()

  useEffect(() => {
    const getVideoId = () => {
      return new URLSearchParams(window.location.search).get("v")
    }

    const fetchVideoData = async () => {
      const id = getVideoId()

      if (id && id !== extensionVideoId) {
        setExtensionVideoId(id)
        setExtensionLoading(true)
        const data = await getVideoData(id)
        console.log(data)
        setExtensionData(data)
        setExtensionLoading(false)
      }
    }

    fetchVideoData()

    const intervalId = setInterval(fetchVideoData, 2000)

    return () => clearInterval(intervalId)
  }, [extensionVideoId])

  useEffect(() => {
    const getCssVariable = (name: string) => {
      const rootStyle = getComputedStyle(document.documentElement)
      return rootStyle.getPropertyValue(name).trim()
    }
    const backgroundColor = getCssVariable("--yt-spec-base-background")

    if (backgroundColor === "#fff") {
      setExtensionTheme("light")
    } else {
      setExtensionTheme("dark")
    }
  }, [])

  if (!extensionTheme) return null
  return (
    <main
      ref={setExtensionContainer}
      style={{ zIndex: 3 }}
      className={`antialiased w-full mb-3 ${extensionTheme}`}>
      <div className="w-full">
        <Collapsible
          open={extensionIsOpen}
          onOpenChange={setExtensionIsOpen}
          className="space-y-3">
          <ExtensionActions />
          <CollapsibleContent className="w-full h-fit max-h-[500px] border  rounded-md overflow-auto flex gap-x-4 collapsible-content">
            <Panels />
          </CollapsibleContent>
        </Collapsible>
      </div>
    </main>
  )
}
