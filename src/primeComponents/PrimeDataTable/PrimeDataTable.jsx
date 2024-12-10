import { useEffect, useState } from "react";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { DataTable as PrimeReactDataTable } from "primereact/datatable";

export const PrimeDataTable = ({ columns, data, onUpdate, onDelete, onEye, isEyeDisabled, customButtonProps }) => {
    const [dataTable, setDataTable] = useState(data);

    useEffect(() => {
        setDataTable(data);
    }, [data]);

    const buttonSuccess = (rowData) => (
        <Button
            className="p-button-info p-button-rounded"
            style={{ width: "40px", height: "40px" }}
            type="button"
            icon="pi pi-pencil"
            onClick={() => onUpdate(rowData)}
        />
    );

    const buttonDecline = (rowData) => (
        <Button
            className="p-button-danger p-button-rounded"
            style={{ width: "40px", height: "40px" }}
            type="button"
            icon="pi pi-ban"
            onClick={() => onDelete(rowData.id)}
        />
    );

    const buttonEye = (rowData) => (
        <Button
            className="p-button-help p-button-rounded"
            style={{ width: "40px", height: "40px" }}
            type="button"
            icon="pi pi-eye"
            onClick={() => onEye(rowData)}
            disabled={isEyeDisabled ? isEyeDisabled(rowData) : false}
        />
    );

    const customButton = (rowData) => (
        <Button
            className="p-button-rounded"
            style={{
                width: "40px",
                height: "40px",
                backgroundColor: customButtonProps?.background || "gray",
            }}
            type="button"
            icon={customButtonProps?.icon || "pi pi-cog"}
            onClick={() => customButtonProps?.onClick(rowData)}
        />
    );

    return (
        <PrimeReactDataTable
            value={dataTable}
            paginator
            rows={5}
            dataKey="id"
            emptyMessage="No se han encontrado resultados."
        >
            {columns &&
                columns.map((column) => (
                    <Column
                        key={`${column.campo}`}
                        sortable
                        field={column.campo}
                        body={column.body}
                        header={column.nombre}
                        style={{ minWidth: "10rem" }}
                    />
                ))}

            {onUpdate && <Column style={{ width: "5rem" }} body={buttonSuccess} />}
            {onEye && <Column style={{ width: "5rem" }} body={buttonEye} />}
            {onDelete && <Column style={{ width: "5rem" }} body={buttonDecline} />}
            {customButtonProps && <Column style={{ width: "5rem" }} body={customButton} />}
        </PrimeReactDataTable>
    );
};
