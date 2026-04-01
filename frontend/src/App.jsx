import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AdminEmployees from "./pages/admin/AdminEmployees";
import AddEmployeeModal from "./components/AddEmployeeModal";
import ViewEmployeeDetails from "./pages/hr/ViewEmployeeDetails";
import EmployeeDashboard from "./pages/employees/EmployeeDashboard";
import EmployeeProfile from "./pages/employees/EmployeeProfile";
import EmployeeLeaves from "./pages/employees/EmployeeLeaves";
import EmployeeSalary from "./pages/employees/EmployeeSalary";
import EmployeeAttendance from "./pages/employees/EmployeeAttendance";
import EmployeeApplyLeave from "./pages/employees/EmployeeApplyLeave";
import Leaves from "./pages/admin/Leaves";
import CreateSalary from "./pages/admin/CreateSalary";
import AdminProfile from "./pages/admin/AdminProfile";
import HrProfile from "./pages/hr/HrProfile";
// import IF from "./pages/EmployeeAttendance";
import AllAttendance from "./pages/admin/AllAttendance";
import ViewAttendanceHr from "./pages/hr/ViewAttendanceHr";
import ViewLeaveHr from "./pages/hr/ViewLeaveHr";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="admin-dashboard" element={<AdminEmployees />} />
        <Route path="admin-salary" element={<CreateSalary />} />
        <Route path="add-employee" element={<AddEmployeeModal />} />
        <Route path="admin-leaves" element={<Leaves />} />
        <Route path="admin-profile" element={<AdminProfile />} />

        <Route path="admin-attendance" element={<AllAttendance />} />

        {/* HR */}
        <Route path="hr-view-employee" element={<ViewEmployeeDetails />} />
        <Route path="hr-profile" element={<HrProfile />} />
        <Route path="hr-attendance" element={<ViewAttendanceHr />} />
        <Route path="hr-leave" element={<ViewLeaveHr />} />

        {/* <Route path="hr" element={<IF />} /> */}

        {/* Employee */}
        <Route path="employee-dashboard" element={<EmployeeDashboard />} />
        <Route path="employee-attendance" element={<EmployeeAttendance />} />
        <Route path="employee-apply-leaves" element={<EmployeeApplyLeave />} />
        <Route path="employee-leaves" element={<EmployeeLeaves />} />
        <Route path="employee-salary" element={<EmployeeSalary />} />
        <Route path="employee-profile" element={<EmployeeProfile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
