import Axios from 'axios'

Axios.interceptors.response.use(null, function (error) {
  // If session has expired, redirect user to login page
  if (error.response?.status === 401) {
    window.location.href = '/login'
  }

  return Promise.reject(error)
})

export const axios = Axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})
