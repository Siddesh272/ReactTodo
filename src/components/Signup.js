import React, { useState } from 'react'
import {auth} from '../firebase'
import {useNavigate} from 'react-router-dom'
export default function Signup() {
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const navigate=useNavigate()
    const handleSubmit= async(e)=>{
        e.preventDefault()
        console.log(email,password)
        try{
            const result=await auth.createUserWithEmailAndPassword(email,password)
            window.M.toast({html:`Welcome ${result.user.email}`,classes:"green"})
            navigate('/')
        }catch(err){
            window.M.toast({html:err.message,classes:"red"})
        }
    }   
  return (
    <div className="center container" style={{maxWidth:"500px"}}><h3>Please Signup</h3>
    <form onSubmit={(e)=>handleSubmit(e)}>
    <div className="input-field">
          <input type= "email" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <input type= "password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
    </div>
        <button type="submit" className="btn blue">Register</button>
    </form>
    </div>
  )
}
