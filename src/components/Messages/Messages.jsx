import { useContext, useState } from "react";
import { ChatClientContext } from "../../ChatClientContext";
import { Button, TextField } from "@mui/material";

import './messages.module.scss';

const Messages = ({channelID, isChannelSelected, messages}) => {

  const chatClient = useContext(ChatClientContext);

  // instatiate the channel

  // const channel = chatClient.channel('messaging');

  console.log('MESSAGES chatClient', chatClient);
  console.log('isChannelSelected', isChannelSelected);

  const [messageText, setMessageText] = useState();

  const handleChange = (e) => {
    console.log(e.target.value);
    setMessageText(e.target.value);
  }

  const sendAMessage = async () => {
    await chatClient.sendMessage({
      text: messageText,
    }, {skip_push: false})
      .then( (res) => {
        console.log('SEND MESSAGE', res );
      })
  }

  // look at events to show the message
  // method called .on()
  // https://getstream.io/chat/docs/node/event_listening/?language=javascript
  // listen for message
  return (
    <>
    { isChannelSelected ?
      <div>
        <div className='message-container'>
          Welcome to the {channelID} channel!
        </div>
        <div className='chat-container'>
          <TextField fullWidth onChange={(e) => handleChange(e)} />
          <Button variant="contained" onClick={sendAMessage}>send</Button> 
        </div>
      </div>
      :
      'Select a channel on the left to start chat'
    }
    </>
  )
}

export default Messages;