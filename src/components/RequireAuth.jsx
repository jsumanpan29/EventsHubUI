import { useLocation, Navigate, Outlet } from "react-router-dom";
import Cookies from 'js-cookie'


const RequireAuth = () => {
    const location = useLocation();
    return (
        // JSON.parse(Cookies.get('user'))?.token
        Cookies.get('user')
            ? <Outlet/>
            : <Navigate to="/" state={{ from: location }} replace />
    );
}

export default RequireAuth