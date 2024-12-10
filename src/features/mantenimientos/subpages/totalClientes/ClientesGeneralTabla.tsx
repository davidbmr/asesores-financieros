import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";
import { useGetFetch } from "@/hooks/useGetFetch";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { useModal } from "@/hooks/useModal";
import { formatSoloFecha } from "@/helpers/formatDate";

interface Usuario {
  nombre: string;
  correo: string;
  role: string;
  experiencia: string;
  clientes: string[];
  uid: string;
  fecha_nacimiento?: string;
  imgContadora?: string;
  especialidad?: string;
}

interface Data {
  total: number;
  usuarios: Usuario[];
}

export const ClientesGeneralTabla: React.FC = () => {
  const { data, reloadFetchData } = useGetFetch<Data>("user/getTodosLosClientes");


console.log(data.clientes)

  return (
    <>
      <MainContentStructure titleText="Lista de contadoras">
        <DataTable
          columns={columns}
          data={data?.clientes || []}
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
];
