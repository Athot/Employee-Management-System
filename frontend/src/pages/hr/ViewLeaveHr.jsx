import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllLeaves } from "../../redux/slices/employeeSlice";
import { updateLeaveStatus } from "../../api/api";
import { useState } from "react";
import { formatDate } from "../../utils/commonFunctions";
import HrLayout from "../../components/HrLayout";

const ViewLeaveHr = () => {
  const token = localStorage.getItem("token");
  const { leave, loading } = useSelector((state) => state.employee);
  const dispatch = useDispatch();
  const [isApproved, setIsApproved] = useState(false);

  useEffect(() => {
    dispatch(getAllLeaves(token));
  }, [dispatch, token]);

  const handleApprove = async (id) => {
    let status = "APPROVED";
    const data = await updateLeaveStatus(token, status, id);
    if (data) {
      setIsApproved(true);
    }
  };
  return (
    <HrLayout>
      {/* <h1 className="text-xl font-bold mb-4">Leave Requests</h1> */}

      <div className="grid gap-4">
        {leave.map((l) => (
          <div
            key={l._id}
            className="bg-white p-4 rounded-xl shadow flex flex-col md:flex-row justify-between"
          >
            <div>
              <p className="font-bold">{l.userID.name}</p>
              <p>{l.leaveType}</p>
              <p>
                {formatDate(l.fromDate)} → {formatDate(l.toDate)}
              </p>
            </div>
            {l.status === "APPROVED" ? (
              <h3 className="items-center flex text-gray-600 text-md">
                Leave has been Approve
              </h3>
            ) : (
              <div className="flex gap-2 mt-3 md:mt-0">
                <button
                  className="bg-green-700 text-white px-3 py-1 rounded cursor-pointer hover:bg-green-600"
                  onClick={() => handleApprove(l._id)}
                >
                  Approve
                </button>
                <button className="bg-red-600 text-white px-3 py-1 rounded cursor-pointer hover:bg-red-500">
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </HrLayout>
  );
};
export default ViewLeaveHr;
