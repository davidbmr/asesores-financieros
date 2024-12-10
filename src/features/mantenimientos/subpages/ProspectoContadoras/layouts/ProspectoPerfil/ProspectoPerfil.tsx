import React, { useState } from "react";
import style from "./ProspectoPerfil.module.css";

import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";
import { LineaTiempo } from "./components/LineaTiempo/LineaTiempo";
import { ContenidoSeguimiento } from "./components/ContenidoSeguimiento/ContenidoSeguimiento";

export const ProspectoPerfil = () => {
	const [currentStep, setCurrentStep] = useState(1);

	const handleStepClick = (step: number) => {
		setCurrentStep(step);
	};
	return (
		<MainContentStructure titleText="Perfil de contadora prospecto">
			<div className={style.seguimientoServicio__container}>
				<LineaTiempo steps={steps} currentStep={currentStep} onClickStep={handleStepClick} />

				<ContenidoSeguimiento currentStep={currentStep} />
			</div>
		</MainContentStructure>
	);
};

const steps = [
	{ id: 1, label: "Entrevista" },
	{ id: 2, label: "Entrevista psicológica" },
	{ id: 3, label: "Contratación" },
];
