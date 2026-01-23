import React, { useState } from 'react';
import baseAPI from '@/utils/api';
import { AxiosError } from 'axios';
import { Link } from 'react-router-dom';
import { useAuthContext } from '@/context/AuthContext';
import Title from '@/components/Title';
import { Loader2 } from 'lucide-react';

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
	const [errors, setErrors] = useState<AuthFormError | null>(null);
	const { setUser, setIsLogin } = useAuthContext();
	// const navigate = useNavigate();

	const handleSignUp = async (e: React.FormEvent) => {
		e.preventDefault();
		setErrors(null)
		setLoading(true);
		try {
			await baseAPI.get('/sanctum/csrf-cookie', {
				baseURL: import.meta.env.VITE_API_URL
			});
			await baseAPI.post('/register', form, {
				baseURL: import.meta.env.VITE_API_URL
			});
			setUser!({ email: form.email, role: 'user' });
			setIsLogin(true)
		} catch (err) {
			setLoading(false);
			if (err instanceof AxiosError) {
				if (err.status === 500) {
					setErrors({msg:'Network Error!'});
				}
				setErrors(err.response?.data.errors);
			} else {
				throw new Error(`Terjadi kesalahan! ${err}`);
			}
		} finally {
			setLoading(false);
		}
	};

	const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {name, value } = e.target
		setForm({ ...form, [name]: value });
		if(errors){
			setErrors((prev: AuthFormError | null) => {
				const newErrors = {...prev}
				delete newErrors[name as keyof AuthFormError]
				return newErrors
			})
		}
	};

	return (
		<div className='min-h-screen w-full flex justify-center items-center'>
			<Title title='Sign Up' />
			{errors?.msg && <span className='absolute top-15 right-5 text-red-500 bg-white/20 rounded-full text-sm px-4.5 py-1.5'>{errors.msg}</span>}
			<form
				onSubmit={handleSignUp}
				className='flex flex-col gap-5.5 min-w-80 md:min-w-100 p-8 rounded-lg border border-neutral-700 shadow-lg shadow-neutral-900 text-sm'
			>
				<h3 className='text-center text-lg font-bold leading-3 font-syne'>Sign Up</h3>
				<div className='flex flex-col gap-2 relative'>
					<label htmlFor='name'>Name</label>
					<input
						type='text'
						placeholder='Enter name'
						id='name'
						name='name'
						value={form.name}
						onChange={handleFormChange}
					/>
					{errors?.name && <span className='absolute -bottom-5 text-red-500 text-xs'>{errors.name}</span>}
				</div>
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
				<div className='flex flex-col gap-2 relative'>
					<label htmlFor='phone'>Phone Number</label>
					<input
						type='text'
						placeholder='Enter phone number'
						id='phone'
						name='phone'
						value={form.phone}
						onChange={handleFormChange}
					/>
					{errors?.phone && <span className='absolute -bottom-5 text-red-500 text-xs'>{errors.phone}</span>}
				</div>
				<div className='flex flex-col gap-2 relative'>
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
						<span className='absolute -bottom-5 text-red-500 text-xs'>{errors.password}</span>
					)}
				</div>
				<div className='flex flex-col gap-2 relative'>
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
						<span className='absolute -bottom-5 text-red-500 text-xs'>{errors.password}</span>
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
					className='font-semibold border rounded-full py-1.75 mt-2 flex gap-2 justify-center items-center'
				>
					{loading ? <><Loader2 className='animate-spin'/>Signing Up...</> : 'Sign Up'}
				</button>
			</form>
		</div>
	);
};

export default SignUp;
