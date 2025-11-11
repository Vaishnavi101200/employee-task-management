import React, { use, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditDepartment = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [department, setDepartment] = useState({ dep_name: "", description: "" });
    const [depLoading, setDepLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return; // nothing to fetch
        const fetchDepartment = async () => {
            setDepLoading(true);
            try {
                const response = await axios.get(`http://localhost:5000/api/department/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (response.data && response.data.success) {
                    setDepartment(response.data.department || {});
                } else {
                    setError(response.data?.error || "Failed to load department");
                }
            } catch (err) {
                console.error("fetchDepartment error:", err?.message || err);
                setError(err?.response?.data?.error || "Server error");
            } finally {
                setDepLoading(false);
            }
        };

        fetchDepartment();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Try to call update endpoint (may not exist yet)
            const response = await axios.put(`http://localhost:5000/api/department/${id}`, department, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            if (response.data && response.data.success) {
                navigate("/admin-dashboard/departments");
            } else {
                alert(response.data?.error || "Failed to update department");
            }
        } catch (err) {
            console.error("update error:", err?.message || err);
            alert(err?.response?.data?.error || "Server error while updating");
        }
    };

    return (
        <>
            {depLoading ? (
                <div>Loading...</div>
            ) : (
                <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
                    <h3 className="text-2xl font-bold mb-6">Edit Department</h3>
                    {error && <div className="text-red-600 mb-4">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="dep_name" className="text-sm font-medium text-gray-700">
                                Department Name
                            </label>
                            <input
                                type="text"
                                name="dep_name"
                                onChange={handleChange}
                                value={department.dep_name || ""}
                                placeholder="Department Name"
                                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div className="mt-3">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                name="description"
                                placeholder="Description"
                                onChange={handleChange}
                                value={department.description || ""}
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                rows="4"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Save Changes
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default EditDepartment;
