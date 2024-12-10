import React from "react";
import style from "./PerfilContadora.module.css";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";
import { ContentBox } from "@/components/ContentBox/ContentBox";
import { FichaContadora } from "../../../SeleccionarContadora/FichaContadora/FichaContadora";
import { useParams } from "react-router-dom";
import { useGetFetch } from "@/hooks/useGetFetch";

interface Cliente {
  _id: string;
  nombre: string;
  correo: string;
  apllido_materno: string;
  apllido_paterno: string;
  dni: string;
  celular: string;
  role: string;
  contadora: string;
  clientes: any[];
  __v: number;
  servicioCliente: {
    linkReunion: string;
    labelFiles: any[];
    files: any[];
    titulo: string;
    descripcion: string;
    documentContadora: string;
    paso: number[];
    state: string[];
    cliente_id: string;
    fecha: string;
    hora: string;
    fecha_creacion: string;
    uid: string;
  };
}

interface Contadora {
  _id: string;
  nombre: string;
  correo: string;
  contraseña: string;
  role: string;
  experiencia: string;
  clientes: Cliente[];
  fecha_nacimiento?: string;
  imgContadora?: string;
  especialidad?: string;
  __v: number;
}

export const PerfilContadora: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetFetch<Contadora>(`user/getContadoraById/${id}`);
  console.log(data);
  return (
    <MainContentStructure titleText="Perfil de contadora">
      <div className={style.seguimientoServicio__container}>
        {data && <FichaContadora data={data} />}
        <div className={style.perfilContadora__clientes__container}>
          <h2>Clientes:</h2>
          {data?.contadora?.clientes.length > 0 ? (
            data?.contadora?.clientes?.map((cliente: any) => (
              <ContentBox key={cliente._id} backgroundActive>
                <div className={style.perfilContadora__cliente__field}>
                  <p className={style.perfilContadora__label}>
                    Nombres y apellidos:
                  </p>
                  <p>{`${cliente?.nombre} ${
                    cliente?.apllido_paterno === undefined
                      ? ""
                      : cliente?.apllido_paterno
                  } ${
                    cliente?.apllido_materno === undefined
                      ? ""
                      : cliente?.apllido_paterno
                  }`}</p>
                </div>
                <div className={style.perfilContadora__cliente__field}>
                  <p className={style.perfilContadora__label}>
                    Estado del servicio:
                  </p>
                  <p>{cliente?.servicioCliente?.state[0]}</p>
                </div>
                <div className={style.perfilContadora__cliente__field}>
                  <p className={style.perfilContadora__label}>
                    Fecha de inicio:
                  </p>
                  <p>{cliente?.servicioCliente?.fecha}</p>
                </div>
                <div className={style.perfilContadora__cliente__field}>
                  <p className={style.perfilContadora__label}>
                    Tipo de servicio:
                  </p>
                  <p>{cliente?.servicioCliente?.titulo}</p>
                </div>
              </ContentBox>
            ))
          ) : (
            <span>No tiene clientes asignados</span>
          )}
        </div>
      </div>
    </MainContentStructure>
  );
};
