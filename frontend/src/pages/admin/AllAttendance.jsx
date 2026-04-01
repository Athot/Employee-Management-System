import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../../components/AdminLayout";
import Layout from "../../components/AdminLayout";
import { leaves } from "../../data/dummyData";
import { useReducer } from "react";
import { useEffect } from "react";
import { getAllAttendance } from "../../redux/slices/employeeSlice";

const AllAttendance = () => {
  const { attendance, loading } = useSelector((state) => state.employee);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllAttendance(token));
  }, [dispatch, token]);
  // console.log(attendance);
  const total = attendance?.length;
  const present = attendance?.filter((a) => a.status === "PRESENT").length;
  const late = attendance?.filter((a) => a.status === "LATE").length;

  return (
    <AdminLayout>
      {/* <h1 className="text-xl font-bold mb-4">A Requests</h1> */}
      {/* title */}
      {/* summary card */}
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-2xl shadow flex flex-col items-center justify-center">
            <p className="text-gray-500">TOTAL</p>
            <h2 className="text-xl font-bold">{total}</h2>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow flex flex-col items-center justify-center">
            <p className="text-gray-500">PRESENT</p>
            <h2 className="text-xl font-bold">{present}</h2>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow flex flex-col items-center justify-center">
            <p className="text-gray-500">LATE</p>
            <h2 className="text-xl font-bold">{late}</h2>
          </div>
        </div>

        {/* table */}

        <div className="bg-white rounded-2xl shadow p-4">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-gray-500 text-sm">
                <th className="py-2">Date</th>
                <th>Check In</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {attendance.map((a) => {
                const time = new Date(a.checkIn);
                return (
                  <tr
                    key={a._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-3">{a.date}</td>
                    <td>
                      {time.toLocaleDateString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td>
                      <span
                        className={`px-3 py-1 text-xs rounded-full font-medium ${
                          a.status === "PRESENT"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {a.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};
export default AllAttendance;
