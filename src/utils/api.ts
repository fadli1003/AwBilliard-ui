import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";


const baseAPI = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
  withXSRFToken: true
}) 

baseAPI.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('ACCESS_TOKEN')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config
})

baseAPI.interceptors.response.use((response: AxiosResponse) => {
  return response;

}, (error: AxiosError) => {
  const { response } = error
  if(response?.status === 401) {
    localStorage.removeItem('ACCESS_TOKEN')
  }
  
  throw error
})

export const fetchUser = async(id: any) => {
  try{
    const res = await baseAPI.get('/user', id)
    return res.data
  }catch(err){
    if(err instanceof AxiosError){
      return err.response
    }
    console.error(err)
  }
}

export const fetchJadwal = async() => {
  try{
    const res = await baseAPI.get('/jadwal')
    return res.data
  }catch(err){
    if (err instanceof AxiosError){
      return err.response
    }
    console.error(err)
  }
}

export const fetchBooking = async() => {
  try{
    const res = await baseAPI.get('/booking')
    return res.data
  }catch(err){
    if(err instanceof AxiosError){
      return err.response
    }
    console.error(err)
  }
}

export const addBooking = async(booking: any) => {
  try{
    const res = await baseAPI.post('/booking', booking)
    return res.data
  } catch(err){
    if(err instanceof AxiosError){
      return err.response
    }
    console.error(err)
  }
}

export const addPayment = async(payment: any) => {
  try{
    const res = await baseAPI.post('/payment', payment)
    return res.data
  }catch(err){
    if(err instanceof AxiosError){
      return err.response
    }
    console.error(err)    
  }
}

export default baseAPI