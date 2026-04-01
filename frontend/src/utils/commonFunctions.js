export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const logOutEmployee = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("checkInTime");
  localStorage.removeItem("checkOutTime");
  localStorage.removeItem("userID");
  localStorage.removeItem("name");
};
export const logOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userID");
  localStorage.removeItem("name");
};
