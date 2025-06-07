import axios from 'axios'
import { store } from '../store/store'
import { showErrorMessage } from '../helpers/ToastMessage'
import { authLogout } from '../services/auth/Auth'

const axiosInstance = axios.create({
  baseURL: 'http://gettaskapi.local:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState()

    const token = state.auth.token?.token

    if (token) {
      config.headers = config.headers || {} 
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)


axiosInstance.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response) {

      if (error.response.status === 401) {
        if(error.response?.data?.code && error.response.data.code == 'token_expired'){
          showErrorMessage("Session expired. Please log in again.")
          authLogout();
        }else{
          showErrorMessage('Unauthorized access.')
        }
      
      } else if (error.response.status === 422 && error.response.data.errors) {
        showErrorMessage('\n * ' + Object.values(error.response.data.errors).join("\n"))
      } else {
        showErrorMessage(error.response.data?.message || 'Unexpected error. Please try again later.')
      }
    } else {
      showErrorMessage('Network error. Please check your connection.')
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
