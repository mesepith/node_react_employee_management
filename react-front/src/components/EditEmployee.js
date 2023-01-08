//import react 
import React, { useState, useEffect } from 'react';
//import useParams
import { useParams, useNavigate } from 'react-router-dom';

const DOMAIN = 'http://dev1.switchme.in:5000';

//get employees employee_id, name, age, salary, department from node server and display this employee details in edit employee form and on click update button validate data and update employee details in database, pass token in header to authenticate user
const EditEmployee = () => {
    //get employee_id, name, age, salary, department from node server using fetch api and async await method and pass token in header to authenticate user
    const [employee, setEmployee] = useState({
        employee_id: '',
        name: '',
        age: '',
        salary: '',
        department: ''
    });

    const params = useParams();
    const navigate = useNavigate();

    //get token from local storage
    const token = JSON.parse(localStorage.getItem('token'));

    //get employee_id, name, age, salary, department from node server using fetch api and async await method and pass token in header to authenticate user
    useEffect(() => {
        const getEmployee = async () => {
            const res = await fetch(DOMAIN + '/api/get-employee/' + params.id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            });
            const data = await res.json();
            console.log('data: ', data);
            setEmployee(data);
        }
        //on load call getEmployee function
        getEmployee();
    }, [params.id, token]); 

    
    //update employee details function using fetch api and async await method and pass token in header to authenticate user, on click update button validate data and update employee details in database, display error message if any error occurs while fetching data from node server
    const updateEmployee = async (e) => {
        console.log('employee z : ' + JSON.stringify(employee));
        e.preventDefault();

        //validate data
        if(employee.employee_id === '' || employee.name === '' || employee.age === '' || employee.salary === '' || employee.department === ''){
            
            setError('Please fill all fields');
            return;
        }
        //validate salary and age should be number only 
        if(isNaN(employee.salary) || isNaN(employee.age)){
            
            setError('Salary and age should be number only');
            return;
        }

        //Give loading text to update button on click and disable update button
        document.getElementById('updateEmployeeBtn').innerHTML = 'Loading...';
        document.getElementById('updateEmployeeBtn').disabled = true;


        const res = await fetch(DOMAIN + '/api/update-employee/' + params.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(employee)
        });
        const data = await res.json();
        console.log('data: ', data);

        //display error message if any error occurs while fetching data from node server
        document.getElementById('updateEmployeeBtn').innerHTML = 'Update';
        document.getElementById('updateEmployeeBtn').disabled = false;

        if(data.error){
            setError(data.error);
        }else{
            alert('Successfully updated');
            navigate('/');
            // setEmployee(data);
        }
    }

    //display error message if any error occurs while fetching data from node server
    const [error, setError] = useState('');
    
    //return edit employee form, similar to AddEmployee.js component 
    
    return (
        <div className='parentz'>
            <h1>Edit Employee</h1>
            <form>
                <input type="text" className='signelm' placeholder="Employee ID" name="employee_id" value={employee.employee_id} onChange={(e)=>setEmployee({...employee, employee_id: e.target.value})} />
                <input type="text" className='signelm' placeholder="Name" name="name" value={employee.name} onChange={(e)=>setEmployee({...employee, name: e.target.value})} />
                <input type="text" className='signelm' placeholder="Age" name="age" value={employee.age} onChange={(e)=>setEmployee({...employee, age: e.target.value})} />
                <input type="text" className='signelm' placeholder="Salary" name="salary" value={employee.salary} onChange={(e)=>setEmployee({...employee, salary: e.target.value})} />
                {/* create select tag for department */}
                <select className='signelm slcttag' name="department" value={employee.department} onChange={(e)=>setEmployee({...employee, department: e.target.value})}>
                    <option value="IT">IT</option>
                    <option value="HR">HR</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Other">Other</option>
                </select>

                {error && <p className='error-inp'>{error}</p>}
                <button className='signelm actbtn'  id='updateEmployeeBtn' onClick={updateEmployee}>Update</button>
            </form>
            
        </div>

    )
    
}




//export edit employee component
export default EditEmployee;




