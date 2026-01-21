import { Navigate, Outlet } from "react-router-dom"
import { useAuthContext } from "../../context/ContextProvider"

const GuestLayout = () => {
  const {user, token} = useAuthContext()

  if(token) return <Navigate to='/' />

  return (
    <div>
      <Outlet />
    </div>
  )
}

export default GuestLayout