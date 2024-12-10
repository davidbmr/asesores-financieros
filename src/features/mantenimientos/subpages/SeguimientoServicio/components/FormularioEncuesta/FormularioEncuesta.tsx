import React, { useState } from "react";
import style from "./FormularioEncuesta.module.css";
import { ContentBox } from "@/components/ContentBox/ContentBox";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";

export const FormularioEncuesta = () => {
	const preguntas = [
		"1. ¿Cómo calificarías la calidad de los servicios contables proporcionados?",
		"2. ¿Qué tan satisfecho estás con la claridad y comprensión de las explicaciones proporcionadas por la contadora en relación con tus asuntos financieros?",
		"3. ¿En qué medida cumplió la contadora con tus expectativas en términos de precisión y puntualidad en la gestión de los registros financieros?",
		"4. ¿Cómo evaluarías la comunicación y disponibilidad de la contadora durante el periodo de servicio?",
		"5. ¿Qué tan probable es que recomiendes los servicios de esta contadora a otras personas?",
	];

	const [respuestas, setRespuestas] = useState<any>([]);

	const handleRespuesta = (index: any, valor: any) => {
		const nuevasRespuestas = [...respuestas];
		nuevasRespuestas[index] = valor;
		setRespuestas(nuevasRespuestas);
	};

	const renderPreguntas = () => {
		return preguntas.map((pregunta, index) => (
			<ContentBox key={index} additionalClassName={style.contentBox__container}>
				<div className={style.pregunta}>
					<p className={style.formularioEncuesta__text}>{pregunta}</p>
					<div className={style.opciones}>
						<p className={style.opciones__text}>Insatisfecho</p>
						{[1, 2, 3, 4, 5].map((valor) => (
							<button
								key={valor}
								className={`${style.formularioEncuesta__box__button} ${
									respuestas[index] === valor
										? `${style.formularioEncuesta__box__button__active}`
										: ""
								}`}
								onClick={() => handleRespuesta(index, valor)}
							>
								{valor}
							</button>
						))}
						<p className={style.opciones__text}>Satifescho</p>
					</div>
				</div>
			</ContentBox>
		));
	};

	return (
		<div className={style.formularioEncuesta__container}>
			<h1>Queremos saber tu opinión</h1>
			{renderPreguntas()}

			<ContentBox additionalClassName={style.contentBox__container}>
				<TextBoxField name="" value="" onChange={() => {}} textLabel="6. Comentario adicional:" />
			</ContentBox>
			<button className={style.formularioEncuesta__button} onClick={() => console.log(respuestas)}>
				Enviar encuesta
			</button>
		</div>
	);
};
