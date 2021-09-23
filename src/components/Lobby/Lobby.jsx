
import { Container, Box, Button, Grid, Paper } from '@mui/material';
import Channels  from '../Channels/Channels';
import CreateChannel from '../Channels/CreateChannel';


const Lobby = () => {

  return (
    <Box 
      sx={{ 
        flexGrow: 1, 
      }}
      className="lobby-box"
    >
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Paper>
            <Channels />
            <CreateChannel />

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
