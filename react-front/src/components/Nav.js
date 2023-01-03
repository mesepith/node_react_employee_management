//import react
import React from 'react';
//import Nac
//import Nav from './Nav';
//import link
import { Link } from 'react-router-dom';

//create nav ul li
const Nav = () => {
    return (
        <div>
            <ul className='header-ul'>
                <li><Link to="/">List</Link></li>
                <li><Link to="/add">Add Employee</Link></li>
                <li><Link to="/logout">Logout</Link></li>
            </ul>
        </div>
    )
}


//export
export default Nav;