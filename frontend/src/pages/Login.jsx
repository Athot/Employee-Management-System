import { useState } from "react";
import img from "../assets/login.jpg";
import { login, register } from "../api/api";
import { useNavigate } from "react-router-dom";
export default function Login() {
  // const [form, setForm] = useState({ email: "", password: "" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");
  const [isSignIn, setIsSignIn] = useState(true);
  const type = ["ADMIN", "HR"];
  const navigate = useNavigate();
  //is sign in
  const signIn = async () => {
    if (isSignIn) {
      const data = await login(email, password);
      if (data) {
        //   alert("Incorrect password");
        // } else {
        switch (data.user.role) {
          case "EMPLOYEE":
            // console.log(data.user.role);
            navigate("/employee-dashboard");
            break;
          case "ADMIN":
            navigate("/admin-dashboard");
            break;
          case "HR":
            navigate("/hr-view-employee");
          default:
          // console.log("Wrong role");
        }
      }
    } else {
      registerUser();
    }
  };

  // register
  const registerUser = async () => {
    try {
      if (password != confirmPassword) {
        alert("Password should be match");
        return;
      }
      if (
        userName == "" ||
        email == "" ||
        password == "" ||
        confirmPassword == "" ||
        role == ""
      ) {
        alert("Fill up all the details");
        return;
      }
      const data = await register(userName, email, password, role);
      if (data) {
        alert("Register Successful");
        setIsSignIn(true);
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className="flex h-screen">
      {/* left side image */}
      <div className="hidden md:flex w-1/2 relative">
        <img src={img} alt="bg" className="w-full h-full object-cover" />

        {/* overlay */}
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-12 text-white">
          <h1 className="text-3xl font-bold mb-4">
            Manage Your Workforce Efficiently
          </h1>
          <p className="text-sm opacity-90">
            Streamline employee records, track attendance, manage leaves, and
            handle payroll — all in one secure platform with role-based access.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE (LOGIN FORM) */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
          <p className="text-gray-500 mb-6 text-sm">
            {isSignIn ? "Login to continue" : "Register to continue"}
          </p>
          {!isSignIn && (
            <input
              type="name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
              className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-black"
            />
          )}

          {/* Email */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-black"
          />

          {/* Password */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-black"
          />

          {!isSignIn && (
            <>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-black"
              />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mb-3 border rounded-lg w-full p-3 focus:ring-2 focus:ring-black focus:outline-none"
              >
                <option value="" disabled>
                  Select Role
                </option>
                {type.map((e) => (
                  <option>{e}</option>
                ))}
              </select>
            </>
          )}

          {/* Options */}
          {/* {isSignIn && (
            <div className="flex justify-between items-center text-sm mb-4">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Remember me
              </label>
              <span className="text-blue-500 cursor-pointer">
                Forgot password?
              </span>
            </div>
          )} */}

          {/* Login Button */}
          <button
            className="w-full bg-black text-white p-3 rounded-lg mb-4 hover:opacity-90 cursor-pointer"
            onClick={(e) => signIn(e)}
          >
            {isSignIn ? "Login" : "Register"}
          </button>

          {/* Divider */}
          {/* {isSignIn && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-gray-400 text-sm">or continue with</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>
          )} */}

          {/* Google Button */}
          {/* <button className="w-full border p-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="w-5 h-5"
            />
            Continue with Google
          </button> */}

          {/* Signup */}

          <p
            className="text-sm text-center mt-6"
            onClick={() => setIsSignIn(!isSignIn)}
          >
            {isSignIn ? "Don’t have an account? " : "Have an account? "}
            <span className="text-blue-500 cursor-pointer">
              {isSignIn ? "Sign up" : "Sign In"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
