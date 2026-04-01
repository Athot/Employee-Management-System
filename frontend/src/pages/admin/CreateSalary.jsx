import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { createSalary, getAllSalary } from "../../api/api";
import { formatDate } from "../../utils/commonFunctions";
import { fetchEmployees } from "../../redux/slices/employeeSlice";

export default function CreateSalary() {
  const token = localStorage.getItem("token");
  const [allData, setAllData] = useState([]);
  const [upload, setUpload] = useState(false);
  const dispatch = useDispatch();
  // get all the employee
  const { employees, loading } = useSelector((state) => state.employee);
  console.log(employees);
  // call from redux

  useEffect(() => {
    fetchSalary();
  }, []);
  const fetchSalary = async () => {
    const data = await getAllSalary(token);
    setAllData(data);
  };
  const [form, setForm] = useState({
    userID: "",
    month: "",
    basic: "",
    hra: "",
    allowances: "",
    deductions: "",
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🧠 Net Salary Calculation
  const netSalary =
    Number(form.basic) +
    Number(form.hra) +
    Number(form.allowances) -
    Number(form.deductions);
  const handleSubmit = async () => {
    const data = await createSalary(token, form);
    if (data) {
      alert("Uploaded successful");
      fetchSalary();
    }
  };

  return (
    <AdminLayout>
      <button
        className={`mb-2 ${!upload ? "bg-green-500" : "bg-red-500"}   text-white px-5 py-2 rounded-xl shadow cursor-pointer`}
        onClick={() => {
          setUpload(!upload);
          dispatch(fetchEmployees(token));
        }}
      >
        {upload ? "- Cancel Salary" : "+ Add Salary"}
      </button>

      {!upload ? (
        <div className="grid gap-4">
          {!allData ? (
            <h1>No salary has given</h1>
          ) : (
            allData.map((l, i) => (
              <div key={i}>
                <div className="bg-white p-4 rounded-xl shadow flex flex-col md:flex-row justify-between">
                  <div>
                    <p className="font-bold">{l.userName}</p>
                    <p>
                      Basic → <span className="font-semibold">{l.basic}</span>
                    </p>
                    <p>
                      HRA → <span className="font-semibold">{l.hra}</span>
                    </p>
                    <p>
                      Deductions →{" "}
                      <span className="font-semibold">{l.deductions}</span>
                    </p>
                    <p>
                      NetSalary →{" "}
                      <span className="font-semibold">{l.netSalary}</span>
                    </p>
                    <p>
                      Month →{" "}
                      <span className="font-semibold">
                        {formatDate(l.month)}
                      </span>
                    </p>
                  </div>

                  <h3 className="items-center flex text-gray-600 text-md">
                    On {formatDate(l.createdAt)}
                  </h3>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow">
          <h1 className="text-2xl font-bold text-gray-700 mb-6">
            Create Salary
          </h1>

          {/* Employee Select */}
          <select
            name="userID"
            onChange={handleChange}
            className="w-full mb-4 p-2 border rounded focus:outline-green-500 cursor-pointer"
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp.userID} value={emp.userID}>
                {emp.name}
              </option>
            ))}
          </select>

          {/* Month + Year */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}
          <label className="block mb-1 text-sm text-gray-600">
            Select month
          </label>
          <input
            type="month"
            name="month"
            onChange={handleChange}
            className="p-2 border rounded w-full cursor-pointer"
          />

          {/* <input
            name="year"
            placeholder="Year"
            onChange={handleChange}
            className="p-2 border rounded"
          /> */}
          {/* </div> */}

          {/* Salary Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <input
              name="basic"
              placeholder="Basic Salary"
              onChange={handleChange}
              className="p-2 border rounded"
            />

            <input
              name="hra"
              placeholder="HRA"
              onChange={handleChange}
              className="p-2 border rounded"
            />

            <input
              name="allowances"
              placeholder="Allowances"
              onChange={handleChange}
              className="p-2 border rounded"
            />

            <input
              name="deductions"
              placeholder="Deductions"
              onChange={handleChange}
              className="p-2 border rounded"
            />
          </div>

          {/* Net Salary Preview */}
          <div className="mt-6 bg-green-50 p-4 rounded-xl text-center">
            <p className="text-gray-500">Net Salary</p>
            <p className="text-2xl font-bold text-green-600">₹{netSalary}</p>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl cursor-pointer"
          >
            Create Salary
          </button>
        </div>
      )}
    </AdminLayout>
  );
}
