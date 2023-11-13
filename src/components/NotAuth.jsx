import React from 'react'
import Cookies from 'js-cookie'
import { Navigate, Outlet } from "react-router-dom";

const NotAuth = () => {
    return (
        JSON.parse(Cookies.get('user')).token
            ? <Navigate to={-1} replace />
            : <Outlet />
    );
}

export default NotAuth