import React from 'react'
import {Link} from 'react-router-dom'
import {auth} from '../firebase'
import { useNavigate } from 'react-router-dom'
export default function NavBar({user}) {
  const navigate=useNavigate()
  return (<nav>
    <div className="nav-wrapper blue">
      <Link to="/" className="brand-logo">Todo</Link>
      <ul id="nav-mobile" className="right">
        {
          user?
          <li><button className="btn red" onClick={()=>{
              auth.signOut()
              navigate('/login')
          }}>logout</button></li>
          :<>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Signup</Link></li>
          </>
        }
      </ul>
    </div>
  </nav>
  )
}
