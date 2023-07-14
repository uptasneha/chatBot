import React, { useEffect, useState } from 'react'
import "./App.css"
import Login from './pages/signin/Login'
import ChatBot from './pages/chatbot/ChatBot'
import { onAuthStateChanged } from 'firebase/auth'
import { Routes, Route } from 'react-router-dom'  
import {auth} from './firebaseConfig'
import { Navigate } from 'react-router-dom'


const App = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user){
        setUser(user);
      }
    })
  },[user])


  return (
    
    <div>
      <Routes>
        <Route path="/*" element={<Login/>} />
        {
          user?<Route path='/chatbot' element={<ChatBot/>}/>:
           <Route path='/chatbot' element={<Navigate to="/"/>}/>
        }
      </Routes>
    </div>
  )
}

export default App