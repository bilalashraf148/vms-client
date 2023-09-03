import { Navigate } from "react-router-dom";
import { useAuth } from "../contextProviders/authentication";

export const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  if(!user) {
    return <Navigate to="/login"/>;
  }

  if (user.role !== "admin") {
    return <Navigate to="/products/view"/>;
  }

  return children;
}
