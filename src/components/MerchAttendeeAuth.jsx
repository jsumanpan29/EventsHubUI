import { useLocation, Navigate, Outlet } from "react-router-dom";
import Cookies from 'js-cookie'

const MerchAttendeeAuth = () => {
    const location = useLocation();
    
    return (
        (JSON.parse(Cookies.get('user'))?.token && JSON.parse(Cookies.get('user')).user.roles.id == '3') || (JSON.parse(Cookies.get('user'))?.token && JSON.parse(Cookies.get('user')).user.roles.id == '2')
            ? <Outlet/>
            : <Navigate to="/" state={{ from: location }} replace />
        
    );
}

export default MerchAttendeeAuth