import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, LoginInput } from '@/types/auth';
import { useLoginMutation } from '@/hooks/useAuthQueries';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const loginMutation = useLoginMutation();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (data: LoginInput) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        navigate('/dashboard');
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} placeholder="Email" />
      {errors.email && <span>{errors.email.message}</span>}

      <input type="password" {...register('password')} placeholder="Password" />
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit" disabled={loginMutation.isPending}>
        {loginMutation.isPending ? ( <span><Loader2/> 'L ogging in...'</span>) : 'Login'}
      </button>

      {loginMutation.isError && <div>The credential doesn't match our record.</div>}
    </form>
  );
}