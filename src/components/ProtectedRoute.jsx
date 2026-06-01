import { DataContent } from '../context/DataContext';
import { useContext, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
    const { user } = useContext(DataContent);
    const [loading, setLoading] = useState(true);   
setTimeout(() => {
        setLoading(false);
}, 1000);

    if(!user){
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;

}
export default ProtectedRoute;  