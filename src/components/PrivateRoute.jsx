
import { Navigate, Outlet } from 'react-router-dom'
import { userAuthStatus } from '../hooks/userAuthStatus'
import Spinner from './Spinner'


export default function PrivateRoute() {
    const {loggedIn, loading} = userAuthStatus()
    if(loading){
        return <><Spinner/></>
    }
  return loggedIn ? <Outlet/> : <Navigate to= "/sign_in"/>
}
