import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./Contexts/Authcontext";

const RequiresAuth = ({ children }) => {
  const location = useLocation();

  const { token } = useAuth();
  return token ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export { RequiresAuth };
