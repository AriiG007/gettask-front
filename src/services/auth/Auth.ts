import axios from "../../api/axios";
import { store } from "../../store/store";
import { loginSuccess, logout } from "../../store/authSlice";
import type { Token } from "../../types/Token";
import { showErrorMessage } from '../../helpers/ToastMessage'

export async function refreshToken(): Promise<string | null> {
  try {
    const state = store.getState();

    const user = state.auth.user;

    if (!user) return null;

    const response = await axios.post("/auth/refresh");
    const nuevoToken: Token = response.data;

    store.dispatch(loginSuccess({ token: nuevoToken, user: user }));

    return nuevoToken.token;
  } catch (error) {

    console.error("Error al refrescar el token", error);

    showErrorMessage("Session expired. Please log in again.")
    authLogout();
    return null;
  }
}

export function authLogout(): void {
  store.dispatch(logout());
  window.location.href = '/login'
}

export const validatePermission = (permission: string): boolean => {
  const state = store.getState();

  return state.auth.user?.permissions?.some(p => p.permission === permission) ?? false;
};
