import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = () => {
    const accessToken = JSON.parse(localStorage.getItem('user') as string)?.accessToken;
    return accessToken ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRouter