import { useLocation, Navigate, Outlet } from "react-router-dom";
import Cookies from 'js-cookie'

const AdminAuth = () => {
    const location = useLocation();
    return (
        (JSON.parse(Cookies.get('user'))?.token && JSON.parse(Cookies.get('user')).user.roles.id == '1')
            ? <Outlet/>
            : <Navigate to="/" state={{ from: location }} replace />
    );
}

export default AdminAuth