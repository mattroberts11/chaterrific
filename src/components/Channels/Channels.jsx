import { useContext, useEffect, useState } from "react";
// import { StreamChat } from "stream-chat";
import { ChatClientContext } from "../../ChatClientContext";

const Channels = () => {

  const [channels, setChannels] = useState();
  // let channels;
  const chatClient = useContext(ChatClientContext);

  const filter = { type: 'messaging', members: {$in: [chatClient.userID]}};
  const sort = [{last_message_at: -1}];

  const getChannels = async () => {
    await chatClient.queryChannels(filter, sort)
      .then(r => setChannels(r));
  }

  useEffect(() => {
    if(!channels){
      getChannels();
    }
   console.log('CHANNES JSX==', channels)
  }, [])


  return (
    <>
      <h2>Current User Channels</h2>
      <ul>
        {/* { channels &&
          channels.map( (channel, i) => (
            <li>{channel}</li>
          ))
        }  */}
      </ul>
    </>
  );
}

export default Channels;
