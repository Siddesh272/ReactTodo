import NavBar from "./components/NavBar";
import {BrowserRouter} from 'react-router-dom'
import {Route,Routes} from 'react-router-dom'
import Todo from "./components/Todo";
import Signup from "./components/Signup";
import Login
 from "./components/Login";
import React,{useState,useEffect} from "react";
import {auth} from './firebase'
function App() {
  const [user,setUser]=useState(null)
  useEffect(()=>{
      const unsubscribe=auth.onAuthStateChanged(user=>{
        if(user) setUser(user)
        else setUser(null)
      })
      return()=>{
        unsubscribe()
      }
  },[])
  return (
    <BrowserRouter>
      <NavBar user={user}/>
      <Routes>
      <Route exact path="/" element={<Todo user={user}/>} /> 
      <Route path="/login" element={<Login />} /> 
      <Route path="/signup" element={<Signup/>} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
