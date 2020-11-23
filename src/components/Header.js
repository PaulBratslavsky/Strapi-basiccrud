import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../context/user.context'

export default function Header() {
    const { user } = useContext(UserContext)
    console.log(user, 'fuck')
    return <header>
        <div className="container space-between">
            <div>my day</div>
            <nav>
                <NavLink to="/" exact >Home</NavLink>
                { user 
                    ? <NavLink to="/addpost">Add Post</NavLink> 
                    : <>
                        <NavLink to="/login">Login</NavLink>
                        <NavLink to="/signup">Signup</NavLink>  
                    </>
                }
            </nav>
        </div>
    </header>
}
