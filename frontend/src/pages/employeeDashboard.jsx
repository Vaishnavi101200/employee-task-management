import React from "react";
import { useAuth } from "../context/authContext.jsx";

const EmployeeDashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <h2>Employee Dashboard</h2>
    </div>
  );
};

export default EmployeeDashboard;
