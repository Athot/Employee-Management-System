import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logOutEmployee } from "../utils/commonFunctions";
const Layout = ({ children }) => {
  const userName = localStorage.getItem("name");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="flex h-screen bg-gray-100">
      {/* SIDEBAR */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-64 bg-green-700 text-white transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 z-50`}
      >
        <div className="p-5 text-2xl font-bold border-b border-green-600">
          EMS
        </div>

        <ul className="p-4 space-y-2">
          {[
            { name: "Home", path: "/employee-dashboard" },
            { name: "Attendance", path: "/employee-attendance" },
            { name: "Leaves", path: "/employee-leaves" },
            { name: "Apply Leaves", path: "/employee-apply-leaves" },
            { name: "Salary", path: "/employee-salary" },
            { name: "Profile", path: "/employee-profile" },
          ].map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg transition ${
                    isActive
                      ? "bg-white text-green-700 font-semibold"
                      : "hover:bg-green-600"
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">
        {/* TOP NAVBAR */}
        <div className="bg-white shadow px-4 py-3 flex items-center justify-between">
          {/* Left */}
          <div className="flex items-center gap-3">
            <button
              className="md:hidden text-xl"
              onClick={() => setOpen(!open)}
            >
              ☰
            </button>
            <h1 className="font-semibold text-gray-700">Employee Panel</h1>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 hidden md:block">
              Welcome, User
            </span>
            <div className="w-8 h-8 bg-green-500 text-white flex items-center justify-center rounded-full">
              {userName[0]}
            </div>
            <button
              className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg cursor-pointer"
              onClick={() => {
                const isConfirmed = window.confirm(
                  "Are you sure you want to log out?",
                );
                if (isConfirmed) {
                  logOutEmployee();
                  navigate("/");
                }
              }}
            >
              Logout
            </button>
          </div>
        </div>

        {/* PAGE CONTENT */}
        <div
          className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto"
          onClick={() => open && setOpen(false)}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
