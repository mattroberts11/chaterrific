import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Grid, Paper } from '@mui/material';
import { useHistory } from 'react-router';

import { ChatClientContext } from '../../ChatClientContext';
import Channels  from '../../components/Channels/Channels';
import Messages from '../../components/Messages/Messages'



const Lobby = () => {
 
  
  const [isChannelSelected, setIsChannelSelected] = useState(false);

  const [channelID, setChannelID] = useState('Skiing');
  const [messages, setMessages] = useState([]);

  

  const chatClient = useContext(ChatClientContext);
  const history = useHistory();

  const logout = () => {
    // console.log('CLICKED LOG OUT');
    chatClient.disconnectUser();
    history.push("/");
  }

  useEffect( () => {
    const myChannel = chatClient.channel('messaging', channelID);

    setMessages(myChannel.state.messages);

  }, [channelID])

  return (
    <Box sx={{ flexGrow: 1}} className="lobby-box">
      <Button sx={{marginBottom: '5px', backgroundColor: '#fff'}} onClick={logout}>Log Out {chatClient.userID}</Button>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Paper>
            <Channels 
              setIsChannelSelected={setIsChannelSelected}
              setChannelID={setChannelID}
            />
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper>
            <Messages  
              isChannelSelected={isChannelSelected} 
              messages={messages} 
              channelID={channelID} 
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Lobby;
