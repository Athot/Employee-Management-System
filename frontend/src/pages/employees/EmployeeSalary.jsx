import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { generateSalarySlip, getAllSalary } from "../../api/api";
import { formatDate } from "../../utils/commonFunctions";

const EmployeeSalary = () => {
  const [salary, setSalary] = useState([]);
  useEffect(() => {
    fetchSalary();
  }, []);
  const token = localStorage.getItem("token");
  const fetchSalary = async () => {
    const data = await getAllSalary(token);
    if (data) {
      setSalary(data);
      return;
    } else {
      setSalary([]);
    }
  };
  //
  const downloadSlip = async (id) => {
    try {
      const data = await generateSalarySlip(token, id); // already res.data

      const blob = new Blob([data], { type: "application/pdf" });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `salary-slip-${id}.pdf`;

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      // console.log(error);
    }
  };
  return (
    <Layout>
      <h1 className="text-xl font-bold mb-4">My Salary</h1>

      <div className="grid md:grid-cols-2 gap-4">
        {!salary ? (
          <h3 className="font-semibold text-red-500">No salary yet</h3>
        ) : (
          salary.map((s, i) => (
            <div key={i} className="bg-white p-4 rounded-xl shadow">
              <p className="font-bold">{formatDate(s.createdAt)}</p>
              <p className="text-green-600 text-lg font-semibold">
                ₹{s.netSalary}
              </p>

              <button
                className="mt-2 bg-green-500 text-white px-3 py-1 rounded cursor-pointer"
                onClick={() => downloadSlip(s._id)}
              >
                Download Slip
              </button>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
};

export default EmployeeSalary;
