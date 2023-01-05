//import react
import React,{useState} from 'react';
//import navigate from react router dom to navigate to other pages 
import {useNavigate} from 'react-router-dom';


const DOMAIN = 'http://dev1.switchme.in:5000';

//create function
const SignUp = () => {

    //create state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //define navigate const
    const navigate = useNavigate();
    
    const getData = () => {
        console.warn(name,email,password);
        //post data to node server using fetch api and async await method 
        fetch(`${DOMAIN}/api/insert-members`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log('data: ', data);

            if(data){
                //navigate to List url
                navigate('/');
            }
        })
    }


    return (
        <div className='parentz signup'>
            <h1>Sign Up</h1>
            <input value={name} onChange={(e)=>setName(e.target.value)} className='signelm' type="text" name="name" placeholder='Your Name' />
            <input value={email} onChange={(e)=>setEmail(e.target.value)} className='signelm' type="email" name="email" placeholder='Your Email' />
            <input value={password} onChange={(e)=>setPassword(e.target.value)} className='signelm' type="password" name="password" placeholder='Your Password' />
            <button onClick={getData} className='signelm signupbtn' type="button">Submit</button>
        </div>
    )
}

//export
export default SignUp;