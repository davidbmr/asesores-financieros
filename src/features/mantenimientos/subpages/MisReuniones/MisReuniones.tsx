import React from "react";
import { useNavigate } from "react-router-dom";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";
import { useGetFetch } from "@/hooks/useGetFetch";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import extractDate from "@/helper/extractDate";
import { FaVideo } from "react-icons/fa";
import style from "./MisReuniones.module.css";

// Función para agrupar reuniones por fecha
const groupByDate = (data: any[]) => {
    return data.reduce((groups: any, reunion: any) => {
        const date = extractDate(reunion.dia);
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(reunion);
        return groups;
    }, {});
};

export const MisReuniones = () => {
    const authState = useSelector((state: RootState) => state.auth.usuario);
    const { data } = useGetFetch(`horario/verMisReuniones/${authState?.uid}`);
    
    const openLink = (url: string) => {
        window.open(url, "_blank", "noopener,noreferrer");
    };

    // Agrupar las reuniones por fecha
    const groupedReuniones = data ? groupByDate(data) : {};

    return (
        <MainContentStructure titleText="Mis Reuniones">
            <div className={style.reunionesContainer}>
                {Object.keys(groupedReuniones).length > 0 ? (
                    Object.keys(groupedReuniones).map((date, index) => (
                        <div key={index}>
                            <h3 className={style.reunionDate}>{date}</h3>
                            {groupedReuniones[date].map((reunion: any, idx: number) => (
                                <div key={idx} className={style.reunionItem}>
                                    <div className={style.reunionInfo}>
                                        <p className={style.reunionTime}>
                                            {reunion.horaInicio} - {reunion.horaFin}
                                        </p>
                                        <p className={style.reunionTime}>
                                            {reunion.dia}
                                        </p>
                                        <p className={style.reunionCliente}>REUNIÓN: {reunion.clienteId.nombre}</p>
                                        <p className={style.reunionId}>ID de reunión: {reunion.servicioId.uid}</p>
                                    </div>
                                    {reunion.servicioId.linkReunion && (
                                        <button
                                            onClick={() => openLink(reunion.servicioId.linkReunion)}
                                            className={style.reunionButton}
                                        >
                                            <FaVideo className={style.reunionIcon} />
                                            <span>Unirse a la reunión</span>
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))
                ) : (
                    <p className={style.noReuniones}>No hay reuniones programadas</p>
                )}
            </div>
        </MainContentStructure>
    );
};
