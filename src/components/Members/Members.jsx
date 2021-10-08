import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

import AccountIcon from '@mui/icons-material/Person';



const Members = ({watch, channelsLink}) => {

  return (
    <div className="channel-members">

    {/* if channel id return users of channel, online status and unread count */}
    {/* <h2>Channel Members</h2> */}

    <List>
      <ListSubheader component="div" id="nested-list-subheader">
        Members
      </ListSubheader>
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
    </List>
    <ListSubheader component="div" id="nested-list-subheader">
    {watch?.watcher_count} members online
      </ListSubheader>
    
    {/* { channelsLink && 
      channelsLink.map( (channel, i) => (
        
      ))
    } */}
    </div>
  )

}

export default Members;
