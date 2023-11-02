// import React from 'react'
import {BrowserRouter , Routes , Route} from 'react-router-dom'


import Login from './Pages/Login';
import Home from './Pages/Home';
import Signup from './Pages/Signup';

const Router = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/signup" element={<Signup/>}/>
    </Routes>


    </BrowserRouter>
    </>
  )
}

export default Router;