import { useNavigate } from "react-router-dom";
import axios from "axios";

export const columns = [
    {
        name: "S No.",
        selector: (row) => row.sno
    },
    {
        name: "Department Name",
        selector: (row) => row.dep_name,
        sortable: true
    },
    {
        name: "Action",
        cell: (row) => row.action,
        ignoreRowClick: true,
        allowoverflow: true
    }
]

export const DepartmentButtons = ({ _id, onDepartmentDeleted }) => {
    const navigate = useNavigate();

    const handleDelete = async() => {
        if (!_id) {
            console.error('No department ID provided for deletion');
            return;
        }
        console.log('Department ID for deletion:', _id);

        const confirmed = window.confirm("Are you sure you want to delete this department?");
        if (confirmed) {
            try {
                console.log('Attempting to delete department:', _id);
                const response = await axios.delete(`http://localhost:5000/api/department/${_id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (response.data && response.data.success) {
                    onDepartmentDeleted && onDepartmentDeleted(_id);
                    alert("Department deleted successfully");
                } else {
                    alert(response.data?.error || "Failed to delete department");
                }
            } catch (err) {
                console.error("Delete department error:", {
                    status: err?.response?.status,
                    message: err?.message,
                    data: err?.response?.data,
                    url: `http://localhost:5000/api/department/${_id}`
                });
                alert(err?.response?.data?.error || "Server error while deleting");
            }
        }
    }
    // remove debug alert and use the passed-in _id prop
    return (
        <div className="flex space-x-3 ">
            <button
                className="px-3 py-1 bg-teal-600 text-white"
                onClick={() => {
                    if (!_id) return; // guard for undefined id
                    // route defined in App: /admin-dashboard/departments/:id
                    navigate(`/admin-dashboard/departments/${_id}`);
                }}
            >Edit</button>
            <button 
                className="px-3 py-1 bg-red-600 text-white"
                onClick={handleDelete}
            >Delete</button>
        </div>
    )
};

// keep a backward-compatible alias in case other modules import `DepartmentHelper`
export { DepartmentButtons as DepartmentHelper };