import { useContext, useState } from "react";
import { ChatClientContext } from "../../ChatClientContext";
import { Button, TextField } from "@mui/material";

import './messages.module.scss';

const Messages = () => {

  const chatClient = useContext(ChatClientContext);

  const [messageText, setMessageText] = useState();

  const handleChange = (e) => {
    setMessageText(e.target.value);
  }

  const sendAMessage = async () => {
    await chatClient.sendMessage({
      text: messageText,
    }, {skip_push: false})
      .then( (res) => {

      })
  }

  return (
    <>
      <div className='message-container'>
        Message Box
      </div>
      <div className='chat-container'>
        <TextField fullWidth onChange={handleChange} />
        <Button variant="contained" onClick={sendAMessage}>send</Button>
      </div>
    </>
  )
}

export default Messages;