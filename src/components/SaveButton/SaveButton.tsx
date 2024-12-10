import React from "react";
import style from "./SaveButton.module.css";
import { FiSave } from "react-icons/fi";

interface CustomButtonProps {
	onClick?: () => void;
}

export const SaveButton = ({ onClick }: CustomButtonProps) => {
	return (
		<div className={style.button__action} onClick={onClick}>
			<FiSave size={25} />
			<p className={style.button__text}>Guardar {`[F9]`}</p>
		</div>
	);
};
