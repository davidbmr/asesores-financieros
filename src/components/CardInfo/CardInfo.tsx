import React from "react";
import style from "./CardInfo.module.css";

interface CardInfoProps {
	title: string;
	text?: string;
	backgroundHeader?: string;
	fontColor?: string;
}

export const CardInfo = ({
	title,
	text,
	backgroundHeader = "#3b82f6",
	fontColor = "#fff",
}: CardInfoProps) => {
	const styles: React.CSSProperties = {
		background: backgroundHeader,
		color: fontColor,
	};

	return (
		<div className={style.cardInfo__container}>
			<div className={style.cardInfo__header} style={styles}>
				{title}
			</div>
			<div className={style.cardInfo__body}>{text}</div>
		</div>
	);
};
