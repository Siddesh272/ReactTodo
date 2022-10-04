import React, { useState,useEffect} from 'react'
import { useNavigate} from 'react-router-dom'
import {db} from '../firebase'


let unsubscribe=()=>{}
export default function Todo({user}) {
  const [text,setText]=useState('')
  const [mytodos,setTodos]=useState([])
  const navigate=useNavigate()
  useEffect(()=>{
    if(user){
      const docRef=db.collection('todos').doc(user.uid)
      unsubscribe=docRef.onSnapshot(docSnap=>{
        if(docSnap.exists){
          console.log(docSnap.data().todos)
          setTodos(docSnap.data().todos)
        }else{
          console.log("no docs")
        }
      })
    }else{
         navigate('/login')
    }
    return()=>{
      unsubscribe()
    }
  },[])
  
  const addTodo=()=>{
    db.collection('todos').doc(user.uid).set({
      todos:[...mytodos,text]
    })
  }
  const deleteTodo=(deleteTodo)=>{
       const docRef=db.collection('todos').doc(user.uid)
       docRef.get().then(docSnap=>{
            const result=docSnap.data().todos.filter(todo=>todo!==deleteTodo)

            docRef.update({
                todos:result
            })
       })
  }
  return (
    <div className="container ">
      <h1>Add Todos</h1>
    <div className="input-field ">
          <input type= "text" placeholder="Add Todos" value={text} onChange={(e)=>setText(e.target.value)}/>  
    </div>
    <button className="btn blue" onClick={()=>addTodo()}>Add</button>
    <ul className="collection">
       {mytodos.map(todo=>{
            return <li className="collection-item grey" key={todo}>
              {todo}
            <i className="material-icons right" onClick={()=>deleteTodo(todo)}>delete</i>
            </li>
          }
        )
       }
    </ul>
    </div>
  )
}
