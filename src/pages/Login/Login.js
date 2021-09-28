import React, { useContext } from 'react';
import { ChatClientContext } from '../../ChatClientContext';

import { Box, Button, TextField } from '@mui/material';
import { useHistory } from 'react-router';

import '../../App.scss'
import axios from 'axios';


const Login = ({ setUserId, userId}) => {

  const chatClient = useContext(ChatClientContext);
  const history = useHistory();

  const getToken = async () => {
    // console.log('get token userid', userId)
    const response = await axios.post('http://localhost:4000/token', {
      userId
    })
    // setToken(response.data);
    //  console.log("RESPONSE", response);
     chatClient.connectUser({id: userId}, response.data)
     .then( r => {
      //  console.log('Connect User Response', r);
      //  setUserId(userId);
      //  setView('lobby');
       history.push("/lobby")
      });
  }

  const handleChange = (e) => {
    setUserId(e.target.value);
  }

  const handleClick = async () => {
    // if(userId){
      getToken();
    // }
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
          // value={formValue}
          type="text"  
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