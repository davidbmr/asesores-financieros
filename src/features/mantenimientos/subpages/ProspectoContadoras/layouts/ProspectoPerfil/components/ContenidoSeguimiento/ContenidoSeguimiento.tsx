import React from "react";
import style from "./ContenidoSeguimiento.module.css";

import { ReunionProgramada } from "../RenunionProgramada/ReunionProgramada";
import { EntrevistaPsicologica } from "../EntrevistaPsicologica/EntrevistaPsicologica";
import { Contratacion } from "../Contratacion/Contratacion";

interface ContenidoSeguimientoProps {
	currentStep: number;
}

export const ContenidoSeguimiento = ({ currentStep }: ContenidoSeguimientoProps) => {
	return (
		<div>
			{currentStep === 1 && <ReunionProgramada />}
			{currentStep === 2 && <EntrevistaPsicologica />}
			{currentStep === 3 && <Contratacion />}
		</div>
	);
};
