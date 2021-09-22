import { useState } from 'react';
import { StreamChat } from 'stream-chat';
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
    setUserId(e.target.value)
  }

  const handleClick = async () => {
    // console.log("VALUE SUBMITED", userId);
    getToken()
    
  }

  return (
    
    <div id="login-box">
        <label htmlFor="userId">
        User Id: 
        <input name="userId" value={formValue} type="text"  onChange={(e) => handleChange(e)}/>
        </label>
        <button onClick={handleClick}>Join Chat!</button>
    </div>
      
  );
}

export default Login;