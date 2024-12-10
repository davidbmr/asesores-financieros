import axios from "axios";
import { AppThunk } from "@/store/store";
import { url } from "@/connections/mainApi";
import { setLoading, setLogin, setRole, setToken, setUsuario, logout } from "./authSlice";

export const loginUser = (credentials: { email: string; password: string }): AppThunk => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await axios.post(`${url}/login`, credentials);
        const { usuario, token } = response.data;
        dispatch(setToken(token));
        dispatch(setRole(usuario.role));
        dispatch(setUsuario(usuario));
        dispatch(setLogin(true));
    } catch (error) {
        console.error(error);
        dispatch(setLogin(false));
    } finally {
        dispatch(setLoading(false));
    }
};

export const initializeAuth = (): AppThunk => (dispatch) => {
    const loginDate = localStorage.getItem('loginDate');
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');
    const usuario = localStorage.getItem('usuario');

    if (token && role && usuario) {
        dispatch(setToken(token));
        dispatch(setRole(role));
        dispatch(setUsuario(JSON.parse(usuario)));
        dispatch(setLogin(true));
    } else {
        dispatch(setLogin(false));
    }
};

export const refreshToken = (token: string): AppThunk => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await axios.post(`${url}auth/refreshToken`, { token });
        const data = response.data;
        localStorage.setItem("rt__eva__backoffice", data.token);
        dispatch(setToken(data.token));
        dispatch(setRole(data.usuario.role.toLowerCase()));
        dispatch(setUsuario(data.usuario));
        dispatch(setLogin(true));
    } catch (error) {
        dispatch(logout());
    } finally {
        dispatch(setLoading(false));
    }
};

export const logoutUser = (): AppThunk => (dispatch) => {
    localStorage.removeItem("rt__eva__backoffice");
    dispatch(logout());
};
