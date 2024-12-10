import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./Contratacion.module.css";

import { ContentBox } from "@/components/ContentBox/ContentBox";
import { CustomButton } from "@/components/CustomButton/CustomButton";

export const Contratacion = () => {
	const navigate = useNavigate();

	const handleClientsRedirect = () => {
		navigate("/prospecto-contadoras");
	};

	return (
		<div className={style.entregaDocumentos__container}>
			<p className={style.entregaDocumentos__title}>Contratación de contadora:</p>

			<ContentBox additionalClassName={style.entregaDocumentos__lista}>
				<CustomButton
					text="ACEPTAR"
					backgroundButton="var(--primary-color-app)"
					colorP="#fff"
					onClick={handleClientsRedirect}
				/>
				<CustomButton
					text="RECHAZAR"
					backgroundButton="var(--primary-color-app)"
					colorP="#fff"
					onClick={handleClientsRedirect}
				/>
			</ContentBox>

			<p className={style.entregaDocumentos__text__limite}>
				Esta opción permite dar de alta a la contadora.
			</p>
		</div>
	);
};
