import { Navigate, Outlet } from "react-router-dom"
import useAuthstatus from "../hooks/useAuthstatus"
import Spinner from "./Spinner"
const Privateroute = () => {
    const {loggedin, loading} = useAuthstatus()
    if (loading) {
     return  <Spinner />
    }



  return  loggedin ? <Outlet /> :  <Navigate to='/signin' />
}

export default Privateroute
