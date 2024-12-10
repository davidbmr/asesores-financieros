// Contenedor para la seccion principal de la pagina

import React from "react";
import style from "./MainContentStructure.module.css";
import { TitleSection } from "../TitleSection/TitleSection";

interface PropsMainContentStructure {
	children: React.ReactNode;
	titleText?: string;
}
export const MainContentStructure = ({ children, titleText }: PropsMainContentStructure) => {
	return (
		<>
			<div className={style.mainContent__container}>
				<TitleSection titleText={titleText} />
				{children}
			</div>
		</>
	);
};
