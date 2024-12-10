import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "@/store/store";

export interface AuthState {
    isLoading: boolean;
    login: boolean | null;
    role: string;
    token: string | null;
    loginDate: string | null;
    usuario: {
        nombre: string;
        correo: string;
        experiencia: string;
        clientes: any[];
        fecha_nacimiento: string;
        imgContadora: string;
        especialidad: string;
        uid: string;
        contadora: string;
        servicioCliente: string;
    } | null;
}

const initialState: AuthState = {
    isLoading: false,
    login: null,
    role: "",
    token: null,
    loginDate: null,
    usuario: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setLogin: (state, action: PayloadAction<boolean>) => {
            state.login = action.payload;
            state.isLoading = false;
            state.loginDate = action.payload ? new Date().toISOString() : null;
            if (action.payload) {
                localStorage.setItem('loginDate', state.loginDate!);
            } else {
                localStorage.removeItem('loginDate');
            }
        },
        setRole: (state, action: PayloadAction<string>) => {
            state.role = action.payload;
            localStorage.setItem('role', action.payload);
        },
        setToken: (state, action: PayloadAction<string | null>) => {
            state.token = action.payload;
            if (action.payload) {
                localStorage.setItem('token', action.payload);
            } else {
                localStorage.removeItem('token');
            }
        },
        setUsuario: (state, action: PayloadAction<any>) => {
            state.usuario = action.payload;
            if (action.payload) {
                localStorage.setItem('usuario', JSON.stringify(action.payload));
            } else {
                localStorage.removeItem('usuario');
            }
        },
        logout: (state) => {
            state.role = "";
            state.login = null;
            state.token = null;
            state.loginDate = null;
            state.usuario = null;
            localStorage.removeItem("rt__eva__backoffice");
            localStorage.removeItem("uid");
            localStorage.removeItem("loginDate");
            localStorage.removeItem("role");
            localStorage.removeItem("token");
            localStorage.removeItem("usuario");
        },
    },
});

export const { setLoading, setLogin, setRole, setToken, setUsuario, logout } = authSlice.actions;

export default authSlice.reducer;
