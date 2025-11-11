import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper.jsx";
import axios from "axios";

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const [depLoading, setDepLoading] = useState(false);
    const [filteredDepartments, setFilteredDepartments] = useState([]);

    const onDepartmentDeleted = async (id) => {
        const data = departments.filter((dep) => dep._id !== id);
        setDepartments(data);
    }

    // Keep filteredDepartments in sync with departments
    useEffect(() => {
        setFilteredDepartments(departments);
    }, [departments]);

    useEffect(() => {
        const fetchDepartments = async () => {
            setDepLoading(true);
            try{
                const response = await axios.get("http://localhost:5000/api/department", {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
            })
            if(response.data.success){
                let sno = 1;
                console.log(response.data);
                const data = await response.data.departments.map((dep) => (
                    {
                        _id: dep._id,
                        sno: sno++,
                        dep_name: dep.dep_name,
                        // pass the correct prop name expected by DepartmentButtons
                        action : (<DepartmentButtons _id={dep._id} onDepartmentDeleted={onDepartmentDeleted}/>)
                    }
                ))
                setDepartments(data);
                setFilteredDepartments(data);
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        } finally {
            setDepLoading(false);
        }
    }

    fetchDepartments();
}, []);

const filterDepartments = (event) => {
    const searchValue = event.target.value.toLowerCase().trim();
    console.log('Filtering departments with search value:', searchValue);
    
    try {
        const records = departments.filter((dep) => {
            if (!dep || !dep.dep_name) {
                console.warn('Invalid department entry:', dep);
                return false;
            }
            return dep.dep_name.toLowerCase().includes(searchValue);
        });
        
        console.log(`Found ${records.length} matching departments`);
        setFilteredDepartments(records);
    } catch (error) {
        console.error('Error filtering departments:', error);
        setFilteredDepartments(departments); // Reset to all departments on error
    }
}

    return (
        <>{depLoading ? <div>Loading...</div> : 
        <div className="p-5">
            <div className = 'text-center'>
                <h3 className="text-2xl font-bold">Manage Departments</h3>
            </div>
            <div className="flex justify-between items-center">
                <input 
                    type="text" 
                    placeholder="Search by Department Name" 
                    className="px-4 py-0.5 border rounded focus:outline-none focus:ring-2 focus:ring-teal-600"
                    onChange={filterDepartments}
                    onKeyDown={(e) => e.key === 'Escape' && e.target.value === '' && setFilteredDepartments(departments)}
                />
                <Link 
                to="/admin-dashboard/add-new-department"
                className='px-4 py-1 bg-teal-600 rounded text-white'>
                    Add New Department
                </Link>
            </div>
            <div className="mt-5">
                <DataTable 
                    columns = {columns} data = {filteredDepartments} pagination
                />
            </div>
        </div>
    }</>
    );
};

export default DepartmentList;