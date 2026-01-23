import axios, { AxiosError, AxiosResponse } from "axios";

const baseAPI = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
  withXSRFToken: true
}) 

baseAPI.interceptors.request.use((config) => {
  config.headers.Accept = 'application/json'
  return config
})

baseAPI.interceptors.response.use((response: AxiosResponse) => {
  return response

}, (error: AxiosError) => {
  if(error.response?.status === 401){
    localStorage.removeItem('user')
  }

  throw error
})

export const fetchUser = async(id: number) => {
  try{
    const res = await baseAPI.get(`/user/${id}`)
    return res.data
  }catch(err){
    if(err instanceof AxiosError){
      throw err.response
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
      throw err.response
    }
    console.error(err)
  }
}

export const getUserJadwal = async(userId: number) => {
  try{
    const res = await baseAPI.get(`/user/${userId}/jadwal`)
    return res.data
  }catch(err){
    if(err instanceof AxiosError){
      throw err.response
    }
  }
}

export const fetchBooking = async() => {
  try{
    const res = await baseAPI.get('/booking')
    return res.data
  }catch(err){
    if(err instanceof AxiosError){
      throw err.response
    }
    console.error(err)
  }
}

export const getUserBooking = async (userId: number) => {
  const res = await baseAPI.get(`/booking/${userId}`)
  return res.data
}

export const addBooking = async (booking: BookingType) => {
  try{
    const res = await baseAPI.post('/booking', booking)
    return res.data
  } catch(err){
    if(err instanceof AxiosError){
      throw err.response
    }
    console.error(err)
  }
}

export const addPayment = async(bookingId: number, payment: PaymentType) => {
  try{
    const res = await baseAPI.post(`/booking/${bookingId}/payment`, payment)
    return res.data
  }catch(err){
    if(err instanceof AxiosError){
      throw err.response
    }
    console.error(err)    
  }
}

export default baseAPI