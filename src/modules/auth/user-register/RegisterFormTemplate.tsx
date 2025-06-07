import logoSrc from '../../../assets/logo.png'
import { RegisterForm } from './RegisterForm'
import { InformationCircleIcon } from '@heroicons/react/24/outline';

const RegisterFormTemplate = () => {

  const {
    roles,
    teams,
    name,
    email,
    password,
    passwordConfirmation,
    role,
    team,
    loading,
    setName,
    setEmail,
    setPassword,
    setRole,
    setTeam,
    setPasswordConfirmation,
    submitRegister,
    logIn,
   } = RegisterForm();
  

  return (
   <div className="flex min-h-screen items-center justify-center p-6">
  <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-xl backdrop-blur-md">
    <div className="flex flex-col items-center mb-6">
      <img src={logoSrc} alt="Logo" className="w-30 h-30 mb-2" />
      <h1 className="text-1xl font-bold text-black">Sign Up</h1>

      <div className=" mt-3 bg-blue-100 text-blue-900 px-4 py-3 shadow-md" role="alert">
        <div className="flex">
          <InformationCircleIcon className="w-6 h-6 text-blue-900 mr-4" />
      
        <div>
        <p className="text-sm">
          * All fields are required. <br />
          * Your registration may be subject to approval.
        </p>
      </div>
  </div>
</div>
    </div>
    <form onSubmit={submitRegister} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-black">* Name</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full rounded-md border px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-black">* Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full rounded-md border px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-black">* Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full rounded-md border px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-black">* Password Confirmation</label>
        <input
          type="password"
          value={passwordConfirmation}
          onChange={e => setPasswordConfirmation(e.target.value)}
          className="w-full rounded-md border px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-black">* Select your team</label>
        <select
          value={team}
          onChange={e => setTeam(e.target.value)}
          className="w-full rounded-md border px-4 py-2 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Slect a team</option>
          {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-black mb-2 font-bold">* Select your role</label>
        <div className="flex flex-col gap-2">
          {roles.map((roleItem) => (
            <label key={roleItem.id} className="flex items-center gap-2 text-sm text-black">
              <input
                type="radio"
                value={roleItem.id}
                checked={roleItem.id === role}
                onChange={e => setRole(e.target.value)}
                className="accent-blue-600"
                name="role"
                required
              />
              {roleItem.description}
            </label>
          ))}
        </div>

      </div>
      <button
        type="submit"
        className="w-full rounded-md bg-blue-900 py-2 text-white hover:bg-blue-700 transition"
        disabled={loading}
      >
        Sign Up
      </button>

    
    </form>

     <div className="mt-5 flex justify-center items-center">
              <button
              onClick={() => logIn()}
              className="text-sm font-medium underline cursor-pointer text-blue-500 hover:text-blue-600 transition"
              >
                Log In
              </button>
        </div>
  </div>
</div>
  )
}

export default RegisterFormTemplate
