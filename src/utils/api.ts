import axios, { AxiosError, AxiosResponse } from "axios";

const baseAPI = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept' : 'application/json'
  }
}) 

baseAPI.interceptors.request.use((config) => {
  config.headers.Accept = 'application/json'
  return config
})

baseAPI.interceptors.response.use((response: AxiosResponse) => {
  return response

}, (error: AxiosError) => {
  if(error.response?.status === 401 || error.response?.status === 419){
    localStorage.removeItem('aw_user')
    window.location.href = '/sign-in?message=session_expired'
  }

  // throw error
  return Promise.reject(error)
})

export const fetchUser = async(id: number) => {
  try{
    const res = await baseAPI.get(`/users/${id}`)
    return res.data
  }catch(err){
    if(err instanceof AxiosError){
      if(err.response?.status === 401 || err.response?.status === 419)
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
    const res = await baseAPI.get(`/users/${userId}/bookings`)
    return res.data
  }catch(err){
    if(err instanceof AxiosError){
      throw err.response
    }
  }
}

export const fetchBooking = async() => {
  try{
    const res = await baseAPI.get('/bookings')
    return res.data
  }catch(err){
    if(err instanceof AxiosError){
      throw err.response
    }
    console.error(err)
  }
}

export const getUserBooking = async (userId: number) => {
  const res = await baseAPI.get(`/bookings/${userId}`)
  return res.data
}

export const addBooking = async (booking: BookingType) => {
  try{
    const res = await baseAPI.post('/bookings', booking)
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
    const res = await baseAPI.post(`/bookings/${bookingId}/payment`, payment)
    return res.data
  }catch(err){
    if(err instanceof AxiosError){
      throw err.response
    }
    console.error(err)    
  }
}

export default baseAPI