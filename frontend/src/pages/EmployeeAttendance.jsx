// import { useState, useEffect } from "react";
// import Layout from "../components/Layout";

// export default function IF() {
//   const [checkedIn, setCheckedIn] = useState(false);
//   const [checkInTime, setCheckInTime] = useState(null);
//   const [workingHours, setWorkingHours] = useState(0);

//   // ⏱ Timer logic
//   useEffect(() => {
//     let interval;

//     if (checkedIn && checkInTime) {
//       interval = setInterval(() => {
//         const now = new Date();
//         const diff = (now - checkInTime) / (1000 * 60 * 60);
//         setWorkingHours(diff.toFixed(2));
//       }, 1000);
//     }

//     return () => clearInterval(interval);
//   }, [checkedIn, checkInTime]);

//   // ✅ Check In
//   const handleCheckIn = () => {
//     setCheckedIn(true);
//     setCheckInTime(new Date());
//   };

//   // ❌ Check Out
//   const handleCheckOut = () => {
//     setCheckedIn(false);
//     alert(`Total Hours: ${workingHours}`);
//   };

//   return (
//     <Layout>
//       <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow text-center">
//         <h1 className="text-xl font-bold mb-4">Attendance</h1>

//         {!checkedIn ? (
//           <>
//             <p className="text-gray-500 mb-4">You have not checked in today</p>

//             <button
//               onClick={handleCheckIn}
//               className="bg-green-600 text-white px-6 py-2 rounded-xl"
//             >
//               Check In
//             </button>
//           </>
//         ) : (
//           <>
//             <p className="text-green-600 font-semibold">
//               Checked In at {checkInTime.toLocaleTimeString()}
//             </p>

//             <p className="mt-2 text-gray-600">Working: {workingHours} hrs</p>

//             <button
//               onClick={handleCheckOut}
//               className="mt-4 bg-red-600 text-white px-6 py-2 rounded-xl"
//             >
//               Check Out
//             </button>
//           </>
//         )}
//       </div>
//     </Layout>
//   );
// }
