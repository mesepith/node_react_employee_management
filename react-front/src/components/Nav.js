//import react
import React from 'react';
//import Nac
//import Nav from './Nav';
//import link
import { Link, useNavigate } from 'react-router-dom';

//create nav ul li
const Nav = () => {

    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    //create logout function
    const logout = () => {
        localStorage.removeItem('user');
        navigate('/signup');
    }

    return (
        <div>
            <ul className='header-ul'>
                <li><Link to="/">List</Link></li>
                <li><Link to="/add">Add Employee</Link></li>
                
                    {!user ?
                    <>
                    <li><Link to="/signup">Register</Link></li> 
                    <li><Link to="/login">Login</Link></li>
                    </>
                    : 
                    <li><Link onClick={logout} to="/signup">Logout</Link></li>
                    }
                
                
            </ul>
        </div>
    )
}


//export
export default Nav;