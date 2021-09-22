import { useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Box, Button, Container, TextField } from '@mui/material';

import './login.scss'
import axios from 'axios';


const Login = () => {

  const [userId, setUserId] = useState("");
  const [formValue, setFormValue] = useState();
  const [token, setToken] = useState();

  const chatClient = StreamChat.getInstance(
    process.env.REACT_APP_STREAM_API_KEY, {
      timeout: 6000
    }
  );

  const getToken = async () => {
    // console.log('get token userid', userId)
    const response = await axios.post('http://localhost:4000/token', {
      userId
    })
    setToken(response.data);
    //  console.log("RESPONSE", response);
     chatClient.connectUser({id: userId}, response.data)
     .then( r => console.log('Connect User Response', r));
  }

  const handleChange = (e) => {
    setUserId(e.target.value);
  }

  const handleClick = async () => {
    // console.log("VALUE SUBMITED", userId);
    getToken();
    
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ bgcolor: '#cfe8fc', height: '90vh', margin: '20px', padding: '20px', borderRadius: '8px' }}>
        <h1>Chaterrific!</h1>
        <div>
          <TextField 
            name="userId" 
            label="Create Username"  
            value={formValue} type="text"  
            onChange={(e) => handleChange(e)} 
            sx={{marginBottom: '10px'}}
          />
        </div>
        <div>
          <Button variant="contained" size="large"  onClick={handleClick}>Join Chat!</Button>
        </div>
      </Box>
    </Container>
      
  );
}

export default Login;