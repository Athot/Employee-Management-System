import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getMyProfile } from "../../redux/slices/employeeSlice";

const EmployeeProfile = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const { profile, loading } = useSelector((state) => state.employee);

  useEffect(() => {
    dispatch(getMyProfile(token));
  }, [dispatch, token]);
  return (
    <Layout>
      {loading ? (
        <p>Loading....</p>
      ) : (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-green-200 rounded-full flex items-center justify-center text-xl font-bold">
              {profile?.userID?.name[0]}
            </div>

            <div>
              <h2 className="text-xl font-bold">{profile?.userID?.name}</h2>
              <p className="text-gray-500">{profile?.userID?.email}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-xl">
              <p className="text-gray-500">Role</p>
              <p className="font-semibold">{profile?.userID?.role}</p>
            </div>

            <div className="bg-green-50 p-4 rounded-xl">
              <p className="text-gray-500">Department</p>
              <p className="font-semibold">{profile?.department}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-xl">
              <p className="text-gray-500">Position</p>
              <p className="font-semibold">{profile?.position}</p>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default EmployeeProfile;
