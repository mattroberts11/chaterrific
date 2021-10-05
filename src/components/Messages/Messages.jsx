import { useContext, useState } from "react";
import { ChatClientContext } from "../../ChatClientContext";
import { Button, TextField } from "@mui/material";

import './messages.module.scss';

const Messages = ({channel, channelID, isChannelSelected, messages}) => {

  const chatClient = useContext(ChatClientContext);

  const [messageText, setMessageText] = useState();
  const [chatValue, setChatValue] = useState('Send a message')

  const handleChange = (e) => {
    // console.log(e.target.value);
    setMessageText(e.target.value);
    setChatValue(e.target.value)
  }

  const deleteAMessage = async (messageId) => {
    await chatClient.deleteMessage(messageId, true)
      .then( (res) => console.log("DELETE RESPONSE", res))
      // Do something with resoponse
  }

  const sendAMessage = async (e) => {
    e.preventDefault();
    await channel.sendMessage({
      text: messageText,
    })
      .then( (res) => {
        // console.log('SEND MESSAGE RESPONSE', response );
        console.log('SEND MESSAGE TEXT', res.message );
      })

    setChatValue('');
  }

  return (
    <div className="messages-wrap">
    { isChannelSelected ?
      <>
        <div className='message-container'>
          <h2>Hey there {chatClient.userID}! Welcome to the {channelID} channel</h2>
          <div className="messages">
            { messages.length 
              ?
                messages.map( (message, i) => (
                  <>
                    <div className={`messages-bubble ${message.user.id === chatClient.userID ? 'messages-is-user' : null}`} >
                      <div  key={`chat-msg-text${i}`} className="messages-bubble_text">{message.text}</div>
                      <div className="messages-bubble_info-wrap">
                        
                        {/* <div className="message-date">{message.created_at}</div> */}
                        <div key={`chat-msg-user${i}`} className="messages-bubble_info-wrap--user">{message.user.id}</div>
                        { message.user.id === chatClient.userID ?
                          <div key={`chat-msg-delete${i}`} className="messages-bubble_info-wrap--delete" onClick={() => { deleteAMessage(message.id)}}>delete[X]</div>
                          : null
                        }
                      </div>
                    </div>
                  </>
                ))
              :
              'There are no messages in this channel yet, why dontcha send one'
            }
          </div>
        </div>
        <div className='chat-container'>
          <form onSubmit={sendAMessage}>
            <TextField 
              fullWidth 
              value={chatValue} 
              onChange={(e) => handleChange(e)} 
              sx={{marginBottom: '10px'}}
              type="text"
              onClick={() => setChatValue('')}
              
            />
          <Button type="submit" sx={{marginBottom: '10px'}} variant="contained" onClick={sendAMessage}>send</Button> 
          </form>
        </div>
      </>
      :
      <h2>Select a channel on the left to start chat</h2>
    }
   </div>
  )
}

export default Messages;
