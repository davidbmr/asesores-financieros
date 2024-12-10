import React from "react";
import style from "./ContenidoSeguimiento.module.css";

import { ReunionProgramada } from "../RenunionProgramada/ReunionProgramada";
import { EntregaDocumentos } from "../EntregaDocumentos/EntregaDocumentos";
import { Resultados } from "../Resultados/Resultados";
import { FormularioEncuesta } from "../FormularioEncuesta/FormularioEncuesta";

interface ContenidoSeguimientoProps {
	currentStep: number;
	data?: any;
	handleNextStep: () => void;
	reloadFetchData?: () => void;
}

export const ContenidoSeguimiento = ({
	currentStep,
	handleNextStep,
	data,
	reloadFetchData
}: ContenidoSeguimientoProps) => {

	return (
		<div>
			{currentStep === 1 && <ReunionProgramada data={data}/>}
			{currentStep === 2 && <EntregaDocumentos data={data} reloadFetchData={reloadFetchData}/>}
			{currentStep === 3 && <Resultados handleNextStep={handleNextStep}/>}
			{currentStep === 4 && <FormularioEncuesta />}
		</div>
	);
};
