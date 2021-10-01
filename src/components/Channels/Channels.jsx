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


// click on channel and return messages for that channel.



  return (
    <>
      <h2>Current User Channels</h2>
      <ButtonGroup 
        orientation="vertical"
        variant="contained"  
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
    </>
  );
}

export default Channels;
