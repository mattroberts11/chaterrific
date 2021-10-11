import { useContext, useState } from "react";
import { ChatClientContext } from "../../ChatClientContext";
import FileUploadModal from "./FileUploadModal";
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/DeleteOutline';

import { FormControl } from "@mui/material";
// import { InputLabel } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import { InputAdornment } from "@mui/material";
import { IconButton } from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';

import './messages.module.scss';

const Messages = ({channel, channelID, isChannelSelected, messages}) => {

  const chatClient = useContext(ChatClientContext);

  const [messageText, setMessageText] = useState();
  const [attachments, setAttachments] = useState();
  const [chatValue, setChatValue] = useState('Send a message');
  const [open, setOpen] = useState(false);

   
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    if(e){
      e.preventDefault();
    }
    await channel.sendMessage({
      text: messageText,
      attachments: [
        { type: 'image',
          asset_url: attachments, 
        }
      ]
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
                    <div key={`chat-msg-bubble-${i}`} className={`messages-bubble ${message.user.id === chatClient.userID ? 'messages-is-user' : null}`} >
                      <div  key={`chat-msg-text${i}`} className="messages-bubble_text">{message.text}</div>
                      { message.attachments.length ?
                        <div  key={`chat-msg-img${i}`} className="messages-bubble_text">
                          <img src={`${message.attachments[0]?.asset_url}`} />
                        </div>
                        : null
                      }
                      <div className="messages-bubble_info-wrap">
                        
                        {/* <div className="message-date">{message.created_at}</div> */}
                        <div key={`chat-msg-user${i}`} className="messages-bubble_info-wrap--user">{message.user.id}</div>
                        { message.user.id === chatClient.userID ?
                          <div 
                            key={`chat-msg-delete${i}`} 
                            className="messages-bubble_info-wrap--delete" 
                            onClick={() => { deleteAMessage(message.id)}}
                          >
                            <DeleteIcon />
                          </div>
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
          {/* <form onSubmit={sendAMessage}>
            <TextField 
              fullWidth 
              value={chatValue} 
              onChange={(e) => handleChange(e)} 
              sx={{marginBottom: '10px'}}
              type="text"
              onClick={() => setChatValue('')}
              
            />

          <Button type="submit" sx={{marginBottom: '10px'}} variant="contained" onClick={sendAMessage}>send</Button> 
          </form> */}
          <FormControl variant="filled" fullWidth onSubmit={sendAMessage}>
          {/* <InputLabel htmlFor="filled-adornment-username">Username</InputLabel> */}
            <OutlinedInput
              id="filled-adornment-username"
              value={chatValue} 
              onChange={(e) => handleChange(e)} 
              onClick={() => setChatValue('')}
              sx={{marginBottom: '10px'}}
              type="text"
              
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleOpen}
                    // onChange={(e) => handleChange(e)} 
                    
                    // onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {/* {values.showPassword ? <VisibilityOff /> : <Visibility />} */}
                  <FileUploadIcon /> 
                  </IconButton>
                </InputAdornment>
              }
              // label="Username"
            />
            <Button type="submit" sx={{marginBottom: '10px'}} variant="contained" onClick={sendAMessage}>send</Button> 
          </FormControl>
          <FileUploadModal open={open} channel={channel} handleClose={handleClose} sendAMessage={sendAMessage} setAttachments={setAttachments} />
        </div>
      </>
      :
      <h2>Select a channel on the left to start chat</h2>
    }
   </div>
  )
}

export default Messages;
