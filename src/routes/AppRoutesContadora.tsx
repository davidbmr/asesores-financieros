import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import style from "./AppRoutes.module.css";

import { Sidebar } from "../components/Sidebar/Sidebar";
import { MainHeader } from "../components/MainHeader/MainHeader";
import { AppStructure } from "../components/AppStructure/AppStructure";

import { Mantenimientos } from "../features/mantenimientos/pages/Mantenimientos";
import { Dashboard } from "@/features/mantenimientos/subpages/Dashboard/Dashboard";

// Contadora
import { Clientes } from "@/features/mantenimientos/subpages/Clientes/Clientes";
import { SeguimientoCliente } from "@/features/mantenimientos/subpages/SeguimientoCliente/SeguimientoCliente";
import { appRoutesContadora } from "@/data/Rutas";
import MiPerfil from "@/features/mantenimientos/subpages/MiPerfil/MiPerfil";
import MisHorarios from "@/features/mantenimientos/subpages/MisHorarios/MisHorarios";
import { MisReuniones } from "@/features/mantenimientos/subpages/MisReuniones/MisReuniones";
import HistorialPagosContadora from "@/features/mantenimientos/subpages/HistorialPagosContadora/HistorialPagosContadora";

export const AppRoutesContadora = () => {
	const [isResponsiveMenu, setIsResponsiveMenu] = useState(false);
	const containerClassName = isResponsiveMenu
		? `${style.mainContent__container} ${style.containerWithMenu}`
		: style.mainContent__container;

	const setMenuResize = () => {
		setIsResponsiveMenu((prev) => !prev);
	};

	return (
		<AppStructure>
			<div className={containerClassName}>
				<Sidebar appRoutes={appRoutesContadora} isResponsiveMenu={isResponsiveMenu} />
				<MainHeader additionalClassName={style.mainHeaderContainer} setMenuResize={setMenuResize} />
				<div className={style.routesContainer}>
					<Routes>
						<Route path="/" element={<Mantenimientos />} />

						{/* Contadora */}
						<Route path="/dashboard-contadora" element={<Dashboard />} />
						<Route path="/lista-clientes" element={<Clientes />} />
						<Route path="/mis-reuniones" element={<MisReuniones />} />
						<Route path="/seguimiento-cliente/:id" element={<SeguimientoCliente />} />
						<Route path="/mi-perfil" element={<MiPerfil/>} />
						<Route path="/mi-horario" element={<MisHorarios/>} />
						<Route path="/historial-pagos" element={<HistorialPagosContadora/>} />
					</Routes>
				</div>
			</div>
		</AppStructure>
	);
};
