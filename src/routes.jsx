// import React from 'react'
import {BrowserRouter , Routes , Route} from 'react-router-dom'


import Login from './Pages/Login';
import Home from './Pages/Home';

const Router = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/home" element={<Home/>}/>
    </Routes>


    </BrowserRouter>
    </>
  )
}

export default Router;