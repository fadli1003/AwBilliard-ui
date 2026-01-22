import React, { useState } from 'react';
import baseAPI from '@/utils/api';
import { AxiosError } from 'axios';
import { Link } from 'react-router-dom';
import { useAuthContext } from '@/context/AuthContext';
import Title from '@/components/Title';

const emptyForm = {
	name: '',
	email: '',
	phone: '',
	password: '',
	password_confirmation: ''
};

const SignUp = () => {
	const [form, setForm] = useState<UserType>(emptyForm);
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState<any>();
	const { setUser, setIsLogin } = useAuthContext();
	// const navigate = useNavigate();

	const handleSignUp = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		try {
			// const token: string = await baseAPI.get('/sanctum/csrf-cookie', {
			// 	baseURL: import.meta.env.VITE_API_URL
			// });
			const res = await baseAPI.post('/register', form, {
				baseURL: import.meta.env.VITE_API_URL
			});
			if (res.status === 201) {
				setUser!({ email: form.email, role: 'user' });
				setIsLogin(true)
			}
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
			<Title title='Sign Up' />
			<form
				onSubmit={handleSignUp}
				className='flex flex-col gap-4 min-w-80 md:min-w-100 p-8 rounded-lg border border-neutral-700 shadow-lg shadow-neutral-900 text-sm'
			>
				<h3 className='text-center text-lg font-bold leading-3'>Sign Up</h3>
				<div className='flex flex-col gap-2'>
					<label htmlFor='name'>Name</label>
					<input
						type='text'
						placeholder='Enter name'
						id='name'
						name='name'
						value={form.name}
						onChange={handleFormChange}
					/>
					{errors?.name && <span className='absolute text-red-500 text-xs'>{errors.name}</span>}
				</div>
				<div className='flex flex-col gap-2'>
					<label htmlFor='email'>Email</label>
					<input
						type='text'
						placeholder='Enter email'
						id='email'
						name='email'
						value={form.email}
						onChange={handleFormChange}
					/>
					{errors?.email && <span className='absolute text-red-500 text-xs'>{errors.email}</span>}
				</div>
				<div className='flex flex-col gap-2'>
					<label htmlFor='phone'>Phone Number</label>
					<input
						type='text'
						placeholder='Enter phone number'
						id='phone'
						name='phone'
						value={form.phone}
						onChange={handleFormChange}
					/>
					{errors?.phone && <span className='absolute text-red-500 text-xs'>{errors.phone}</span>}
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
				<div className='flex flex-col gap-2'>
					<label htmlFor='password_confirmation'>Password Confirmation</label>
					<input
						type='password'
						placeholder='Enter password confirmation'
						id='password_confirmation'
						name='password_confirmation'
						value={form.password_confirmation}
						onChange={handleFormChange}
					/>
					{errors?.password && (
						<span className='absolute text-red-500 text-xs'>{errors.password}</span>
					)}
				</div>
				<span className='text-xs text-center text-neutral-300'>
					Already have account?{' '}
					<Link
						to='/sign-in'
						className='text-white hover:underline'
					>
						Login
					</Link>
				</span>
				<button
					disabled={loading}
					type='submit'
					className='font-semibold border rounded-full py-1.5 mt-2'
				>
					{loading ? 'Signing Up' : 'Sign Up'}
				</button>
			</form>
		</div>
	);
};

export default SignUp;
