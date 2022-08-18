import React, { createContext } from 'react';
import {useEffect,useContext,useReducer} from "react"
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/screens/Home';
import Login from './components/screens/Login';
import Signup from './components/screens/Signup';
import Profile from './components/screens/Profile';
import {BrowserRouter,Route,Routes,useNavigate} from "react-router-dom"
import Createpost from './components/screens/Createpost';
import { initialState, reducer } from "./reducers/userReducer"

 export const userContext = createContext()

  
  

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <userContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    <Navbar/>
    <Routes>
        <Route exact path="/" element={<Home />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create" element={<Createpost />} />
        
      </Routes>
    </BrowserRouter>
    </userContext.Provider>
  )
}

export default App;
