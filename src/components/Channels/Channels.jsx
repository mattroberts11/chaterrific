import { useContext, useEffect, useState } from "react";
import { ChatClientContext } from "../../ChatClientContext";

const Channels = () => {

  const [channels, setChannels] = useState();

  const chatClient = useContext(ChatClientContext);

  const filter = { type: 'messaging', members: {$in: [chatClient.userID]}};
  const sort = [{last_message_at: -1}];

  const getChannels = async () => {
    await chatClient.queryChannels(filter, sort)
      .then(res => setChannels(res));
  }

  useEffect(() => {
    
    if(!channels){
      getChannels();
    }

  },[])

  return (
    <>
      <h2>Current User Channels</h2>
      <ul>
        { channels &&
          channels.map( (channel, i) => (
            <li key={`${channel.id}-${i}`}>{`${channel.id}(${channel.data.member_count})`}</li>
          ))
        } 
      </ul>
    </>
  );
}

export default Channels;
