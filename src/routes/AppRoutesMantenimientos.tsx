// import React, { useState } from "react";
// import { Route, Routes } from "react-router-dom";
// import style from "./AppRoutes.module.css";

// import { Sidebar } from "../components/Sidebar/Sidebar";
// import { MainHeader } from "../components/MainHeader/MainHeader";
// import { AppStructure } from "../components/AppStructure/AppStructure";
// import { appRoutesMantenimientos } from "@/data/Rutas";

// import { Mantenimientos } from "../features/mantenimientos/pages/Mantenimientos";
// import { Dashboard } from "@/features/mantenimientos/subpages/Dashboard/Dashboard";
// import { SeleccionarContadora } from "@/features/mantenimientos/subpages/SeleccionarContadora/SeleccionarContadora";
// import { SeguimientoServicio } from "@/features/mantenimientos/subpages/SeguimientoServicio/SeguimientoServicio";

// // Contadora
// import { Clientes } from "@/features/mantenimientos/subpages/Clientes/Clientes";
// import { SeguimientoCliente } from "@/features/mantenimientos/subpages/SeguimientoCliente/SeguimientoCliente";

// // Admin
// import { ListaContadoras } from "@/features/mantenimientos/subpages/ListaContadoras/ListaContadoras";
// import { ProspectoContadoras } from "@/features/mantenimientos/subpages/ProspectoContadoras/ProspectoContadoras";
// import { ProspectoPerfil } from "@/features/mantenimientos/subpages/ProspectoContadoras/layouts/ProspectoPerfil/ProspectoPerfil";
// import { PerfilContadora } from "@/features/mantenimientos/subpages/ListaContadoras/layouts/PerfilContadora/PerfilContadora";

// export const AppRoutesMantenimientos = () => {
// 	const [isResponsiveMenu, setIsResponsiveMenu] = useState(false);
// 	const containerClassName = isResponsiveMenu
// 		? `${style.mainContent__container} ${style.containerWithMenu}`
// 		: style.mainContent__container;

// 	const setMenuResize = () => {
// 		setIsResponsiveMenu((prev) => !prev);
// 	};

// 	return (
// 		<AppStructure>
// 			<div className={containerClassName}>
// 				<Sidebar appRoutes={appRoutesMantenimientos} isResponsiveMenu={isResponsiveMenu} />
// 				<MainHeader additionalClassName={style.mainHeaderContainer} setMenuResize={setMenuResize} />
// 				<div className={style.routesContainer}>
// 					<Routes>
// 						<Route path="/" element={<Mantenimientos />} />
// 						<Route path="/dashboard" element={<Dashboard />} />
// 						<Route path="/contadora-asignada" element={<SeleccionarContadora />} />
// 						<Route path="/seguimiento-servicio" element={<SeguimientoServicio />} />

// 						{/* Contadora */}
// 						<Route path="/dashboard-contadora" element={<Dashboard />} />
// 						<Route path="/lista-clientes" element={<Clientes />} />
// 						<Route path="/seguimiento-cliente" element={<SeguimientoCliente />} />

// 						{/* Admin */}
// 						<Route path="/lista-contadoras" element={<ListaContadoras />} />
// 						<Route path="/lista-contadoras/perfil" element={<PerfilContadora />} />

// 						<Route path="/prospecto-contadoras" element={<ProspectoContadoras />} />
// 						<Route path="/prospecto-contadoras/perfil" element={<ProspectoPerfil />} />
// 					</Routes>
// 				</div>
// 			</div>
// 		</AppStructure>
// 	);
// };
