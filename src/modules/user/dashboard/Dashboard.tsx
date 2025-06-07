import { useSelector } from 'react-redux'
import type { RootState } from '../../../store/store'

const Dashboard = () => {
  const user = useSelector((state: RootState) => state.auth.user)

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Welcome, {user?.name}</h1>

    </div>
  )
}

export default Dashboard