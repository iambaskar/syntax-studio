import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
    return (
        <nav className="nav-bar">
            <h3>Syntax Studio</h3>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/recipes'>Recipes</Link>
                </li>
                <li>
                    <Link to='/snippets'>Snippets</Link>    
                </li>
                {/* <li>
                    <Link to='/calendar'>Calendar</Link>
                </li>
                <li>
                    <button className='get-started'>Get Started</button>
                </li> */}
            </ul>
        </nav>
    )
}
