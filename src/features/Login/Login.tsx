import React, { useState } from "react";
import styles from "./Login.module.css";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { CustomButton } from "@/components/CustomButton/CustomButton";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { setLogin, setRole, setLoading, setToken, setUsuario } from "@/store/slices/auth";
import { setToast } from "@/store/slices/toast";

export const Login: React.FC = () => {
	const [user, setUser] = useState<any>({
		correo: "",
		contraseña: "",
	});

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const handleLogin = async () => {
		dispatch(setLoading(true));

		// Simula el login sin lógica de autenticación
		dispatch(setLogin(true));
		dispatch(setRole("admin")); // Puedes cambiar a 'cliente' o 'contadora' según lo que necesites
		dispatch(setToken("dummy-token")); // Genera un token dummy si es necesario
		dispatch(
			setUsuario({
				nombre: "Admin",
				correo: user.correo || "admin@example.com", // Guarda el correo que el usuario introduce
				experiencia: "5 años",
				clientes: [],
				fecha_nacimiento: "1990-01-01",
				imgContadora: "",
				especialidad: "Contabilidad",
				uid: "dummy-uid",
				contadora: "",
				servicioCliente: "",
			})
		);

		// Simulación de un toast exitoso
		dispatch(
			setToast({
				severity: "success",
				summary: "Login exitoso",
				detail: `Bienvenido Admin`,
			})
		);

		// Navega al dashboard o a la ruta que corresponda
		navigate("/soporte");
		dispatch(setLoading(false));
	};

	return (
		<div className={styles.loginContainer}>
			<div className={styles.overlayContainer}>
				<div className={styles.overlay}></div>
			</div>

			<div className={`${styles.form__container__layout}`}>
				<div className={`${styles.form__container}`}>
					<div
						style={{
							width: "400px",
							margin: "0 auto",
						}}
					>
						<img
							src="/LogoDefault.webp"
							alt="Logo"
							style={{ width: "80%", height: "auto", objectFit: "cover" }}
						/>
					</div>

					<p className={styles.form__title}>Iniciar sesión</p>

					{/* Campo de texto para el correo */}
					<TextBoxField
						textLabel="Correo:"
						value={user.correo}
						name={"correo"}
						onChange={(e) => setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
					/>

					{/* Campo de texto para la contraseña */}
					<TextBoxField
						textLabel="Contraseña:"
						value={user.contraseña}
						name={"contraseña"}
						onChange={(e) => setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
						type="password"
					/>

					{/* Botón para realizar el login */}
					<CustomButton
						text="INGRESAR"
						backgroundButton="var(--primary-color-app)"
						colorP="#fff"
						onClick={handleLogin}
					/>
				</div>
			</div>
		</div>
	);
};
