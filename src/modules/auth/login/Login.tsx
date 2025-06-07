import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import api from '../../../api/axios'
import { loginSuccess } from '../../../store/authSlice'
import type { AppDispatch } from '../../../store/store'

export const Login = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const signUp = () => { navigate('/signup') }

  const login = async (e) => {

    e.preventDefault();
    setLoading(true)

    try {
      const res = await api.post('/auth/login', { email, password })
      const { access_token, user } = res.data


      dispatch(loginSuccess({ token: access_token, user: user }))
      navigate('/dashboard')
    } catch (err: any) {

      console.log('error', err)

    } finally {
      setLoading(false)
    }
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    login,
    signUp
  }
}

export default Login
