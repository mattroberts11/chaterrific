import { useState } from 'react';
import { Container, CssBaseline } from '@mui/material/';

import Login from './components/Login';
import Lobby from './components/Lobby';

import './App.scss';


const  App = () => {

  const [view, setView] = useState('login');

  const getView = () => {
    switch(view) {
      case 'login':
         <Login />
        break;
      case 'lobby':
         <Lobby />
        break;
      default:
         <Login />

    }
  }

  return (
    <>
      <CssBaseline />
      <Login />
    </>
  );
}

export default App;
