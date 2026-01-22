import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

const GuestLayout = () => {
	const { isLogin} = useAuthContext();

	if (isLogin) return <Navigate to='/' />;

	return (
		<div>
			<Outlet />
		</div>
	);
};

export default GuestLayout;
