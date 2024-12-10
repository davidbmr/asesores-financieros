import { DataTable } from '@/components/DataTable/DataTable'
import { MainContentStructure } from '@/components/MainContentStructure/MainContentStructure'
import { useGetFetch } from '@/hooks/useGetFetch'
import { RootState } from '@/store'
import { uid } from 'chart.js/dist/helpers/helpers.core'
import React from 'react'
import { useSelector } from 'react-redux'

const HistorialPagosContadora = () => {
  const authState = useSelector((state: RootState) => state.auth.usuario);
  console.log(authState)
  const { data } = useGetFetch<any>(`pago/historial-pago/${authState?.uid}`);
    console.log(data)

  const columns = [
    { nombre: 'Fecha de Pago', campo: 'fechaPago' },
    { nombre: 'Monto', campo: 'monto' },
  ];

  return (
    <MainContentStructure titleText='Historial de Pagos'>
      <DataTable data={data?.pagos || []} columns={columns} isHeaderActive={false}/>
    </MainContentStructure>
  );
};

export default HistorialPagosContadora;
