import Extension from "@/components/extension"
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"

const INJECTED_ELEMENT_ID = "#secondary.style-scope.ytd-watch-flexy"

export const config: PlasmoCSConfig = {
  matches: ["https://www.youtube.com/*"]
}

export const getInlineAnchor: PlasmoGetInlineAnchor = async () => ({
  element: document.querySelector(INJECTED_ELEMENT_ID),
  insertPosition: "afterbegin"
})

export const getShadowHostId = () => "plasmo-inline"

function PlasmoMainUI() {
  return <Extension />
}

export default PlasmoMainUI
