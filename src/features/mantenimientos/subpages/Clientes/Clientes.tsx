import React from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";
import { useGetFetch } from "@/hooks/useGetFetch";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { formatSoloFecha } from "@/helpers/formatDate";

export const Clientes = () => {
    const authState = useSelector((state: RootState) => state.auth.usuario);
	
    const navigate = useNavigate();
    const { data } = useGetFetch(`user/getMisClientes/${authState?.uid}`);
    console.log(data);
    
    const handleClientRedirect = (id: string) => {
        console.log(id);
        navigate(`/seguimiento-cliente/${id}`);
    };

    const handleEyeClick = (rowData: any) => {
        handleClientRedirect(rowData.servicioCliente);
    };

    const isEyeDisabled = (rowData: any) => {
        return !rowData.servicioCliente;
    };
    console.log(data?.clientes)

    return (
        <>
            <MainContentStructure titleText="Clientes">
                <DataTable
                    columns={columns}
                    data={data?.clientes}
                    onEye={handleEyeClick}
                    isSearch={true}
                    isEyeDisabled={isEyeDisabled}
                    isHeaderActive={false}
                />
            </MainContentStructure>
        </>
    );
};


const columns = [
    { nombre: "Razón Social", campo: "razon_social" },
    { nombre: "RUC", campo: "ruc" },
    { nombre: "Nombre", campo: "nombre" },
    { nombre: "DNI", campo: "dni" },
    { nombre: "Telefono", campo: "celular" },
    { nombre: "Email", campo: "correo" },
    { nombre: "Fecha Creación", body: (rowData: any) => (
        <><p>{formatSoloFecha(rowData?.fecha_creacion)}</p></>
    ) },
    { nombre: "Estado", body: (rowData: any) => (
        <><p>{rowData?.solvente ? "Activo" : "Inactivo" }</p></>
    ) },
];
