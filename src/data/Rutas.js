export const appRoutesAdmin = [
	{
		group: true,
		groupName: "APP ADMIN",
		routes: [
			{
				path: "/soporte",
				sidebarProps: {
					displayText: "Soporte",
				},
			},
			// {
			// 	path: "/prospecto-contadoras",
			// 	sidebarProps: {
			// 		displayText: "Prospectos de contadoras",
			// 	},
			// },
			// {
			// 	path: "/total-clientes",
			// 	sidebarProps: {
			// 		displayText: "Total Clientes",
			// 	},
			// },
		],
	},
];

export const appRoutesCliente = [
	{
		group: true,
		groupName: "APP CLIENTE",
		routes: [
			{
				path: "/dashboard",
				sidebarProps: {
					displayText: "Dashboard",
				},
			},
			{
				path: "/contadora-asignada",
				sidebarProps: {
					displayText: "Contadora asignada",
				},
			},
			{
				path: "/seguimiento-servicio",
				sidebarProps: {
					displayText: "Seguimiento del servicio",
				},
			},
			{
				path: "/servicios-finalizados",
				sidebarProps: {
					displayText: "Servicios Finalizados",
				},
			},
			{
				path: "/historial-pagos",
				sidebarProps: {
					displayText: "Historal de Pagos",
				},
			},
		],
	},
];

export const appRoutesContadora = [
	{
		group: true,
		groupName: "APP CONTADORA",
		routes: [
			{
				path: "/dashboard-contadora",
				sidebarProps: {
					displayText: "Dashboard",
				},
			},
			{
				path: "/lista-clientes",
				sidebarProps: {
					displayText: "Lista de clientes",
				},
			},
			{
				path: "/mis-reuniones",
				sidebarProps: {
					displayText: "Mis Reuniones",
				},
			},
			{
				path: "/historial-pagos",
				sidebarProps: {
					displayText: "Historal de Pagos",
				},
			},
		],
	},
];
