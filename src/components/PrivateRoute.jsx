
import { Navigate, Outlet } from 'react-router-dom'
import { userAuthStatus } from '../hooks/userAuthStatus'

export default function PrivateRoute() {
    const {loggedIn, loading} = userAuthStatus()
    if(loading){
        return <h3>loading</h3>
    }
  return loggedIn ? <Outlet/> : <Navigate to= "/sign_in"/>
}
