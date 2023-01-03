//import react
import React,{useState} from 'react';

//create function
const SignUp = () => {

    //create state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const getData = () => {
        console.warn(name,email,password);
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