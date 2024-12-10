import React from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";
import { useGetFetch } from "@/hooks/useGetFetch";
import { FaDownload } from "react-icons/fa";
import { Button } from "primereact/button";

export const ProspectoContadoras = () => {
	const navigate = useNavigate();
	const { data } = useGetFetch("postulante");

	console.log(data?.usuarios);

	const handleClientRedirect = (rowData: any) => {
		navigate(`/prospecto-contadoras/perfil`);
	};

	const downloadButton = (url: any) => {
		return (
			<a href={url} target="_blank" rel="noopener noreferrer">
				<Button
					icon={<FaDownload />}
					className="p-button-rounded p-button-secondary p-button-sm"
					style={{ width: "30px", height: "30px", padding: "0" }}
				/>
			</a>
		);
	};

	const columns = [
		{ nombre: "Nombre", campo: "nombre" },
		{ nombre: "Apellido Paterno", campo: "apellido_paterno" },
		{ nombre: "Apellido Materno", campo: "apellido_materno" },
		{ nombre: "Correo", campo: "correo" },
		{ nombre: "Celular", campo: "celular" },
		{ nombre: "DNI", campo: "dni" },
		{ nombre: "Descargar CV", body: (rowData: any) => downloadButton(rowData.archivo_cv) },
		{ nombre: "Descargar Certificado", body: (rowData: any) => downloadButton(rowData.certificado_unico_laboral) },
	];

	return (
		<MainContentStructure titleText="Prospectos de contadoras">
			<DataTable columns={columns} data={data?.usuarios} onEye={handleClientRedirect} isSearch={true} />
		</MainContentStructure>
	);
};
