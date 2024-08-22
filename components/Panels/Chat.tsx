import React from "react"

import ChatAction from "../actions/chatActions"
import ChatList from "../chats/chatList"
import PromptForm from "../chats/promptForm"

const Chat = () => {
  return (
    <div>
      <div className="w-full h-[498px] relative bg-background text-foreground">
        <ChatAction />
        <ChatList />
        <PromptForm />
      </div>
    </div>
  )
}

export default Chat
