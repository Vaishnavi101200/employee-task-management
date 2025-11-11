import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper';
import DataTable from 'react-data-table-component';
import axios from 'axios';

const List = () => {

    const [employees, setEmployees] = useState([])
    const [empLoading, setEmpLoading] = useState(false);

    useEffect(() => {
        const fetchEmployees = async () => {
            setEmpLoading(true)
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/employee",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                console.log(response.data)
                if (response.data.success) {
                    let sno = 1;
                    const data = await response.data.employees.map((emp) => {
                    // Debug: ensure we are using the employee document _id when navigating
                    console.log('List: employee _id ->', emp._id, 'userId ->', emp.userId && emp.userId._id);
                    return {
                    _id: emp._id,
                    sno: sno++,
                    dep_name: emp.department.dep_name,
                    name: emp.userId.name,
                    dob: new Date(emp.dob).toLocaleDateString(),
                    // Use the employee document _id for navigation so backend can find by employee._id
                    action: (<EmployeeButtons Id={emp._id} />)
                }
                })
                setEmployees(data)
            }
        }catch (error){
            if(error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
        }finally {
            setEmpLoading(false)
        }
    }

    fetchEmployees()
}, [])


    return (
        <div className='p-6'>
        <div className = 'text-center'>
                <h3 className="text-2xl font-bold">Manage Employee</h3>
            </div>
            <div className="flex justify-between items-center">
                <input 
                    type="text" 
                    placeholder="Search by Employee Name" 
                    className="px-4 py-0.5 border rounded focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
                <Link 
                to="/admin-dashboard/add-employee"
                className='px-4 py-1 bg-teal-600 rounded text-white'>
                    Add New Employee
                </Link>
            </div>
            <div>
                <DataTable columns={columns} data={employees}/>
            </div>
        </div>
    )

}
export default List;