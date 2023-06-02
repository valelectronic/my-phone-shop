
import { Navigate, Outlet } from 'react-router-dom'
import Spinner from './Spinner'
import {UserAuthStatus} from '../hooks/useAuthStatus'


export default function PrivateRoute() {
    const {loggedIn, loading} = UserAuthStatus()
    if(loading){
        return <><Spinner/></>
    }
  return loggedIn ? <Outlet/> : <Navigate to= "/sign_in"/>
}
