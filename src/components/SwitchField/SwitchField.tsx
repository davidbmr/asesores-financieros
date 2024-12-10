import React from "react";
import { InputSwitch } from "primereact/inputswitch";
import style from "./SwitchField.module.css";

interface SwitchFieldProps {
	value: boolean;
	name: string;
	onChange: any;
	textLabel?: string;
	direction?: "row" | "column";
	disabled?: boolean;
	labelWidth?: string;
}

export const SwitchField = ({
	textLabel,
	value,
	name,
	onChange,
	direction = "column",
	disabled = false,
	labelWidth = "100%",
}: SwitchFieldProps) => {
	const styles: React.CSSProperties = {
		width: labelWidth,
		fontSize: "15px",
	};

	return (
		<div
			className={`${style.item__group} ${
				direction === "column" ? style.item__column : style.item__row
			}`}
		>
			{textLabel ? <label style={styles}>{textLabel}</label> : <></>}

			<InputSwitch checked={value} name={name} onChange={onChange} disabled={disabled} />
		</div>
	);
};
