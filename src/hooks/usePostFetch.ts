import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { setLogin, setRole } from "@/store/slices/auth";
import api from "@/connections";
import { useToastService } from "@/services/useToastService";

interface PostDataResponse {
    data: any;
    token: any;
    usuario: any;
}

interface AddModal {
    onHideModal: () => void;
}

interface ToastMessages {
    pending?: string;
    success?: string;
    error?: string;
}

interface UsePostFetchOptions {
    sectionName: string;
    reloadFetchData?: () => void;
    addModal?: AddModal;
    isLogin?: boolean;
    toastMessages?: ToastMessages;
    returnFullResponse?: boolean;
    showToast?: boolean;  // Nuevo campo para controlar el toast
}

export const usePostFetch = (
    endPoint: string,
    {
        sectionName,
        reloadFetchData,
        addModal,
        isLogin = false,
        toastMessages = {},
        returnFullResponse = false,
        showToast = true,  // Valor por defecto del toast a true
    }: UsePostFetchOptions
) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isLoadingPost, setIsLoadingPost] = useState<boolean>(false);
    const [errorPost, setErrorPost] = useState<any>(null);
    const [successPost, setSuccessPost] = useState<boolean>(false);
    const { showToast: displayToast, showPromiseToast } = useToastService();

    const setInitStatePost = () => {
        setIsLoadingPost(false);
        setErrorPost(null);
        setSuccessPost(false);
    };

    useEffect(() => {
        if (successPost && showToast) {
            displayToast(`${sectionName} ha sido agregado exitosamente`, 'success');

            if (addModal) {
                addModal.onHideModal();
            }
            setInitStatePost();
            if (reloadFetchData) {
                reloadFetchData();
            }
        }
    }, [successPost, showToast]);  // Agregamos showToast como dependencia

    const postFetchData = async (data: any, query?: string, pathUrl?: string): Promise<any> => {
        setIsLoadingPost(true);

        const headers = isLogin ? {} : {
            Authorization: `Bearer ${localStorage.getItem("rt__eva__backoffice")}`,
        };

        const promise = api.post(
            `${endPoint}${query ? `?${query}` : ""}`,
            data,
            {
                headers,
            }
        );

        if (showToast) {
            showPromiseToast(promise, {
                pending: toastMessages.pending || 'Enviando solicitud...',
                success: toastMessages.success || `${sectionName} ha sido agregado exitosamente`,
                error: toastMessages.error || 'Solicitud fallida!',
            });
        }

        try {
            const resp: AxiosResponse<PostDataResponse> = await promise;

            if (isLogin) {
                localStorage.setItem("rt__eva__backoffice", resp.data.token);
                dispatch(setLogin(true));
                dispatch(setRole(resp.data.usuario.role));
            }

            setIsLoadingPost(false);
            setSuccessPost(true);

            if (pathUrl) {
                setTimeout(() => {
                    navigate(pathUrl);
                }, 500);
            }

            // Retornar respuesta completa o solo los datos
            return returnFullResponse ? resp : resp.data;
        } catch (error: any) {
            setIsLoadingPost(false);
            setErrorPost(error);
            return undefined;
        }
    };

    return {
        postFetchData,
        isLoadingPost,
        errorPost,
    };
};
