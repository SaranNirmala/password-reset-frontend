import { Navigate } from "react-router-dom"

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({element})=>{
    if(sessionStorage.getItem('user') && JSON.parse(sessionStorage.getItem('user'))){
        return element
    }
    return <Navigate to={'/login'} replace/>
}

export default ProtectedRoute;