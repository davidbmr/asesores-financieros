import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import style from "./AppRoutes.module.css";

import { Sidebar } from "../components/Sidebar/Sidebar";
import { MainHeader } from "../components/MainHeader/MainHeader";
import { AppStructure } from "../components/AppStructure/AppStructure";
import { appRoutesAdmin } from "@/data/Rutas";

import { Mantenimientos } from "../features/mantenimientos/pages/Mantenimientos";
import { Dashboard } from "@/features/mantenimientos/subpages/Dashboard/Dashboard";

// Admin
import { ListaContadoras } from "@/features/mantenimientos/subpages/ListaContadoras/ListaContadoras";
import { ProspectoContadoras } from "@/features/mantenimientos/subpages/ProspectoContadoras/ProspectoContadoras";
import { ProspectoPerfil } from "@/features/mantenimientos/subpages/ProspectoContadoras/layouts/ProspectoPerfil/ProspectoPerfil";
import { PerfilContadora } from "@/features/mantenimientos/subpages/ListaContadoras/layouts/PerfilContadora/PerfilContadora";
import MiPerfil from "@/features/mantenimientos/subpages/MiPerfil/MiPerfil";
import { ClientesGeneralTabla } from "@/features/mantenimientos/subpages/totalClientes/ClientesGeneralTabla";
import HistorialPagosContadora from "@/features/mantenimientos/subpages/HistorialPagosContadora/HistorialPagosContadora";


export const AppRoutesAdmin = () => {
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
				<Sidebar appRoutes={appRoutesAdmin} isResponsiveMenu={isResponsiveMenu} />
				<MainHeader additionalClassName={style.mainHeaderContainer} setMenuResize={setMenuResize} />
				<div className={style.routesContainer}>
					<Routes>
						<Route path="/" element={<Mantenimientos />} />
						<Route path="/dashboard" element={<Dashboard />} />

						{/* Admin */}
						<Route path="/soporte" element={<ListaContadoras />} />
						<Route path="/total-clientes" element={<ClientesGeneralTabla />} />
						<Route path="/lista-contadoras/perfil/:id" element={<PerfilContadora />} />

						<Route path="/prospecto-contadoras" element={<ProspectoContadoras />} />
						<Route path="/prospecto-contadoras/perfil" element={<ProspectoPerfil />} />
						<Route path="/mi-perfil" element={<MiPerfil/>} />
						
						

					</Routes>
				</div>
			</div>
		</AppStructure>
	);
};
