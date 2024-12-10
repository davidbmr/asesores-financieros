import { DataTable } from '@/components/DataTable/DataTable'
import { MainContentStructure } from '@/components/MainContentStructure/MainContentStructure'
import extractDate from '@/helper/extractDate'
import { formatSoloFecha } from '@/helpers/formatDate'
import { useGetFetch } from '@/hooks/useGetFetch'
import { RootState } from '@/store'
import React from 'react'
import { useSelector } from 'react-redux'

const HistorialPagos = () => {
  const authState = useSelector((state: RootState) => state.auth.usuario);
  const { data } = useGetFetch<any>(`pago/historial-pago/${authState?.uid}`);
    console.log(data)

  const columns = [
    { nombre: 'Fecha de Pago', campo: 'fechaPago' },
    { nombre: 'Membresia', campo: 'tipoMembresia' },
    { nombre: 'Fecha de Vencimiento', 
        body: (row: any) => {
            return <p>{extractDate(row.fechaVencimiento)}</p>;
        }},
  ];

  return (
    <MainContentStructure titleText='Historial de Pagos'>
      <DataTable data={data?.pagos || []} columns={columns} isHeaderActive={false}/>
    </MainContentStructure>
  );
};

export default HistorialPagos;
