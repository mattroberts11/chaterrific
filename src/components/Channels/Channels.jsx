import { useContext, useEffect, useState } from "react";
import { ChatClientContext } from "../../ChatClientContext";
import ChannelList from '../ChannelList/ChannelList';
import Manage from "../Manage/Manage";
import Members from '../Members/Members';

const Channels = ({ setIsChannelSelected, setChannelID }) => {

  const chatClient = useContext(ChatClientContext);
  const [channelsLink, setChannelsLink] = useState();
  const [watch, setWatch] = useState();
  const [channelMembers, setChannelMembers] = useState();
  
  const getMembers = async (channelID) => {
    const channel = chatClient.channel('messaging', channelID);
    await channel.watch()
      .then( res => setWatch(res));
    await channel.queryMembers({})
      .then( res => setChannelMembers(res));
  }
  
  const getChannels = async () => {
    const filter = { type: 'messaging', members: {$in: [chatClient.userID]}};
    const sort = [{last_message_at: -1}];
    await chatClient.queryChannels(filter, sort)
      .then(res => setChannelsLink(res));
  }

  useEffect(() => {
    getChannels();
  },[]);
  
console.log('WATCH', watch)
console.log('MEMBERS', channelMembers);
console.log('CHANNELS LINK', channelsLink);

  return (
    <>
      <ChannelList 
        setIsChannelSelected={setIsChannelSelected} 
        setChannelID={setChannelID} 
        getMembers={getMembers} 
        channelsLink={channelsLink} 
      />
    { watch
      ?
        <Members watch={watch} channelsLink={channelsLink} />
      : null 
    }
      <Manage />
    </>
    
  );
}

export default Channels;
