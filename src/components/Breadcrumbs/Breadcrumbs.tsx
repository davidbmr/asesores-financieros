import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import style from './Breadcrumbs.module.css'

export const Breadcrumbs = () => {
	const location = useLocation();

	let currentLink: string = "";

	const crumbs = location.pathname
		.split("/")
		.filter((crumb) => crumb !== "")
		.map((crumb) => {
			currentLink += `/${crumb}`;
			return (
				<div className={style.crumb} key={crumb}>
					<NavLink to={currentLink}>{crumb}</NavLink>
				</div>
			);
		});

	return <div className={style.breadcrumbs}>{crumbs}</div>;
};
