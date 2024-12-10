import React from "react";
import style from "./LineaTiempo.module.css";
import { FaArrowLeft } from "react-icons/fa"; // Icono de flecha

interface LineaTiempoProps {
  steps: any;
  currentStep?: any;
  onClickStep?: any;
  onStepBack?: () => void; // Prop para manejar el retroceso
}

export const LineaTiempo = ({ steps, currentStep, onClickStep, onStepBack }: LineaTiempoProps) => {
  return (
    <section className={style.stepWizard}>
     
      <ul className={style.stepWizardList}>
	  <div className={style.stepWizardHeader}>
        {currentStep > 1 && (
      
            <FaArrowLeft  onClick={onStepBack} className={style.stepBackButton} /> 
         
        )}
      </div>
        {steps.map((step: any) => (
          <li
            key={step.id}
            className={`${style.stepWizardItem} ${
              currentStep === step.id ? style.currentItem : ""
            }`}
          >
            <span className={style.progressCount}>
              {step.id}
            </span>
            <span className={style.progressLabel}>{step.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};
