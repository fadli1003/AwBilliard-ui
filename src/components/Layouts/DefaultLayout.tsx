import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/context/AuthContext';
import baseAPI from '@/utils/api';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import Sidebar  from '@/components/Layouts/partials/Sidebar';

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

	
	useEffect(()=> {
		if(errors){
			const timer = setTimeout(() => {
				setErrors(null)
			}, 5000)
			return () => clearTimeout(timer)
		}
		return;
	}, [errors])
	
	if (!isLogin) return <Navigate to='/sign-in' />
	
	return (
		<div id='defaultLayout' className='flex'>
      {errors && errors.map((err: string, i: number) => (
				<div key={i} className='fixed top-5 right-7 bg-red-500/30 text-red-500 border rounded-full animate-err px-4 py-1'>
						<span>{err}</span>
				</div>
			))}
			<Sidebar isLoading={isLoading} handleLogout={handleLogout} isLogin={isLogin} />
			<div className='min-h-screen grow p-5 pl-7'>
				<Outlet />
			</div>
		</div>
	);
};

export default DefaultLayout;
