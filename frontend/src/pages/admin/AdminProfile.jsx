import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getMyProfile } from "../../redux/slices/employeeSlice";
import AdminLayout from "../../components/AdminLayout";
import { getProfile } from "../../api/api";

const AdminProfile = () => {
  const token = localStorage.getItem("token");
  const [profileData, setProfileData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const data = await getProfile(token);
    if (data) {
      setProfileData([data]);
    }
  };
  return (
    <AdminLayout>
      {profileData.map((p, i) => (
        <div
          className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow"
          key={i}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-green-200 rounded-full flex items-center justify-center text-xl font-bold">
              {p?.name[0]}
            </div>

            <div>
              <h2 className="text-xl font-bold">{p?.name}</h2>
              <p className="text-gray-500">{p?.email}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-xl">
              <p className="text-gray-500">Role</p>
              <p className="font-semibold">{p?.role}</p>
            </div>
          </div>
        </div>
      ))}
    </AdminLayout>
  );
};

export default AdminProfile;
