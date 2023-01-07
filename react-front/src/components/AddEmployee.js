//import react in our code.
import React, { useState } from 'react';

const DOMAIN = 'http://dev1.switchme.in:5000';

//create html function of add employee form with employee_id, name, age, salary, department as input, get token from local storage, get _id from local storage and pass _id as added_by_user_id to node server to add employee to database
const AddEmployee = () => {
    
        const [employee_id, setEmployee_id] = useState('');
        const [name, setName] = useState('');
        const [age, setAge] = useState('');
        const [salary, setSalary] = useState('');
        const [department, setDepartment] = useState('');
        const token = JSON.parse(localStorage.getItem('token'));
        const user = JSON.parse(localStorage.getItem('user'));
    
        //create addEmployee function to post data to node server
        const addEmployee = async (e) => {
            e.preventDefault();


            //before post data to node server check if all fields are filled or not, age and salary should be number 
            if(!employee_id || !name || !age || !salary || !department){
                alert('Please fill all fields');
                return false;
            }
            if(isNaN(age) || isNaN(salary)){
                alert('Age and Salary should be number');
                return false;
            }
            
            //Give loading text in button while data is posting to node server and disable button to prevent multiple click on button to post data multiple times to node server
            document.getElementById('addEmployeeBtn').innerHTML = 'Loading...';
            document.getElementById('addEmployeeBtn').disabled = true; 

            //post data to node server using fetch api and async await method and store data in local storage
            const res = await fetch(DOMAIN + '/api/add-employee', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    employee_id,
                    name,
                    age,
                    salary,
                    department,
                    added_by_user_id: user._id
                })
            });
            const data = await res.json();
            console.log('data: ', data);

            //enable button after data is posted to node server
            document.getElementById('addEmployeeBtn').innerHTML = 'Add Employee';
            document.getElementById('addEmployeeBtn').disabled = false;

            //if data has error key then display error message
            if(data.error){ alert(data.error); return false};
            //if data has success key then display success message
            if(data._id){ 
                alert('Successfully added employee'); 
                //clear all input fields after data is posted to node server
                setEmployee_id('');
                setName('');
                setAge('');
                setSalary('');
                setDepartment('');

                return false
            };
        }

    //return html of add employee form
    return (
        <div className='parentz'>
            <h1>Add Employee</h1>
            <form>
                <input type="text" className='signelm' placeholder="Employee ID" onChange={(e)=>setEmployee_id(e.target.value)} value={employee_id} />
                <input type="text" className='signelm' placeholder="Name" onChange={(e)=>setName(e.target.value)} value={name} />
                <input type="number" className='signelm' placeholder="Age" onChange={(e)=>setAge(e.target.value)} value={age} />
                <input type="number" className='signelm' placeholder="Salary" onChange={(e)=>setSalary(e.target.value)} value={salary} />
                {/* <input type="text" className='signelm' placeholder="Department" onChange={(e)=>setDepartment(e.target.value)} value={department} /> */}
                {/* //create select tag for department and add options to select tag using map function and store selected option in department state variable using setDepartment function and set selected option in department state variable as value of select tag using department state variable  */}
                <select className='signelm slcttag' onChange={(e)=>setDepartment(e.target.value)} value={department}>
                    <option value="">Select Department</option>
                    {
                        ['IT', 'HR', 'Sales', 'Marketing', 'Finance', 'Other'].map((department, index) => {
                            return <option key={index} value={department}>{department}</option>
                        })
                    }
                </select>
                <button onClick={addEmployee} className='signelm actbtn' id='addEmployeeBtn' type="submit">Add Employee</button>
            </form>
        </div>
    )
}

//export html of add employee form
export default AddEmployee;



