import { Link, Navigate, Outlet } from "react-router-dom"
import { useAuthContext } from "../../context/ContextProvider"

const DefaultLayout = () => {
  const {user, token} = useAuthContext()

  if(!token) return <Navigate to='/sign-in'/>

  return (
    <div id="defaultLayout">
      <aside>
        <Link to='/'>Dashboard</Link>
        <Link to='/users'>Profile</Link>
        <Link to='/entah'>Anon</Link>
      </aside>
      <Outlet /> 
    </div>
  )
}

export default DefaultLayout