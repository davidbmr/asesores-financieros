import React, { useState, useEffect } from "react";
import style from "./SeleccionarContadora.module.css";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { CustomButton } from "@/components/CustomButton/CustomButton";
import { FichaContadora } from "./FichaContadora/FichaContadora";
import { usePostFetch } from "@/hooks/usePostFetch";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { SectionStructure } from "@/components/SectionStructure/SectionStructure";
import api from "@/connections";
import { refreshToken } from "@/store/slices/auth";
import { useGetFetch } from "@/hooks/useGetFetch";

export const SeleccionarContadora = () => {
  const authState = useSelector((state: RootState) => state.auth.usuario);
  const [agendarReunion, setAgendarReunion] = useState(false);
  const [fecha, setFecha] = useState<Date | any>(null);
  const [hora, setHora] = useState<string>("");
  const [horasDisponibles, setHorasDisponibles] = useState([]);
  const [contadoraData, setContadoraData] = useState<any>(null);
  const [loadingHoras, setLoadingHoras] = useState(false);
  const [linkICS, setLinkICS] = useState("")
  const dispatch: AppDispatch = useDispatch();
  const { data } = useGetFetch(
    `servicio/getServicio/${authState?.servicioCliente}`
  );
  const { postFetchData, isLoadingPost } = usePostFetch(
    `servicio/inicioServicio/${authState?.uid}`,
    {
      sectionName: "Reunión",
      returnFullResponse: true,
    }
  );
  const fetchContadoraData = async () => {
    try {
      const response = await api.get(
        `user/getContadoraById/${authState?.contadora}`
      );
      setContadoraData(response.data);
    } catch (error) {
      console.error("Error al obtener datos de la contadora:", error);
    }
  };

  useEffect(() => {
    fetchContadoraData();
  }, [authState?.contadora]);

  const fetchHorasDisponibles = async () => {
    if (fecha) {
      setLoadingHoras(true);
      try {
        const formattedDate = fecha.toISOString().split("T")[0]; // Formatear fecha para la API
        const response = await api.get(
          `horario/horario/${authState?.contadora}/${formattedDate}`
        );

        // Verificar si la respuesta tiene datos de horas disponibles
        if (response.data.length > 0) {
          const formattedHours = response.data.map((hora: any) => ({
            label: `${hora.horaInicio} - ${hora.horaFin}`,
            value: hora.horaInicio,
          }));
          setHorasDisponibles(formattedHours);
        } else {
          // Si no hay horarios disponibles, mostrar mensaje
          setHorasDisponibles([
            { label: "No hay horarios disponibles", value: "" },
          ]);
        }
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          setHorasDisponibles([
            { label: "No hay horarios disponibles", value: "" },
          ]);
        } else if (
          error.response &&
          error.response.data.message ===
            "La contadora no tiene horario para este día."
        ) {
          setHorasDisponibles([
            { label: "No hay horarios disponibles", value: "" },
          ]);
        } else {
          console.error("Error al obtener las horas disponibles:", error);
        }
      } finally {
        setLoadingHoras(false);
      }
    }
  };

  useEffect(() => {
    fetchHorasDisponibles();
  }, [fecha, authState?.contadora]);

  const handleAgendarReunion = async () => {
    if (fecha && hora) {
      const formattedDate = fecha.toISOString().split("T")[0]; // Formato yyyy-mm-dd
      const requestData = {
        fecha: formattedDate,
        hora: hora, // Enviar solo la hora de inicio seleccionada
      };

      try {
        const response = await postFetchData(requestData);
        setLinkICS(response?.data?.linkICS);
        fetchContadoraData()

        if (response?.data.uid) {
          localStorage.setItem("uid", response.data.uid);
        }

        // Refrescar el token después de que la reunión se agende exitosamente
        const token = localStorage.getItem("rt__eva__backoffice");
        if (token) {
          dispatch(refreshToken(token));
        }

        setAgendarReunion(true);
      } catch (error) {
        console.error("Error al agendar la reunión:", error);
      }
    } else {
      console.error("Fecha u hora no seleccionada");
    }
  };

  console.log(contadoraData)

  // Función para abrir o descargar el archivo ICS
  const handleAddToCalendar = () => {
    if (linkICS) {
      window.open(linkICS, "_blank", "noopener,noreferrer");
    } else {
      console.error("No se ha proporcionado un linkICS");
    }
  };

  useEffect(() => {
    if (agendarReunion) {
      // Aquí puedes realizar cualquier acción adicional después de agendar la reunión
    }
  }, [agendarReunion]);
  
  const shouldShowButton =
    data === null || data === undefined || (Array.isArray(data) && data.length === 0);

    console.log(data)

  return (
    <MainContentStructure titleText="Contadora asignada">
      {contadoraData && (
        <>
          <div>
            <FichaContadora data={contadoraData} />
          </div>
          <br />

          {shouldShowButton && (
            <>
              <SectionStructure additionalClassName={style.containerGroup}>
                <div className={style.inputGroup}>
                  <label htmlFor="fecha">Fecha:</label>
                  <Calendar
                    id="fecha"
                    value={fecha}
                    onChange={(e) => setFecha(e.value)}
                    dateFormat="dd/mm/yy"
                    showIcon
                  />
                </div>
                <div className={style.inputGroup}>
                  <label htmlFor="hora">Hora:</label>
                  <Dropdown
                    id="hora"
                    value={hora}
                    options={horasDisponibles}
                    onChange={(e) => setHora(e.value)}
                    placeholder="Seleccione una hora"
                    disabled={
                      !fecha ||
                      loadingHoras ||
                      horasDisponibles.length === 0 ||
                      horasDisponibles[0].value === ""
                    } // Deshabilitar si no hay horas disponibles
                  />
                </div>
              </SectionStructure>
              <br />
              <CustomButton
                text="Agendar Reunión"
                backgroundButton="var(--primary-color-app)"
                colorP="#fff"
                onClick={handleAgendarReunion}
                disabled={
                  isLoadingPost || !hora || horasDisponibles[0].value === ""
                }
              />
            </>
          )}

       
        
        </>
      )}
    </MainContentStructure>
  );
};
