import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;
const API_AUTH = `${BASE_URL}/api/auth`;
const ADMIN_URL = `${BASE_URL}/api/admin`;
const EMPLOYEE_URL = `${BASE_URL}/api/employee`;
const ATTENDANCE_URL = `${BASE_URL}/api/attendance`;
const SALARY_URL = `${BASE_URL}/api/salary`;
// check-out
// log in
export const login = async (email, password) => {
  try {
    const res = await axios.post(`${API_AUTH}/login`, {
      email,
      password,
    });
    if (res.data.msg == 1) {
      alert("Don't have account? Register First");
    }

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("name", res.data.user.name);
    localStorage.setItem("userID", res.data.user._id);
    return res.data;
  } catch (error) {
    if (error.response) {
      // console.log("Error message:", error.response.data.msg);
      // console.log("Full error:", error.response.data);
    } else {
      // console.log("Error:", error.message);
    }
  }
};
export const register = async (name, email, password, role) => {
  try {
    const res = await axios.post(`${API_AUTH}/register`, {
      name,
      email,
      password,
      role,
    });

    return res.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.msg;
    } else {
      throw "Something went wrong";
    }
  }
};

// create-employee
export const createEmployee = async (form, token) => {
  try {
    const res = await axios.post(
      `${ADMIN_URL}/create-employee`,
      {
        name: form.name,
        email: form.email,
        password: form.password,
        department: form.department,
        position: form.position,
        salary: form.salary,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  } catch (error) {
    if (error.status === 400) {
      alert("User already exists");
    }
    if (error.response) {
      throw error.response.data.msg;
    } else {
      throw "Something went wrong";
    }
  }
};

// delete the employee by admin
export const deleteEmployee = async (id, token) => {
  try {
    if (id == "" || token == "") {
      alert("Missing ID or Token");
      return;
    }
    const res = await axios.delete(`${ADMIN_URL}/delete-employee/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    // console.log(error);
  }
};

// employee part

export const applyLeave = async (form, token) => {
  try {
    const res = await axios.post(
      `${EMPLOYEE_URL}/add-leave`,
      {
        userID: form.userID,
        leaveType: form.leaveType,
        fromDate: form.fromDate,
        toDate: form.toDate,
        reason: form.reason,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  } catch (error) {
    // console.log(error);
  }
};

export const employeeLeaves = async (token, id) => {
  try {
    const res = await axios.get(
      `${EMPLOYEE_URL}/view-leave/${id}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  } catch (error) {
    // console.log(error);
  }
};
// check-in
export const checkIn = async (token) => {
  // console.log(`Token`);
  if (!token) {
    alert("Token missing");
  }
  try {
    const res = await axios.post(
      `${ATTENDANCE_URL}/check-in`,
      // body
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    // console.log(res.data);
    return res.data;
  } catch (error) {
    // console.log(error);
  }
};

// check-out

export const checkOut = async (token) => {
  // console.log(`Token`);
  if (!token) {
    alert("Token missing");
  }
  try {
    const res = await axios.post(
      `${ATTENDANCE_URL}/check-out`,
      // body
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    // console.log(res.data);
    return res.data;
  } catch (error) {
    // console.log(error);
  }
};
// has apply leave
export const hasApplyLeave = async (token) => {
  // debugger;
  try {
    const res = await axios.get(
      `${EMPLOYEE_URL}/has-apply-leave`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    // console.log(res.data);
    return res.data;
  } catch (error) {
    // console.log(error);
  }
};

// update leaves
export const updateLeaveStatus = async (token, status, id) => {
  try {
    const res = await axios.put(
      `${EMPLOYEE_URL}/update-leave/${id}`,
      {
        status: status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    // console.log(res.data);
    return res.data;
  } catch (error) {
    // console.log(error);
  }
};

// create salary by ADMIN and HR

export const createSalary = async (token, form) => {
  try {
    const res = await axios.post(
      `${SALARY_URL}/create-salary`,
      {
        userID: form.userID,
        month: form.month,
        basic: form.basic,
        hra: form.hra,
        allowances: form.allowances,
        deductions: form.deductions,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    // console.log(res.data);
    return res.data;
  } catch (error) {
    // console.log(error);
  }
};

// get my salary
export const getEmployeeSalary = async (token) => {
  try {
    const res = await axios.get(
      `${SALARY_URL}/my-salary`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  } catch (error) {
    // console.log(error);
  }
};

// get all salary

export const getAllSalary = async (token) => {
  try {
    const res = await axios.get(
      `${SALARY_URL}/get-salary`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    // console.log(res.data);
    return res.data;
  } catch (error) {
    // console.log(error);
  }
};

// generate slip

export const generateSalarySlip = async (token, id) => {
  try {
    const res = await axios.get(
      `${SALARY_URL}/slip/${id}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      },
    );
    return res.data;
  } catch (error) {
    // console.log(error);
  }
};

// get-profile

export const getProfile = async (token) => {
  try {
    const res = await axios.get(
      `${ADMIN_URL}/get-profile`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    // console.log(res.data);
    return res.data;
  } catch (error) {
    // console.log(error);
  }
};
// my-attendance
export const employeeAttendance = async (token) => {
  try {
    const res = await axios.get(
      `${ATTENDANCE_URL}/my-attendance`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    // console.log(res.data);
    return res.data;
  } catch (error) {
    // console.log(error);
  }
};

// edit-employee

export const editEmployeeData = async (token, id, form) => {
  try {
    const res = await axios.put(
      `${ADMIN_URL}/edit-employee/${id}`,
      {
        department: form.department,
        position: form.position,
        salary: form.salary,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    // console.log(res.data);
    return res.data;
  } catch (error) {
    // console.log(error);
  }
};
