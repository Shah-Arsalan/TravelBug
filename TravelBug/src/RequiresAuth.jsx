import { Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const RequiresAuth = ({ children }) => {
  const location = useLocation();
const auth = useSelector(state => state.auth)
  const token = auth.token
  return token ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export { RequiresAuth };
