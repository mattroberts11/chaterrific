import { useContext, useEffect, useState } from "react";
import { Button, ButtonGroup } from "@mui/material";
import { ChatClientContext } from "../../ChatClientContext";


const Channels = ({ setIsChannelSelected, setChannelID }) => {

  const chatClient = useContext(ChatClientContext);
  const [channelsLink, setChannelsLink] = useState();

  const filter = { type: 'messaging', members: {$in: [chatClient.userID]}};
  const sort = [{last_message_at: -1}];

  const getChannels = async () => {
    await chatClient.queryChannels(filter, sort)
      .then(res => setChannelsLink(res));
  }

  const handleClick = (id) => {
    setChannelID(id);
    setIsChannelSelected(true);
  }

  useEffect(() => {

    if(!channelsLink){
      getChannels();
    }

  })
// console.log('CHANNELS', channelsLink);
  return (
    
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
    
  );
}

export default Channels;
