import { Navigate } from "react-router-dom";
import { useAuth } from "../contextProviders/authentication";

export const UserRoute = ({ children }) => {
  const { user } = useAuth();
  if(!user) {
    return <Navigate to="/login"/>;
  }

  return children;
}
