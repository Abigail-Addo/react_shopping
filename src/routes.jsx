// import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


import Login from './Pages/Login';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Payment from './Pages/Payment';
import Cart from './Pages/Cart';

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>


      </BrowserRouter>
    </>
  )
}

export default Router;