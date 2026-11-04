import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// Put around any admin route. Signed-out visitors are sent to the login page,
// and brought back to the page they wanted after they sign in.
export function RequireAdmin() {
  const { user } = useAuth();
  const location = useLocation();
  if (!user)
    return (
      <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
    );
  return <Outlet />;
}
