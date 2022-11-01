import {  BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import { Main } from './pages/main';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { Races } from './pages/race_related/races';
import { OmatIlmot } from './pages/omatIlmot';
import { AddRace } from './pages/race_related/addRace';
import { Me } from './pages/me';
import {Notfound} from './pages/notfound'
import Navbar from './components/navbar'
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { useAuthContext } from './hooks/useAuthContext';

//import {useEffect} from 'react';


const theme = createTheme({
  palette: {
    primary: {
      main: "#18227c",
      tumma:"#0004f",
      logo:"#d84727",
      vaalea:"#514aac"
    },
    secondary: {
      main: "#ffc400",
      tumma:"#c79400",
      light:"#fff64f"
    },
    button:{
      main: "#ffc400",
    }
  }
});


function App() {

  const {user} = useAuthContext()

  return (
    <div className="App">
      <ThemeProvider theme={theme}>

      <Router>
          <Navbar/>
          <Routes>
            <Route path='/' element={<Main/>}/>
            <Route path='/login' element={!user?<Login/>:<Main/>}/>
            <Route path='/register' element={!user?<Register/>:<Main/>}/>
            <Route path='/races' element={<Races/>}/>
            <Route path='/omatilmot' element={user?<OmatIlmot/>:<Main/>}/>
            <Route path='/addrace' element={user?<AddRace/>:<Main/>}/>
            <Route path='/omattiedot' element={user?<Me/>:<Main/>}/>
           <Route path='*' element={<Notfound/>}/>
          </Routes>
      </Router>
     
      </ThemeProvider>
    
    </div>
  );
}

export default App;
