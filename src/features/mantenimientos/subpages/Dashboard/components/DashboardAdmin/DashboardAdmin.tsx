import React from 'react'
import style from "./DashboardAdmin.module.css"
import { DataTable } from '@/components/DataTable/DataTable'
import { useGetFetch } from '@/hooks/useGetFetch'

export const DashboardAdmin = () => {
    const {data} = useGetFetch("user/dashboardAdmin")

    console.log(data)
  return (
    <div>
        <h2 style={{marginBottom:"10px"}}>Dashboard Admin</h2>

        <DataTable columns={columns} data={data?.contadoras || []} isHeaderActive={false}/>
    </div>
  )
}
const columns = [
    { nombre: "Nombre", campo: "nombre" },
    { nombre: "Correo", campo: "correo" },
    { nombre: "N° Clientes", campo: "numeroClientes" },
    { nombre: "Promedio", campo: "promedio_satisfaccion" },

  
  ];
  