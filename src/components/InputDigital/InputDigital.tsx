import React from "react";
import { InputText } from "primereact/inputtext";
import styles from "./InputDigital.module.css";

interface DualInputProps {
	initialsValue: string;
	textValue: string;
	label?: string;
	backgroundColor?: string;
	textColor?: string;
	fontSize?: string | number;
}

export const InputDigital: React.FC<DualInputProps> = ({
	initialsValue,
	textValue,
	label,
	backgroundColor = "black",
	textColor = "#00FF00",
	fontSize = "1.5rem",
}) => {
  const commonStyles: React.CSSProperties = {
    backgroundColor: backgroundColor,
    color: textColor,
    fontSize: fontSize,
    textAlign: "right",
    fontFamily: "DS-DIGI",
    fontWeight: "bold",
};

	return (
		<div className={styles.container}>
			{label && <label>{label}</label>}
			<InputText
				value={initialsValue}
				className={styles.initialsInput}
				autoComplete="off"
				readOnly
				style={commonStyles}
			/>
			<InputText
				value={textValue}
				className={styles.textInput}
				autoComplete="off"
				readOnly
				style={commonStyles}
			/>
		</div>
	);
};
