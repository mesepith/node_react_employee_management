//import react
import React from 'react';

//import Navigate, Outlet from react router dom to navigate to other pages
import {Navigate, Outlet} from 'react-router-dom';

//create PrivateRoute function that check user from local storage
const PrivateRoute = ({path}) => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('user: ', user);
    return user ? <Outlet /> : <Navigate to="/signup" />
}

//export private route
export default PrivateRoute;