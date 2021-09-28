import React, { useContext } from 'react';
import { Box, Button, Grid, Paper } from '@mui/material';
import { useHistory } from 'react-router';

import { ChatClientContext } from '../../ChatClientContext';
import Channels  from '../../components/Channels/Channels';



const Lobby = () => {
 

  const chatClient = useContext(ChatClientContext);
  const history = useHistory();

  const logout = () => {
    // console.log('CLICKED LOG OUT');
    chatClient.disconnectUser();
    history.push("/");
  }

  return (
    <Box sx={{ flexGrow: 1}} className="lobby-box">
      <Button sx={{marginBottom: '5px', backgroundColor: '#fff'}} onClick={logout}>Log Out {chatClient.userID}</Button>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Paper>
            <Channels />
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper>Chat</Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Lobby;
