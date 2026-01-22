import { Link, Navigate, Outlet, useNavigate } from "react-router-dom"
import { useAuthContext } from "../../context/ContextProvider"
import baseAPI from "../../utils/api"
import { Power, Sun } from "lucide-react"

const DefaultLayout = () => {
  const {user, token} = useAuthContext()
  const navigate = useNavigate()

  const handleLogout = async() => {
    try{
      await baseAPI.post('/logout', [], {
        baseURL: import.meta.env.VITE_API_URL
      })
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      navigate('/')
    }catch(err){
      console.error(err)
    }
  }

  if(!token) return <Navigate to='/sign-in'/>

  return (
    <div id="defaultLayout">
      <aside className="sticky top-0 w-18 md:w-3xs h-screen  border-neutral-600 shadow-[2px_0px_6px] shadow-gray-800 flex flex-col justify-between py-6 px-5">
        <nav className="flex flex-col gap-3">
          <Link to='/'>Dashboard</Link>
          <Link to='/users'>Profile</Link>
          <Link to='/entah'>Anon</Link>
        </nav>
        <div className="flex flex-col gap-1">
          <div className="flex gap-2 justify-center items-center py-1.5 border border-gray-700 hover:border-gray-600 rounded">
            <span>Theme</span>
            <Sun size={20}/>
          </div>
          <div className="flex gap-2 items-center justify-center border border-gray-700 hover:border-gray-600 rounded py-1.5">
            <button onClick={handleLogout} className="">Sign Out</button>
            <Power size={20} />
          </div>
        </div>
      </aside>
      <Outlet /> 
    </div>
  )
}

export default DefaultLayout