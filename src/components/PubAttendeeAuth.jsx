import { useLocation, Navigate, Outlet } from "react-router-dom";
import Cookies from 'js-cookie'

const PubAttendeeAuth = () => {
    const location = useLocation();
    const userCookie = Cookies.get('user');
    const user = userCookie ? JSON.parse(userCookie) : null;

    return (
        (user?.token && user?.user?.roles?.id == '3') || !userCookie
            ? <Outlet/>
            : <Navigate to="/" state={{ from: location }} replace />
    );
}

export default PubAttendeeAuth;
