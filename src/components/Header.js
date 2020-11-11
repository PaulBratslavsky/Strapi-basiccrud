import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Header() {
    return <header>
        <div className="container space-between">
            <div>my day</div>
            <nav>
                <NavLink to="/" exact >Home</NavLink>
                <NavLink to="/addpost">Add Post</NavLink>
                <NavLink to="/login">Login</NavLink>
            </nav>
        </div>
    </header>
}
