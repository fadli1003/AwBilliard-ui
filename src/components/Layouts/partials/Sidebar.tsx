import { ModeToggle } from "@/components/mode-toggle";
import { Loader2, Power, UserRound } from "lucide-react";
import { Link } from "react-router-dom";


const Sidebar = ({isLoading, isLogin,  handleLogout }: { 
  isLoading: boolean, 
  isLogin: boolean, 
  handleLogout: () => Promise<void>
}) => {
  return (
   <aside className='sticky top-0 w-18 md:w-3xs h-screen  border-neutral-600 shadow-[2px_0px_6px] shadow-gray-800 flex flex-col justify-between py-6 px-5'>
				<div>
					<Link
						to='/'
						className='px-2 text-xl font-bold bg-clip-text bg-linear-to-r from-blue-500 to-blue-200 text-transparent'
					>
						AW Billiard
					</Link>
					<div className='bg-linear-to-r from-blue-500 to-blue-950 h-0.5 skew-x-50 mt-1' />
					<nav className='flex flex-col gap-3 mt-4'>
						<Link to='/'>Dashboard</Link>
						<Link to='/users'>Profile</Link>
						<Link to='/entah'>Anon</Link>
					</nav>
				</div>
				<div className='flex flex-col gap-1 text-sm text-gray-300'>
					<div className='flex gap-2 justify-center items-center border border-gray-700 hover:border-gray-600 rounded cursor-pointer text-black dark:text-neutral-100 dark:hover:text-white'>
						<ModeToggle/>
					</div>
					<div onClick={handleLogout} className='flex gap-2 items-center justify-center border border-gray-700 hover:border-gray-600 rounded py-1.5 cursor-pointer hover:text-white'>
						{isLogin ? (
							<>
								Sign Out
								{isLoading ? <Loader2 size={16} className='animate-spin' /> : <Power size={16} />}
							</>
						) : (
							<>
								<Link to='/sign-up'>Sign In</Link>
								{isLoading ? <Loader2 size={16} className='animate-spin' /> : <UserRound size={16} />}
							</>							
						)}
					</div>
				</div>
			</aside>
  )
}

export default Sidebar