import logoSrc from '../../../assets/logo.png'
import { Login } from './Login'
import { InformationCircleIcon } from '@heroicons/react/24/outline';

const LoginTemplate = () => {

  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    login,
    signUp
  } = Login();

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-xl backdrop-blur-md">
        <div className="flex flex-col items-center mb-6">
          <img src={logoSrc} alt="Logo" className="w-30 h-30 mb-2" />
          <h1 className="text-1xl font-bold text-black">Login</h1>

          <div className="w-full mt-3 bg-blue-100 text-blue-900 px-4 py-3 shadow-md" role="alert">
            <div className="flex">
              <InformationCircleIcon className="w-6 h-6 text-blue-900 mr-4" />
              <div>
                <p className="text-sm">
                  * All fields are required.
                </p>
              </div>
            </div>
          </div>

        </div>
        <form onSubmit={login} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full rounded-md border px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full rounded-md border px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-900 py-2 text-white hover:bg-blue-700 transition"
            disabled={loading}
          >
            Log In
          </button>
        </form>

        <div className="mt-5 flex justify-center items-center">
          <button
            onClick={() => signUp()}
            className="text-sm font-medium underline cursor-pointer  text-blue-500 hover:text-blue-600 transition"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginTemplate
