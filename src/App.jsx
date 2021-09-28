import { useState } from 'react';
import { ChatClientProvider } from './ChatClientContext';

import { CssBaseline } from '@mui/material/';

import {
  BrowserRouter as Router,
  Route,
  Switch,

} from 'react-router-dom';

import './App.scss';
import Lobby from './pages/Lobby/Lobby';
import Login from './pages/Login/Login';

const  App = () => {

  const [userId, setUserId] = useState(null);

  return (
    <ChatClientProvider>
       <CssBaseline />
       
        <Router>
          <Switch>
            <Route exact path="/">
              <Login setUserId={setUserId} userId={userId} />
            </Route>
            <Route path="/lobby">
              <Lobby userId={userId} />
            </Route>
          </Switch>
        </Router>
        
    </ChatClientProvider>
  );
}

export default App;
