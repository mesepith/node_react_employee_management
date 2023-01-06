//import react 
import React,{useState, useEffect} from 'react';
//import navigate from react router dom to navigate to other pages
import {useNavigate} from 'react-router-dom';

const DOMAIN = 'http://dev1.switchme.in:5000';

//create Login function with email and password as input
const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    //Don't dispaly login page using useEffect if user is already logged in
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if(user){
            navigate('/');
        }
    });


    //create LoginCreds function to post data to node server
    const LoginCreds = async (e) => {
        e.preventDefault();
        //post data to node server using fetch api and async await method and store data in local storage
        const res = await fetch(`${DOMAIN}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        const data = await res.json();
        console.log('data: ', data);
        
        //if data has error key then display error message
        if(data.error){ alert(data.error); return false};

        if(data._id){
            localStorage.setItem('user', JSON.stringify(data));
            navigate('/');
        }
    }

    return (
        <div className='parentz'>
            <h1>Login</h1>
            <form>
                <input type="email" className='signelm' placeholder="Email" onChange={(e)=>setEmail(e.target.value)} value={email} />
                <input type="password" className='signelm' placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value={password} />
                <button onClick={LoginCreds} className='signelm actbtn' type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;

