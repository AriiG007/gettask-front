import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../../api/axios'
import { showSuccessMessage } from '../../../helpers/ToastMessage'
import type { Role, Team } from '../../../types/User'
import { showErrorMessage } from '../../../helpers/ToastMessage'


export const RegisterForm = () => {

  const [roles, setRoles] = useState<Role[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const logIn = () => { navigate('/aut/login') }

  useEffect(() => {
    fetchData();
  }, []);

  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [role, setRole] = useState('')
  const [team, setTeam] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {

    try {

      const [rolesRes, teamsRes] = await Promise.all([
        api.get<Role[]>('/public-resources/roles'),
        api.get<Team[]>('/public-resources/teams'),
      ]);

      const roles = Array.isArray(rolesRes.data) ? rolesRes.data : [];
      const teams = Array.isArray(teamsRes.data) ? teamsRes.data : [];

      setRoles(roles);
      setTeams(teams);

    } catch (error) {
      console.error('Error loading data:', error);
      showErrorMessage(
        'An error occurred while loading data. ' +
        'Please reload the page. If the problem persists, please contact the administrator.'
      );
    } finally {
      setLoading(false);
    }
  };


  const submitRegister = async (e) => {
    e.preventDefault();
    setLoading(true)

    try {
      const payload = {
        name: name,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
        role_id: role,
        team_id: team
      }
     
      await api.post('/auth/register', payload)
      showSuccessMessage('Successfully registered user.');
      navigate('/login')

    } catch (err: any) {

      console.log('err', err)

    } finally {
      setLoading(false)
    }
  }

  return {
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
  }

}



