import React, { useContext } from 'react';
import { ChatClientContext } from '../../ChatClientContext';
import { Box, Button, TextField } from '@mui/material';
import { useHistory } from 'react-router';
import axios from 'axios';
import '../../App.scss'


const Login = ({ setUserId, userId}) => {

  const chatClient = useContext(ChatClientContext);
  const history = useHistory();

  const getToken = async () => {
    // console.log('get token userid', userId)
    const response = await axios.post('http://localhost:4000/token', {
      userId
    })

    chatClient.connectUser({id: userId}, response.data)
      .then( r => {
      //  console.log('Connect User Response', r);
        history.push("/lobby")
      });
  }

  const handleChange = (e) => {
    setUserId(e.target.value);
  }

  const handleClick = async (e) => {
    e.preventDefault();
    // if(userId){
      getToken();
    // }
  }

  return (
     
    <Box className="login-box" >
      <h1>Chaterrific!</h1>
      <form onSubmit={handleClick}>
      <div>
        <TextField 
          name="userId" 
          label="Create Username"  
          type="text"  
          onChange={(e) => handleChange(e)} 
          sx={{marginBottom: '10px'}}
        />
      </div>
      <div>
        <Button variant="contained" size="large"  onClick={handleClick}>Join Chat!</Button>
      </div>
      </form>
    </Box>
   
  );
}

export default Login;