// import {useState, useEffect} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import ChatIcon from '@mui/icons-material/Forum';

const ChannelList = ({ 
  setIsChannelSelected, 
  setChannelID, 
  getMembers, 
  channelsLink, 
}) => {

  const handleClick = (id) => {
    setChannelID(id);
    setIsChannelSelected(true);
    getMembers(id)
  }

  const getIndex = (num) => {
    return num - 1
  }

  return (
    <>
    
    <div className="channel-list">
    <h2>Channels</h2>
    <Divider />
      <List>
        { channelsLink &&
            channelsLink.map( (channel, i) => (
              
              <ListItem disablePadding className="channelListItem">
                <ListItemButton>
                  <ListItemIcon>
                    <ChatIcon />
                  </ListItemIcon>
                  <ListItemText 
                    key={`${channel.id}-${i}`} 
                    className="previewText"
                    onClick={() => handleClick(channel.id)}
                    primary={`${channel.id} (${channel.state.unreadCount} unread)`}
                    secondary={channel.state.messages[getIndex(channel.state.messages.length)].text}
                  />
                </ListItemButton>
              </ListItem>
            ))
          } 
      </List>
      <Divider />
    </div>
   </>
  )
}

export default ChannelList;
