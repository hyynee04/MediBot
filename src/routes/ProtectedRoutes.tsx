import { Navigate, Outlet, useLocation } from "react-router";
import { useAppSelector } from "../hooks/hook";
import { paths } from "./paths";


const ProtectedRoute = () => {
  const token = useAppSelector((state) => state.authen.token);
  const location = useLocation();

  if (!token) {
    return <Navigate to={paths.login} state={{ from: location }} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
