import { useContext, useState } from 'react';
import { StreamChat } from 'stream-chat';
import { ChatClientContext } from '../../ChatClientContext';
import { Box, Button, Container, TextField } from '@mui/material';

import '../../App.scss'
import axios from 'axios';


const Login = ({ setView }) => {

  const [userId, setUserId] = useState(null);
  const [formValue, setFormValue] = useState();
  const [token, setToken] = useState();

  const chatClient = useContext(ChatClientContext);

  const getToken = async () => {
    // console.log('get token userid', userId)
    const response = await axios.post('http://localhost:4000/token', {
      userId
    })
    setToken(response.data);
    //  console.log("RESPONSE", response);
     chatClient.connectUser({id: userId}, response.data)
     .then( r => {
       console.log('Connect User Response', r);

      });
  }

  const handleChange = (e) => {
    setUserId(e.target.value);
  }

  const handleClick = async () => {
    // console.log("VALUE SUBMITED", userId);
    if(userId){
      getToken();
      setFormValue('')
    }
  }

  return (
    <Box sx={{ 
        bgcolor: '#cfe8fc', 
        
      }}
      className="login-box"  
    >
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
  );
}

export default Login;