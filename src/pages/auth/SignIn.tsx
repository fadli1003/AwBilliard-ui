import React, { useState } from 'react';
import baseAPI from '@/utils/api';
import { AxiosError } from 'axios';
import { Link } from 'react-router-dom';
import { useAuthContext } from '@/context/AuthContext';
import Title from '@/components/Title';
import { Loader2 } from 'lucide-react';

const emptyForm = {
	email: '',
	password: ''
};

const SignIn = () => {
	const [form, setForm] = useState<UserType>(emptyForm);
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState<any>();
	const { setUser, setIsLogin } = useAuthContext();

	const handleSignIn = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		try {
			await baseAPI.get('/sanctum/csrf-cookie', {
				baseURL: import.meta.env.VITE_API_URL
			});
			await baseAPI.post('/login', form, {
				baseURL: import.meta.env.VITE_API_URL
			});
			const user = await baseAPI.get('/user');
			const { email, id, role } = user.data;
			setUser!({ email: email, id: id, role: role });
			setIsLogin(true)
		} catch (err) {
			setLoading(false);
			if (err instanceof AxiosError) {
				if (err.status === 500) {
					setErrors('Network Error!');
				}
				setErrors(err.response?.data.errors);
			} else {
				throw new Error('Terjadi kesalahan!');
			}
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	return (
		<div className='min-h-screen w-full flex justify-center items-center'>
			<Title title='Sign In' />
			<form
				onSubmit={handleSignIn}
				className='flex flex-col gap-5.5 min-w-80 md:min-w-100 p-8 rounded-lg border border-neutral-700 shadow-lg shadow-neutral-900 text-sm'
			>
				<h3 className='text-center text-lg font-bold leading-3'>Sign In</h3>
				<div className='flex flex-col gap-2 relative'>
					<label htmlFor='email'>Email</label>
					<input
						type='text'
						placeholder='Enter email'
						id='email'
						name='email'
						value={form.email}
						onChange={handleFormChange}
					/>
					{errors?.email && <span className='absolute -bottom-5 text-red-500 text-xs'>{errors.email}</span>}
				</div>
				<div className='flex flex-col gap-2'>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						placeholder='Enter password'
						id='password'
						name='password'
						value={form.password}
						onChange={handleFormChange}
					/>
					{errors?.password && (
						<span className='absolute text-red-500 text-xs'>{errors.password}</span>
					)}
				</div>
				<span className='text-xs text-center text-neutral-300'>
					Don't have account?{' '}
					<Link
						to='/sign-up'
						className='text-white hover:underline'
					>
						Register
					</Link>
				</span>
				<button
					disabled={loading}
					type='submit'
					className='font-semibold border rounded-full py-1.75 flex gap-2 justify-center items-center'
				>
					{loading ? <><Loader2 className='animate-spin size-4'/>Signing In</> : 'Sign In'}
				</button>
			</form>
		</div>
	);
};

export default SignIn;
