import { useEffect, useState } from "react";
import AddEmployeeModal from "../../components/AddEmployeeModal";
import AdminLayout from "../../components/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../../redux/slices/employeeSlice";
import { deleteEmployee } from "../../api/api";

export default function AdminEmployees() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const { employees, loading } = useSelector((state) => state.employee);
  const token = localStorage.getItem("token");
  useEffect(() => {
    dispatch(fetchEmployees(token));
  }, [dispatch]);

  const filtered = employees?.filter((emp) =>
    emp.name?.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col md:flex-row  items-center mb-6 gap-3">
        <h1 className="text-2xl font-bold text-gray-700">
          Employee Management
        </h1>

        <button
          className="ml-auto bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl shadow cursor-pointer"
          onClick={() => setShowModal(!showModal)}
        >
          + Add Employee
        </button>
      </div>

      {/* show modal of add employee */}
      {showModal && <AddEmployeeModal onClose={() => setShowModal(false)} />}
      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search employee..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 p-2 border rounded-lg focus:outline-green-500"
        />
      </div>

      {/* Employee Cards (Responsive) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((emp, id) => (
          <div
            key={id}
            className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition"
          >
            <h2 className="font-bold text-lg text-gray-700">
              {emp.department}
            </h2>
            <p className="text-gray-500 text-sm">{emp.name}</p>

            <p className="text-gray-500 text-sm">{emp.position}</p>

            <div className="mt-2 flex justify-between text-sm">
              <span className="font-semibold text-gray-500">Salary </span>
              <span className="bg-green-50 text-green-600 px-2 py-1 rounded">
                {emp.salary}
              </span>

              {/* <span>{emp.department}</span> */}
            </div>

            {/* Actions */}
            <div className="flex justify-end mt-4 gap-2">
              <button
                className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                onClick={async () => {
                  const isConfirmed = window.confirm("Are you sure to delete");
                  if (isConfirmed) {
                    const res = await deleteEmployee(emp.userID, token);
                    if (res) {
                      dispatch(fetchEmployees(token));
                      return;
                    }
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
