
import { Navigate, Outlet } from 'react-router-dom'
import { UserAuthStatus } from '../hooks/UserAuthStatus'
import Spinner from './Spinner'


export default function PrivateRoute() {
    const {loggedIn, loading} = UserAuthStatus()
    if(loading){
        return <><Spinner/></>
    }
  return loggedIn ? <Outlet/> : <Navigate to= "/sign_in"/>
}
