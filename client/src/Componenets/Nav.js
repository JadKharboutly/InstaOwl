import React from 'react'
import {Link} from 'react-router-dom';
import './Nav.css'

function Nav() {
    return (
        <div className='NavBar'>
            <img className='owl' src="https://i.ibb.co/0YmjYcm/output-onlinegiftools.gif"/>
            <Link to="/"><h1 className='Dashboard' href>Dashboard</h1></Link>
        </div>
    )
}

export default Nav
