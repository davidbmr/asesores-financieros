import React from "react";

interface CalendlyEmbedProps {
	url: string;
}

export const CalendlyEmbed = ({ url }: CalendlyEmbedProps) => {
	return (
		<div style={{ minWidth: "320px", height: "630px" }}>
			<iframe src={url} width="100%" height="100%" style={{ border: "none" }}></iframe>
		</div>
	);
};
