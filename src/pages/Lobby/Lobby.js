import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Grid, Paper } from '@mui/material';
import { useHistory } from 'react-router';

import { ChatClientContext } from '../../ChatClientContext';
import Channels  from '../../components/Channels/Channels';
import Messages from '../../components/Messages/Messages'


const Lobby = () => {
 
  const chatClient = useContext(ChatClientContext);
  const history = useHistory();
  
  const [isChannelSelected, setIsChannelSelected] = useState(false);
  const [channelID, setChannelID] = useState('');
  const [messages, setMessages] = useState([]);
  const [channel, setChannel] = useState();
  
  const logout = () => {
    chatClient.disconnectUser();
    history.push("/");
  }

  
  useEffect( () => {
    if(chatClient.userID) {
      const myChannel = chatClient.channel('messaging', channelID);
      
      setChannel(myChannel);
      setMessages(myChannel.state.messages);
    }
  }, [channelID])

// EVENTS
  channel?.on("message.new", () => {
    setMessages(channel.state.messages)
  });

  channel?.on('message.deleted', () => {
    setMessages(channel.state.messages)
  })


console.log('Channel api==', channel);


  return (
    <Box sx={{ flexGrow: 1}} className="lobby-box">
      <Button sx={{marginBottom: '5px', backgroundColor: '#fff'}} onClick={logout}>Log Out {chatClient.userID}</Button>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Paper>
            <Channels 
              setIsChannelSelected={setIsChannelSelected}
              setChannelID={setChannelID}
              channel={channel}
            />
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper>
            <Messages  
              isChannelSelected={isChannelSelected}
              setMessages={setMessages} 
              messages={messages} 
              channelID={channelID} 
              channel={channel}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Lobby;
