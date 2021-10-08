import { useContext, useEffect, useState } from 'react';
import { ChatClientContext } from "../../ChatClientContext";
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';

import Divider from '@mui/material/Divider';

import ChatIcon from '@mui/icons-material/Forum';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const UserList = () => {

  const chatClient = useContext(ChatClientContext);

  const [users, setUsers] = useState();

  const getAllUsers = async () => {
    await chatClient.queryUsers({id: {$ne: chatClient.userID}})
      .then( res => 
        setUsers(res.users))
  }

  const deleteUser = async (userId) => {
    const response = await axios.post('http://localhost:4000/delete-user', {
      userId
    }).then(res => res.status === 200 ? getAllUsers() : null )
  }

  useEffect( () => {
    if(!users){
      getAllUsers();
    }
  }, [])
   
  // console.log("USER LIST", users);
  return (
    <>
    
    <List component="div" disablePadding> 
        { users ?
            users.map( (user, i) => (
              
              <ListItem 
                key={`user-list-item-${i}`} 
                disablePadding 
                className="userListItem"
                secondaryAction={
                  <IconButton edge="end" aria-label="delete user">
                    <DeleteOutlineIcon onClick={() => deleteUser(user.id)}/>
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton>
                  <ListItemIcon>
                    <EditIcon />
                  </ListItemIcon>
                  <ListItemText 
                    key={`${user.id}-${i}`} 
                    className="user-preview-text"
                    // onClick={() => handleClick(user.id)}
                    primary={`${user.id} (${user.role})`}
                    //secondary={channel.state.messages[getIndex(channel.state.messages.length)].text}
                  />
                </ListItemButton>
              </ListItem>
            ))
            : '... loading'
          } 
      </List>
    </>
  )
}

export default UserList;