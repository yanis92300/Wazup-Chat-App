import React from 'react'
import './Header.css'
import logo from '../logo.svg';


export const Header = () => {
    return (
        <div className='header'>

<img className='logo' src={logo} alt="React Logo" />
        </div>
    )
}
