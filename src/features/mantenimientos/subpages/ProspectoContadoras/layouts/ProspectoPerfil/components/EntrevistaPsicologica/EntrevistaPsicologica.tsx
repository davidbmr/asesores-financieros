import React from "react";
import style from "./EntrevistaPsicologica.module.css";
import { CalendlyEmbed } from "@/features/mantenimientos/subpages/SeleccionarContadora/CalendlyButton/CalendlyEmbed";

export const EntrevistaPsicologica = () => {
	return (
		<div className={style.entregaDocumentos__container}>
			<p className={style.entregaDocumentos__title}>Agenda una entrevista psicológica:</p>
			{/* <CalendlyEmbed url={`https://calendly.com/cprado-9gc`} /> */}
		</div>
	);
};
