import { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import AccountIcon from '@mui/icons-material/Person';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';


const Members = ({watch, channelsLink}) => {

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className="channel-members">

    {/* if channel id return users of channel, online status and unread count */}
    {/* <h2>Channel Members</h2> */}

    <List>
      <ListSubheader component="div" id="nested-list-subheader">
        Members ({watch?.watcher_count} members online)
      </ListSubheader>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <SupervisorAccountIcon />
          </ListItemIcon>
          <ListItemText primary="Channel Members" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          {watch?.members ?  
              watch.members.map( (member, i) => (
              <ListItem key={`member-${i}-${member.user_id}`}  className="memberListItem">
                <ListItemIcon>          
                  <AccountIcon />
                </ListItemIcon>
                <ListItemText 
                  className={`${member.user.online ? 'greenText' : 'none'}`}
                  primary={`${member.user_id} (${member.role})`}
                  secondary={member.user.online ? 'online' : 'offline'}
                />
              </ListItem>
            ))
            : null
          } 
        </Collapse>
    </List>
    {/* <ListSubheader component="div" id="nested-list-subheader">
    
      </ListSubheader> */}
    
    {/* { channelsLink && 
      channelsLink.map( (channel, i) => (
        
      ))
    } */}
    </div>
  )

}

export default Members;
