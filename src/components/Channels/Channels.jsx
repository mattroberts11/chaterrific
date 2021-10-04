import { useContext, useEffect, useState } from "react";
import { Button, ButtonGroup } from "@mui/material";
import { ChatClientContext } from "../../ChatClientContext";


const Channels = ({ setIsChannelSelected, setChannelID }) => {

  const chatClient = useContext(ChatClientContext);
  const [channelsLink, setChannelsLink] = useState();
  const [watch, setWatch] = useState();

  const getChannels = async () => {
    const filter = { type: 'messaging', members: {$in: [chatClient.userID]}};
    const sort = [{last_message_at: -1}];
    await chatClient.queryChannels(filter, sort)
      .then(res => setChannelsLink(res));
  }

  const getMembers = async (channelID) => {
    const channel = chatClient.channel('messaging', channelID);
    await channel.watch()
      .then( res => setWatch(res));
  }
  

  const handleClick = (id) => {
    setChannelID(id);
    setIsChannelSelected(true);
    getMembers(id)
  }

  useEffect(() => {
    
    getChannels();
    
  },[]);
  
console.log('WATCH', watch)
  return (
    <>
    <div className="channel-list">
      <h2>Your Channels</h2>
      <ButtonGroup 
        orientation="vertical"
        variant="outlined"  
      >
        { channelsLink &&
          channelsLink.map( (channel, i) => (
            <Button 
              key={`${channel.id}-${i}`} 
              onClick={() => handleClick(channel.id)}
              size="large"
            >
              {`${channel.id}(${channel.data.member_count})`}
            </Button>
          ))
        } 
      </ButtonGroup>
    </div>
    <div className="channel-members">

      {/* if channel id return users of channel, online status and unread count */}
      <h2>Channel Members</h2>
      <ul>
        { watch?.members ?  
          watch.members.map( (member, i) => (
          <li>{member.user_id}</li>
        ))
        : null
        
        }
      </ul>
    </div>
    </>
    
  );
}

export default Channels;
