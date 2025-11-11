import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const View = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchEmployee = async () => {
            // Debug: log the id we are about to fetch
            console.log('View: fetching employee id ->', id);
            try {
                const response = await axios.get(`http://localhost:5000/api/employee/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (response.data && response.data.success) {
                    setEmployee(response.data.employee);
                } else if (response.data && !response.data.success) {
                    setError(response.data.error || 'Failed to load employee');
                }
            } catch (err) {
                // Show clearer message if server responded
                if (err.response) {
                    // Log server response body for debugging
                    console.error('getEmployee response error body:', err.response.data);
                    const msg = err.response.data?.error || err.response.statusText || 'Server Error';
                    setError(msg);
                } else {
                    console.error('getEmployee network/error:', err.message || err);
                    setError('Network or server not reachable');
                }
            }
        };
        if (id) fetchEmployee();
    }, [id]);

    return (
        <div>
            <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
                <h2 className="text-2xl font-bold mb-8 text-center">Employee Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <div className="flex space-x-3 mb-5">
                            <p className="text-lg font-bold">Name:</p>
                            <p className="font-medium">{employee?.userId?.name || "-"}</p>
                        </div>
                        <div className="flex space-x-3 mb-5">
                            <p className="text-lg font-bold">Employee ID: </p>
                            <p className="font-medium">{employee?.employeeId || "-"}</p>
                        </div>
                        <div className="flex space-x-3 mb-5">
                            <p className="text-lg font-bold">Date of Birth: </p>
                            <p className="font-medium">
                                {employee?.dob ? new Date(employee.dob).toLocaleDateString() : "-"}
                            </p>
                        </div>
                        <div className="flex space-x-3 mb-5">
                            <p className="text-lg font-bold">Gender: </p>
                            <p className="font-medium">{employee?.gender || "-"}</p>
                        </div>
                        <div className="flex space-x-3 mb-5">
                            <p className="text-lg font-bold">Department: </p>
                            <p className="font-medium">{employee?.department?.dep_name || "-"}</p>
                        </div>
                        <div className="flex space-x-3 mb-5">
                            <p className="text-lg font-bold">Marital Status: </p>
                            <p className="font-medium">{employee?.maritalStatus || "-"}</p>
                        </div>
                        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default View;