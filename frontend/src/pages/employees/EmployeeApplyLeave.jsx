import { useEffect, useState } from "react";
import { employees } from "../../data/dummyData";
import Layout from "../../components/Layout";
import { applyLeave, hasApplyLeave } from "../../api/api";

export default function EmployeeApplyLeave() {
  const userID = localStorage.getItem("userID");
  const token = localStorage.getItem("token");
  const [isApply, setIsApply] = useState(false);
  const [form, setForm] = useState({
    userID: userID,
    leaveType: "",
    fromDate: "",
    toDate: "",
    reason: "",
  });
  useEffect(() => {
    hasApply();
  }, []);

  // has employee apply leave
  const hasApply = async () => {
    const data = await hasApplyLeave(token);
    if (data.msg === 1) {
      setIsApply(true);
      return;
    }
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (new Date(form.fromDate) > new Date(form.toDate)) {
      alert(
        "Invalid date range: 'To Date' must be later than or equal to 'From Date'.",
      );
      return;
    }
    if (
      form.leaveType == "" ||
      form.fromDate == "" ||
      form.toDate == "" ||
      form.reason == ""
    ) {
      alert("Fill up all the details");
    }
    const data = await applyLeave(form, token);
    if (data.msg == 0) {
      alert("You have already applied leave for today");
    }
    if (data) {
      alert("Successfully submitted");
      setForm({
        userID: userID,
        leaveType: "",
        fromDate: "",
        toDate: "",
        reason: "",
      });
    }
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow">
        <h1 className="text-xl font-bold mb-4">
          {isApply ? (
            <h2 className="text-red-20">You have applied leave for today</h2>
          ) : (
            "Apply Leave"
          )}
        </h1>

        {/* Employee */}
        {/* <select
          name="userID"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        >
          <option>Select Employee</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.name}
            </option>
          ))}
        </select> */}

        {/* Leave Type */}
        <select
          name="leaveType"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        >
          <option>SICK</option>
          <option>CASUAL</option>
          <option>ANNUAL</option>
        </select>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-3">
          <input
            type="date"
            value={form.fromDate}
            name="fromDate"
            onChange={handleChange}
            className="p-2 border rounded"
          />

          <input
            type="date"
            name="toDate"
            value={form.toDate}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>

        {/* Reason */}
        <textarea
          name="reason"
          placeholder="Reason"
          value={form.reason}
          onChange={handleChange}
          className="w-full mt-3 p-2 border rounded"
        />

        <button
          onClick={handleSubmit}
          className="w-full mt-4 bg-green-500 text-white py-2 rounded cursor-pointer"
        >
          Apply Leave
        </button>
      </div>
    </Layout>
  );
}
