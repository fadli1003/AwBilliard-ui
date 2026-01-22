import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import baseAPI from '../../utils/api';
import { Power, Sun } from 'lucide-react';

const DefaultLayout = () => {
	const { user } = useAuthContext();
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await baseAPI.post('/logout', [], {
				baseURL: import.meta.env.VITE_API_URL
			});
			localStorage.removeItem('user');
			navigate('/');
		} catch (err) {
			console.error(err);
		}
	};

	if (!user) return <Navigate to='/sign-in' />;

	return (
		<div id='defaultLayout'>
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
					<div className='flex gap-2 justify-center items-center py-1.5 border border-gray-700 hover:border-gray-600 rounded cursor-pointer hover:text-white'>
						<span>Theme</span>
						<Sun size={16} />
					</div>
					<div className='flex gap-2 items-center justify-center border border-gray-700 hover:border-gray-600 rounded py-1.5 cursor-pointer hover:text-white'>
						<button
							onClick={handleLogout}
							className=''
						>
							Sign Out
						</button>
						<Power size={16} />
					</div>
				</div>
			</aside>
			<Outlet />
		</div>
	);
};

export default DefaultLayout;
