import React, { useState } from "react"
import baseAPI from "../../utils/api";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/ContextProvider";

const emptyForm = { name: '', email: '', phone: '', password: '', password_confirmation: '' };

const SignUp = () => {
  const [form, setForm] = useState<AuthFormState>(emptyForm)
  const [loading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<any>()
  const {setUser, setToken} = useAuthContext()
  const navigate = useNavigate()

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    setForm({
      name: form.name,
      email: form.email,
      phone: form.phone,
      password: form.password,
      password_confirmation: form.password_confirmation
    })

    async () => {
      setIsLoading(true)
      const token: string = await baseAPI.get('/sanctum/csrf-cookie', {
        baseURL: import.meta.env.VITE_API_URL
      })
      setToken(token)
      try {
        const res = await baseAPI.post('/register', form, {
          baseURL: import.meta.env.VITE_API_URL
        })
        if(res.status === 200 && res.data){
          setUser(res.data)
        }
        navigate('/')
      } catch (err){
        if(err instanceof AxiosError){
          setErrors(err.response?.data.errors)
        }
        console.error(err)
      }
    }
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <div className="min-h-screen w-full justify-center items-center">      
      <title>Sign Up</title>
      <form onSubmit={handleSignUp} className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <label htmlFor="name">name</label>
          <input type="text" placeholder="Enter name" id="name" name="name" onChange={handleFormChange} />
          {errors?.name && <span className="text-red-500 text-xs">{errors.name}</span> }
        </div>
        <div>
          <label htmlFor="email">email</label>
          <input type="email" placeholder="Enter email" id="email" name="email" onChange={handleFormChange} />
          {errors?.email && <span className="text-red-500 text-xs">{errors.email}</span> }
        <div>
          <label htmlFor="phone">phone</label>
          <input type="text" placeholder="Enter phone number" id="phone" name="phone" onChange={handleFormChange} />
          {errors?.phone && <span className="text-red-500 text-xs">{errors.phone}</span> }
        </div>
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input type="text" placeholder="Enter password" id="password" name="password" onChange={handleFormChange} />
          {errors?.password && <span className="text-red-500 text-xs">{errors.password}</span> }
        </div>
        <div>
          <label htmlFor="password_confirmation">password_confirmation</label>
          <input type="text" placeholder="Enter password_confirmation" id="password_confirmation" name="password_confirmation" onChange={handleFormChange} />
          {errors?.password && <span className="text-red-500 text-xs">{errors.password}</span> }
        </div>
        <button disabled={loading} type="submit">{loading? 'Signing Up':'Sign Up'}</button>
      </form>
    </div>
  )
}

export default SignUp