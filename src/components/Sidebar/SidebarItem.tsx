import React from "react";
import { Link, useLocation } from "react-router-dom";

export const SidebarItem = ({ item, styles }: any) => {
	const location = useLocation();
	const isActive = item.path === location.pathname;

	return item.sidebarProps && item.path ? (
		<>
			<Link to={item.path} className={`${styles.listItem} ${isActive && styles.active}`}>
				<div className={styles.itemText}>{item.sidebarProps.displayText}</div>
			</Link>
		</>
	) : null;
};
