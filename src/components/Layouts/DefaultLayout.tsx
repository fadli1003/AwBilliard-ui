import { Navigate, Outlet } from "react-router-dom"
import { useStateContext } from "../../context/ContextProvider"

const DefaultLayout = () => {
  const {user, token} = useStateContext()

  if(!token) return <Navigate to='/sign-in'/>

  return (
    <div>
      <Outlet /> 
    </div>
  )
}

export default DefaultLayout