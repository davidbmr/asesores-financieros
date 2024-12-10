import React from "react";
import style from "./ContenidoSeguimiento.module.css";

import { ReunionProgramada } from "../RenunionProgramada/ReunionProgramada";
import { SolicitudDocumentos } from "../SolicitudDocumentos/SolicitudDocumentos";
import { Resultados } from "../Resultados/Resultados";

interface ContenidoSeguimientoProps {
	currentStep: number;
	data?: any;
	handleStepClick?: any;
	reloadFetchData?: any;
}

export const ContenidoSeguimiento = ({ currentStep,data,handleStepClick,reloadFetchData }: ContenidoSeguimientoProps) => {
	return (
		<div>
			{currentStep === 1 && <ReunionProgramada data={data} handleStepClick={handleStepClick}
			reloadFetchData={reloadFetchData}
			/>}
			{currentStep === 2 && <SolicitudDocumentos data={data} handleStepClick={handleStepClick}/>}
			{currentStep === 3 && <Resultados />}
		</div>
	);
};
