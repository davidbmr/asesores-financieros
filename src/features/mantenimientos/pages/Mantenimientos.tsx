import React from "react";
import Logo from "../../../assets/LogoDefault.webp";

export const Mantenimientos = () => {
	return (
		<div style={{ width: "100%", height: "100%", display: "grid", placeItems: "center" }}>
			<img
				src={Logo}
				alt="logo"
				style={{ opacity: "0.1", width: "500px", filter: "grayscale(1)" }}
			/>
		</div>
	);
};
