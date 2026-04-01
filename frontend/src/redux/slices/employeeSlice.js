import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const ADMIN_AUTH = "http://localhost:5000/api/admin";
const EMPLOYEE_URL = "http://localhost:5000/api/employee";
const ATTENDANCE_URL = "http://localhost:5000/api/attendance";
// async thunk api call
export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async (token, thunkApi) => {
    try {
      const res = await axios.get(`${ADMIN_AUTH}/get-all-employee`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const getMyProfile = createAsyncThunk(
  "employees/getMyProfile",
  async (token, thunkApi) => {
    debugger;
    try {
      const res = await axios.get(
        `${EMPLOYEE_URL}/get-profile`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const getAllAttendance = createAsyncThunk(
  "employees/getAllAttendance",
  async (token, thunkApi) => {
    try {
      const res = await axios.get(`${ATTENDANCE_URL}/get-all-attendance`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(res.data);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const getAllLeaves = createAsyncThunk(
  "employees/getAllLeaves",
  async (token, thunkApi) => {
    try {
      const res = await axios.get(
        `${EMPLOYEE_URL}/get-all-leave`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      // console.log(res.data);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

// slice
const employeeSlice = createSlice({
  name: "employees",
  initialState: {
    employees: [],
    profile: [],
    attendance: [],
    leave: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // console.log(`Employee2 ${action.payload}`);
      })
      // get my profile
      .addCase(getMyProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(getMyProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // attendance
      .addCase(getAllAttendance.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.attendance = action.payload;
      })
      .addCase(getAllAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //get all leaves
      .addCase(getAllLeaves.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllLeaves.fulfilled, (state, action) => {
        state.loading = false;
        state.leave = action.payload;
      })
      .addCase(getAllLeaves.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default employeeSlice.reducer;
