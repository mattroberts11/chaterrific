import { useEffect, useState,  } from 'react';
import { ChatClientProvider } from './ChatClientContext';
import { Container, CssBaseline } from '@mui/material/';

import Login from './components/Login';
import Lobby from './components/Lobby';

import './App.scss';


const  App = () => {

  // const chatClient = useContext(ChatClientContext);
  const [view, setView] = useState('lobby');

  useEffect( () => {

  }, [])

  return (
    <ChatClientProvider>
      <CssBaseline />
      <Container maxWidth={view ==="login" ? "sm" : "md"}>
        { view === "login" ? <Login /> : (
          view === "lobby" ? <Lobby /> : null
        )
        }
      </Container>
    </ChatClientProvider>
  );
}

export default App;
