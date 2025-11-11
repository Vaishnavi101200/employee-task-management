import { useNavigate } from "react-router-dom"
import axios from "axios"

export const columns = [
    {
        name: "S No.",
        selector: (row) => row.sno,
        width: "70px"
    },
    {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
        width: "300px"
    },
    {
        name: "Department",
        selector: (row) => row.dep_name,
        width: "120px"
    },
    {
        name: "DOB",
        selector: (row) => row.dob,
        sortable: true,
        width: "230px"
    },
    {
        name: "Action",
        selector: (row) => row.action,
        center: "true"
    }
]

export const fetchDepartments = async () => {
    let departments
            try{
                const response = await axios.get("http://localhost:5000/api/department", {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
            })
            if(response.data.success){
                departments = response.data.departments
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        }
        return departments
    }

export const EmployeeButtons = ({ Id }) => {
    const navigate = useNavigate();

    return (
        <div className="flex gap-1 flex-nowrap">
            <button
                className="px-2 py-1 bg-teal-600 text-white text-xs font-medium whitespace-nowrap"
                onClick={() => {
                    if (!Id) return;
                    navigate(`/admin-dashboard/employee/${Id}`);
                }}
            >
                View
            </button>
            <button 
                className="px-2 py-1 bg-blue-600 text-white text-xs font-medium whitespace-nowrap"
                onClick={() => {
                    if (!Id) return;
                    navigate(`/admin-dashboard/employees/${Id}/edit`);
                }}
            >
                Edit
            </button>
            <button 
                className="px-2 py-1 bg-yellow-600 text-white text-xs font-medium whitespace-nowrap"
            >
                Salary
            </button>
            <button 
                className="px-2 py-1 bg-red-600 text-white text-xs font-medium whitespace-nowrap"
            >
                Leave
            </button>
        </div>
    )
};    