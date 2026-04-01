import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";

export default function EmployeeDashboard() {
  const navigate = useNavigate();

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Employee Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => navigate("/employee-profile")}
          className="bg-white p-4 rounded-2xl shadow cursor-pointer hover:shadow-lg"
        >
          <p className="text-gray-500">Profile</p>
          <p className="text-green-600 font-bold">View Info</p>
        </div>

        <div
          onClick={() => navigate("/employee-leaves")}
          className="bg-white p-4 rounded-2xl shadow cursor-pointer hover:shadow-lg"
        >
          <p className="text-gray-500">Leaves</p>
          <p className="text-green-600 font-bold">My Leaves</p>
        </div>

        <div
          onClick={() => navigate("/employee-salary")}
          className="bg-white p-4 rounded-2xl shadow cursor-pointer hover:shadow-lg"
        >
          <p className="text-gray-500">Salary</p>
          <p className="text-green-600 font-bold">My Salary</p>
        </div>

        <div
          onClick={() => navigate("/employee-attendance")}
          className="bg-white p-4 rounded-2xl shadow cursor-pointer hover:shadow-lg"
        >
          <p className="text-gray-500">Attendance</p>
          <p className="text-green-600 font-bold">Track</p>
        </div>
      </div>
    </Layout>
  );
}
