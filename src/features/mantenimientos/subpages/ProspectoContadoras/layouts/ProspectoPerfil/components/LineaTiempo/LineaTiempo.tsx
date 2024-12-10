import React, { useState } from "react";
import style from "./LineaTiempo.module.css";

interface LineaTiempoProps {
	steps: any;
	currentStep?: any;
	onClickStep?: any;
}

export const LineaTiempo = ({ steps, currentStep, onClickStep }: LineaTiempoProps) => {
	return (
		<section className={style.stepWizard}>
			<ul className={style.stepWizardList}>
				{steps.map((step: any) => (
					<li
						key={step.id}
						className={`${style.stepWizardItem} ${
							currentStep === step.id ? style.currentItem : ""
						}`}
					>
						<span className={style.progressCount} onClick={() => onClickStep(step.id)}>
							{step.id}
						</span>
						<span className={style.progressLabel}>{step.label}</span>
					</li>
				))}
			</ul>
		</section>
	);
};
