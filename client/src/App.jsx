import { useState, useEffect } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import GoogleRegistration from './GoogleRegister'
import Home from './Home'
import GoogleLogin from './LoginGoogle'
import Landing from './Landing'



function App() {

  return (
   <BrowserRouter>
      <Routes>

        
        <Route path="/" element={<Landing />}></Route>
        <Route path="/googlelogin" element={<GoogleLogin />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/registerwithgoogle" element={<GoogleRegistration />}></Route>
      </Routes>
   </BrowserRouter>
  )
}

export default App
