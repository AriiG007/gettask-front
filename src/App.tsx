import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoginTemplate from './modules/auth/login/LoginTemplate'
import Dashboard from './modules/user/dashboard/Dashboard'
import TasksTemplate from './modules/user/tasks/TasksTemplate'
import PrivateRoute from './routes/PrivateRoute'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar'
import RegisterFormTemplate from './modules/auth/user-register/RegisterFormTemplate'
import UsersTemplate from './modules/users/UsersTemplate'


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginTemplate />} />
        <Route path="/signup" element={<RegisterFormTemplate />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <TasksTemplate />
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <UsersTemplate />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
        toastClassName="rounded-lg shadow-lg px-4 py-3 text-white font-medium"
      />

    </Router>
  )
}

export default App
