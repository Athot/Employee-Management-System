import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { employeeLeaves } from "../../api/api";
import { formatDate } from "../../utils/commonFunctions";

export default function EmployeeLeaves() {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("userID");
  const [allData, setAllData] = useState([]);
  useEffect(() => {
    fetchEmployeesLeaves();
  }, []);

  const fetchEmployeesLeaves = async () => {
    const data = await employeeLeaves(token, id);
    if (data) {
      setAllData(data);
    }
  };
  console.log(allData.length);
  return (
    <Layout>
      <h1 className="text-xl font-bold mb-4">My Leaves</h1>

      <div className="grid gap-4">
        {allData?.length === 0 ? (
          <h1 className="text-gray-600">
            You haven’t applied for any leave yet
          </h1>
        ) : (
          allData.map((l, i) => (
            <div key={i} className="bg-white p-4 rounded-xl shadow">
              <p className="font-bold mb-2">{l.leaveType}</p>
              <p className="text-gray-500 mb-2">
                {formatDate(l.fromDate)} → {formatDate(l.toDate)}
              </p>

              <span
                className={`px-2 py-1 rounded text-sm ${
                  l.status === "APPROVED"
                    ? "bg-green-100 text-green-600"
                    : l.status === "REJECTED"
                      ? "bg-red-100 text-red-600"
                      : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {l.status}
              </span>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
}
