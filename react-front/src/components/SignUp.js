//import react
import React,{useState, useEffect} from 'react';
//import navigate from react router dom to navigate to other pages 
import {useNavigate} from 'react-router-dom';


const DOMAIN = 'http://dev1.switchme.in:5000';

//create function
const SignUp = () => {

    //create state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    //define navigate const
    const navigate = useNavigate();

    //Don't dispaly signup page using useEffect if user is already logged in
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if(user){
            navigate('/');
        }
    });    
    
    const getData = () => {

        //compulsory fields validation
        if(!name || !email || !password){
            setError('Please fill all the fields');
            return false;
        }

        //email validation
        if(!email.includes('@') || !email.includes('.')){
            setError('Please enter valid email');
            return false;
        }

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

            if(data.auth && data.member._id){

                //store data in local storage with user key
                localStorage.setItem('user', JSON.stringify(data.member));
                localStorage.setItem('token', JSON.stringify(data.auth));

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
            {error && <p className='error-inp'> {error} </p>}
            <button onClick={getData} className='signelm actbtn' type="button">Submit</button>
        </div>
    )
}

//export
export default SignUp;