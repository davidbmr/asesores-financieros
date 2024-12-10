import React, { useEffect } from "react";
import { AppRoutes } from "./routes/AppRoutes";
import { addLocale, locale } from "primereact/api";
import { useAppDispatch } from "./store/hooks";

import { useDispatch } from "react-redux";
import { initializeAuth } from "./store/slices/auth";
import { Toaster } from "sonner";

export const App: React.FC = () => {
    addLocale("es", {
        firstDayOfWeek: 1,
        dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
        dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
        monthNames: [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
            "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ],
        monthNamesShort: [
            "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep",
            "Oct", "Nov", "Dic"
        ],
        today: "Hoy",
        clear: "Limpiar",
    });

    locale("es");

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(initializeAuth());
    }, [dispatch]);

    return (
        <>
           <Toaster />
            <AppRoutes />
        </>
    );
};
