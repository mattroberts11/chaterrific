import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountIcon from '@mui/icons-material/Person';



const Members = ({watch, channelsLink}) => {

  return (
    <div className="channel-members">

    {/* if channel id return users of channel, online status and unread count */}
    <h2>Channel Members</h2>

    <List>
    {watch?.members ?  
        watch.members.map( (member, i) => (
        <ListItem key={`member-${i}-${member.user_id}`}  className="memberListItem">
          <ListItemIcon>          
            <AccountIcon />
          </ListItemIcon>
          <ListItemText 
            className={`${member.user.online ? 'greenText' : 'none'}`}
            primary={member.user_id}
            secondary={member.user.online ? 'online' : 'offline'}
          />
        </ListItem>
      ))
      : null
    } 
    </List>

    <h2>Watcher Count ({watch?.watcher_count})</h2>
    {/* { channelsLink && 
      channelsLink.map( (channel, i) => (
        
      ))
    } */}
    </div>
  )

}

export default Members;
