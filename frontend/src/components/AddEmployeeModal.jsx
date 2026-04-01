import { useState } from "react";
import { createEmployee } from "../api/api";
import { useDispatch } from "react-redux";
import { fetchEmployees } from "../redux/slices/employeeSlice";

export default function AddEmployeeModal({ onClose }) {
  const getToken = localStorage.getItem("token");
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    position: "",
    salary: "",
  });

  const handleSubmit = async () => {
    if (
      form.name == "" ||
      form.email == "" ||
      form.password == "" ||
      form.department == "" ||
      form.position == "" ||
      form.salary == ""
    ) {
      alert("FIll up all the details");
      return;
    }

    const res = await createEmployee(form, getToken);
    if (res) {
      dispatch(fetchEmployees(getToken));
      alert("Successful added");
      onClose();
      return;
    } else {
      alert("Error");
    }
  };
  // when the admin is adding the employee it should display all the existing user

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm  flex justify-center items-center">
      <div className="bg-white p-6 rounded-2xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add Employee</h2>

        <input
          type="name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Name"
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          autoComplete="off"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded"
        />
        {/* <select className="w-full mb-3 p-2 border rounded">
          <option>EMPLOYEE</option>
          <option>HR</option>
        </select> */}

        <input
          type="text"
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
          placeholder="Department"
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="text"
          value={form.position}
          onChange={(e) => setForm({ ...form, position: e.target.value })}
          autoComplete="off"
          placeholder="Positon"
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="number"
          value={form.salary}
          onChange={(e) => setForm({ ...form, salary: e.target.value })}
          placeholder="Salary"
          className="w-full mb-3 p-2 border rounded"
        />
        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 border rounded" onClick={onClose}>
            Cancel
          </button>

          <button
            className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
            onClick={() => handleSubmit()}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
