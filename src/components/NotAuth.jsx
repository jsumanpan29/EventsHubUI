import { Navigate, Outlet } from "react-router-dom";
import Cookies from 'js-cookie'

const NotAuth = () => {
    const userCookie = Cookies.get('user');
    const user = userCookie ? JSON.parse(userCookie) : null;

    return (
        user?.token
            ? <Navigate to={-1} replace />
            : <Outlet />
    );
}

export default NotAuth