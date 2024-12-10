import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "@/connections/mainApi.js";
import { useAppDispatch } from "@/store/hooks";
import { useToastService } from "@/services/useToastService";

interface AddModal {
    onHideModal: () => void;
}

interface ToastMessages {
    pending?: string;
    success?: string;
    error?: string;
}

export const useUpdateFetch = (
    endPoint: string,
    sectionName: string,
    reloadFetchData?: () => void,
    addModal?: AddModal,
    toastMessages: ToastMessages = {},
    useToast: boolean = true // Nueva prop para habilitar/deshabilitar el toast
) => {
    const dispatch = useAppDispatch();
    const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false);
    const [errorUpdate, setErrorUpdate] = useState<any>(null);
    const [successUpdate, setSuccessUpdate] = useState<boolean>(false);
    const { showToast, showPromiseToast } = useToastService();

    const setInitStateUpdate = () => {
        setIsLoadingUpdate(false);
        setErrorUpdate(null);
        setSuccessUpdate(false);
    };

    useEffect(() => {
        if (successUpdate) {
            if (useToast) {
                showToast(`${sectionName} ha sido actualizado exitosamente`, 'success');
            }

            if (addModal) {
                addModal.onHideModal();
            }
            setInitStateUpdate();
            if (reloadFetchData) {
                reloadFetchData();
            }
        }
    }, [successUpdate]);

    const updateFetchData = async (id: string, data: any): Promise<any> => {
        setIsLoadingUpdate(true);

        const token = localStorage.getItem("rt__eva__backoffice");
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        const promise = axios.put(`${url}${endPoint}/${id}`, data, { headers });

        if (useToast) {
            showPromiseToast(promise, {
                pending: toastMessages.pending || 'Enviando solicitud...',
                success: toastMessages.success || `${sectionName} ha sido actualizado exitosamente`,
                error: toastMessages.error || 'Solicitud fallida!',
            });
        }

        try {
            const response = await promise;
            setIsLoadingUpdate(false);
            setSuccessUpdate(true);
            return response.data;
        } catch (error) {
            setIsLoadingUpdate(false);
            setErrorUpdate(error);
            setSuccessUpdate(false);
            if (useToast) {
                showToast(toastMessages.error || 'Error en la solicitud', 'error');
            }
            throw error;
        }
    };

    return {
        updateFetchData,
        isLoadingUpdate,
        errorUpdate,
        successUpdate,
    };
};
