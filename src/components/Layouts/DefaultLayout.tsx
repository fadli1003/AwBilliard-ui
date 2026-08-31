import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/context/AuthContext';
import baseAPI from '@/utils/api';
import { Loader2, Power, UserRound } from 'lucide-react';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { ModeToggle } from '@/components/mode-toggle';

const DefaultLayout = () => {
	const { isLogin, setIsLogin } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false)
	const navigate = useNavigate();
  const [errors, setErrors] = useState<string[]| null>(null)

	const handleLogout = async () => {
    setIsLoading(true)
		try {
			await baseAPI.post('/logout', []);
			localStorage.removeItem('aw_user');
			setIsLogin(false)
      navigate('/sign-in')
		} catch (err) {
      setIsLoading(false)
      if(err instanceof AxiosError){
        setErrors(err.response?.data.errors)
				if(err.code === 'ERR_NETWORK') setErrors(['Network Error!'])
				else setErrors(['Somethings wrong'])
      }
			console.error(err);
		}finally{
      setIsLoading(false)
    }
	};

	if (!isLogin) return <Navigate to='/sign-in' />

	useEffect(()=> {
		if(errors){
			const timer = setTimeout(() => {
				setErrors(null)
			}, 5000)
			return () => clearTimeout(timer)
		}
		return;
	}, [errors])

	return (
		<div id='defaultLayout' className='flex'>
      {errors && errors.map((err: string, i: number) => (
				<div key={i} className='fixed top-5 right-7 bg-red-500/30 text-red-500 border rounded-full animate-err px-4 py-1'>
						<span>{err}</span>
				</div>
			))}
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
			<div className='min-h-screen grow p-5 pl-7'>
				<Outlet />
			</div>
		</div>
	);
};

export default DefaultLayout;
