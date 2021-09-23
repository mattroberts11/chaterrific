import { useContext, useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import { ChatClientContext } from "../../ChatClientContext";

const Channels = () => {

  const chatClient = useContext(ChatClientContext);


  return (
    <p>Current User Channels</p>
  );
}

export default Channels;
