import React from 'react';
import {Link} from 'react-router-dom'
import logo from './logo.png';
import Search from './search'

import './Header.css';

const Header = () => {
    return (
        <div className='Header'>
            <Link to='/'>
                <img src={logo} className='Header-logo' alt='logo'/>
            </Link>
            <Search/>
         </div>
    )
}
export default Header;

