import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { accessToken } = useAuth();
  return accessToken ? children : <Navigate to="/auth" replace />;
};
