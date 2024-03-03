import { Navigate } from "react-router-dom";
// import { useAuthContext } from '../hooks/useAuthContext';

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(window.localStorage.getItem("userInfo"));
  console.log(user);

  if (user === null || user === undefined) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
