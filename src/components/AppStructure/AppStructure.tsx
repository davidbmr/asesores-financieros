import React from "react";

import style from "./AppStructure.module.css";

type props = {
	children?: React.ReactNode;
};

export const AppStructure = ({ children }: props) => {
	return <div className={style.appStructure__mainContent}>{children}</div>;
};
