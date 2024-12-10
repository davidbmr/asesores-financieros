import React from "react";
import style from "./ReunionProgramada.module.css";

import { ContentBox } from "@/components/ContentBox/ContentBox";

export const ReunionProgramada = () => {
	return (
		<>
			<ContentBox backgroundActive additionalClassName={style.reunionProgramada__container}>
				<div className={style.reunionProgramada__item}>
					<p>Actualmente tu reunión se encuentra programada</p>
					<p>|</p>
					<p>Día: -</p>
					<p>|</p>
					<p>Hora: -</p>
				</div>

				<div className={style.reunionProgramada__item}>
					<p>
						Enlace:{" "}
						<a href="https://www.google.com.pe" target="_blank">
							www.zoom.com/url
						</a>
					</p>
				</div>
			</ContentBox>
		</>
	);
};
