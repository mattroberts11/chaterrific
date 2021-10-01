import { createContext, useState } from "react";
import { StreamChat } from "stream-chat";

const appKey = process.env.REACT_APP_STREAM_API_KEY;

export const ChatClientContext = createContext();

export const ChatClientProvider = (props) => {

  const [chatClient] = useState(StreamChat.getInstance(appKey));

  // console.log("ChatClientContext chatClient", chatClient);

  return (
    <ChatClientContext.Provider value={chatClient}>
      {props.children}
    </ChatClientContext.Provider>
  )
}
