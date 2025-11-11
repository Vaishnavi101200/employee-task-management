import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add = () => {
        const navigate = useNavigate();
        const [departments, setDepartments] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);

        useEffect(() => {
            const fetchDepartments = async () => {
                try {
                    const response = await axios.get("http://localhost:5000/api/department", {
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem("token")}`
                        }
                    });
                    
                    if (response.data.success) {
                        console.log("Fetched departments:", response.data.departments);
                        setDepartments(response.data.departments);
                    } else {
                        setError("Failed to fetch departments");
                    }
                } catch (error) {
                    console.error("Error fetching departments:", error);
                    setError(error.response?.data?.error || "Failed to fetch departments");
                } finally {
                    setLoading(false);
                }
            };

            fetchDepartments();
        }, [])

    // form state for controlled inputs
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        employeeId: "",
        dob: "",
        gender: "",
        maritalStatus: "",
        designation: "",
        department: "",
        salary: "",
        password: "",
        role: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        // Validate that all required fields are filled
        if (!formData.name || !formData.email || !formData.password || !formData.role || !formData.department) {
            alert("Please fill in all required fields");
            return;
        }

        try{
            const response = await axios.post("http://localhost:5000/api/employee/add", formData, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                }
            });
            if(response.data.success){
                alert("Employee added successfully!");
                navigate("/admin-dashboard/employees");
            }
        } catch (error) {
            console.error("Error adding employee:", error);
            if (error.response && error.response.data) {
                alert(error.response.data.error || "Failed to add employee");
            } else {
                alert("An unexpected error occurred.");
            }
        }
    };

    return (
    <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
                <h2 className='text-2xl font-bold mb-6'>Add New Employee</h2>
                <form onSubmit={handleSubmit}>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        {/*Name*/}
                        <div>
                            <label className='block text-sm font-medium text-gray-700'>
                                Name
                            </label>
                            <input 
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder='Insert Name'
                                className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                                required
                            />
                        </div>

                        {/* Email */} 
                        <div> 
                            <label className="block text-sm font-medium text-gray-700"> 
                                Email
                            </label>
                            <input 
                                type="email" 
                                name="email" 
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Insert Email" 
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                required /> 
                        </div>

                        {/* Employee ID */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Employee ID
                            </label>
                        <input
                            type="text"
                            name="employeeId"
                            value={formData.employeeId}
                            onChange={handleChange}
                            placeholder="Employee ID"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        />
                        </div>

                        {/* Date of Birth*/}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Date of Birth
                            </label>
                        <input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            placeholder="DOB"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        />
                        </div>

                        {/* Gender */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Gender
                            </label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        </div>

                        {/* Marital Status */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Marital Status
                            </label>
                        <select
                            name="maritalStatus"
                            value={formData.maritalStatus}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        >
                            <option value="">Select Marital Status</option>
                            <option value="single">Single</option>
                            <option value="married">Married</option>
                        </select>
                        </div>

                        {/* Designation */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Designation
                            </label>
                        <input
                            type="text"
                            name="designation"
                            value={formData.designation}
                            onChange={handleChange}
                            placeholder="Designation"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        />
                        </div>

                        {/* Department */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Department
                            </label>
                        <select
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                            disabled={loading}
                        >
                            <option value="">
                                {loading ? "Loading departments..." : error ? "Error loading departments" : "Select Department"}
                            </option>
                            {!loading && !error && departments.map(dep => (
                                <option key={dep._id} value={dep._id}>
                                    {dep.dep_name}
                                </option>
                            ))}
                        </select>
                        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
                        </div>

                        {/* Salary */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Salary
                            </label>
                        <input
                            type="number"
                            name="salary"
                            value={formData.salary}
                            onChange={handleChange}
                            placeholder="Salary"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="******"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        />
                        </div>

                        {/* Role */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Role
                            </label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        >
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="employee">Employee</option>
                        </select>
                        </div>

                        <button
                            type='submit'
                            className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'
                        >
                            Add Employee
                        </button>
                    </div>
                </form>
            </div>
    )

}
export default Add;