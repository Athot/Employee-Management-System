import { useEffect, useState } from "react";
import { checkIn, checkOut, employeeAttendance } from "../../api/api";
import Layout from "../../components/Layout";
import { formatDate } from "../../utils/commonFunctions";

export default function EmployeeAttendance() {
  // save the time in local
  const [checkInTime, setCheckInTime] = useState(Date);
  const [checkOutTime, setCheckOutTime] = useState(Date);
  const token = localStorage.getItem("token");
  const [isCheckIn, setIsCheckIn] = useState(false);
  const [isCheckOut, setIsCheckOut] = useState(false);
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const storedTime = localStorage.getItem("checkInTime");
    getAllAttendance();
    if (storedTime) {
      setCheckInTime(new Date(storedTime));
      setIsCheckIn(true);
    }

    const checkOut = localStorage.getItem("checkOutTime");
    if (checkOut) {
      setCheckOutTime(new Date(checkOut));
      setIsCheckOut(true);
    }
  }, []);

  // get all attendance data
  const getAllAttendance = async () => {
    const data = await employeeAttendance(token);
    if (data) {
      setAttendanceData(data);
    }
  };
  console.log(attendanceData);

  // function to call checkIn
  const handleCheckIn = async () => {
    const officeTime = new Date();

    officeTime.setHours(9, 0, 0, 0, 0);
    const data = await checkIn(token);
    if (data.msg == 0) {
      alert("Attendance taken for today");
      return;
    }

    localStorage.setItem("checkInTime", data.checkIn);
    const parseTime = new Date(data.checkIn);
    getAllAttendance();
    setCheckInTime(parseTime);
    setIsCheckIn(true);
    // console.log(data);
  };
  // check out
  const handleCheckOut = async () => {
    const data = await checkOut(token);
    if (data.msg == 2) {
      alert("Is too early to checkOut");
      return;
    }

    localStorage.setItem("checkOutTime", data.checkOut);
    const parseTime = new Date(data.checkOut);

    setCheckOutTime(parseTime);
    setIsCheckOut(true);
  };
  return (
    <Layout>
      <div className="flex gap-3 mb-4 justify-center items-center">
        {isCheckIn ? (
          <p className="text-green-600 font-semibold">
            {checkInTime && checkInTime.toLocaleTimeString()}
          </p>
        ) : (
          <button
            className={`!isDisabled ?" bg-gray-400 cursor-not-allowed" :  bg-green-600 text-white px-4 py-2 rounded cursor-pointer`}
            onClick={handleCheckIn}
          >
            Check In
          </button>
        )}
        {isCheckOut ? (
          <p className="text-green-600 font-semibold">
            {checkOutTime && checkOutTime.toLocaleTimeString()}
          </p>
        ) : (
          <button
            className="bg-red-600 text-white px-4 py-2 rounded cursor-pointer"
            onClick={handleCheckOut}
          >
            Check Out
          </button>
        )}
      </div>
      {attendanceData &&
        attendanceData
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((att, i) => (
            <div
              key={i}
              className="bg-white p-3 mb-2 rounded-xl shadow flex justify-between items-center"
            >
              <p className="text-green-600">{att.status}</p>
              <p>{formatDate(att.createdAt)}</p>
            </div>
          ))}
    </Layout>
  );
}
