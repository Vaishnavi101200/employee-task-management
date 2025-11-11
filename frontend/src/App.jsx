import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import { useState } from 'react'
import Login from './pages/Login.jsx'
import AdminDashboard from './pages/adminDashboard.jsx'
import EmployeeDashboard from './pages/employeeDashboard.jsx'
import PrivateRoutes from './utils/PrivateRoutes.jsx'
import RoleBasedRoutes from './utils/RoleBasedRoutes.jsx'
import AdminSummary from './components/dashboard/AdminSummary.jsx'
import DepartmentList from './components/department/departmentList.jsx'
import AddDepartment from './components/department/AddDepartment.jsx'
import EditDepartment from './components/department/EditDepartment.jsx'
import Add from './components/employee/Add.jsx'
import List from './components/employee/List.jsx'
import View from './components/employee/View.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard" element={
          <PrivateRoutes>
            <RoleBasedRoutes requiredRole={['admin']}>
              <AdminDashboard />
            </RoleBasedRoutes>
          </PrivateRoutes>
          }>
            <Route index element={<AdminSummary />}></Route>
            <Route path='/admin-dashboard/departments' element={<DepartmentList />}></Route>
            <Route path='/admin-dashboard/add-new-department' element={<AddDepartment />}></Route>
            <Route path='/admin-dashboard/departments/:id' element={<EditDepartment />}></Route>

            <Route path='/admin-dashboard/employees' element={<List />}></Route>
            <Route path='/admin-dashboard/add-employee' element={<Add />}></Route>
            <Route path='/admin-dashboard/employee/:id' element={<View />}></Route>
          </Route>


          
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
