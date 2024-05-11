import React, { useEffect } from 'react'
import Home from './pages/Home/Home.jsx'
import Login from './pages/Login/Login.jsx'
import Player from './pages/Player/Player.jsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { Routes, Route, createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom'
import TitleCards from './components/TitleCards/TitleCards.jsx'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase.js'

const App = () => {





  const navigate = useNavigate();
  useEffect(() => {
    let isSubscribed = true;

    onAuthStateChanged(auth, async (user) => {

      if (isSubscribed) {
        if (user) {
          console.log("Logged In");
          toast("Logged In");
          navigate('/');

        }
        else {
          console.log("Logged Out");
          toast("Logged Out");

          navigate('/login')
        }
      }

    })
    return () => {
      isSubscribed = false;
    };

  }, []);

  return (
    <div>
      <ToastContainer theme='dark' />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/player/:id" element={<Player />} />
      </Routes>
    </div>
  )
}

export default App



