import React from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";
import { useGetFetch } from "@/hooks/useGetFetch";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import extractDate from "@/helper/extractDate";
import { FaFileAlt } from "react-icons/fa"; // Icono de archivo
import style from "./ServiciosFinalizados.module.css"; // Importamos el CSS module

export const ServiciosFinalizadosClientes = () => {
    const authState = useSelector((state: RootState) => state.auth.usuario);
    const { data } = useGetFetch(`servicio/getServiciosCliente/${authState?.uid}`);
    
    const openLink = (url: string) => {
        window.open(url, "_blank", "noopener,noreferrer");
    };

    console.log(data, "data");

    const getStatusClass = (state: string) => {
        switch (state) {
            case "FINALIZADO":
                return style.statusFinalizado;
            case "CANCELAR":
                return style.statusCancelado;
            default:
                return style.statusOtro;
        }
    };

    const columns = [
        {
            nombre: "Periodo de servicio",
            body: (rowData: any) => <p>{extractDate(rowData?.fecha)}</p>,
        },
        {
            nombre: "Estado",
            body: (rowData: any) => (
                <span className={getStatusClass(rowData?.state?.[0] || "Sin estado")}>
                    {rowData?.state?.[0] || "Sin estado"}
                </span>
            ),
        },
        {
            nombre: "Documento Contadora",
            body: (rowData: any) => (
                <>
                    {rowData?.documentContadora ? (
                        <button
                            onClick={() => openLink(rowData.documentContadora)}
                            className={style.fileButton} // Aplicamos el estilo del CSS Module
                        >
                            <FaFileAlt className={style.fileIcon} /> {/* Icono de archivo */}
                            <span>Abrir documento</span>
                        </button>
                    ) : (
                        <p>No disponible</p>
                    )}
                </>
            ),
        },
    ];

    return (
        <>
            <MainContentStructure titleText="Servicios Finalizados">
                <DataTable
                    columns={columns}
                    data={data || []}
                    isHeaderActive={false}
                />
            </MainContentStructure>
        </>
    );
};
