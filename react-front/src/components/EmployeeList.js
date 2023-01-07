//import react
import React,{useState, useEffect} from 'react';

const DOMAIN = 'http://dev1.switchme.in:5000';

//function to get employee list from node server using fetch api and async await method and display employee list in table format using map function and display error message if any error occurs while fetching data from node server 
const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState('');

    //get token from local storage
    const token = JSON.parse(localStorage.getItem('token'));

    //fetch data from node server using fetch api and async await method and pass token in header to authenticate user
    
    useEffect(() => {
        const getEmployees = async () => {
            const res = await fetch(DOMAIN + '/api/get-all-employee-list', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            });
            const data = await res.json();
            console.log('data: ', data);
            if(data.error){
                setError(data.error);
            }else{
                setEmployees(data);
            }
        }
        getEmployees();
    }, [token]);  

    return (
        <div className='parentz'>
            <h1>Employee List</h1>
            {error && <p>{error}</p>}
            <table className='emp-list-table'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Salary</th>
                        <th>Department</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee._id}>
                            <td>{employee.employee_id}</td>
                            <td>{employee.name}</td>
                            <td>{employee.age}</td>
                            <td>{employee.salary}</td>
                            <td>{employee.department}</td>
                            <td>
                                <button className='action-btn edit-btn'>Edit</button>
                                <button className='action-btn delete-btn'>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default EmployeeList;