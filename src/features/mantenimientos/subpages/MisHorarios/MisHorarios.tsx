import { DataTable } from '@/components/DataTable/DataTable'
import { MainContentStructure } from '@/components/MainContentStructure/MainContentStructure'
import { useGetFetch } from '@/hooks/useGetFetch'
import { RootState } from '@/store'
import React from 'react'
import { useSelector } from 'react-redux'

const MisHorarios = () => {
  const authState = useSelector((state: RootState) => state.auth.usuario);
  console.log(authState)
  const { data } = useGetFetch<any>(`horario/verHorario/${authState?.uid}`);

  // Mapea los datos para agruparlos por días de la semana
  const mappedData = [
    {
      dia: 'Lunes',
      horaInicio: data?.find((item: any) => item.dia === 1)?.horaInicio || 'No asignado',
      horaFin: data?.find((item: any) => item.dia === 1)?.horaFin || 'No asignado',
    },
    {
      dia: 'Martes',
      horaInicio: data?.find((item: any) => item.dia === 2)?.horaInicio || 'No asignado',
      horaFin: data?.find((item: any) => item.dia === 2)?.horaFin || 'No asignado',
    },
    {
      dia: 'Miércoles',
      horaInicio: data?.find((item: any) => item.dia === 3)?.horaInicio || 'No asignado',
      horaFin: data?.find((item: any) => item.dia === 3)?.horaFin || 'No asignado',
    },
    {
      dia: 'Jueves',
      horaInicio: data?.find((item: any) => item.dia === 4)?.horaInicio || 'No asignado',
      horaFin: data?.find((item: any) => item.dia === 4)?.horaFin || 'No asignado',
    },
    {
      dia: 'Viernes',
      horaInicio: data?.find((item: any) => item.dia === 5)?.horaInicio || 'No asignado',
      horaFin: data?.find((item: any) => item.dia === 5)?.horaFin || 'No asignado',
    },
  ];

  const columns = [
    { nombre: 'Día', campo: 'dia' },
    { nombre: 'Hora de Inicio', campo: 'horaInicio' },
    { nombre: 'Hora de Fin', campo: 'horaFin' },
  ];

  return (
    <MainContentStructure>
      <DataTable data={mappedData} columns={columns} isHeaderActive={false} onEye={() => {}}/>
    </MainContentStructure>
  );
};

export default MisHorarios;
