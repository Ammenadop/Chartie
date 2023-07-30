import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom'
const Protect= () => {
    const user = useSelector((state) => state.user);
    return(
        !user  ? <Outlet/> : <Navigate to="/" replace/>
    )
}

export default Protect;