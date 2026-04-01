import { employees } from "../../data/dummyData";
import HrLayout from "../../components/HrLayout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../../redux/slices/employeeSlice";
import { editEmployeeData } from "../../api/api";

export default function ViewEmployeeDetails() {
  const [search, setSearch] = useState("");
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const { employees, loading } = useSelector((state) => state.employee);
  const filtered = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase()),
  );

  const [editEmployee, setEditEmployee] = useState(null);
  const [employeeID, setEmployeeID] = useState(null);

  useEffect(() => {
    dispatch(fetchEmployees(token));
  }, [dispatch]);
  console.log(employees);
  const [form, setForm] = useState({
    department: "",
    position: "",
    salary: "",
  });

  // edit the employee
  const editEmployees = async (userID) => {
    const data = await editEmployeeData(token, userID, form);
    if (data) {
      alert("Successfully updated");
      setEditEmployee(null);
      setEmployeeID(null);
      setForm({
        department: "",
        position: "",
        salary: "",
      });
      dispatch(fetchEmployees(token));
    }
  };
  return (
    <HrLayout>
      {/* Header */}
      {/* <div className="flex flex-col md:flex-row  items-center mb-6 gap-3">
        <h1 className="text-2xl font-bold text-gray-700">
          View Employee By HR
        </h1>
      </div> */}

      {/* search */}
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

      {editEmployee ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6 relative">
            {/* Title */}
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Edit Employee
            </h2>

            {/* Inputs */}
            <input
              type="text"
              placeholder="Department"
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
              className="w-full mb-3 p-2 border rounded-lg focus:outline-green-500"
            />

            <input
              type="text"
              value={form.position}
              onChange={(e) => setForm({ ...form, position: e.target.value })}
              placeholder="Position"
              className="w-full mb-3 p-2 border rounded-lg focus:outline-green-500"
            />

            <input
              type="number"
              placeholder="Salary"
              value={form.salary}
              onChange={(e) => setForm({ ...form, salary: e.target.value })}
              className="w-full mb-4 p-2 border rounded-lg focus:outline-green-500"
            />

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                onClick={() => {
                  setEditEmployee(null);
                  setEmployeeID(null);
                  setForm({
                    department: "",
                    position: "",
                    salary: "",
                  });
                }}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                onClick={() => editEmployees(employeeID)}
              >
                Update
              </button>
            </div>

            {/* Close Icon */}
            <button
              className="absolute top-2 right-3 text-gray-500 text-lg"
              onClick={() => {
                setEditEmployee(null);
                setEmployeeID(null);
                setForm({
                  department: "",
                  position: "",
                  salary: "",
                });
              }}
            >
              ✕
            </button>
          </div>
        </div>
      ) : (
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
                  className="text-sm cursor-pointer bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => {
                    setEditEmployee(emp);
                    setEmployeeID(emp.userID);
                    setForm({
                      department: emp.department || "",
                      position: emp.position || "",
                      salary: emp.salary || "",
                    });
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </HrLayout>
  );
}
