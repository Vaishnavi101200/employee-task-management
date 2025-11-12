import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import { useState } from 'react'
import Login from './pages/Login.jsx'
import AdminDashboard from './pages/adminDashboard.jsx'
import PrivateRoutes from './utils/PrivateRoutes.jsx'
import RoleBasedRoutes from './utils/RoleBasedRoutes.jsx'
import AdminSummary from './components/dashboard/AdminSummary.jsx'
import DepartmentList from './components/department/departmentList.jsx'
import AddDepartment from './components/department/AddDepartment.jsx'
import EditDepartment from './components/department/EditDepartment.jsx'
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
          </Route>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
