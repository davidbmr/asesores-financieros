import React from "react";
import { HeaderDataTable } from "../HeaderDataTable/HeaderDataTable";
import { SectionStructure } from "../SectionStructure/SectionStructure";
import { PrimeDataTable } from "@/primeComponents/PrimeDataTable/PrimeDataTable";

interface DataTableProps {
    isHeaderActive?: boolean;
    columns: any[];
    data: any[];
    textAddButton?: string;
    onAddModal?: () => void;
    onUpdate?: (rowData: any) => void;
    onDelete?: (id: string) => void;
    onEye?: (rowData: any) => void;
    isExport?: boolean;
    isSearch?: boolean;
    isEyeDisabled?: (rowData: any) => boolean;
    customButtonProps?: { 
        background?: string; 
        icon?: string; 
        onClick?: (rowData: any) => void; 
    }; // Nuevo prop para customButtonProps
    children?: React.ReactNode;
}

export const DataTable = ({
    isHeaderActive = true,
    columns,
    data,
    textAddButton,
    onAddModal,
    onUpdate,
    onDelete,
    onEye,
    isExport,
    isSearch,
    isEyeDisabled,
    customButtonProps, // Acepta el nuevo prop
    children,
}: DataTableProps) => {
    return (
        <SectionStructure>
            {isHeaderActive ? (
                <HeaderDataTable
                    isExport={isExport}
                    isSearch={isSearch}
                    textAddButton={textAddButton ? textAddButton : null}
                    onAddModal={onAddModal}
                />
            ) : null}

            {/* Tabla */}
            <PrimeDataTable
                columns={columns}
                data={data}
                onUpdate={onUpdate}
                onDelete={onDelete}
                onEye={onEye}
                isEyeDisabled={isEyeDisabled}
                customButtonProps={customButtonProps} // Pasa el prop a PrimeDataTable
            />

            {children ? <div>{children}</div> : null}
        </SectionStructure>
    );
};
