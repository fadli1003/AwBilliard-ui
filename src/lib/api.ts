import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";


const baseURL = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/url`,
  withCredentials: true,
  withXSRFToken: true
}) 

baseURL.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
  const token = localStorage.getItem('ACCESS_TOKEN')
  config.headers?.Authorization = `Bearer ${token}`

  return config
})

baseURL.interceptors.response.use((response: AxiosResponse) => {
  return response;

}, (error: AxiosError) => {
  const { response } = error
  if(response?.status === 401) {
    localStorage.removeItem('ACCESS_TOKEN')
  }
  
  throw error
})

export default baseURL